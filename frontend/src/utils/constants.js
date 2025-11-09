export const TASK_STATUSES = ["pending", "in-progress", "completed"];

export const ROUTES = {
  AUTH: "/auth",
  HOME: "/",
};

export const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    variant: "secondary",
  },
  "in-progress": {
    label: "In Progress",
    variant: "info",
  },
  completed: {
    label: "Completed",
    variant: "success",
  },
};
