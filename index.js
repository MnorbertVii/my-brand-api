'use strict'

//require express

const express = require("express");
const swaggerJsdoc = require ('swagger-jsdoc')
const swaggerUi = require ('swagger-ui-express')


//import db connection

require("./config/db");

//import jsonwebtoken

const jwt = require ('jsonwebtoken');

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"My Brand API",
            version:"1.0.0",
            description: "My brand backend documentation"
        },
        servers: [
            {
                url: "http://localhost:1000"
            }
        ],  
    },
    apis:["./routes/*.js", "documentation.js"],
};
const specs = swaggerJsdoc(options);

//create express app

const app = express();

app.use("/ep-docs", swaggerUi.serve, swaggerUi.setup(specs));

//define port to run express app

const port = process.env.PORT || 1000;

//use express middleware on express app

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//add endpoint

app.get('/', (req,res) =>{
    res.send("hello World");
});

// Token Verification 
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTfulAPIs', (err, decode) => {
    if (err) req.user = undefined;
    req.user = decode;
    next();
        });
    } else {
req.user = undefined;
next();
    }
});
//API endpoint

//listen to the server 

module.exports = app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`);
});

//import API route

const articleRoutes = require ('./api/routes/articleRoutes'); //importing article route
const userRoutes = require ('./api/routes/userRoutes');   //importing user route
const messageRoutes = require ('./api/routes/messageRoutes'); //importing message route

articleRoutes(app);
userRoutes(app);
messageRoutes(app);
    
app.use((req, res) => {
    res.status(404).json({
      message: "Route / page doesn't exist.",
    });
  });
  







  




