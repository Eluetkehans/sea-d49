var expect = require('chai').expect;
var tcp = require(__dirname + "/../server");

describe('TCP server', function() {
  before(function() {
    tcp.listen(8000);
  });

  after(function() {
    tcp.close();
  });
});