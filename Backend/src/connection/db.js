const mongoose=require("mongoose");
require("dotenv").config();

const mongo_url=process.env.mongo_url;
const connection=mongoose.connect("mongodb+srv://jega:jega@cluster0.vnui3ln.mongodb.net/");

module.exports={
    connection,
}