<script setup lang="ts">
import { onMounted, ref } from 'vue'

import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'

const seats = ref('')
const authStore = useAuthStore()
const { getLoggedinUser, logout } = authStore
const currentUser = getLoggedinUser()

onMounted(() => {
  if (!currentUser) {
    logout()
  }
})
</script>

<template>
  <div class="px-36 h-screen w-screen">
    <NavBar />
    <div class="flex justify-center mt-52">
      <div class="flex flex-col">theater sitting design</div>
    </div>

    <div class="flex justify-end mt-20">
      <button v-if="!seats" class="underline text-gray-500">Skip</button>
      <button v-if="seats" class="underline ml-5">Next</button>
    </div>
  </div>
</template>
