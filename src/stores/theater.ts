import { defineStore } from 'pinia'
import type { TheaterType } from '@/types'

export const useTheaterStore = defineStore('theater', () => {
  async function fetchTheaterById(id: string) {
    try {
      const res = await fetch(`http://localhost:3500/theaters/${id}`)
      const theater = await res.json()
      return theater
    } catch (error) {
      console.log({ error })
    }
  }

  async function fetchTheaterByEmail(email: string) {
    const res = await fetch(`http://localhost:3500/theaters?email=${email}`)
    const theater = await res.json()
    return theater[0]
  }

  async function createTheater(data: TheaterType) {
    const res = await fetch(`http://localhost:3500/theaters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const theater = await res.json()
    return theater
  }

  return {
    createTheater,
    fetchTheaterByEmail,
    fetchTheaterById
  }
})
