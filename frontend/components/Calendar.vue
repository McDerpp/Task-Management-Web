<template>
  <div class="p-8 h-screen flex flex-col">
    <div
      class="flex-grow max-w-full mx-auto bg-white p-4 rounded-lg shadow-lg flex flex-col"
    >
      <div class="flex items-center justify-between w-full mb-4">
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

      <div class="flex-grow">
        <table class="w-full h-full table-fixed text-center">
          <thead>
            <tr>
              <th class="border p-2">Sun</th>
              <th class="border p-2">Mon</th>
              <th class="border p-2">Tue</th>
              <th class="border p-2">Wed</th>
              <th class="border p-2">Thu</th>
              <th class="border p-2">Fri</th>
              <th class="border p-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in calendarDays" :key="week">
              <td
                v-for="day in week"
                :key="day.date"
                class="border p-2 align-top text-left"
              >
                {{ day.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      monthNames: [
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
      ],
    };
  },
  computed: {
    calendarDays() {
      const firstDay = new Date(
        this.currentYear,
        this.currentMonth,
        1
      ).getDay();
      const totalDays = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      ).getDate();

      let days = [];
      let week = Array(firstDay).fill({ date: "" });

      for (let day = 1; day <= totalDays; day++) {
        week.push({ date: day });

        if (week.length === 7) {
          days.push(week);
          week = [];
        }
      }

      if (week.length) {
        while (week.length < 7) {
          week.push({ date: "" });
        }
        days.push(week);
      }

      return days;
    },
  },
  methods: {
    changeMonth(step) {
      this.currentMonth += step;

      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
    },
  },
};
</script>
