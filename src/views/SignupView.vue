<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useTheaterStore } from '@/stores/theater'
import UploadWidget from '@/components/UploadWidget.vue'

const router = useRouter()
const authStore = useAuthStore()
const theaterStore = useTheaterStore()

const { fetchTheaterByEmail, createTheater } = theaterStore
const { signup, updateUser, getCurrentUser } = authStore

const formData = reactive({
  name: '',
  email: '',
  photoURL: '',
  password: ''
})

async function submit() {
  try {
    const { email, password, name, photoURL } = formData
    const theater = await fetchTheaterByEmail(formData.email)

    // TODO: email is already
    if (theater) return

    await signup(email, password)
    await updateUser({ displayName: name, photoURL })
    const updatedUser = getCurrentUser()

    if (updatedUser) {
      const { uid, displayName, email } = updatedUser

      await createTheater({
        id: uid,
        photoURL,
        name: displayName ?? '',
        email: email ?? ''
      })

      router.push('/onboarding')
    }
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
        autofocus
        class="mt-5 p-3 bg-transparent border rounded text-gray-200 placeholder:text-gray-600"
        type="text"
        name="name"
        v-model="formData.name"
        placeholder="Theater name"
      />

      <div class="flex flex-col">
        <UploadWidget @changeUrl="(url: string) => formData.photoURL = url" />
      </div>

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
