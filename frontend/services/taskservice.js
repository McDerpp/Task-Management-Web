import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return apiClient.get("/tasks");
  },
  getTaskByID(id) {
    return apiClient.get(`/tasks/${id}`);
  },
  createTask() {
    return apiClient.post("/tasks");
  },
  updateTask(id, data) {
    return apiClient.put(`/tasks/${id}`, data);
  },
  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`);
  },
};
