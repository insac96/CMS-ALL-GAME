export default defineNuxtRouteMiddleware(async () => {
  const { setAuth } = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const token = useCookie('token-auth', runtimeConfig.public.cookieConfig)
  
  try{
    const data = await useAPI('auth/get')
    setAuth(data)
  }
  catch(e){
    token.value = null
    return navigateTo('/login')
  }
})