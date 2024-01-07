import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)
  if (!process.env.MONGODB_URI) {
    throw new Error('=> missing env.MONGODB_URI')
  }
  if (isConnected) {
    console.log('=> using existing database connection')
    return
  }

  console.log('=> using new database connection')
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB
    })
    isConnected = true
    console.log('=> db connected', db.connection.readyState)
  } catch (error) {
    console.log('=> error connecting to db:', error)
  }
}
