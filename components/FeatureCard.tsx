/**
 * مكون Feature Card محسّن للصفحة الرئيسية
 */
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  className,
}: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "border-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-2 animate-fadeIn group",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
