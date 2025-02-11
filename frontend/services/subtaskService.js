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
    console.log(data);
    return apiClient.post("/subtasks", data);
  },
  updateSubTask(id, data) {
    console.log(data);
    return apiClient.patch(`/subtasks/${id}`, data);
  },
  deleteSubTask(id) {
    return apiClient.delete(`/subtasks/${id}`);
  },
};
