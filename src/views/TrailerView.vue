<script setup lang="ts">
import { useRoute } from 'vue-router'
import VideoPlayer from '@/components/VideoPlayer.vue'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const { id } = route.params
const videoId = typeof id === 'string' ? id : id[0]
</script>

<template>
  <div class="px-36">
    <NavBar />
    <VideoPlayer :videoId="videoId" />
  </div>
</template>
