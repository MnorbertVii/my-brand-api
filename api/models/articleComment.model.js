const mongoose = require ('mongoose')
const schema = new mongoose.Schema({
    comment: String,
    article_id: {type: mongoose.Schema.Types.ObjectId, ref: 'articleModel'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
},{
        timestamps: true,
});

const ArticleComment = mongoose.model('ArticleComment', schema);
module.exports = ArticleComment;