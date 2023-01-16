const Message = require('../models/messageModel');
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');

//defining controller functions

exports.addMessage = async (req, res) => {
    try {
        const v = new Validator(req.body, {
            Names: 'required',
            email: 'required',
            message: 'required',
        });
        const matched = await v.check();
        if (!matched) {
            return res.status(422).send({
                statusCode: "422",
                message: "Failed",
                error: v.errors
            });
        }
        let newMessage = new Message(req.body);
        newMessage.save((err, message) => {
            if (err) {
                return res.status(500).send({
                    message: "server error",
                    data: err
                })
            }
            return res.status(200).json({
                statusCode: "200",
                message: "Your message was sent",
                As: message.message
            });
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    }
};

exports.listOneMessage = (req, res) => {
        Message.find({_id:req.params.id}, (err, message) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json({
                statusCode: "200",
                message: 'Message found',
                data: message
            });
        });
   
 };

exports.listMessages = (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            return res.status(500).send({
                statusCode: "500",
                message: "server error",
                error: err
            })
        }
        return res.status(200).json({
            statusCode: "200",
            message: "Ok",
            messages: messages
        })
    })
}