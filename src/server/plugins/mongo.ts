import type { IGlobalDB, IGlobalMongo } from '~~/types'
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose';
import Model from '../model'

declare global {
  var DB : IGlobalDB
  var MongoGame : IGlobalMongo
}

export default defineNitroPlugin(async (nitroApp) => {
  const runtimeConfig = useRuntimeConfig()
  
  try {
    await mongoose.connect(runtimeConfig.mongoURI, { 
      dbName: runtimeConfig.mongoDB 
    })
    global.DB = Model(mongoose)

    global.MongoGame.CVV = new MongoClient('mongodb://127.0.0.1:27015')
    await global.MongoGame.CVV.connect()

    global.MongoGame.ANB = new MongoClient('mongodb://127.0.0.1:27014')
    await global.MongoGame.ANB.connect()

    global.MongoGame.ZUZU = new MongoClient('mongodb://127.0.0.1:27012')
    await global.MongoGame.ZUZU.connect()
  }
  catch(e:any){
    throw createError({ statusCode: 500, message: e.toString() })
  }
})