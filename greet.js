'use strict';

var greet = require(__dirname + "/greet_holder");

console.log(greet(process.argv[2]));