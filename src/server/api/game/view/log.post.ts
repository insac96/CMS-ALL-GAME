import type { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search, game } = await readBody(event)
    if(!size || !current || !search) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'
    if(!game) throw 'Không tìm thấy ID trò chơi'

    const gameData = await DB.Game.findOne({ _id: game }) as IDBGame
    if(!gameData) throw 'Trò chơi không tồn tại'

    // @ts-expect-error
    const db = MongoGame[gameData.type].db(gameData.db)
    const userCollection = db.collection('users')
    const logCollection = db.collection('admin_logs')

    const sorting : any = { }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    const match : any = {  }
    if(!!search.key){
      if(search.by == 'USER'){
        const users = await userCollection.aggregate([
          { $match: { username : { $regex : search.key.toLowerCase(), $options : 'i' }}},
          { $project: { _id: 1 }}
        ]).toArray()
        
        match['user'] = {
          $in: users.map((i : any) => i._id)
        }
      }
      if(search.by == 'LOG'){
        match['action'] = { $regex : search.key.toLowerCase(), $options : 'i' }
      }
    }

    const logs = await logCollection.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          pipeline: [{
            $project: { username: 1 }
          }],
          as: "user"
        }
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true }},
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
      list: logs[0].list ? logs[0].list : [],
      total: logs[0].pagination ? (logs[0].pagination[0] ? logs[0].pagination[0].total : 0) : 0
    }})
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})