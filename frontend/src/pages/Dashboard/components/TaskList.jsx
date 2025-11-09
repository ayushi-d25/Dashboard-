import { TaskItem } from "./TaskItem";
import { Spinner } from "../../../components/ui/Spinner";
import { EmptyState } from "../../../components/ui/EmptyState";

export const TaskList = ({ tasks, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Spinner />
      </div>
    );
  }

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  if (safeTasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create your first task to get started"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {safeTasks.map((task) => (
        <TaskItem
          key={task._id || task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
