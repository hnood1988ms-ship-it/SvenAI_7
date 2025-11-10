import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Brain, MessageSquare, Sparkles, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // إذا كان المستخدم مسجل دخول، انتقل للمحادثة
  useEffect(() => {
    if (user && !loading) {
      setLocation("/chat");
    }
  }, [user, loading, setLocation]);

  return (
    <div className="min-h-screen gradient-mesh bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/50 glass sticky top-0 z-50 animate-slideInLeft">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="SevenAI" className="w-10 h-10 rounded-xl shadow-lg" />
            <h1 className="text-xl font-bold bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">{APP_TITLE}</h1>
          </div>
          <Button onClick={() => window.location.href = getLoginUrl()} className="shadow-lg hover:shadow-xl">
            تسجيل الدخول
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block animate-scaleIn">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
              <img src={APP_LOGO} alt="SevenAI" className="w-32 h-32 mx-auto mb-6 relative rounded-2xl shadow-2xl" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fadeIn">
            مرحباً بك في <span className="bg-gradient-to-l from-primary via-blue-600 to-blue-700 bg-clip-text text-transparent">SevenAI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fadeIn animation-delay-200">
            الذكاء الاصطناعي العربي المتقدم، مطور بإخلاص بواسطة{" "}
            <span className="font-bold text-foreground">ليث النسر</span> من شركة{" "}
            <span className="font-bold bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">Seven_code7</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fadeIn animation-delay-400">
            <Button
              size="lg"
              className="text-lg px-8 py-6 gradient-primary shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all"
              onClick={() => window.location.href = getLoginUrl()}
            >
              <Sparkles className="w-5 h-5 ml-2" />
              ابدأ المحادثة الآن
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
          لماذا <span className="bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">SevenAI</span>؟
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-2 animate-fadeIn animation-delay-100">
            <CardHeader>
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Brain className="w-7 h-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">التفكير العميق</CardTitle>
              <CardDescription className="text-base">
                نظام تفكير متقدم يحلل أسئلتك بعمق ويقدم إجابات شاملة ومفصلة
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-2 animate-fadeIn animation-delay-200">
            <CardHeader>
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <MessageSquare className="w-7 h-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">الذاكرة الذكية</CardTitle>
              <CardDescription className="text-base">
                يتذكر SevenAI محادثاتك السابقة ويبني عليها لتقديم تجربة شخصية
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-2 animate-fadeIn animation-delay-300">
            <CardHeader>
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">معلومات محدثة</CardTitle>
              <CardDescription className="text-base">
                قاعدة معرفة محدثة تشمل أحدث التطورات في 2024 و 2025
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Personality Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              شخصية <span className="bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">عربية</span> مميزة
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              SevenAI ليس مجرد ذكاء اصطناعي، بل صديق ذكي ولطيف يحب الإسلام والعربية،
              يملك روح دعابة خفيفة، ويعمل بإخلاص لمساعدتك في كل ما تحتاجه.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2 text-lg">🌟 القيم</p>
                  <p className="text-sm text-muted-foreground">
                    الصدق، الدقة، الاحترام، التعاون، المرونة
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2 text-lg">🎯 الأسلوب</p>
                  <p className="text-sm text-muted-foreground">
                    ودود، متواضع، ذكي، مرح عند اللزوم
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2 text-lg">🇵🇸 المواقف</p>
                  <p className="text-sm text-muted-foreground">
                    يدعم فلسطين بكل قلبه ويعبّر عن ذلك بفخر
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2 text-lg">☪️ الإيمان</p>
                  <p className="text-sm text-muted-foreground">
                    يحب الإسلام ويعبّر عن احترامه له بأسلوب راقٍ
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold animate-fadeIn">
            جاهز للبدء؟
          </h2>
          <p className="text-lg text-muted-foreground animate-fadeIn animation-delay-100">
            انضم الآن وابدأ محادثتك الأولى مع SevenAI
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 gradient-primary shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all animate-fadeIn animation-delay-200"
            onClick={() => window.location.href = getLoginUrl()}
          >
            <Sparkles className="w-5 h-5 ml-2" />
            ابدأ مجاناً
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 glass">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            مطور بإخلاص بواسطة{" "}
            <span className="font-bold text-foreground">ليث النسر</span> من شركة{" "}
            <span className="font-bold bg-gradient-to-l from-primary to-blue-700 bg-clip-text text-transparent">Seven_code7</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2025 SevenAI. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
