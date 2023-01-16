//import user model

const User = require("../models/userModel");

//import jsonwebtoken

jwt = require('jsonwebtoken');

//import bcryptjs - hashing function

bcrypt = require ('bcrypt');

//DEFINITION OF CONTROLLER FUNCTIONS

// get all users

exports.getAllUsers = (req, res) => {
    let allUsers = User.find({}, (err, users) =>{
        if(err){
            res.status(500).send({message: err});
        }else{
            res.status(200).json({
                statusCode: "200",
                message: "Success",
                listOfAllUsers: users
            });
        }
    })
}

exports.listSingleUser = (req, res) => {
    User.find({_id:req.params.id}, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            statusCode: "200",
            message: 'User found',
            data: user
        });
    });
};

//user register function

module.exports.signUp = async(req, res) => {
    const {email} = req.body;
    const emailExists = await User.findOne({email});
    if(emailExists){
        return res.status(400).send({
            statusCode: "400",
            error: "Email already exists"
        });
    }
    let newUser = new User(req.body);
    req.body.password = newUser.hash_password;
    newUser.hash_password = bcrypt.hashSync(req.body.password,  10);
    newUser.save((err, user) => {
        if(err){
            res.status(500).send({message:err});
        }
        // user.hash_password=undefined;
        res.status(201).json({
            statusCode: '201',
            message:'Account Creation Successful',
            data: user
        });
    });
};


//user sign-in function


module.exports.logIn=(req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if(!user){
            res.status(401).json({message: "Aunthetication failed. couldn't find user."});
        }else if (user){
            if(!user.comparePassword(req.body.password)){
                res.status(401).json({message:'Aunthetication failed. Incorrect Password.'});
            }else{
                res.json({
                message:"Login Successful! Use below Token to login!",
                token: jwt.sign({email:user.email, fullName:user.fullName, _id: user._id, role: user.role}, 'RESTfulAPIs')
            });
            }
        }
    });
};

exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({
            statusCode: "200",
            message: 'user Updated successfully',
            data: user
        });
    });
};

//user registration function

exports.loginRequired = (req, res, next) =>{
    if(req.user){
        res.json({message: 'Authorized user, Action Successful'});
        next()
    }else{
        res.status(401).json({message:'Unauthorized user!!'});
    }
};

// deleteArticle function - To delete article by id
exports.deleteUser = async function( req, res) {
    try{
        await  User.deleteOne({ _id:req.params.id });
        res.status(200).json({ 
            statusCode: '200',
            message:"User successfully deleted",
            data:{}
        });
    }
    catch(err){
        res.status(404).send(err);
    }
}
