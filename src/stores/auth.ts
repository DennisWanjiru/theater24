import type { UpdateUserType } from '@/types'
import { getLocalStorage, removeLocalStorage } from '@/utils/helpers'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const auth = useFirebaseAuth()

  async function login(email: string, password: string) {
    try {
      if (auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        setLoggedinUser()

        if (user?.emailVerified) {
          router.push('/')
        } else {
          router.push('/onboarding')
        }
      }
    } catch (error) {
      console.log({ error })
      throw new Error('unable to login')
    }
  }

  async function signup(email: string, password: string) {
    try {
      if (auth) {
        return await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      console.log({ error })
      throw new Error('unable to login')
    }
  }

  async function updateUser(user: UpdateUserType) {
    try {
      const currentUser = auth?.currentUser

      if (auth && currentUser) {
        await updateProfile(currentUser, { ...user })
        return setLoggedinUser()
      }
    } catch (error) {
      console.log({ error })
      throw new Error('unable to login')
    }
  }

  async function logout() {
    try {
      if (auth) {
        await signOut(auth)
        removeLocalStorage('user')
        router.push('/login')
      }
    } catch (error) {
      console.log({ error })
      throw new Error('unable to login')
    }
  }

  function getLoggedinUser() {
    const userString = getLocalStorage('user')
    console.log({ userString })
    const userJSON = userString ? JSON.parse(userString) : undefined
    return userJSON ? (userJSON.user as User) : undefined
  }

  function getCurrentUser() {
    return auth?.currentUser ?? undefined
  }

  async function setLoggedinUser() {
    try {
      const user = auth?.currentUser

      if (user) {
        const userString = JSON.stringify({ user })
        localStorage.setItem('user', userString)
        return user
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return {
    logout,
    login,
    signup,
    updateUser,
    setLoggedinUser,
    getCurrentUser,
    getLoggedinUser
  }
})
