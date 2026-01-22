import api from "./axios";

/* ===============================
   TASK APIs
================================ */

export const fetchTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const fetchTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};
