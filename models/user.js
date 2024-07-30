const express= require("express");
const mongoose= require("mongoose");
const passportLocalMongoose= require("passport-local-mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
});
userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("user", userSchema);