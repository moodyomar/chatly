const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io')

const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));


// Run when a client connects
io.on('connection', socket => {

  // Welcome current user
  socket.emit('message',formatMessage('Chatly bot','Welcome to Chatly!'));

  // Broadcast when a user connects
  socket.broadcast.emit('message',formatMessage('Chatly bot','A user has joined the chat'));

  // Runs when client disconnects
  socket.on('disconnect',() => {
    io.emit('message',formatMessage('Chatly bot','A user has left the chat'));
  });

  // listen for chatMessage
  socket.on('chatMessage',message => {
    io.emit('message',formatMessage('user',message))
    
  });
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT,() => console.log(`server running on port ${PORT}`))