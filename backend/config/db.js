const dotenv = require("dotenv");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(MONGO_URI)
        console.log(`MONGO DB CONNECTED ON: ${connect.connection.host}`)
    }
    catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;
