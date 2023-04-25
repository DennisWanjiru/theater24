<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { getLoggedinUser, logout } = authStore
const currentUser = getLoggedinUser()
console.log({ currentUser })
</script>

<template>
  <header class="bg-transparent text-white">
    <nav class="flex justify-between w-full py-6">
      <RouterLink to="/">theater24</RouterLink>

      <ul class="flex">
        <div class="flex items-center" v-if="!currentUser">
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>

          <div class="px-5">|</div>

          <li>
            <RouterLink to="/signup">Signup</RouterLink>
          </li>
        </div>

        <div class="flex items-center" v-if="currentUser">
          <li>
            {{ currentUser.displayName || currentUser.email }}
          </li>

          <div class="px-5">|</div>

          <button @click="logout" class="bg-transpatent">
            <li>Logout</li>
          </button>
        </div>
      </ul>
    </nav>
  </header>
</template>
