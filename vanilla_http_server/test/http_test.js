'use strict';

var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
require(__dirname + '/../server');

describe('http server', function() {
  it('should print a time', function(done) {
    chai.request('localhost:8888')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(Date.parse(res.text)).to.be.above(0);
        done();
      });
  });
  it('should respond to a name following the /greet url', function(done) {
    chai.request('localhost:8888')
      .get('/greet/you')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql("Hello, you!");
        done();
      });
  });
  it('should accept JSON and reply with a greeting to a name', function(done) {
    chai.request('localhost:8888')
      .post('/greet')
      .send(JSON.stringify({"name": "you"}))
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql("Hello, you!");
        done();
       });
  });
  it('should accept JSON and reply with saved JSON files', function(done) {
    var first = fs.readdirSync(__dirname + "/../data").length;
    var second;
    chai.request('localhost:8888')
      .post('/notes')
      .send(JSON.stringify({"name": "you"}))
      .end(function(err, res) {
        second = fs.readdirSync(__dirname + "/../data").length;
        expect(first + 1).to.be.eql(second);
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql("JSON saved");
        done();
      });
  });
  it('should print the files saved in data', function(done) {
    chai.request('localhost:8888')
      .get('/notes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql("The files " + fs.readdirSync(__dirname + "/../data") 
                                 + " are saved to server");
        done();
      });
  });
  it('should 404 when an unrecognized route is given', function(done) {
    chai.request('localhost:8888')
      .get('/not/here')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });
});