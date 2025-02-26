import { defineStore } from "pinia";
import subtaskService from "../services/subtaskService";
import taskservice from "../services/taskservice";
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),

  actions: {
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
      console.log("sorting date!");
      this.tasks = [...this.tasks].sort((a, b) => {
        if (!a.datetime) return 1;
        if (!b.datetime) return -1;
        return new Date(a.datetime) - new Date(b.datetime);
      });
    },

    sortTasksByTitle() {
      console.log("sorting title!");
      this.tasks = [...this.tasks].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    },

    sortTasksByCompleted() {
      this.tasks = [...this.tasks].sort((a, b) => a.completed - b.completed);
    },

    async fetchTask(taskId) {
      try {
        const response = await taskservice.getTaskByID(taskId);
        this.tasks = response.data.sub_tasks;
        console.log("this.tasks -> ", this.tasks);
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
