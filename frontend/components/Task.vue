<template>
  <div class="create-new flex flex-wrap items-center gap-4 mb-8">
    <input
      v-model="isCheckChange"
      type="checkbox"
      id="taskComplete"
      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      @change="handleChange"
    />

    <input
      type="text"
      v-model="newTask"
      @blur="updateTask"
      class="flex-1 p-3 bg-transparent border-gray-300 focus:outline-none focus:border-blue-500 placeholder-black max-w-full focus:border-b-2 border-b"
    />

    <ClockIcon
      class="w-8 h-8 text-gray-500 cursor-pointer hover:text-red-500"
    />
    <div class="w-full sm:w-auto">
      <flat-pickr
        v-model="newDate"
        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i:S' }"
        placeholder="Select Date & Time"
        class="p-3 bg-transparent border-gray-300"
      />
    </div>

    <XCircleIcon
      class="w-8 h-8 text-gray-500 cursor-pointer hover:text-red-500"
      @click="removeTask"
    />
  </div>
</template>

<script>
import FlatPickr from "vue-flatpickr-component";
import { useTaskStore } from "../stores/taskStore";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ClockIcon } from "@heroicons/vue/24/solid";
import subtaskService from "../services/subtaskService";

export default {
  components: { FlatPickr, XCircleIcon, ClockIcon },
  props: {
    initialTask: {
      type: String,
      default: "Add a task",
    },
    initialCheck: {
      type: [Boolean, Number],
      default: 0,
    },
    initialTime: {
      type: String,
      default: null,
    },
    taskId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      newTask: this.initialTask,
      isCheckChange: Boolean(this.initialCheck),
      newDate: this.initialTime ? new Date(this.initialTime) : null,
    };
  },

  methods: {
    async handleChange(event) {
      const checkedValue = event.target.checked;

      const updateTaskData = {
        completed: checkedValue,
        datetime: this.newDate,
      };

      const response = await subtaskService.updateSubTask(
        this.taskId,
        updateTaskData
      );
      console.log(response);
    },
    async removeTask() {
      if (confirm("Are you sure you want to delete this task?")) {
        try {
          // Remove from server first
          await subtaskService.deleteSubTask(this.taskId);

          // Remove from task store
          const taskStore = useTaskStore();
          taskStore.removeTask(this.taskId);

          console.log("Task deleted successfully");
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    },

    async updateTask() {
      const taskStore = useTaskStore();

      const updateTaskData = {
        title: this.newTask,
        completed: this.isCheckChange,
        datetime: this.newDate,
      };

      const response = await subtaskService.updateSubTask(
        this.taskId,
        updateTaskData
      );
      console.log(response);

      taskStore.updateTask(this.taskId, this.newTask);
    },
  },
};
</script>
