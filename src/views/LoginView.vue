<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { login } = authStore

const formData = reactive({
  email: '',
  password: ''
})

async function submit() {
  try {
    const { email, password } = formData
    await login(email, password)
  } catch (error) {
    console.log({ error })
  }
}
</script>

<template>
  <div class="h-screen w-80 flex flex-col justify-center m-auto">
    <RouterLink to="/">
      <h1 class="text-4xl">Theater24</h1>
    </RouterLink>

    <form @submit.prevent="submit" class="flex flex-col mt-5">
      <input
        class="mt-5 p-3 bg-transparent border rounded text-gray-200 placeholder:text-gray-600"
        type="email"
        name="email"
        v-model="formData.email"
        placeholder="Email"
      />
      <input
        class="mt-5 p-3 bg-transparent border rounded text-gray-200 placeholder:text-gray-600"
        type="password"
        name="password"
        v-model="formData.password"
        placeholder="Password"
      />
      <button type="submit" class="mt-5 bg-pink-500 p-3 rounded-md hover:bg-pink-600">
        Signup
      </button>
    </form>
  </div>
</template>
