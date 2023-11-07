var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];

console.log('Web Sockets Server started on port: ' + port);

ws.on('connection', function (socket) {
  console.log('Client attempting to connect...');
  console.log('Client connection established.');

  messages.forEach(function (msg) {
    console.log('Loading Previous messages...');
    socket.send(msg);
  });

  socket.on('message', function (data) {
    console.log('A new message received: ' + data);
    messages.push(data); // this is saving every new message

    //socket.send(data);

    // send each client the message
    ws.clients.forEach(function (clientSocket) {
      clientSocket.send(data);
    });
  });
});
