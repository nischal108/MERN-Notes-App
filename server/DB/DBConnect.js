const mongoose = require('mongoose');

const connectDB  = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connection made to database successfully");
        
    } catch (error) {
        console.error("connection failed to db ", error.message);
        process.exit(1);
        
    }
}

module.exports = connectDB;