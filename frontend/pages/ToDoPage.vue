<template>
  <div class="min-h-screen bg-dotted-pattern p-10">
    <!-- Draggable Container -->
    <draggable
      v-model="tasks"
      item-key="id"
      group="tasks"
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <ToDoSquare
          :title="element.title"
          :color="element.color"
          :subtask="element.sub_tasks"
          :taskId="element.id"
          class="cursor-grab active:cursor-grabbing"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import taskService from "@/services/taskService";
import ToDoSquare from "../components/ToDoSquare.vue";
import draggable from "vuedraggable"; // Import VueDraggable

export default {
  components: { ToDoSquare, draggable },
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
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    onDragEnd(event) {
      console.log("New order:", this.tasks);

    },
  },
};
</script>

<style>
.cursor-grab {
  cursor: grab;
}
.active\:cursor-grabbing:active {
  cursor: grabbing;
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

<!-- <template>
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
</style> -->
