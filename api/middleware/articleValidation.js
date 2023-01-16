'use strict'

//import joi dependency

const Joi = require('joi');


exports.articleValidation = Joi.object({
    header: Joi.string().trim()
    .min(5)
    .max(15)
    .required().error(function(errors){
        errors.forEach( function(error){
            switch(error.type){
                case "any.empty":
                    error.message = "header should not be empty!";
                    break;
                case "string.min":
                    error.message = `header should have at least ${error.context.limit} characters!`;
                    break;
                case "string.max":
                    error.message = `header should have at most ${error.context.limit} characters!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    description: Joi.string().trim()
    .min(5)
    .max(1000)
    .required().error(function(errors){
        errors.forEach( function(error){
            switch(error.type){
                case "any.empty":
                    error.message = "description should not be empty!";
                    break;
                case "string.min":
                    error.message = `description should have at least ${err.context.limit} characters!`;
                    break;
                case "string.max":
                    error.message = `description should have at most ${err.context.limit} characters!`;
                    break;
                default:
                    break;
            }
        });
        return errors;

})
})

.with("header", "description");