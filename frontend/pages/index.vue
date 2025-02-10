<template>
  <div class="min-h-screen bg-gray-50">
    <main>
      <div class="w-full h-full">
        <Calendar />
      </div>

      <div class="tasks grid grid-cols-1 gap-4">
        <SubTask v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
    </main>
  </div>
</template>

<script>
import Calendar from "../components/Calendar.vue";
import SubTask from "@/components/SubTask.vue";
import { useTaskStore } from "@/stores/taskStore";

export default {
  components: { SubTask, Calendar },
  data() {
    return {
      newTask: "",
    };
  },
  computed: {
    tasks() {
      return this.taskStore.tasks;
    },
  },
  created() {
    this.taskStore = useTaskStore();
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.taskStore.addTask(this.newTask);
        this.newTask = "";
      }
    },
  },
};
</script>
