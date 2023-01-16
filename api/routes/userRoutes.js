'use strict'

// create App function

module.exports = function(app){

    // import aunthetication middleware
    
    var userManager = require('../controllers/authController');
    var isLoggedIn = require('../middleware/isLoggedIn');
    var isAdmin = require('../middleware/IsAdmin');

    //get and post requests for user endpoints

    app
    .route('/all/users')
    .get(isLoggedIn,isAdmin, userManager.getAllUsers)

    //post request for user registration

    app
    .route('/user/:id')
    .get(isLoggedIn,isAdmin, userManager.listSingleUser);

    app
    .route('/user/authorise')
    .post(userManager.signUp);

    //post request for user login
    app
    .route('/user/log_in')
    .post(userManager.logIn);


    app
    .route('/user/authorised')
    .post(userManager.loginRequired);

    app
    .route('/user/:id/delete')
    .delete(isLoggedIn, isAdmin, userManager.deleteUser);

    app
    .route('/user/:id/update')
    .patch(isLoggedIn, userManager.updateUser);

};