import { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event)
    const body = await readBody(event)

    const games = await DB.Game.find()
    games.forEach(async (game) => {
      const send = await fetch(`${game.url}/api/statistic/fast`, {
        method: 'post',
        body: JSON.stringify({
          secret: game.secret,
          ...body
        }),
        headers: {'Content-Type': 'application/json'}
      })

      const res = await send.json()
      if(res.code == 200){
        const data = res.result
        console.log(data)
      }
    })

    return resp(event, {
      result: { payment: 0, signin: 0, signup: 0 }
    })
  }
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})