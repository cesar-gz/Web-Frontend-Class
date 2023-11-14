var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

console.log('Web Sockets Server started');
var messages = [];

ws.on('connection', function(socket) {
  console.log('client connection established.');

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      var obj = JSON.parse(data);
      var str = JSON.stringify(obj);
      clientSocket.send(str);
      // clientSocket.send(data);
    });
  });
});
