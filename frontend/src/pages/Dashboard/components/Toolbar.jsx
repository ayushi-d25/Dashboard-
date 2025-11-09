import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";

export const Toolbar = ({ onNewTask }) => {
  return (
    <div className="flex justify-end">
      <Button 
        onClick={onNewTask} 
        size="lg"
        className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
        New Task
      </Button>
    </div>
  );
};
