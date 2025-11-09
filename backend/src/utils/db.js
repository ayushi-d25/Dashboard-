const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb")
    .then(conn => console.log(`MongoDB connected: ${conn.connection.host}`))
    .catch(err => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
