export default defineNuxtRouteMiddleware(async () => {
  const { setAuth } = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const token = useCookie('token-auth', runtimeConfig.public.cookieConfig)
  
  try{
    if(!token.value) throw 'Không tìm thấy mã quản trị viên'
    await useAPI('auth/get')
    setAuth()
  }
  catch(e){
    console.log(e)
    token.value = null
    return navigateTo('/login')
  }
})