import type { IGlobalDB } from '~~/types'
import type { Mongoose } from 'mongoose'
import { DBAdmin } from './admin'
import { DBGame } from './game'

export default (mongoose : Mongoose) : IGlobalDB => {
  return {
    Admin: DBAdmin(mongoose),
    Game: DBGame(mongoose),
  }
}