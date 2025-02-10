<template>
  <nav class="min-h-screen w-64 bg-blue-500 text-white p-6">
    <ul class="space-y-4">
      <li>
        <NuxtLink to="/" class="block py-2 px-4 hover:bg-blue-600 rounded-md">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/tasks"
          class="block py-2 px-4 hover:bg-blue-600 rounded-md"
        >
          Tasks
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/about"
          class="block py-2 px-4 hover:bg-blue-600 rounded-md"
        >
          About
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "VerticalNavbar",
};
</script>

<style scoped></style>
