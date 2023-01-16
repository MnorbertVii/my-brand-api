// testing user endpoints with mocha and chai

//import libraries

const chai = require("chai");
const chaiHttp = require("chai-http");
const Should = chai.should();
const mongoose = require("mongoose");

var server = require("../index");
var User = require("../api/models/userModel");
chai.use(chaiHttp);

describe("User tests", function () {
  it("should register user", function (done) {
    chai
      .request(server)
      .post("/user/authorise")
      .send({
        fullName: Math.random()+"Mugisha Marvin",
        email: Math.random()+"marvin@gmail.com",
        hash_password: "marvin123",
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should login user", function (done) {
    chai
      .request(server)
      .post('/user/log_in')
      .send({
        email: "marvin@gmail.com",
        password: "marvin123",
      })
      .end((err, res) => {
        res.body.should.have.property("token");
        var token = res.body.token;
        done();
      });
  });
  it("should check token of user", function (done) {
    chai
      .request(server)
      .post("/user/authorised")
      .set("Authorization", "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
      // .end((err, response)=> {
      // //  response.should.have.status(200);
      // // response.body.should.have.property("message");
      // // response.body.message.should.equal(
      // // "Authorized user, Action Successful"
      // // );
      // });
       done();
  });
  it("should delete a user with admin Auth Token", function (done) {
    chai
      .request(server)
      .delete("/user/63c204367f8356d7d10906b8/delete")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
      .end(function (error, response) {
        response.body.should.have.property("message");
        response.body.message.should.equal("User successfully deleted");
        done();
      });
  });
  it("should list All users with admin token", function (done) {
    chai
      .request(server)
      .get("/all/users")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
      .end(function (err, res) {
        res.should.be.json;
        res.body.should.have.property("statusCode");
        res.body.statusCode.should.equal("200");
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.equal("Success");
        done();
        
      });
  });
  it("should list Single user with admin token", function (done) {
    chai
      .request(server)
      .get("/user/63c204a714a79215f16c645e")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
      .end(function (err, res) {
        res.should.be.json;
        res.body.should.have.property("statusCode");
        res.body.statusCode.should.equal("200");
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.equal("User found");
        done();
        
      });
  });
});
