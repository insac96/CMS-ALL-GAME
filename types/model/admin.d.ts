import type { Types } from 'mongoose'

export interface IDBAdmin {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  username: string
  password: string
}