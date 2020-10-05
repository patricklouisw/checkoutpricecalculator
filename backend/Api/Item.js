const express = require("express");
const mongoose = require("mongoose");
const Item = require("../DB/Item");
const route = express.Router();

route.post("/", async(req, res) => {
    try {
        const {name, price, quantity, discount} = req.body;
        // console.log(req);
        let item = {};
        item.name = name;
        item.price = price;
        item.quantity = quantity;
        item.discount = discount;
        // console.log(item);
        
        let itemModel = new Item(item);
        await itemModel.save();
        res.json(itemModel);
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = route;