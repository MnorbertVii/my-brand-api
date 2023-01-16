// endpoint testing with mocha, chai and chai-http

//import libraries

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
var mongoose = require("mongoose");

//import server

var server = require("../index");

//import ArticleModel

var Article = require("../api/models/articleModel");

//use chaihttp for making the actual http requests

chai.use(chaiHttp);

describe("Article tests", function () {
  beforeEach(function (done) {
    var newArticle = new Article({
      header: "wooooow",
      description: "great",
    });
    newArticle.save(function (err) {
      done();
    });
  });

  it("should list articles", function (done) {
    chai
      .request(server)
      .get("/articles/all")
      .end(function (err, res) {
        res.should.be.json;
        res.body.should.have.status(200)
        res.body.should.have.property("statusCode");
        res.body.statusCode.should.equal("200");
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.data.should.have.property('articles')
                                .which.is.a('array')
        done();
        
      });
  });

  it("should add a Article", function (done) {
    chai
      .request(server)
      .post("/articles/create")
      .send({
        header: "wooooow",
        description: "great",
      })

      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
      .end(function (err, res) {
      
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("statusCode");
        res.body.statusCode.should.equal("201");
        res.body.should.have.property('data')
        res.body.data.should.have.property('description','great')
        res.body.data.should.have.property('header','wooooow')
        res.body.data.should.have.property('_id')
        done();
      });
  });

  it("should update article ", function (done) {
    chai
      .request(server)
          .patch("/article/edit/63c1fd1b6c464351df2c26b1")
          .send({
            header: "world",
            description: "enjoying",
          })
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
          .end(function (error, response) {
            response.should.be.json;
            response.body.should.have.status(200)
            response.body.should.be.a("object");
            response.body.should.have.property("data");
            response.body.data.should.have.property("header");
            response.body.data.should.have.property("description");
            response.body.data.should.have.property("_id");
            done();
          });
      });

  it("should list Single article", function (done) {
        chai
          .request(server)
          .get("/articles/63c204a714a79215f16c645e")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
          .end(function (err, res) {
            res.should.be.json;
            res.body.should.have.status(200)
            res.body.should.have.property("statusCode");
            res.body.statusCode.should.equal("200");
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.equal("article fetched successfully");
            res.body.should.have.property("data");
            done();
            
          });
      });


  it("should delete a Article with admin Auth Token", function (done) {
        chai
          .request(server)
          .delete("/article/remove/63a42bf96f36d6835502a673")
          .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
          .end(function (error, response) {
            response.body.should.have.status(200)
            response.body.should.have.property("message");
            response.body.message.should.equal("Article successfully deleted");
            done();
          });
      });
});

describe("Comments-Likes tests", function () {

it("should add a comment on article", function (done) {
  chai
    .request(server)
    .post("/article/63c2020a74167ff13cc77b7f/comments/create")
    .send({
      comment: "wooooow",
    })

    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
    .end(function (err, res) {
    
      res.should.be.json;
      res.body.should.have.status(200)
      res.body.should.be.a("object");
      res.body.should.have.property("message");
      res.body.message.should.equal('Comment successfully added');
      res.body.should.have.property("data");
      done();
    });
});

it("should list All comments on one article", function (done) {
  chai
    .request(server)
    .get("/article/63c2020a74167ff13cc77b7f/listcomments")
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
    .end(function (err, res) {
      res.should.be.json;
      res.body.should.have.status(200)
      res.body.should.be.a("object");
      res.body.should.have.property("message");
      res.body.message.should.equal('Comments successfully fetched');
      res.body.should.have.property("data");
      done();
    });
});
it("should list Single comment", function (done) {
  chai
    .request(server)
    .get("/article/comments/63c2988adf52b8e931a8dc6f")
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
    .end(function (err, res) {
      res.should.be.json;
      res.body.should.have.status(200)
      res.body.should.have.property("statusCode");
      res.body.statusCode.should.equal("200");
      res.body.should.be.a("object");
      res.body.should.have.property("message");
      res.body.message.should.equal("Success");
      res.body.should.have.property("data");
      done();
      
    });
});

// it("should delete a comment on article by current user", function (done) {
//   chai
//     .request(server)
//     .delete("/article/comments/63c29983d8b001a7520b672f/delete")
//     .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
//     .end(function (error, response) {
//       response.body.should.have.status(200)
//       response.body.should.have.property("message");
//       response.body.message.should.equal("Comment successfully deleted");
//       done();
//     });
// });

it("should add&remove a like on article", function (done) {
  chai
    .request(server)
    .post("/article/63c2020a74167ff13cc77b7f/likes/create")
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
    .end(function (err, res) {
    
      res.should.be.json;
      res.body.should.have.status(200)
      res.body.should.be.a("object");
      res.body.should.have.property("message");
      res.body.message.should.equal('Like successfully added');
      res.body.should.have.property("data");
      //done();
 
    chai
    .request(server)
    .post("/article/63c2020a74167ff13cc77b7f/likes/create")
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
    .end(function (err, res) {
    
      res.should.be.json;
      res.body.should.have.status(200)
      res.body.should.be.a("object");
      res.body.should.have.property("message");
      res.body.message.should.equal('Like successfully removed');
      res.body.should.have.property("data");
      done();
    });
  });
});

it("should list All likes on one article", function (done) {
  chai
    .request(server)
    .get("/article/63c2020a74167ff13cc77b7f/listlikes")
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcmJlcnRtdWhpemkyMUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6Ik5vcmJlcnQgTXVoaXppIiwiX2lkIjoiNjNjMjAwM2Y3NDE2N2ZmMTNjYzc3Yjc4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczNjU4NDU4fQ.v0hV8RB-F1upmDMsMAU2RDrtZIcJ_E9euG4WinAcNSI")
    .end(function (err, res) {
      res.should.be.json;
      res.body.should.have.status(200)
      res.body.should.be.a("object");
      res.body.should.have.property("message");
      res.body.message.should.equal('Likes successfully fetched');
      res.body.should.have.property("data");
      done();
    });
});


});
