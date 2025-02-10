import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getSubTasks() {
    return apiClient.get("/subtasks");
  },
  getSubTasksByTaskID(id) {
    return apiClient.get(`/subtasks/task/${id}`);
  },
  createSubTask(data) {
    return apiClient.post("/subtasks", data);
  },
  updateSubTask(id, data) {
    return apiClient.put(`/subtasks/${id}`, data);
  },
  deleteSubTask(id) {
    return apiClient.delete(`/subtasks/${id}`);
  },
};
