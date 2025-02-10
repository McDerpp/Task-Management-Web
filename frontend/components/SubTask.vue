<template>
  <div
    :class="`task ${
      task.done ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
    } border p-4 rounded-lg shadow-md hover:shadow-lg transition`"
  >
    <div class="content text-lg text-gray-800">
      {{ task.content }}
    </div>
    <div class="buttons mt-4 flex gap-4">
      <button
        @click="toggleTask"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-colors"
      >
        {{ task.done ? "Undo" : "Done" }}
      </button>
      <button
        @click="removeTask"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "@/stores/taskStore";

export default {
  props: ["task"],
  setup(props) {
    const taskStore = useTaskStore();

    const toggleTask = () => {
      taskStore.toggleTask(props.task);
    };

    const removeTask = () => {
      taskStore.removeTask(props.task);
    };

    return { toggleTask, removeTask };
  },
};
</script>

<style scoped></style>
