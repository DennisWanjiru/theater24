<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'

import NavBar from '@/components/NavBar.vue'
import Ratings from '@/components/RatingsPanel.vue'
import type { MovieDetailType, Trailer } from '@/types'
import { getRuntime } from '@/utils/helpers'
import { useMovieStore } from '@/stores/movie'

const props = defineProps<{
  movie: MovieDetailType
}>()

const URL = 'https://image.tmdb.org/t/p/original/'

const store = useMovieStore()
const { fetchMovieTrailer } = store

const { movie } = toRefs(props)
const trailer = ref('')

onMounted(async () => {
  const video: Trailer | undefined = await fetchMovieTrailer(movie.value.id)
  trailer.value = video ? video.key : ''
})

watch(movie, async () => {
  const video: Trailer | undefined = await fetchMovieTrailer(movie.value.id)
  trailer.value = video ? video?.key : ''
})
</script>

<template>
  <header
    v-if="movie"
    class="px-36 backdrop"
    :style="{ '--poster': 'url(' + URL + movie.backdrop_path + ')' }"
  >
    <NavBar />
    <div class="flex justify-between w-full">
      <div class="flex flex-col justify-center mt-20 w-96">
        <h1 class="text-5xl font-bold">{{ movie.title }}</h1>
        <span class="italic text-sm mt-2 text-gray-400">{{ getRuntime(movie.runtime) }}</span>

        <div class="flex items-baseline mt-10">
          <Ratings :rating="Number(movie.vote_average.toFixed(1))" />
          <p class="ml-5 text-2xl font-bold">{{ Number(movie.vote_average).toFixed(1) }}</p>
        </div>

        <RouterLink v-if="trailer" :to="`/trailer/${trailer}`">
          <button
            class="flex items-center justify-center border-gray-400 rounded-full border w-36 p-3 mt-10"
          >
            <i class="pi pi-play mr-2" style="font-size: 1rem"></i>
            <p>Trailer</p>
          </button>
        </RouterLink>
      </div>

      <div class="flex text-gray-400 flex-col w-1/4 mt-24 flex-end">
        <div class="flex justify-end">
          <button class="border-gray-400 rounded-full border h-12 w-12 grid place-items-center">
            <i class="pi pi-angle-left" style="font-size: 1rem"></i>
          </button>
          <button
            class="ml-5 border-gray-400 rounded-full border h-12 w-12 grid place-items-center"
          >
            <i class="pi pi-angle-right" style="font-size: 1rem"></i>
          </button>
        </div>
        <p class="mt-10">
          {{ movie.overview }}
        </p>

        <button
          class="flex items-center justify-center bg-pink-500 text-white w-40 p-3 rounded-full mt-10 transition ease-out duration-700"
        >
          <i class="pi pi-shopping-cart mr-2" style="font-size: 1rem"></i>
          <p>Buy ticket</p>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.backdrop {
  height: 650px;
  background: radial-gradient(circle, rgba(106, 112, 125, 0) 29%, rgba(14, 23, 42, 1) 50%),
    var(--poster);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}
</style>
