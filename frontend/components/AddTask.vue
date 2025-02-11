<template>
  <div class="create-new flex flex-wrap items-center gap-4 mb-8">
    <input
      type="text"
      v-model="newTask"
      placeholder="Add a new task"
      @blur="handleBlurAddTask"
      class="flex-1 p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 max-w-full"
    />
    <div class="w-full sm:w-auto">
      <flat-pickr
        placeholder="Add time (OPTIONAL)"
        v-model="date"
        :config="{ enableTime: true }"
        class="p-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
      />
    </div>
    <button
      @click="addTask"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
    >
      Add Task
    </button>
  </div>
</template>

<script>
import FlatPickr from "vue-flatpickr-component";
import { useTaskStore } from "../stores/taskStore"; // Import the Pinia store
import subtaskService from "../services/subtaskService";

export default {
  components: {
    FlatPickr,
  },
  data() {
    return {
      newTask: "",
      date: null,
      isChecked: false,
    };
  },
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleBlurAddTask() {
      console.log("Task input blurred!");
    },
    async addTask() {
      if (!this.newTask.trim()) {
        alert("Please enter a task!");
        return;
      }

      try {
        console.log("Task ID:", this.taskId);

        const taskData = {
          title: this.newTask,
          completed: this.isChecked,
          datetime: this.date,
          task_id: this.taskId,
        };

        const response = await subtaskService.createSubTask(taskData);
        console.log("Task added successfully:", response.data);

        const taskStore = useTaskStore();
        taskStore.addTask(
          response.data.title,
          response.data.completed,
          response.data.datetime
        );

        // Reset form fields
        this.newTask = "";
        this.date = null;
        this.isChecked = false;
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
  },
};
</script>

<style scoped></style>
