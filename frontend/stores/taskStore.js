import { defineStore } from "pinia";
import subtaskService from "../services/subtaskService";
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      // { content: "Task 1", dateTime: "2025-02-10 10:00" },
      // { content: "Task 2", dateTime: null },
    ],
  }),

  actions: {
    // Add a new task
    addTask(taskContent, isDone = false, dateTime = null) {
      this.tasks.unshift({
        id: Date.now(),
        content: taskContent,
        done: isDone,
        dateTime,
      });
    },

    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },

    updateTask(taskId, newContent) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) task.content = newContent;
    },

    toggleTask(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) task.done = !task.done;
    },

    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.done);
    },

    sortTasksByDate() {
      this.tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    },

    async fetchSubTasksByTaskId(taskId) {
      try {
        const response = await subtaskService.getSubTasksByTaskID(taskId); // Get subtasks for the given taskId
        this.tasks = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching subtasks for taskId:", error);
      }
    },
  },
});
