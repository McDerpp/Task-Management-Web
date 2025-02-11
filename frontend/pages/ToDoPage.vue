<template>
  <div class="min-h-screen bg-dotted-pattern p-10">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <ToDoSquare
        v-for="(task, index) in tasks"
        :key="index"
        :title="task.title"
        :color="task.color"
        :subtask="task.sub_tasks"
        :taskId="task.id"
      />
    </div>
  </div>
</template>

<script>
import taskService from "@/services/taskService";
import ToDoSquare from "../components/ToDoSquare.vue";

export default {
  components: { ToDoSquare },
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await taskService.getTasks();
        const tasks = response.data;

        tasks.forEach((task) => {
          if (task.sub_tasks && task.sub_tasks.length > 0) {
            console.log(`Sub-tasks for task "${task.id}":`, task.sub_tasks);
          } else {
            console.log(`No sub-tasks for task "${task.title}"`);
          }
        });

        this.tasks = tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
  },
};
</script>

<style>
.bg-dotted-pattern {
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.2) 1px,
    transparent 1px
  );
  background-size: 10px 10px;
}
</style>
