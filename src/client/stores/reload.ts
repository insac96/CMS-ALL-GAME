import { defineStore } from 'pinia'

export const useReloadStore = defineStore('reload', () => {
  const state = ref(0)

  function change () {
    state.value++
  }

  return { state, change }
})