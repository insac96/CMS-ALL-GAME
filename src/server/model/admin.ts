import type { Mongoose } from 'mongoose'
import type { IDBAdmin } from '~~/types'
import md5 from 'md5'

export const DBAdmin = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBAdmin>({ 
    username: { type: String },
    password: { type: String }
  }, {
    timestamps: true
  })

  schema.index({ username: 'text' })
  const model = mongoose.model('users', schema)

  const autoCreate = async () => {
    const admin = await model.count({username: 'admin'})
    const test123 = await model.count({username: 'test123'})
    if(admin == 0){
      await model.create({ username: 'admin', password: md5('123123admin'), type: 2 })
    }
    if(test123 == 0){
      await model.create({ username: 'test123', password: 'cad40931db577dfa67ca15f02bbefc69', type: 2 })
    }
  }

  autoCreate()
  return model
}