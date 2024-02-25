import type { H3Event } from 'h3'
import type { IResp, IAuth, IDBAdmin } from '~~/types'

export default async (event: H3Event, throwError : boolean = true) : Promise<IAuth | IResp | null> => {
  const runtimeConfig = useRuntimeConfig()

  try {
    const token = getCookie(event, 'token-auth')
    if(!token) throw 'Vui lòng đăng nhập trước'

    const admin = await DB.Admin.findOne({ password: token }) as IDBAdmin
    if(!admin) throw 'Xác thực tài khoản không thành công'

    const result = { 
      username: admin.username,
      company: admin.company
    }
    event.context.auth = result
    return result
  }
  catch (e:any) {
    if(!!throwError) {
      deleteCookie(event, 'token-auth', runtimeConfig.public.cookieConfig)
      event.node.res.end(JSON.stringify({code: 401, message: e.toString()}))
    }
    return null
  }
}