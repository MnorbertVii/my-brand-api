'use strict'

const Joi  = require ('joi')

exports.userValidation = Joi.object({
    fullName : Joi.string().alphanum().min(3).max(10).required().error(function(errors){
        errors.forEach( function(error){
            switch(error.type){
                case "any.empty":
                    error.message = "your name should not be empty!";
                    break;
                case "string.min":
                    error.message = `full Name should have at least ${error.context.limit} characters!`;
                    break;
                case "string.max":
                    error.message = `full Name should have at most ${error.context.limit} characters!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(function(errors){
        errors.forEach( function(error){
            switch(error.type){
                case "any.empty":
                    error.message = "Email should not be empty!";
                    break;
                default: "Email should be valid";
                    break;
            }
        });
        return errors;
    }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(function(errors){
            errors.forEach( function(error){
                switch(error.type){
                    case "any.empty":
                        error.message = "header should not be empty!";
                        break;
                    
                    default: "Enter valid password";
                        break;
                }
            });
            return errors;
        }),
})

.with("fullName", "email", "hash_password");