import type { IDBAdmin } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'token-auth')
    if(!token) throw 'Vui lòng đăng nhập trước'

    const admin = await DB.Admin.findOne({ password: token }).select('_id') as IDBAdmin
    if(!admin) throw 'Xác thực tài khoản không thành công'

    return resp(event, { result: true })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})