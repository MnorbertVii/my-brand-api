/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignUp:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - hash_password
 *       properties:
 *         fullName:
 *           type: string
 *           description: Your full name
 *         email:
 *           type: string
 *           description: Your email
 *         hash_password:
 *           type: string
 *           description: Your private password
 *       example:
 *         fullName: Alex Axel
 *         email: alex123@gmail.com
 *         hash_password: "12345"
 *     UserLogIn:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Your email
 *         password:
 *           type: string
 *           description: Your private password
 *       example:
 *         email: alex123@gmail.com
 *         password: "12345"
 *     article:
 *       type: object
 *       required:
 *         - header
 *         - description
 *       properties:
 *         header:
 *           type: string
 *           description: Article's title
 *         description:
 *           type: string
 *           description: Article's content
 *       example:
 *         header: Did you know?
 *         description: Praying is key to success!
 *     query:
 *       type: object
 *       required:
 *         - email
 *         - Names
 *         - message
 *       properties:
 *         email:
 *           type: string
 *           description: Your email
 *         Names:
 *           type: string
 *           description: Your full name
 *         message:
 *           type: string
 *           description: Your message you want to send
 *       example:
 *         email: alex123@gmail.com
 *         Names: Alex Axel
 *         message: I wish to meet you one day!
 *     addComment:
 *       type: object
 *       required:
 *         - comment
 *       properties:
 *         comment:
 *           type: string
 *           description: saying sth about the article
 *       example:
 *         comment: Wooow! What a very good post!
 *     users:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: user's id
 *         fullName:
 *           type: string
 *           description: user's full name
 *         email:
 *           type: string
 *           description: user's email
 *         hash_password:
 *           type: string
 *           description: user's hashed passsword
 *         role:
 *           type: string
 *           description: user's role
 *         createdOn:
 *           type: date
 *           description: date
 *       example:
 *          _id: "63c3d74afdf149804294dd63"
 *          fullName: "Alex Axel"
 *          email: "alex123@gmail.com"
 *          hash_password: "$2b$10$c66VLEwV0Ri8./.FPfjs0OEOoYbe255/Qx6a/M5w529ovTIY2xbBW"
 *          role: "standard"
 *          createdOn: "1673779018968"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 */

/**
 * @swagger
 * /user/authorise:
 *   post:
 *     summary: Create your account for my website
 *     description: Use this endpoint to create your own account
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *     responses:
 *       201:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignUp'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /user/log_in:
 *   post:
 *     summary: Feel free to login to your account
 *     description: Use this endpoint to login
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogIn'
 *     responses:
 *       200:
 *         description: Successful Login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLogIn'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /user/{id}/update:
 *  patch:
 *    summary: Update the user's info by the id
 *    description: Use this end point to update user info
 *    tags: [User Management]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignUp'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSignUp'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *    security:
 *      - BearerAuth: []
 */

/**
 * @swagger
 * /all/users:
 *   get:
 *     summary: Returns the list of all users
 *     description: Use this endpoint to see all users signed up
 *     tags: [User Management]
 *     responses:
 *       200:
 *         description: The list found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *       404:
 *         description: Not found
 *     security:
 *       - BearerAuth: [admin]
 */
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     description: Use this endpoint to get single user
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user details by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       404:
 *         description: User was not found
 *     security:
 *       - BearerAuth: [admin]
 */
/**
 * @swagger
 * /user/{id}/delete:
 *   delete:
 *     summary: Remove the user by id
 *     description: Use this endpoint to delete any user
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of user to be deleted
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *     security:
 *       - BearerAuth: [admin]
 */

/**
 * @swagger
 * /articles/all:
 *   get:
 *     summary: Get all articles
 *     description: Use this endpoint to see all articles created
 *     tags: [Article Management]
 *     responses:
 *       200:
 *         description: Articles found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/article'
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get single article by id
 *     description: Use this endpoint to read single article
 *     tags: [Article Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article details
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/article'
 *       404:
 *         description: Article was not found
 */

/**
 * @swagger
 * /articles/create:
 *   post:
 *     summary: Create a new article
 *     description: Use this endpoint to write new article
 *     tags: [Article Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/article'
 *     responses:
 *       200:
 *         description: The article was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/article'
 *       500:
 *         description: Some server error
 *     security:
 *       - BearerAuth: [admin]
 */

/**
 * @swagger
 * /article/edit/{id}:
 *  patch:
 *    summary: Update the article's description by the id
 *    description: Use this endpoint to edit an article
 *    tags: [Article Management]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Article id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/article'
 *    responses:
 *      200:
 *        description: The article was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/article'
 *      404:
 *        description: Article not found
 *      500:
 *        description: Some error happened
 *    security:
 *      - BearerAuth: [admin]
 */

/**
 * @swagger
 * /article/remove/{id}:
 *   delete:
 *     summary: Delete the article by id
 *     description: Use this endpoint to delete posted article
 *     tags: [Article Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of post to be deleted
 * 
 *     responses:
 *       200:
 *         description: Deletion success
 *       404:
 *         description: Article was not found
 *     security:
 *       - BearerAuth: [admin]
 */

/**
 * @swagger
 * /article/{id}/comments/create:
 *   post:
 *     summary: Comment on article
 *     description: Use this endpoint to add a comment
 *     tags: [Comments Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of article to add on a comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addComment'
 *     responses:
 *       200:
 *         description: Comment was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addComment'
 *       500:
 *         description: Some server error
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * /article/{id}/listcomments:
 *   get:
 *     summary: Read all comments on a single post by id
 *     description: Use this endpoint to read all comments created
 *     tags: [Comments Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of article and get all comments on it
 *     responses:
 *       200:
 *         description: Comments found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Not found
 *     security:
 *       - BearerAuth: []
 */
/**
 * @swagger
 * /article/comments/{id}:
 *   get:
 *     summary: Read one comment on article
 *     description: Use this endpoint to read one comment on a certain article & see who added it
 *     tags: [Comments Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of comment
 *     responses:
 *       200:
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Not found
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * /article/comments/{id}/delete:
 *   delete:
 *     summary: Deleting a comment on article by id
 *     description: Use this endpoint to delete comment
 *     tags: [Comments Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of comment to be deleted
 * 
 *     responses:
 *       200:
 *         description: Deletion success
 *       404:
 *         description: Missing comment
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * /article/{id}/likes/create:
 *   post:
 *     summary: Like and unlike an article
 *     description: Use this endpoint hit like on article and remove like on an article
 *     tags: [Likes Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of article to be liked
 *     responses:
 *       200:
 *         description: Like was successfully added
 *       500:
 *         description: Some server error
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * /article/{id}/listlikes:
 *   get:
 *     summary: see who liked an article 
 *     description: Use this endpoint to see all likes on an article
 *     tags: [Likes Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Put id of article and get all likes on it
 *     responses:
 *       200:
 *         description: Likes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Not found
 *     security:
 *       - BearerAuth: []
 */


/**
 * @swagger
 * /messages/create:
 *   post:
 *     summary: Create a new message
 *     description: Use this endpoint to send a message to site owner
 *     tags: [Message Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/query'
 *     responses:
 *       200:
 *         description: The article was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/query'
 *       500:
 *         description: Some server error
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * /messages/all:
 *   get:
 *     summary: Returns the list of all messages
 *     description: Use this endpoint to read messages
 *     tags: [Message Management]
 *     responses:
 *       200:
 *         description: The messages found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Not found
 *     security:
 *       - BearerAuth: [admin]
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get one message by id
 *     description: Use this endpoint to get single message
 *     tags: [Message Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Message was not found
 *     security:
 *       - BearerAuth: [admin]
 */





