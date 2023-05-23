const mongoose = require("mongoose");

# Add your own const URI with MongoDB API key

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log("DB has been connected..!")
}

module.exports = connectDB;
