<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const monthNames = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const dayNames = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const repeatCount = ref(6);

const totalDays = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const calendarDays = computed(() => {
  console.log("total days -> ", totalDays.value);

  let days = [];
  let week = [];

  for (let day = 1; day <= totalDays.value; day++) {
    week.push({ date: day });
  }

  console.log("number of days --> ", week.length);

  if (week.length) {
    while (week.length < 7) {
      week.push({ date: "" });
    }
    days.push(week);
  }

  return days;
});

const repeatedDays = computed(() => {
  let dayN = Array.from(
    { length: repeatCount.value * dayNames.value.length },
    (_, i) => dayNames.value[i % dayNames.value.length]
  );

  dayN.splice(0, 6);

  dayN.splice(-(dayN.length - totalDays.value - 1));
  console.log("dayN --> ", dayN);

  return dayN;
});

// Methods
const changeMonth = (step) => {
  currentMonth.value += step;

  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
};
</script>

<template>
  <div class="flex-grow h-full mx-auto bg-white flex flex-col overflow-hidden">
    <div class="flex items-center justify-between w-full mb-4 overflow-hidden">
      <button @click="changeMonth(-1)" class="p-2">
        <ChevronLeftIcon
          class="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
        />
      </button>

      <h2 class="text-2xl font-bold text-center">
        {{ monthNames[currentMonth] }} {{ currentYear }}
      </h2>

      <button @click="changeMonth(1)" class="p-2">
        <ChevronRightIcon
          class="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
        />
      </button>
    </div>

    <div class="flex overflow-hidden">
      <div class="w-full min-h-screen overflow-hidden">
        <div class="overflow-auto xl:max-h-[900px]">
          <table class="w-full table-fixed text-center">
            <thead class="sticky top-0 bg-white z-20">
              <tr>
                <th
                  v-for="(day, index) in repeatedDays"
                  :key="index"
                  class="border p-2 w-[100px]"
                >
                  <div class="flex flex-col items-center">
                    <span class="text-sm text-gray-500">{{
                      index === 0 ? null : index
                    }}</span>
                    <span>{{
                      day === 0 ? null : repeatedDays[index - 1]
                    }}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="indexHour in 26" :key="indexHour">
                <td
                  v-for="(day, index) in repeatedDays"
                  :key="day.date"
                  :class="[
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200',
                    index === 0 ? 'sticky left-0 bg-white z-10' : '',
                  ]"
                  class="border-t-2 border-b-2 border-dashed border-gray-300 p-2 align-top text-left text-center"
                >
                  {{ index === 0 ? indexHour - 1 + ":00" : "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
