let mongoose = require("mongoose")

const server = "127.0.0.1:27017"
const database = "micro_service_db"

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true
    })
    console.log("MongoDB connected!!")
  } catch (err) {
    console.log("Failed to connect to MongoDB", err)
    return false
  }
}

connectDB()