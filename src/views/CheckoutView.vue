<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const { id } = route.params
const movieId = typeof id === 'string' ? id : id[0]
</script>

<template>
  <div class="px-36">
    <NavBar />
    {{ movieId }}
  </div>
</template>
