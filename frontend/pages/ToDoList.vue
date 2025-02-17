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

const taskColor = ref("white");
const taskTitle = ref("Task Title Here");
const taskID = ref(69);

onMounted(async () => {
  if (taskId.value) {
    try {
      const task = await taskStore.fetchTask(taskId.value);
      taskColor.value = task.color;
      taskTitle.value = task.title;
      taskID.value = task.id;
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
</script>

<template>
  <div
    :class="`p-5 bg-${taskColor}-500 bg-opacity-35 h-screen overflow-y-auto`"
  >
    <div class="pb-10 flex items-center space-x-4">
      <input
        type="text"
        v-model="taskTitle"
        placeholder="Title"
        @keypress.enter="updateTaskTitle"
        @blur="updateTaskTitle"
        class="flex-1 p-5 text-2xl bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
      />
      <div
        v-for="(color, index) in colors"
        :key="index"
        @click="handleClick(color)"
        :class="`w-8 h-8 bg-${color}-500 rounded-full border-2 border-gray-200 cursor-pointer hover:bg-${color}-100 active:scale-90`"
      ></div>
      <TrashIcon
        class="w-8 h-8 text-gray-500 cursor-pointer hover:text-red-500"
        @click="removeTask"
      />
    </div>
    <div class="overflow-hidden">
      <Task
        v-for="(task, index) in tasks"
        :key="index"
        :initialTask="task.title"
        :initialTime="task.datetime"
        :initialCheck="task.completed"
        :taskId="task.id"
      />
    </div>
    <AddTask :taskId="taskId" />
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
