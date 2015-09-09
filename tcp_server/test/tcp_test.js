var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var fs = require('fs');
var server = require(__dirname + "/../server");
chai.use(chaiHttp);
require(__dirname + '/../server');

describe('TCP server', function() {
  var first;
  var second;
  before(function(done) {
    first = fs.readdirSync(__dirname + "/../requests").length;
    chai.request('localhost:8888')
      .get('/sdf')
      .end();
  });
  it('should save a file when called on', function(done) {
    second = fs.readdirSync(__dirname + "/../requests").length;
    expect(first).to.be.lower(second);
  });
});

//send test data, see if files in directory increased by one.