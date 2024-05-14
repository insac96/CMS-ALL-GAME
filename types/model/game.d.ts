import type { Types } from 'mongoose'

export interface IDBGame {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  type: string
  name: string
  db: string
  url: string
}