<script setup>
import FlatPickr from "vue-flatpickr-component";
import { useTaskStore } from "../stores/taskStore";
import subtaskService from "../services/subtaskService";
import { ref } from "vue";

const newTask = ref("");
const date = ref(null);
const isChecked = ref(false);
const taskStore = useTaskStore();

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
});

const handleBlurAddTask = () => {
  console.log("Task input blurred!");
};

const addTask = async () => {
  if (!newTask.value.trim()) {
    alert("Please enter a task!");
    return;
  }

  try {
    console.log("Task ID:", props.taskId);

    const taskData = {
      title: newTask.value,
      completed: isChecked.value,
      datetime: date.value,
      task_id: props.taskId,
    };

    const response = await subtaskService.createSubTask(taskData);
    console.log("Task added successfully:", response.data);

    taskStore.addTask(
      response.data.title,
      response.data.completed,
      response.data.datetime
    );

    // Reset input fields
    newTask.value = "";
    date.value = null;
    isChecked.value = false;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};
</script>

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
