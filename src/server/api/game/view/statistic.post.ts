import type { IDBGame } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const { type, game } = await readBody(event)

    const gameData = await DB.Game.findOne({ _id: game }) as IDBGame
    if(!gameData) throw 'Trò chơi không tồn tại'
    const db = MongoGame.CVV.db(game.db)
    const paymentCollection = db.collection('payments')
    const spendCollection = db.collection('spends')
    const userCollection = db.collection('users')
    const userLogLoginCollection = db.collection('user_login_logs')

    let start : any, end : any, format : any
    let payment : any, signin : any, signup : any, spend : any
    const now = DayJS(Date.now())
    const yesterday = now.add(-1, 'day')
    const lastmonth = now.add(-1, 'month')

    // Today, Yesterday
    if(type == 'today' || type == 'yesterday'){
      if(type == 'today'){
        start = now.startOf('date')
        end = now.endOf('date')
      }
      if(type == 'yesterday'){
        start = yesterday.startOf('date')
        end = yesterday.endOf('date')
      }

      format = '%Y-%m-%d'
    }

    // This Month, Last Month
    if(type == 'month' || type == 'lastmonth'){
      if(type == 'month'){
        start = now.startOf('month')
        end = now.endOf('month')
      }
      if(type == 'lastmonth'){
        start = lastmonth.startOf('month')
        end = lastmonth.endOf('month')
      }
      
      format = '%Y-%m'
    }

    // Not Total
    if(type != 'total'){
      const match : any = {}
      match['time'] = { $gte: new Date(start['$d']), $lte: new Date(end['$d']) }

      payment = await paymentCollection.aggregate([
        {
          $project: {
            createdAt: 1,
            timeformat: {
              $dateToString: { format: format, date: '$createdAt', timezone: 'Asia/Ho_Chi_Minh' }
            },
            money: {
              total: { $cond: [{$eq: ['$status', 1]} , '$money', 0] },
            }
          }
        },
        {
          $group: {
            _id: '$timeformat',
            time: { $min: '$createdAt' },
            money: { $sum: '$money.total' },
          }
        },
        { $match: match }
      ])

      spend = await spendCollection.aggregate([
        {
          $project: {
            time: 1,
            timeformat: {
              $dateToString: { format: format, date: '$time', timezone: 'Asia/Ho_Chi_Minh' }
            },
            money: 1
          }
        },
        {
          $group: {
            _id: '$timeformat',
            time: { $min: '$time' },
            money: { $sum: '$money' },
          }
        },
        { $match: match }
      ])
  
      signin = await userLogLoginCollection.aggregate([
        {
          $project: {
            user: 1,
            createdAt: 1,
            timeformat: {
              $dateToString: { format: format, date: '$createdAt', timezone: 'Asia/Ho_Chi_Minh' }
            }
          }
        },
        {
          $group: {
            _id: {
              timeformat: '$timeformat',
              user: '$user'
            },
            time: { $min: '$createdAt' },
          }
        },
        { $match: match },
        {
          $group: {
            _id: '$_id.timeformat',
            time: { $min: '$time' },
            count: { $count: {} },
          }
        }
      ])
  
      signup = await userCollection.aggregate([
        {
          $project: {
            createdAt: 1,
            timeformat: {
              $dateToString: { format: format, date: '$createdAt', timezone: 'Asia/Ho_Chi_Minh' }
            }
          }
        },
        {
          $group: {
            _id: '$timeformat',
            time: { $min: '$createdAt' },
            count: { $count: {} },
          }
        },
        { $match: match }
      ])
    }

    // Is Total
    if(type == 'total') {
      payment = await paymentCollection.aggregate([
        { $match: { 'status': 1 }},
        {
          $group: {
            _id: null,
            money: { $sum: '$money' },
          }
        }
      ])

      spend = await spendCollection.aggregate([
        {
          $group: {
            _id: null,
            money: { $sum: '$money' },
          }
        }
      ])

      const users = await userCollection.count()
      signin = [{ count: users }]
      signup = [{ count: users }]
    }

    return resp(event, { code: 200, result: {payment, spend, signin, signup} })

    // Result
    return resp(event, {
      result: {
        payment: payment[0] ? payment[0]['money'] : 0,
        spend: spend[0] ? spend[0]['money'] : 0,
        signin: signin[0] ? signin[0]['count'] : 0,
        signup: signup[0] ? signup[0]['count'] : 0,
      }
    })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})