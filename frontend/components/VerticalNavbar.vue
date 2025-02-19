<template>
  <nav class="min-h-screen w-55 bg-blue-500 text-white p-6">
    <ul class="space-y-4">
      <li>
        <NuxtLink
          to="/ToDoList"
          class="block w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md"
        >
          Create Task
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          to="/ToDoPage"
          class="block w-full py-2 px-4 hover:bg-blue-600 rounded-md"
        >
          To Do List
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/"
          class="block w-full py-2 px-4 hover:bg-blue-600 rounded-md"
        >
          Calendar
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink
          to="/about"
          class="block w-full py-2 px-4 hover:bg-blue-600 rounded-md"
        >
          Upcoming Tasks
        </NuxtLink>
      </li> -->
    </ul>
  </nav>
</template>
