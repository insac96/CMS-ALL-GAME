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
        const users = await userCollection.find({
          username : { $regex : search.key.toLowerCase(), $options : 'i' }
        }).select('_id')
        
        match['user'] = {
          $in: users.map((i : any) => i._id)
        }
      }
      if(search.by == 'LOG'){
        match['action'] = { $regex : search.key.toLowerCase(), $options : 'i' }
      }
    }

    const list = await logCollection
    .find(match)
    .select('user action createdAt')
    .populate({ path: 'user', select: 'username' })
    .sort(sorting)
    .limit(size)
    .skip((current - 1) * size)

    const total = await logCollection.count(match)
    return resp(event, { result: { list, total } })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})