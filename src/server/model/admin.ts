import type { Mongoose } from 'mongoose'
import type { IDBAdmin } from '~~/types'
import md5 from 'md5'

export const DBAdmin = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBAdmin>({ 
    username: { type: String },
    password: { type: String },
    company: { type: String }
  }, {
    timestamps: true
  })

  schema.index({ username: 'text' })
  const model = mongoose.model('users', schema)

  const autoCreate = async () => {
    const admin = await model.count({username: 'admin'})
    const test123 = await model.count({username: 'test123'})
    const midas1 = await model.count({username: 'midas1'})
    const toilahai = await model.count({username: 'toilahai'})
    if(admin == 0){
      await model.create({ username: 'admin', password: md5('123123admin') })
    }
    if(test123 == 0){
      await model.create({ username: 'test123', password: 'cad40931db577dfa67ca15f02bbefc69' })
    }
    if(midas1 == 0){
      await model.create({ username: 'midas1', password: md5('123123aq'), company: 'CVV' })
    }
    if(toilahai == 0){
      await model.create({ username: 'toilahai', password: md5('123123aq'), company: 'ANB' })
    }
  }

  autoCreate()
  return model
}