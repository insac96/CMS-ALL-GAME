import { IDBGame } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { _id, type, name, db, port, url } = body
    if(!_id || !type || !name || !db || !port || !url) throw 'Vui lòng nhập đầy đủ thông tin'

    const game = await DB.Game.findOne({ _id: _id }) as IDBGame
    if(!game) throw 'Trò chơi không tồn tại'

    if(url != game.url){
      const dup = await DB.Game.findOne({ url: url }) as IDBGame
      if(!!dup) throw 'Đường dẫn trò chơi đã tồn tại'
    }

    await DB.Game.updateOne({ _id: game._id }, body)

    return resp(event, { message: 'Sửa thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})