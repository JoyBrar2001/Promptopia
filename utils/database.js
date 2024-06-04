import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery')

  if(isConnected){
    console.log("Already connected to DB")
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log("DB Connected")
  } catch (error) {
    console.log(error)
  }
}