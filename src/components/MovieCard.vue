<script setup lang="ts">
import type { MovieType } from '@/types'

defineProps<{
  movie: MovieType
}>()
</script>

<template>
  <div class="flex flex-col w-648 mb-5 bg-indigo-950">
    <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" :alt="movie.title" />
    <div class="flex justify-between py-4 items-baseline px-4">
      <div class="flex flex-col">
        <h1>{{ movie.title }}</h1>
        <span class="italic text-xs">1h 47m</span>
      </div>
      <div class="flex items-baseline ml-10">
        <i class="pi pi-star-fill mr-2" style="font-size: 0.8rem"></i>
        <p class="italic text-xs">{{ Number(movie.vote_average).toFixed(1) }}</p>
      </div>
    </div>
  </div>
</template>
