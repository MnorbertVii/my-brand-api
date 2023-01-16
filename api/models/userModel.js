'use strict'

//import mongoose

const mongoose = require("mongoose");

//import bcryptjs - for password hashing

const bcrypt = require('bcryptjs');

//declare schema and assign schema class

const Schema = mongoose.Schema;

//create schema instance for User and add properties

const UserSchema = new Schema({
    fullName:{
        type: String,
        trim: true,
        required: true
    },

    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true

    },

    hash_password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        required: true,
        default: "standard"
    },

    createdOn: {
        type: Date,
        default: Date.now
    }
});

//schema method to compare passwords

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
}

//create and export model

module.exports = mongoose.model("User", UserSchema);