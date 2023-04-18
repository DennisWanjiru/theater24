import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { MovieType, MovieDetailType, Trailer } from '@/types'

export const APIKEY = '62b60cae9c5e7575520e6123bb753db3'
export const BASEURL = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movie', () => {
  const movies = ref<MovieType[]>([])

  async function fetchMovies() {
    try {
      const res = await fetch(`${BASEURL}/movie/now_playing?api_key=${APIKEY}`)
      const data = await res.json()
      const fetchedMovies: MovieType[] = data.results

      movies.value = fetchedMovies
    } catch (error) {
      console.log({ error })
    }
  }

  async function fetchMovieDetails(id: number) {
    try {
      const res = await fetch(`${BASEURL}/movie/${id}?api_key=${APIKEY}`)
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchMovieTrailer(movieId: number) {
    try {
      const res = await fetch(`${BASEURL}/movie/${movieId}/videos?api_key=${APIKEY}`)
      const data = await res.json()
      const videos: Trailer[] = data.results
      return videos.find((video) => video.type === 'Trailer')
    } catch (error) {
      console.log({ error })
    }
  }

  return {
    movies,
    fetchMovies,
    fetchMovieDetails,
    fetchMovieTrailer
  }
})
