import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { STATUS_CONFIG } from "../../../utils/constants";
import { cn } from "@/lib/utils";

const getStatusBadgeVariant = (status) => {
  const config = STATUS_CONFIG[status];
  return config ? config.variant : "secondary";
};

export const TaskItem = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="glass-card hover-lift group animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {task.description}
              </p>
            )}
            <Badge variant={getStatusBadgeVariant(task.status)}>
              {STATUS_CONFIG[task.status]?.label || task.status}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:scale-110">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2 cursor-pointer hover:bg-accent/50 transition-colors">
                <Pencil className="h-4 w-4 transition-transform group-hover:scale-110" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task._id)} 
                className="gap-2 text-destructive focus:text-destructive cursor-pointer hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        <span>Created {formatDate(task.createdAt)}</span>
      </CardFooter>
    </Card>
  );
};
