import { cn } from "@/lib/utils";

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-3">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-4 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
};
