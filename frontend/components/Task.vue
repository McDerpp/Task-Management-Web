<script setup>
import FlatPickr from "vue-flatpickr-component";
import { useTaskStore } from "../stores/taskStore";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ClockIcon } from "@heroicons/vue/24/solid";
import subtaskService from "../services/subtaskService";

const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
  initialTask: {
    type: String,
    default: "Add a task",
  },
  initialCheck: {
    type: [Boolean, Number],
    default: 0,
  },
  initialTime: {
    type: String,
    default: null,
  },
  taskId: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    required: true,
  },
});

// const emit = defineEmits(["task-click"]);

const newTask = ref(props.initialTask);
const isCheckChange = ref(props.initialCheck);
const newDate = ref(props.initialTime);

const taskBG = ref("");

const handleChange = async (event) => {
  const checkedValue = event.target.checked;

  const updateTaskData = {
    completed: checkedValue,
    datetime: newDate.value,
  };

  const response = await subtaskService.updateSubTask(
    props.taskId,
    updateTaskData
  );
  console.log(response);
};

const removeTask = async () => {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      await subtaskService.deleteSubTask(props.taskId);

      const taskStore = useTaskStore();
      taskStore.removeTask(props.taskId);

      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
};
</script>

<template>
  <div
    @click="showTest"
    :class="`flex flex-wrap items-center gap-4 mb-2 p-3 pt-1 pb-1 bg-${
      props.color
    }-${props.isSelected ? '700' : '500'} rounded-md`"
  >
    <input
      v-model="isCheckChange"
      type="checkbox"
      id="taskComplete"
      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      @change="handleChange"
      @click="showTest"
    />

    <span class="flex-1 inline-flex">{{ newTask }}</span>

    <ClockIcon class="w-6 h-6 text-gray-500 cursor-pointer" />

    <span class="flex-1 inline-flex">{{ newDate }}</span>

    <XCircleIcon
      class="w-6 h-6 text-gray-500 cursor-pointer hover:text-red-500"
      @click="removeTask"
    />
  </div>
</template>
