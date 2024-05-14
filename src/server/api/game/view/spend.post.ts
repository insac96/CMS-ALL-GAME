import type { IDBGame } from '~~/types'

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, range, game } = await readBody(event)
    if(!size || !current || !sort) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'
    if(!game) throw 'Không tìm thấy ID trò chơi'

    const gameData = await DB.Game.findOne({ _id: game }) as IDBGame
    if(!gameData) throw 'Trò chơi không tồn tại'

    // @ts-expect-error
    const db = MongoGame[gameData.type].db(gameData.db)
    const spendCollection = db.collection('spends')
    
    const sorting : any = {}
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    const match : any = {}
    if(!!range && !!range['start'] && !!range['end']){
      const start : any = DayJS(range['start']).startOf('date')
      const end : any = DayJS(range['end']).endOf('date')
      match['time'] = { $gte: new Date(start['$d']), $lte: new Date(end['$d']) }
    }

    const spend = await spendCollection.aggregate([
      {
        $project: {
          time: 1,
          timeformat: {
            $dateToString: { format: '%Y-%m-%d', date: '$time', timezone: 'Asia/Ho_Chi_Minh' }
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
      { $match: match },
      {
        $facet: {
          list: [
            { $sort: sorting },
            { $skip: (current - 1) * size },
            { $limit: size },
          ],
          pagination: [
            { $count: "total" }
          ]
        }
      }
    ]).toArray()

    return resp(event, { result: { 
      list: spend[0].list ? spend[0].list : [],
      total: spend[0].pagination ? (spend[0].pagination[0] ? spend[0].pagination[0].total : 0) : 0
    }})
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})