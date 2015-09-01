'use strict';

var greet = require('../greet');
var greetExports = require('../greet_exports');
var chai = require('chai');
var expect = chai.expect;

var expect2 = require('chai').expect;

describe('greet', function() {
  it('should return hello world', function() {
    expect(greet()).to.eql('hello world');
  });
});

describe('greet exports', function() {
  it('should also greet when called', function() {
    expect(greetExports.greet()).to.eql('hello world from greet exports');
  });
});
