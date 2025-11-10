/**
 * مكون Loading Spinner محسّن مع animations جذابة
 */
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export function LoadingSpinner({ 
  size = "md", 
  className,
  text 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-fadeIn">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
        <Loader2 
          className={cn(
            "animate-spin text-primary relative",
            sizeClasses[size],
            className
          )} 
        />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-fadeIn animation-delay-200">
          {text}
        </p>
      )}
    </div>
  );
}
