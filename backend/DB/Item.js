const mongoose = require("mongoose");

const item = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    discount: Number
});

module.exports = Item = mongoose.model("item", item);