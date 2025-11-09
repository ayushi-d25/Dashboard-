import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={cn(
          "relative w-full max-w-lg glass-card rounded-xl shadow-2xl border-border/50",
          "max-h-[90vh] overflow-hidden flex flex-col animate-scale-in",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-accent transition-all duration-300 hover:rotate-90 hover:scale-110 group"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 group-hover:text-primary transition-colors" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
