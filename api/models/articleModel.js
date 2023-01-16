'use strict';
// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const ArticleSchema = new Schema({
        header: {
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        createdOn: {
            type:Date,
            default:Date.now
        },
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:'ArticleComment'}],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref:'ArticleLike'}]
    });

// create and export model
module.exports = mongoose.model("articleModel", ArticleSchema);