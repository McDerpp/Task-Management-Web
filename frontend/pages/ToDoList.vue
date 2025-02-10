<template>
  <div :class="`p-5 bg-${taskColor}-500 h-screen overflow-y-auto`">
    <div class="pb-10 flex items-center space-x-4">
      <input
        type="text"
        v-model="title"
        placeholder="Title"
        @keypress.enter="addTask"
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
      />
    </div>
    <div class="overflow-hidden">
      <Task
        v-for="(task, index) in tasks"
        :key="index"
        :taskPlaceholder="task.title"
        :timePlaceholder="task.dateTime || 'No time set'"
      />
    </div>
    <AddTask />
  </div>
</template>

<script>
import AddTask from "../components/AddTask.vue";
import Task from "../components/Task.vue";
import "flatpickr/dist/flatpickr.css";
import { TrashIcon } from "@heroicons/vue/24/solid";

export default {
  components: { AddTask, Task, TrashIcon },

  data() {
    return {
      colors: ["red", "blue", "green", "yellow", "white"],
      taskColor: "white",
      selectedDate: null,
      newTask: "",
      title: "",
      subtasks: [],
    };
  },

  setup() {
    const taskStore = useTaskStore();

    const tasks = computed(() => taskStore.tasks);
    console.log(tasks);
    onMounted(() => {
      taskStore.fetchSubTasksByTaskId(1);
    });

    return { tasks };
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.taskStore.addTask(this.newTask);
        this.newTask = "";
      }
    },
    handleClick(color) {
      this.taskColor = color;
    },
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
</style>
