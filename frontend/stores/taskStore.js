import { defineStore } from "pinia";
import subtaskService from "../services/subtaskService";
import taskservice from "../services/taskservice";
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

    toggleTask(taskContent, isDone = false, dateTime = null) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) task.done = !task.done;
    },

    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.done);
    },

    sortTasksByDate() {
      this.tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    },

    async fetchTask(taskId) {
      try {
        const response = await taskservice.getTaskByID(taskId);
        this.tasks = response.data.sub_tasks;
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching subtasks for taskId:", error);
      }
    },

    addSubtasksToTask(subtasks) {
      console.log("subtasks ->", subtasks);
      if (!Array.isArray(subtasks)) return;

      subtasks.forEach((subtask) => {
        this.tasks.push({
          id: subtask.id || Date.now(), // Use provided ID or generate one
          content: subtask.content || "Untitled Subtask",
          dateTime: subtask.dateTime || null,
          done: subtask.done || false,
        });
      });
    },
  },
});
