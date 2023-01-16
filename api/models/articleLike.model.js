const mongoose = require ('mongoose')
const schema = new mongoose.Schema({
    article_id: {type: mongoose.Schema.Types.ObjectId, ref: 'articleModel'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
},{
        timestamps: true,
});

const ArticleLike = mongoose.model('ArticleLike', schema);
module.exports = ArticleLike;