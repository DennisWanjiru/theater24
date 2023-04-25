<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{ videoId: string }>()
const { videoId } = toRefs(props)
</script>
<template>
  <iframe
    class="w-full h-[700px] mt-5"
    allow="fullscreen; autoplay; loop; encrypted-media;"
    mozallowfullscreen="mozallowfullscreen"
    msallowfullscreen="msallowfullscreen"
    oallowfullscreen="oallowfullscreen"
    webkitallowfullscreen="webkitallowfullscreen"
    :src="`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1`"
  ></iframe>
</template>
