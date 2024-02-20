import { IDBGame } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { _id } = body
    if(!_id) throw 'Không tìm thấy ID trò chơi'

    const game = await DB.Game.findOne({ _id: _id }) as IDBGame
    if(!game) throw 'Trò chơi không tồn tại'

    await DB.Game.deleteOne({ _id: game._id })
    return resp(event, { message: 'Xóa thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})