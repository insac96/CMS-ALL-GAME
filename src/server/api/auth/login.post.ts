import md5 from 'md5'
import { IDBAdmin } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const { username, password } = await readBody(event)
    if(!username || !password) throw 'Vui lòng nhập đầy đủ thông tin'

    // Get User
    const admin = await DB.Admin
    .findOne({ username: username.toLowerCase() })
    .select('username password') as IDBAdmin

    // Check User
    if(!admin) throw 'Tài khoản không tồn tại'
    if(md5(password) != admin.password) throw 'Mật khẩu không chính xác'

    // Cookie
    setCookie(event, 'token-auth', md5(password), runtimeConfig.public.cookieConfig)

    return resp(event, { message: 'Đăng nhập thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})