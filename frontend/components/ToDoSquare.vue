

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "blue",
  },
  taskId: {
    type: Number,
    required: true,
  },
  subtask: {
    type: Array,
    default: () => [],
  },
});

const limitedSubTasks = computed(() => {
  const today = new Date();

  const sortedSubtasks = props.subtask
    .filter((task) => task.datetime && new Date(task.datetime) >= today)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  return sortedSubtasks.length
    ? sortedSubtasks.slice(0, 3)
    : [{ title: " - " }, { title: " - " }, { title: " - " }];
});

onMounted(() => {
  console.log("Subtask List:", props.taskId);
});
</script>

<style>
button {
  cursor: pointer;
  appearance: none;
  border: none;
  padding: 0;
}
button:focus {
  outline: 2px solid #555;
}
</style>

<template>
  <NuxtLink
    :to="{
      path: '/ToDoList',
      query: { title, color, taskId },
    }"
    :class="`w-65 h-55 bg-${color}-300 text-black text-center flex flex-col items-center justify-between pt-4 pr-4 pl-4 pb-0 rounded-xl shadow-md font-bold overflow-hidden`"
  >
    <div class="flex justify-center w-full h-fit">
      <span class="text-xl">{{ title }}</span>
    </div>
    <div class="flex flex-col mt-2 mb-3 space-y-0.5 w-full">
      <div
        v-for="(task, index) in limitedSubTasks"
        :key="index"
        :class="`flex-grow h-12 bg-${color}-500 rounded flex flex-col items-center justify-center text-black text-xs overflow-hidden whitespace-nowrap`"
      >
        <span class="block truncate">{{ task.title }}</span>
        <span class="block truncate font-light">
          {{ task.datetime ? task.datetime : "(xxxx-xx-xx xx:xx:xx)" }}
        </span>
      </div>

      <div
        v-if="limitedSubTasks.length === 0"
        class="flex-grow h-10 bg-gray-400 rounded flex items-center justify-center text-black"
      >
        No subtasks available
      </div>
    </div>
  </NuxtLink>
</template>
