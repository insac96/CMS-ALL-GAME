import type { Model } from 'mongoose'
export { IDBAdmin } from './admin'
export { IDBGame } from './game'

export interface IGlobalDB {
  Admin: Model<IDBAdmin>
  Game: Model<IDBGame>
}