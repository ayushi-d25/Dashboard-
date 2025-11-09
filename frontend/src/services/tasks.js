// src/services/tasks.js
import api from "./apiClient";

/** Normalize any list payload to a plain array of tasks */
const normalizeTaskList = (payload) => {
  // Common shapes we might see from backends:
  // payload = Task[]                                  -> return as-is
  // payload = { data: Task[] }                        -> return data
  // payload = { data: { items: Task[] } }             -> return data.items
  // payload = { items: Task[], pagination: {...} }    -> return items
  // payload = { results: Task[] }                     -> return results
  // payload = { data: { results: Task[] } }           -> return data.results

  if (Array.isArray(payload)) return payload;

  const d = payload?.data ?? payload;

  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.items)) return d.items;
  if (Array.isArray(d?.results)) return d.results;

  // sometimes it's { status, message, data: [...] }
  if (Array.isArray(payload?.data)) return payload.data;

  // last resort: not an array → return empty list
  return [];
};

const unwrap = (res) => res?.data ?? res;

// GET /tasks -> Task[]
export const listTasks = async (params) => {
  const res = await api.get("/tasks", { params });
  return normalizeTaskList(unwrap(res));
};

// POST /tasks -> Task
export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  // could be {data: Task} or Task directly
  return unwrap(res)?.data ?? unwrap(res);
};

// PUT /tasks/:id -> Task
export const updateTask = async (id, data) => {
  const res = await api.put(`/tasks/${id}`, data);
  return unwrap(res)?.data ?? unwrap(res);
};

// DELETE /tasks/:id -> { ok: true } or Task
export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return unwrap(res);
};
