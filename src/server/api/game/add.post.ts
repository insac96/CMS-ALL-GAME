import { IDBGame } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { type, name, db, port, url } = body
    if(!type || !name || !db || !port || !url) throw 'Vui lòng nhập đầy đủ thông tin'

    const game = await DB.Game.findOne({ url: url }) as IDBGame
    if(!!game) throw 'Trò chơi đã tồn tại'

    await DB.Game.create(body)

    return resp(event, { message: 'Thêm thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})