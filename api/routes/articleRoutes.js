'use strict'

//creating app function

module.exports = function(app){
    var articleList = require ('../controllers/articleController');

//import middleware for aunthetication

 //   var userManager = require('../controllers/authController')
 
    var isLoggedIn = require('../middleware/isLoggedIn')
    var isAdmin = require('../middleware/IsAdmin')


//import middleware for validation

    const {validate} = require ('../middleware/middlewareValidation')

//import middleware for article validation

   const validation = require ('../middleware/articleValidation')

    //articleList Routes

    //get and post routes for articles endpoints

    app
    .route("/articles/all")
    .get(articleList.listAllArticles)

    app
    .route('/articles/:id')
    .get(articleList.listSingleArticle);

    app
    .route("/articles/create")
    .post([validate(validation.articleValidation)],isLoggedIn, isAdmin, articleList.createNewArticle);

    
    //put and delete request for articles endpoints

    app
    .route("/article/edit/:id")
    .patch([validate(validation.articleValidation)],isLoggedIn, isAdmin,articleList.updateArticle)

    app.route("/article/remove/:id").delete(isLoggedIn, isAdmin,articleList.deleteArticle);

    app
    .route('/article/:id/comments/create')
    .post(isLoggedIn, articleList.addComment);

    app
    .route('/article/:id/listcomments')
    .get(isLoggedIn, articleList.listAllComments);

    app
    .route('/article/comments/:id')
    .get(isLoggedIn, articleList.listSingleComment);

    app
    .route('/article/comments/:id/delete')
    .delete(isLoggedIn, articleList.deleteComment);

    app
    .route('/article/:id/likes/create')
    .post(isLoggedIn, articleList.addLike);

    app
    .route('/article/:id/listlikes')
    .get(isLoggedIn, articleList.listAllLikes);

};
