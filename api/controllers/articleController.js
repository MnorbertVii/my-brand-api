// import article Model
const Article = require("../models/articleModel");
const ArticleComment = require('../models/articleComment.model');
const ArticleLike = require('../models/articleLike.model');
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator')

// DEFINE CONTROLLER FUNCTIONS

// listAllArticles function - To list all Articles
exports.listAllArticles = (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            statusCode: "200",
            message: 'articles fetched successfully',
            data: {articles}
        });
    });
};

exports.listSingleArticle = (req, res) => {
    Article.find({_id:req.params.id}, (err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            statusCode: "200",
            message: 'article fetched successfully',
            data:article
        });
    });
};

//createNewArticle function - To create new article

exports.createNewArticle = (req, res) => {
    let newArticle = new Article(req.body);
    newArticle.save((err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(201).json({
            statusCode: "201",
            message: 'article creation successful',
            data:article
        });
    });
};


// updateArticle function - To update article status by id
exports.updateArticle = (req, res) => {
    Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, article) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            statusCode: "200",
            message: 'article Updated successfully',
            data:article
        });
    });
};

// deleteArticle function - To delete article by id
exports.deleteArticle = async function (req, res) {
    try {
        await Article.deleteOne({ _id: req.params.id });
        res.status(200).json({ 
            statusCode: "200",
            message: "Article successfully deleted" ,
            data:{}
        });
    }
    catch (err) {
        res.status(404).send(err);
    }
}

exports.addComment = async (req, res) => {
    let article_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(article_id)) {
        return res.status(400).send({
            message: 'Invalid article id',
            data: {}
        });
    }
    Article.findOne({ _id: article_id }).then(async (article) => {
        if (!article) {
            return res.status(400).send({
                message: 'No blog found',
                data: {}
            });
        } else {
            try {
                const v = new Validator(req.body, {
                    comment: 'required',
                });
                const matched = await v.check();
                if (!matched) {
                    return res.status(422).send(v.errors);
                }
                let newCommentDocument = new ArticleComment({
                    comment: req.body.comment,
                    article_id: article_id,
                    user_id: req.user._id
                });
                let commentData = await newCommentDocument.save();
                await Article.updateOne(
                    { _id: article_id },
                    {
                        $push: { comments: commentData._id }
                    }
                )
                return res.status(200).send({
                    statusCode: "200",
                    message: 'Comment successfully added',
                    data: { commentData }
                });
            } catch (err) {
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    })
}

exports.listAllComments = (req, res) => {
    let article_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(article_id)) {
        return res.status(400).send({
            message: 'Invalid article id',
            data: {}
        });
    }
    Article.findOne({ _id: article_id }).then(async (article) => {
        if (!article) {
            return res.status(400).send({
                message: 'No article found',
                data: {}
            });
        } else {
            try {
                let query = [
                    {
                        $lookup:
                        {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    { $unwind: '$user' },
                    {
                        $match: {
                            'article_id': mongoose.Types.ObjectId(article_id)
                        }
                    },
                ];

                let comments = await ArticleComment.aggregate(query);
                return res.send({
                    statusCode:"200",
                    message: 'Comments successfully fetched',
                    data: {
                        comments: comments
                    }
                });
            } catch (err) {
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    })
}

exports.listSingleComment = (req, res) => {
    ArticleComment.find({_id:req.params.id}, (err, articleComment) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            statusCode: "200",
            message: 'Success',
            data:articleComment
        });
    });
};

exports.deleteComment = (req, res) => {
    let comment_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(comment_id)) {
        return res.status(400).send({
            message: 'Invalid comment id',
            data: {}
        });
    }
    ArticleComment.findOne({ _id: comment_id }).then(async (comment) => {
        if (!comment) {
            return res.status(400).send({
                message: 'No comment found',
                data: {}
            });
        } else {
            let current_user = req.user;
            if (comment.user_id != current_user._id) {
                return res.status(400).send({
                    message: 'Access denied',
                    data: {}
                });
            } else {
                try {
                    await ArticleComment.deleteOne({ _id: comment_id });
                    await Article.updateOne(
                        { _id: comment.article_id },
                        {
                            $pull: { comments: comment_id }
                        }
                    )

                    return res.status(200).send({
                        statusCode:"200",
                        message: 'Comment successfully deleted',
                        data: {}
                    })
                } catch (err) {
                    return res.status(400).send({
                        message: err.message,
                        data: err
                    });
                }
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    })
}



exports.addLike = (req, res) => {
    let article_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(article_id)) {
        return res.status(400).send({
            message: 'Invalid article id',
            data: {}
        });
    }
    Article.findOne({ _id: article_id }).then(async (article) => {
        if (!article) {
            return res.status(400).send({
                message: 'No article found',
                data: {}
            });
        } else {
            let current_user = req.user;
            ArticleLike.findOne({
                article_id: article_id,
                user_id: current_user._id
            }).then(async (article_like) => {

                try {
                    if (!article_like) {
                        let articleLikeDoc = new ArticleLike({
                            article_id: article_id,
                            user_id: current_user._id
                        });
                        let likeData = await articleLikeDoc.save();
                        await Article.updateOne({
                            _id: article_id,
                        }, {
                            $push: { likes: likeData._id }
                        })
                        return res.status(200).send({
                            statusCode:'200',
                            message: 'Like successfully added',
                            data: likeData
                        });
                    } else {
                        await ArticleLike.deleteOne({
                            _id: article_like._id
                        });
                        await Article.updateOne({
                            _id: article_like.article_id
                        }, {
                            $pull: { likes: article_like._id }
                        })
                        return res.status(200).send({
                            statusCode: "200",
                            message: 'Like successfully removed',
                            data: {}
                        });


                    }
                } catch (err) {
                    return res.status(400).send({
                        message: err.message,
                        data: err
                    });
                }
            }).catch((err) => {
                return res.status(400).send({
                    message:err.message,
                    data: err
                });
            })
        }
     })
}

exports.listAllLikes = (req, res) => {
    let article_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(article_id)) {
        return res.status(400).send({
            message: 'Invalid article id',
            data: {}
        });
    }
    Article.findOne({ _id: article_id }).then(async (article) => {
        if (!article) {
            return res.status(400).send({
                message: 'No article found',
                data: {}
            });
        } else {
            try {
                let query = [
                    {
                        $lookup:
                        {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    { $unwind: '$user' },
                    {
                        $match: {
                            'article_id': mongoose.Types.ObjectId(article_id)
                        }
                    },
                ];

                let likes = await ArticleLike.aggregate(query);
                return res.send({
                    statusCode:"200",
                    message: 'Likes successfully fetched',
                    data: {
                        likes: likes
                    }
                });
            } catch (err) {
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    })
}


