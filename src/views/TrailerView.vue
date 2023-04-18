<script setup lang="ts">
import { useRoute } from 'vue-router'
import VideoPlayer from '@/components/VideoPlayer.vue'

const route = useRoute()
const { id } = route.params
const videoId = typeof id === 'string' ? id : id[0]
</script>

<template>
  <VideoPlayer :videoId="videoId" />
</template>
