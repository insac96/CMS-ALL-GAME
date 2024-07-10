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
    const paymentCollection = db.collection('payments')

    const sorting : any = { }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    const match : any = {}
    if(search.key){
      if(search.by == 'CODE'){
        match['code'] = { $regex : search.key.toLowerCase(), $options : 'i' }
      }
      if(search.by == 'USER'){
        const users = await userCollection.find({
          username : { $regex : search.key.toLowerCase(), $options : 'i' }
        }).select('_id')
        
        match['user'] = {
          $in: users.map((i : any) => i._id)
        }
      }
    }

    const list = await paymentCollection
    .aggregate([
      { $match: match },
      {
        $lookup: {
          from: "gates",
          localField: "gate",
          foreignField: "_id",
          pipeline: [{
            $project: { name: 1, color: 1, type: 1 }
          }],
          as: "gate"
        }
      },
      { $unwind: { path: "$gate", preserveNullAndEmptyArrays: true }},
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
        $lookup: {
          from: "users",
          localField: "verify.person",
          foreignField: "_id",
          pipeline: [{
            $project: { username: 1 }
          }],
          as: "verify_person"
        }
      },
      { $unwind: { path: "$verify_person", preserveNullAndEmptyArrays: true }},
      { $addFields: { "verify_time": "$verify.time" } },
      { $project: { card: 0, qrcode: 0, token: 0, verify: 0, updatedAt: 0 } },
      { $sort: sorting },
      { $skip: (current - 1) * size },
      { $limit: size }
    ])

    const total = await paymentCollection.count(match)
    return resp(event, { result: { list, total } })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})