import { defineStore } from 'pinia'
import type { IAuth } from '~~/types'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const profile : any = ref(null)

  function setAuth (data : IAuth) {
    isLogin.value = true
    profile.value = data
  }

  function removeAuth () {
    isLogin.value = false
    profile.value = null
  }

  return { isLogin, profile, setAuth, removeAuth }
})