'use strict';

var greetHolder = require('../greet_holder');

var expect = require('chai').expect;

// first variable is just a human readable string
describe('greetHolder', function() {
  it('should return hello Erik', function (){
   expect(greetHolder("Erik")).to.eql('hello Erik');
  });
});
