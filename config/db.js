import colors from "colors";
import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        //returns Cluster name
        console.log(`Connected to mongodb database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in mongodb ${error}`.bgRed.white)
    }
    
}

export default connectDB;