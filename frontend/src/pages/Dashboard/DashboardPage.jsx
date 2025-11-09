import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppLayout } from "../../components/layout/AppLayout";
import { Modal } from "../../components/ui/Modal";
import { Toolbar } from "./components/Toolbar";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import * as tasksService from "../../services/tasks";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await tasksService.listTasks();
      setTasks(response.items || response);
    } catch (error) {
      toast.error(error.message || "Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (data) => {
    setIsSubmitting(true);
    try {
      await tasksService.createTask(data);
      toast.success("Task created successfully");
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data) => {
    setIsSubmitting(true);
    try {
      await tasksService.updateTask(editingTask._id, data);
      toast.success("Task updated successfully");
      setShowModal(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Failed to update task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await tasksService.deleteTask(taskId);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
            My Tasks
          </h2>
          <p className="text-lg text-muted-foreground">
            Organize and track your tasks with ease
          </p>
        </div>

        <Toolbar onNewTask={handleNewTask} />

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </AppLayout>
  );
}
