import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("connected to MongoDB")
    } catch (error) {
        console.log("Error while connecting to MongoDB")
        process.exit(1)
    }
}

export default connectDB