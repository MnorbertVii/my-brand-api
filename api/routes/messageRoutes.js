module.exports = function(app){
  let messageManager = require('../controllers/messageController');
  let isLoggedIn = require('../middleware/isLoggedIn');
  let isAdmin = require('../middleware/IsAdmin');

//messaging routes
  app
  .route('/messages/create')
  .post(isLoggedIn, messageManager.addMessage);

  app
  .route('/messages/all')
  .get(isLoggedIn, isAdmin, messageManager.listMessages)

  app
  .route('/messages/:id')
  .get(isLoggedIn, isAdmin, messageManager.listOneMessage)
};