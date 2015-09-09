'use strict';

var expect = require('chai').expect;
var server = require(__dirname + "/../server");
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

chai.request(server.js)
  .get('/time')