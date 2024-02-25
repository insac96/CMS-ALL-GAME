import { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event)
    const body = await readBody(event)
    const { type, company } = body

    const match : any = {}
    if(!['ALL', 'ANB', 'CVV', 'ZUZU'].includes(company)) throw 'Loại công ty không hỗ trợ'
    if(company != 'ALL') match['type'] = company

    const games = await DB.Game.find(match)
    const result = {
      payment: 0, signin: 0, signup: 0
    }

    for (let i = 0; i < games.length; i++) {
      const gameData = games[i];
      const send = await fetch(`${gameData.url}/api/statistic/fast`, {
        method: 'post',
        body: JSON.stringify({
          secret: gameData.secret,
          ...body
        }),
        headers: {'Content-Type': 'application/json'}
      })
      const res = await send.json()
      if(res.code == 200){
        const data = res.result
        result.payment = result.payment + data.payment
        result.signin = result.signin + data.signin
        result.signup = result.signup + data.signup
      }
    }
    return resp(event, { result: result }) 
  }
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})