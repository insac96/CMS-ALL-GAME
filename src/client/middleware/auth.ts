export default defineNuxtRouteMiddleware(async () => {
  const { setAuth } = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const token = useCookie('token-auth', runtimeConfig.public.cookieConfig)
  if(!token.value) return

  try{
    await useAPI('auth/get')
    setAuth()
  }
  catch(e){
    token.value = null
    navigateTo('/login')
  }
})