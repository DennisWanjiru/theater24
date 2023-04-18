<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'

const props = defineProps<{
  rating: number
}>()

const { rating } = toRefs(props)
const fullStars = ref(0)
const emptyStars = ref(0)

onMounted(() => {
  const stars = Array(Math.floor(rating.value / 2)).length
  fullStars.value = stars
  emptyStars.value = 5 - stars
})

watch(rating, () => {
  const stars = Array(Math.floor(rating.value / 2)).length
  fullStars.value = stars
  emptyStars.value = 5 - stars
})
</script>

<template>
  <div>
    <i
      :key="index"
      style="font-size: 1rem"
      v-for="index in fullStars"
      class="pi pi-star-fill mr-2"
    ></i>
    <i v-for="index in emptyStars" :key="index" class="pi pi-star mr-2" style="font-size: 1rem"></i>
  </div>
</template>
