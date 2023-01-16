// endpoint testing with mocha, chai and chai-http

//import libraries

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const mongoose = require("mongoose");

//import server

var server = require("../index");

//import ArticleModel

var Message = require("../api/models/messageModel");

//use chaihttp for making the actual http requests

chai.use(chaiHttp);

describe("Message Endpoints tests", function () {

    it("should send a message", function (done) {
        chai
          .request(server)
          .post("/messages/create")
          .send({
            Names: "Crush",
            email: "yourcrush12@gmail.com",
            message: "let's meet and share a coffee",
          })
    
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmluZXVtYmVyZXllQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQ2FyaW5lIFVtYmVyZXllIiwiX2lkIjoiNjNjMjAyNTY3NDE2N2ZmMTNjYzc3YjgxIiwicm9sZSI6InN0YW5kYXJkIiwiaWF0IjoxNjczNjU5MTM0fQ.tBYYpGzhIs8SB5gxCyn4jATJFd2JXatG77lBI_Jt-bU")
          .end(function (err, res) {
          
            res.should.be.json;
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("statusCode");
            res.body.statusCode.should.equal("200");
            res.body.should.have.property('As');
            res.body.should.have.property('message','Your message was sent');
            done();
          });
      });
      it("should list all messages", function (done) {
        chai
          .request(server)
          .get("/messages/all")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
          .end(function (err, res) {
            res.should.be.json;
            res.body.should.have.status(200)
            res.body.should.have.property("statusCode");
            res.body.statusCode.should.equal("200");
            res.body.should.be.a("object");
            res.body.should.have.property('messages')
                                    .which.is.a('array')
            done();
            
          });
      });
      it("should list Single message", function (done) {
        chai
          .request(server)
          .get("/messages/63c2d1ca71f2588a7b70fb5d")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
          .end(function (err, res) {
            res.should.be.json;
            res.body.should.have.status(200)
            res.body.should.have.property("statusCode");
            res.body.statusCode.should.equal("200");
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal("Message found");
            res.body.should.have.property("data");
            done();
            
          });
      });

});    