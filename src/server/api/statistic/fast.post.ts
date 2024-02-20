import { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { game : _id } = body
    if(!_id) throw 'Dữ liệu đầu vào không đủ'

    const game = await DB.Game.findOne({ _id: _id }) as IDBGame
    if(!game) throw 'Trò chơi không tồn tại'

    delete body['game']
    const send = await fetch(`${game.url}/api/statistic/fast`, {
      method: 'post',
      body: JSON.stringify({
        secret: game.secret,
        ...body
      }),
      headers: {'Content-Type': 'application/json'}
    })

    const res = await send.json()
    if(res.code != 200) throw res.message || 'Không thể lấy dữ liệu'
    return resp(event, { result: res.result })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})