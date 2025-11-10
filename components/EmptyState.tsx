/**
 * مكون Empty State محسّن مع تصميم جذاب
 */
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-6 p-8 text-center animate-fadeIn",
      className
    )}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-2xl">
          <Icon className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>
      
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {action && (
        <Button
          onClick={action.onClick}
          size="lg"
          className="gradient-primary shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
