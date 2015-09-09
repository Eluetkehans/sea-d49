'use strict';

var net = require('net');
var fs = require('fs');

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    var path = __dirname + '/requests/' + Date();
    fs.writeFile(path, data, function(err) {
      if (err) return err;
      console.log("File saved at: " + path);
    });
  });
});

var port = 8888;
server.listen(port);
console.log("Server listening on port: " + port);
