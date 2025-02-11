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

<script>
import AddTask from "../components/AddTask.vue";
import Task from "../components/Task.vue";
import "flatpickr/dist/flatpickr.css";
import { TrashIcon } from "@heroicons/vue/24/solid";
import { useRoute } from "vue-router";
import taskService from "@/services/taskService";

export default {
  components: { AddTask, Task, TrashIcon },

  data() {
    const route = useRoute();
    return {
      colors: ["red", "blue", "green", "yellow", "white"],
      taskColor: route.query.color || "white",
      selectedDate: null,
      newTask: "",
      taskTitle: route.query.title || "Untitled Task",
      taskId: route.query.taskId,
    };
  },
  setup() {
    const route = useRoute();
    const taskId = route.query.taskId;

    const taskStore = useTaskStore();
    const tasks = computed(() => taskStore.tasks);
    onMounted(() => {
      taskStore.fetchSubTasksByTaskId(taskId);
    });
    return { tasks };
  },

  methods: {
    async updateTaskTitle() {
      if (!this.taskId) {
        console.warn("No taskId available for update");
        return;
      }
      try {
        const updatedData = {
          title: this.taskTitle,
          color: this.taskColor,
        };
        const response = await taskService.updateTask(this.taskId, updatedData);
        console.log("Task updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },

    async createTask() {
      try {
        const taskData = {
          title: this.newTaskTitle,
          color: "white",
        };
        const response = await taskService.createTask(taskData);
        console.log("Task created successfully:", response.data);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
  },

  handleClick(color) {
    this.taskColor = color;
    this.updateTaskTitle();
  },

  async removeTask() {
    if (confirm("Are you sure you want to delete this task?", this.taskId)) {
      try {
        await taskService.deleteTask(this.taskId);
        this.tasks = this.tasks.filter((task) => task.id !== this.taskId);
        console.log("Task deleted successfully");

        this.$router.push("/ToDoPage");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  },
};
</script>

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
