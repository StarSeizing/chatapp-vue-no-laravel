const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    console.log('Connected')

    socket.on('disconnect', () => {
      console.log('Disconnected');
    })

    socket.on('Created', (data) => {
      socket.broadcast.emit('Created', (data))
    })

  });

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(3000, () => {
  console.log('connect to localhost:3000');
});