<template>
  <div class="overflow-hidden flex">
    <!-- Sidebar -->
    <VerticalNavbar />

    <main class="flex-1 bg-gray-50 min-h-screen relative">
      <NuxtPage />
    </main>
  </div>
</template>

<script>
import VerticalNavbar from "@/components/VerticalNavbar.vue";
import AddTask from "../components/AddTask.vue";

export default {
  components: {
    VerticalNavbar,
    AddTask,
  },
};
</script>
