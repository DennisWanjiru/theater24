<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import HeaderSection from '@/components/HeaderSection.vue'
import { useMovieStore } from '@/stores/movie'
import MovieCard from '@/components/MovieCard.vue'
import Loader from '@/components/AppLoader.vue'
import type { MovieDetailType } from '@/types'

const loading = ref(true)

const currentMovieIndex = ref<number>(0)
const currentMovie = ref<MovieDetailType>()
const nextMovie = ref<MovieDetailType>()

const store = useMovieStore()
const { movies } = storeToRefs(store)
const { fetchMovieDetails } = store

onMounted(async () => {
  await store.fetchMovies()
  currentMovie.value = await fetchMovieDetails(movies.value[0].id)
  nextMovie.value = await fetchMovieDetails(movies.value[1].id)
  loading.value = false
})

watch(movies, async () => {
  setTimeout(() => {
    currentMovieIndex.value = 1
  }, 20000)
})

watch(currentMovieIndex, async () => {
  if (movies.value.length) {
    currentMovie.value = nextMovie.value
    let movieId: number

    if (currentMovieIndex.value === movies.value.length - 1) {
      movieId = movies.value[0].id
    } else {
      movieId = movies.value[currentMovieIndex.value + 1].id
    }

    nextMovie.value = await fetchMovieDetails(movieId)

    setTimeout(() => {
      if (currentMovieIndex.value < movies.value.length - 1) {
        currentMovieIndex.value += 1
      } else {
        currentMovieIndex.value = 0
      }
    }, 20000)
  }
})
</script>

<template>
  <div v-show="loading" class="grid h-screen w-screen place-items-center">
    <Loader />
  </div>

  <HeaderSection
    class="transition ease-in-out duration-1000"
    v-if="!loading && currentMovie"
    :movie="currentMovie"
  />

  <section v-if="!loading" class="px-36 flex mt-10 flex-col main-grad">
    <h2 class="text-3xl">in Theaters</h2>
    <div class="mt-5 grid grid-cols-4 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>
