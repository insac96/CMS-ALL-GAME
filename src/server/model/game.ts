import type { Mongoose } from 'mongoose'
import type { IDBGame } from '~~/types'

export const DBGame = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBGame>({ 
    type: { type: String },
    name: { type: String },
    db: { type: String },
    url: { type: String },
  }, {
    timestamps: true
  })

  const model = mongoose.model('games', schema)
  return model 
}