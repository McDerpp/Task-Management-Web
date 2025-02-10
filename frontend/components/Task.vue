<template>
  <div class="create-new flex flex-wrap items-center gap-4 mb-8 border-b">
    <input
      type="checkbox"
      v-model="isChecked"
      id="taskComplete"
      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
    <input
      type="text"
      v-model="newTask"
      :placeholder="taskPlaceholder"
      @blur="updateTask"
      class="flex-1 p-3 bg-transparent border-gray-300 focus:outline-none focus:border-blue-500 placeholder-black max-w-full focus:border-b-2"
    />
    <div class="w-full sm:w-auto">
      <flat-pickr
        :placeholder="timePlaceholder"
        v-model="date"
        :config="{ enableTime: true }"
        class="p-3 bg-transparent border-gray-300 focus:outline-none focus:border-blue-500 placeholder-black focus:border-b-2"
      />
    </div>
  </div>
</template>

<script>
import FlatPickr from "vue-flatpickr-component";
import { useTaskStore } from "../stores/taskStore";

export default {
  components: { FlatPickr },
  props: {
    taskPlaceholder: {
      type: String,
      default: "Add a task",
    },
    timePlaceholder: {
      type: String,
      default: "Add time (OPTIONAL)",
    },
  },
  data() {
    return {
      newTask: "",
      date: null,
      taskId: 1,
    };
  },
  methods: {
    updateTask() {
      const taskStore = useTaskStore();
      if (this.newTask.trim()) {
        taskStore.updateTask(this.taskId, this.newTask, this.date);
      }
    },
  },
};
</script>
