<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddTask from "../components/AddTask.vue";
import Task from "../components/Task.vue";
import "flatpickr/dist/flatpickr.css";
import { TrashIcon } from "@heroicons/vue/24/solid";
import taskService from "@/services/taskService";
import { useTaskStore } from "@/stores/taskStore";
import taskservice from "../services/taskservice";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const taskId = ref(route.query.taskId);
const tasks = computed(() => taskStore.tasks);
const colors = ["red", "blue", "green", "yellow"];

const taskColor = ref("blue");
const taskTitle = ref("Task Title Here");
const taskID = ref(69);

const isCheckedShowDone = ref(false);
const isCheckedShowLate = ref(false);
const isCheckedShowFinished = ref(false);
// const taskDescription = ref("");

const isSelectedTask = ref(null);

onMounted(async () => {
  if (taskId.value) {
    try {
      const task = await taskStore.fetchTask(taskId.value);
      taskStore.sortTasksByTitle();
      taskColor.value = task.color;
      taskTitle.value = task.title;
      taskID.value = task.id;

      console.log("taskColor.value -> ", taskColor.value);
    } catch (error) {
      console.error("Error fetching task: ", error);
    }
  } else {
    const task = await taskservice.createTask();
    console.log("creating task result ->", task);
  }
});

const updateTaskTitle = async () => {
  if (!taskId.value) {
    console.warn("No taskId available for update");
    return;
  }
  try {
    const updatedData = {
      title: taskTitle.value,
      color: taskColor.value,
    };
    const response = await taskService.updateTask(taskId.value, updatedData);
    console.log("Task updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const handleClick = (color) => {
  taskColor.value = color;
  updateTaskTitle();
};

const removeTask = async () => {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      await taskService.deleteTask(taskId.value);
      taskStore.tasks = taskStore.tasks.filter(
        (task) => task.id !== taskId.value
      );
      console.log("Task deleted successfully");
      router.push("/ToDoPage");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
};

const handleTaskClick = (task) => {
  isSelectedTask.value = task;
  console.log("Task clicked:", task);
};
</script>

<template>
  <div
    :class="`p-5 bg-${taskColor}-500 bg-opacity-35 h-screen overflow-y-auto flex flex-col`"
  >
    <div class="flex flex-wrap items-center overflow-hidden gap-4">
      <input
        type="text"
        v-model="taskTitle"
        placeholder="Title"
        @keypress.enter="updateTaskTitle"
        @blur="updateTaskTitle"
        class="flex-1 p-5 text-2xl bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
      />

      <!-- page color switch -->
      <div
        v-for="(color, index) in colors"
        :key="index"
        @click="handleClick(color)"
        :class="`w-8 h-8 bg-${color}-500 rounded-full border-2 border-gray-200 cursor-pointer hover:bg-${color}-100 active:scale-90`"
      ></div>
      <TrashIcon
        class="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500"
        @click="removeTask"
      />
    </div>

    <!-- Filters -->
    <div class="flex flex-row gap-4">
      <select v-model="selectedOption" class="border p-2 rounded">
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <label for="showDone" class="flex items-center space-x-2 cursor-pointer">
        <input
          for="showDone"
          type="checkbox"
          v-model="isCheckedShowDone"
          class="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
        />
        <span class="text-gray-500"> done</span>
      </label>

      <label for="showDone" class="flex items-center space-x-2 cursor-pointer">
        <input
          for="showDone"
          type="checkbox"
          v-model="isCheckedShowLate"
          class="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
        />
        <span class="text-gray-500"> Late</span>
      </label>

      <label for="showDone" class="flex items-center space-x-2 cursor-pointer">
        <input
          for="showDone"
          type="checkbox"
          v-model="isCheckedShowFinished"
          class="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
        />
        <span class="text-gray-500"> Finished</span>
      </label>
    </div>
    <div class="flex flex-nowrap gap-4 h-full">
      <div :class="`w-1/2 bg-${taskColor}-300 p-2 rounded-lg`">
        <AddTask :taskId="taskId" :color="taskColor" />

        <Task
          v-for="(task, index) in taskStore.tasks"
          :key="`${index}-${taskColor}`"
          :initialTask="task.title"
          :initialTime="task.datetime"
          :initialCheck="task.completed"
          :taskId="task.id"
          :color="taskColor"
          :isSelected="task.id === isSelectedTask ? true : false"
          @task-click="handleTaskClick"
        />
      </div>
      <div :class="`w-1/2 bg-${taskColor}-300 p-2 rounded-lg flex flex-col `">
        <taskDescription :color="taskColor" />
      </div>
    </div>
  </div>
</template>

<style>
div {
  overflow-y: auto;
  max-height: 100vh;
}
div.cursor-pointer:hover {
  opacity: 0.8;
}
.bg-dotted-pattern {
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.2) 1px,
    transparent 1px
  );
  background-size: 10px 10px;
}
</style>
