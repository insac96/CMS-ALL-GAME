import { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { _id } = body
    if(!_id) throw 'Không tìm thấy ID trò chơi'
    
    const game = await DB.Game.findOne({ _id: _id }) as IDBGame
    if(!game) throw 'Trò chơi không tồn tại'

    const db = MongoGame.CVV.db(game.db)
    const config = await db.collection('configs').find()
    console.log(config)
    return resp(event, { result: { game, config } })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})