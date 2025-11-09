import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Spinner = ({ className, size = "default" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <Loader2 
      className={cn("animate-spin text-primary", sizeClasses[size], className)} 
    />
  );
};
