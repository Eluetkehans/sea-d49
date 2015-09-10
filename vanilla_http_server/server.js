'use strict';

var http = require('http');
var fs = require('fs');

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
    var parsed;
    req.on('data', function(data) {
      parsed = JSON.parse(data);
      parsed = parsed.name;
    });
    req.on('end', function() {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("Hello, " + parsed + "!");
      return res.end();
    });
    return;
  }

  if(req.method == 'POST' && req.url == '/notes') {
    var parsed;
    req.on('data', function(data) {
      parsed = JSON.parse(data);
      fs.readdir(__dirname + "/data", function(err, files) {
        fs.write(__dirname + "/" + files.length + ".JSON", parsed, callback() {
          if(err) return err
        });
      });
    });
    req.on('end', function() {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("JSON saved");
      return res.end;
    });
    return;
  }

  if(req.method == 'GET' && req.url == '/notes') {
    res.writeHead(200, {"Content-Type": "text/plain"});
    var files = fs.readdir(__dirname + "/data", function(err, files) {
      if(err) return err;
      res.write("The files " + files + " are saved to server");
      return res.end;
    });
    return;
  }

  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("File not found.");
  res.end();
}

var port = 8888;
http.createServer(onRequest).listen(port, function() {
  console.log('server started on port: ' + port);
});