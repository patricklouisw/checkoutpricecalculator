// === Import ===
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./DB/Connection");
const Item = require("./DB/Item");
const app = express();

// === app Config ===
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));

connectDB();
app.use(express.json({extended: false}));
// === Routing ===
// Post Route
app.use("/items", require("./Api/Item"));

// Get Route
app.get("/items", (req, res) => {
    Item.find({}, (err, items) => {
        if(err){
            console.log("Err: "+ err);
            res.send(err);
        } else {
            res.send(items);
        }
    })
});

//Delete All Route
app.delete("/items/deleteAll", (req, res) => {
    Item.deleteMany({}, (err, deletedItem) =>{
        if(err){
            res.send("error");
        }else{
            console.log(deletedItem);
            res.send("Success");
        }
    })
});

//Delete Route
app.delete("/items/:id", (req, res)=>{
    Item.findByIdAndDelete(req.params.id, (err, deletedItem) =>{
        if(err){
            res.send(err);
        }else{
            console.log()
            res.send(deletedItem);
        }
    })
});

// === Listening ===
let port = process.env.PORT || 3000;
let ip = process.env.IP;
app.listen(port, ip, function(){
    console.log("The Backend app is up on port: " + port);
});