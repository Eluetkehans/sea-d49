'use strict';

var http = require('http');

function onRequest(req, res) {
  if(req.method == 'GET' && req.url == '/time') {
    var time = Date();
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(time);
    return res.end();
  }
  // '/greet/' are the first seven letters
  var greet = req.url.substring(0, 7);
  if(req.method == 'GET' && greet == '/greet/') {
    var name = "";
    for(var i = greet.length; i < req.url.length; i++) {
      name += req.url[i];
    }
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Hello, " + name + "!");
    return res.end();
  }
  // If user submits name via JSON data:
  if(req.method == 'POST' && req.url == '/greet') {
    res.writeHead(200, {"Content-Type": "text/plain"});
    req.on('data', function(data) {
      var parsed = JSON.parse(data.toString());
      res.write('Hello, ' + parsed.name + '!');
      res.end();
    });
  }

  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("File not found.");
  res.end();
}

var port = 8888;
http.createServer(onRequest).listen(port, function() {
  console.log('server started on port: ' + port);
});