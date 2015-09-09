var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
require(__dirname + '/../server');

describe('TCP server', function() {
  it('should respond to a request', function(done) {
    chai.request('localhost:8888')
      .get('/anywhere')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.eql('');
        done();
      });
  });
});

//send test data, see if files in directory increased by one.