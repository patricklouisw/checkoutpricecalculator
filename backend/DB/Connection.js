const mongoose = require("mongoose");

const URI = "mongodb+srv://pat:pat123@pricecalc.m3dlm.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log("DB has been connected..!")
}

module.exports = connectDB;