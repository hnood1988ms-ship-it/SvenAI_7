import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TypingText } from "@/components/TypingText";
import { APP_LOGO, APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { Brain, Image as ImageIcon, Loader2, Menu, MessageSquare, Paperclip, Plus, Send, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function Chat() {
  const { user, loading: authLoading } = useAuth();
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [useDeepThinking, setUseDeepThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // مغلق افتراضياً على الجوال
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<"generate" | "analyze" | null>(null);
  const [deepThinkingProgress, setDeepThinkingProgress] = useState(0);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // استعلامات tRPC
  const conversationsQuery = trpc.chat.getConversations.useQuery(undefined, {
    enabled: !!user,
  });

  const messagesQuery = trpc.chat.getMessages.useQuery(
    { conversationId: currentConversationId ?? 0 },
    {
      enabled: !!currentConversationId && currentConversationId > 0,
      refetchInterval: false,
    }
  );

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setInputMessage("");
      setUseDeepThinking(false);
      setShowTypingEffect(true);
      setIsDeepThinking(false);
      setDeepThinkingProgress(0);
      
      // تحديث المحادثة الحالية
      if (!currentConversationId) {
        setCurrentConversationId(data.conversationId);
      }
      
      // إعادة تحميل الرسائل والمحادثات
      messagesQuery.refetch();
      conversationsQuery.refetch();
      
      // التركيز على حقل الإدخال
      inputRef.current?.focus();
    },
    onError: (error) => {
      toast.error("حدث خطأ في إرسال الرسالة");
      console.error(error);
    },
  });

  const deleteConversationMutation = trpc.chat.deleteConversation.useMutation({
    onSuccess: () => {
      toast.success("تم حذف المحادثة");
      setCurrentConversationId(null);
      conversationsQuery.refetch();
    },
  });

  const generateImageMutation = trpc.image.generate.useMutation({
    onSuccess: (data) => {
      toast.success("تم توليد الصورة بنجاح!");
      setSelectedImage(data.imageUrl);
      setImageMode(null);
      setInputMessage("");
    },
    onError: () => {
      toast.error("فشل في توليد الصورة");
    },
  });

  const analyzeImageMutation = trpc.image.analyze.useMutation({
    onSuccess: (data) => {
      toast.success("تم تحليل الصورة!");
      setInputMessage(data.analysis);
      setImageMode(null);
    },
    onError: () => {
      toast.error("فشل في تحليل الصورة");
    },
  });

  // التمرير التلقائي للأسفل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesQuery.data]);

  // إغلاق الـ sidebar عند اختيار محادثة على الجوال
  useEffect(() => {
    if (window.innerWidth < 1024 && currentConversationId) {
      setSidebarOpen(false);
    }
  }, [currentConversationId]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    if (useDeepThinking) {
      setIsDeepThinking(true);
      setDeepThinkingProgress(0);
      const interval = setInterval(() => {
        setDeepThinkingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 30;
        });
      }, 500);
    }

    sendMessageMutation.mutate({
      conversationId: currentConversationId || undefined,
      message: inputMessage,
      useDeepThinking,
    });
  };

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setInputMessage("");
    setSidebarOpen(false); // إغلاق الـ sidebar على الجوال
  };

  const handleDeleteConversation = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه المحادثة؟")) {
      deleteConversationMutation.mutate({ conversationId: id });
    }
  };

  const handleGenerateImage = () => {
    if (!inputMessage.trim()) {
      toast.error("يرجى إدخال وصف للصورة");
      return;
    }
    generateImageMutation.mutate({ prompt: inputMessage });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار ملف صورة");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      setImageMode("analyze");
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = () => {
    if (!selectedImage) return;

    const base64Data = selectedImage.split(",")[1];
    const question = inputMessage.trim() || undefined;

    analyzeImageMutation.mutate({
      imageBase64: base64Data,
      question,
    });
  };

  const clearImageMode = () => {
    setImageMode(null);
    setSelectedImage(null);
    setInputMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendWithMode = () => {
    if (imageMode === "generate") {
      handleGenerateImage();
    } else if (imageMode === "analyze") {
      handleAnalyzeImage();
    } else {
      handleSendMessage();
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center gradient-mesh bg-background p-4">
        <div className="text-center space-y-6 p-8 max-w-md glass rounded-3xl shadow-2xl animate-scaleIn">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
            <img src={APP_LOGO} alt="SevenAI" className="w-24 h-24 mx-auto relative rounded-2xl shadow-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">{APP_TITLE}</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            الذكاء الاصطناعي العربي المتقدم
          </p>
          <Button size="lg" onClick={() => window.location.href = "/api/oauth/callback"} className="gradient-primary shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all">
            تسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }

  const conversations = conversationsQuery.data || [];
  const messages = messagesQuery.data || [];

  return (
    <div className="h-screen flex gradient-mesh bg-background relative" dir="rtl">
      {/* Overlay للجوال */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed lg:relative right-0 top-0 h-full w-80 max-w-[85vw] transition-all duration-300 border-l border-border/50 glass flex flex-col z-50 shadow-2xl lg:shadow-none`}
      >
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={APP_LOGO} alt="SevenAI" className="w-8 h-8 rounded-lg shadow-lg" />
              <h2 className="font-bold text-lg bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">{APP_TITLE}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-accent"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Button
            onClick={handleNewConversation}
            className="w-full gradient-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            variant="default"
          >
            <Plus className="w-4 h-4 ml-2" />
            محادثة جديدة
          </Button>
        </div>

        <ScrollArea className="flex-1 p-2">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group p-3 rounded-lg cursor-pointer transition-all animate-fadeIn ${
                  currentConversationId === conv.id
                    ? "gradient-primary text-primary-foreground shadow-lg"
                    : "hover:bg-accent hover:shadow-md hover:-translate-x-1"
                }`}
                onClick={() => setCurrentConversationId(conv.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {conv.title}
                      </p>
                      <p className="text-xs opacity-70">
                        {new Date(conv.updatedAt).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                  </div>
                  {currentConversationId === conv.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conv.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">
              {user.name?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 md:h-16 border-b border-border/50 glass flex items-center justify-between px-3 md:px-4 shadow-lg flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex-shrink-0 hover:bg-accent"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-base md:text-lg font-bold truncate bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">
              {currentConversationId
                ? conversations.find((c) => c.id === currentConversationId)?.title
                : "محادثة جديدة"}
            </h1>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-3 md:p-4">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            {messages.length === 0 && !currentConversationId && (
              <div className="text-center py-8 md:py-16 space-y-4 md:space-y-6 px-4">
                <div className="relative inline-block animate-scaleIn">
                  <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
                  <Sparkles className="w-16 md:w-20 h-16 md:h-20 mx-auto text-primary relative animate-pulse" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold animate-fadeIn">
                  مرحباً بك في <span className="bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">SevenAI</span>!
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-fadeIn animation-delay-100">
                  أنا SevenAI، ذكاء اصطناعي عربي متقدم، جاهز لمساعدتك في أي شيء تحتاجه
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-4 animate-fadeIn animation-delay-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm hover:shadow-lg hover:scale-105 transition-all"
                    onClick={() => setInputMessage("ما هي أحدث تطورات الذكاء الاصطناعي؟")}
                  >
                    💡 أحدث تطورات AI
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm hover:shadow-lg hover:scale-105 transition-all"
                    onClick={() => setInputMessage("ساعدني في تعلم البرمجة")}
                  >
                    💻 تعلم البرمجة
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm hover:shadow-lg hover:scale-105 transition-all"
                    onClick={() => setInputMessage("اكتب لي قصة قصيرة")}
                  >
                    📖 اكتب قصة
                  </Button>
                </div>
              </div>
            )}

            {messages.map((msg, index) => {
              const isLastMessage = index === messages.length - 1;
              const shouldAnimate = isLastMessage && showTypingEffect && msg.role === "assistant";

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-start animate-slideInRight" : "justify-end animate-slideInLeft"
                  }`}
                >
                  <div
                    className={`${
                      msg.role === "user"
                        ? "message-user shadow-xl hover:shadow-2xl transition-shadow"
                        : "message-assistant shadow-xl hover:shadow-2xl transition-shadow"
                    } text-sm md:text-base`}
                  >
                    {msg.usedDeepThinking && (
                      <div className="flex items-center gap-2 mb-2 md:mb-3 pb-2 border-b border-amber-300/50 dark:border-amber-700/50 bg-amber-50/50 dark:bg-amber-950/20 -mx-3 -mt-3 px-3 pt-3 rounded-t">
                        <Brain className="w-4 md:w-5 h-4 md:h-5 text-amber-600 dark:text-amber-400 animate-pulse flex-shrink-0" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">🧠 تم استخدام التفكير العميق</span>
                      </div>
                    )}
                    
                    {msg.thinkingProcess && (
                      <div className="mb-2 md:mb-3 p-2 md:p-3 bg-background/50 rounded-lg text-xs opacity-80 whitespace-pre-line">
                        {msg.thinkingProcess}
                      </div>
                    )}
                    
                    {shouldAnimate ? (
                      <TypingText 
                        text={msg.content} 
                        speed={15}
                        onComplete={() => setShowTypingEffect(false)}
                      />
                    ) : (
                      <div className="markdown-content">
                        <Streamdown>{msg.content}</Streamdown>
                      </div>
                    )}
                    
                    <div className="text-xs opacity-60 mt-2 md:mt-3 pt-2 border-t border-current/20">
                      {new Date(msg.createdAt).toLocaleTimeString("ar-SA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {sendMessageMutation.isPending && (
              <div className="flex justify-end animate-slideInLeft">
                <div className="message-assistant flex items-center gap-3 shadow-xl text-sm md:text-base">
                  {useDeepThinking ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 md:w-5 h-4 md:h-5 animate-pulse text-primary flex-shrink-0" />
                          <span className="font-semibold text-sm md:text-base">جاري التفكير العميق...</span>
                        </div>
                        <div className="text-xs opacity-70 space-y-1">
                          <div className="flex items-center gap-2 animate-fadeIn">
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse flex-shrink-0" />
                            <span>تحليل السؤال</span>
                          </div>
                          <div className="flex items-center gap-2 animate-fadeIn animation-delay-200">
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse flex-shrink-0" />
                            <span>البحث في قاعدة المعرفة</span>
                          </div>
                          <div className="flex items-center gap-2 animate-fadeIn animation-delay-400">
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse flex-shrink-0" />
                            <span>تركيب الإجابة</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin flex-shrink-0" />
                      <span>جاري الكتابة...</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border/50 glass p-3 md:p-4 shadow-2xl flex-shrink-0">
          <div className="max-w-4xl mx-auto space-y-2 md:space-y-3">
            {/* Image Mode Banner */}
            {imageMode && (
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 animate-scaleIn shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">
                      {imageMode === "generate" ? "🎨 وضع توليد الصور" : "🔍 وضع تحليل الصور"}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearImageMode} className="hover:bg-primary/20">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {selectedImage && imageMode === "analyze" && (
                  <img src={selectedImage} alt="Selected" className="mt-2 max-h-32 rounded-lg border shadow-md" />
                )}
              </div>
            )}

            {/* Deep Thinking Toggle */}
            {!imageMode && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Button
                    variant={useDeepThinking ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseDeepThinking(!useDeepThinking)}
                    className={`gap-2 transition-all text-xs md:text-sm shadow-lg hover:shadow-xl hover:scale-105 ${useDeepThinking ? 'gradient-primary' : ''}`}
                  >
                    <Brain className={`w-3 md:w-4 h-3 md:h-4 flex-shrink-0 ${useDeepThinking ? 'animate-pulse' : ''}`} />
                    <span className="hidden sm:inline">{useDeepThinking ? "التفكير العميق مفعّل ✓" : "تفعيل التفكير العميق"}</span>
                    <span className="sm:hidden">تفكير عميق</span>
                  </Button>
                  {useDeepThinking && (
                    <p className="text-xs text-muted-foreground animate-fadeIn hidden md:block">
                      سيقوم SevenAI بتحليل سؤالك بعمق مع البحث على الويب إذا لزم 🧠🌐
                    </p>
                  )}
                </div>
                {useDeepThinking && (
                  <div className="text-xs text-muted-foreground bg-primary/5 border border-primary/20 rounded-lg p-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <Brain className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="font-medium">التفكير العميق المتقدم:</span>
                    </div>
                    <ul className="mr-5 mt-1 space-y-0.5 text-xs">
                      <li>• تحليل متعدد المراحل</li>
                      <li>• بحث تلقائي على الويب</li>
                      <li>• تحقق من المصادر</li>
                      <li>• إجابة شاملة ومفصلة</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <Separator className="hidden md:block" />

            {/* Input */}
            <div className="flex gap-2">
              {!imageMode && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
                    title="تحليل صورة"
                  >
                    <Paperclip className="w-4 md:w-5 h-4 md:h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setImageMode("generate");
                      setInputMessage("");
                    }}
                    className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
                    title="توليد صورة"
                  >
                    <ImageIcon className="w-4 md:w-5 h-4 md:h-5" />
                  </Button>
                </>
              )}
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendWithMode();
                  }
                }}
                placeholder={
                  imageMode === "generate"
                    ? "صف الصورة التي تريد توليدها..."
                    : imageMode === "analyze"
                    ? "اسأل عن الصورة (اختياري)..."
                    : "اكتب رسالتك هنا..."
                }
                className="flex-1 text-sm md:text-base"
                disabled={sendMessageMutation.isPending || generateImageMutation.isPending || analyzeImageMutation.isPending}
              />
              <Button
                onClick={handleSendWithMode}
                disabled={
                  (!inputMessage.trim() && imageMode !== "analyze") ||
                  sendMessageMutation.isPending ||
                  generateImageMutation.isPending ||
                  analyzeImageMutation.isPending
                }
                size="icon"
                className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
              >
                {(sendMessageMutation.isPending || generateImageMutation.isPending || analyzeImageMutation.isPending) ? (
                  <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 md:w-5 h-4 md:h-5" />
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              SevenAI قد يرتكب أخطاء. تحقق من المعلومات المهمة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
