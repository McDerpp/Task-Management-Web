<script setup>
import FlatPickr from "vue-flatpickr-component";
import { ClockIcon } from "@heroicons/vue/24/solid";
import { onMounted } from "vue";

const props = defineProps({
  isDaysSelected: {
    type: Array,
    default: () => [false, false, false, false, false, false, false],
  },
  color: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  initialTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const name = ref(props.name);
const date = ref(props.initialTime);
const description = ref(props.description);
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const isDaysSelected = ref([true, true, false, false, false, false, false]);
const isRepeated = ref(false);

watch(
  () => props.initialTime,
  (newValue) => {
    date.value = newValue;
  }
);

watch(
  () => props.name,
  (newValue) => {
    date.value = newValue;
  }
);

onMounted(async () => {
  console.log("task-----> ", name);
});

const emit = defineEmits(["updateSubTask"]);

const updateSubTask = () => {
  emit("updateSubTask", name, date, completed);
};

const updateDays = (index) => {
  isDaysSelected.value[index] = !isDaysSelected.value[index];
};

const updateTask = async () => {};

const updateRepeat = () => {
  isRepeated.value = !isRepeated.value;
};
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="m-3 flex items-center">
      <input
        v-model="name"
        type="text"
        class="bg-transparent border-b border-white focus:outline-none w-full text-white"
      />
      <ClockIcon class="w-6 h-6 text-gray-500 cursor-pointer ml-8" />

      <flat-pickr
        v-model="date"
        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i:S' }"
        placeholder="Select Date & Time"
        class="bg-transparent border-gray-300 text-center border-b"
        @click="showTest"
      />
    </div>
    <div class="flex flex-row flex-wrap h-min gap-1">
      <span
        v-for="(day, index) in days"
        :key="index"
        @click="updateDays(index)"
        :class="[
          'cursor-default inline-flex items-center justify-center px-3 rounded-md text-white border border-white hover:bg-white hover:text-black',
          isDaysSelected[index]
            ? `bg-${props.color}-500 hover:bg-red hover:text-black`
            : '',
        ]"
      >
        {{ day }}
      </span>

      <span
        @click="updateRepeat"
        :class="[
          'cursor-default ml-5 inline-flex items-center justify-center px-3 rounded-md text-white border border-white hover:bg-white hover:text-black',
          isRepeated
            ? `bg-${props.color}-500 hover:bg-red hover:text-black`
            : '',
        ]"
        >Repeat</span
      >
    </div>
    <div class="m-3 flex-1 flex">
      <textarea
        v-model="description"
        placeholder="Write the task description here"
        maxlength="10000"
        name="Test"
        class="w-full h-full flex-1 resize-none rounded-lg p-5 bg-transparent border-transparent focus:border-transparent focus:outline-none text-white"
      ></textarea>
    </div>
  </div>
</template>

<style></style>
