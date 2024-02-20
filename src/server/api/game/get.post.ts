import { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { _id } = body
    if(!_id) throw 'Không tìm thấy ID trò chơi'
    
    const game = await DB.Game.findOne({ _id: _id }) as IDBGame
    if(!game) throw 'Trò chơi không tồn tại'

    return resp(event, { result: game })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})