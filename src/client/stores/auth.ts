import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)

  function setAuth () {
    isLogin.value = true
  }

  function removeAuth () {
    isLogin.value = false
  }

  return { isLogin, setAuth, removeAuth }
})