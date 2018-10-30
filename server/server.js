const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer((app));
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.emit emits to one browser, io.emit emits to all connected browers, broadcast emits to all users except the user that emitted the original event
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // socket.emit emits to one browser, io.emit emits to all connected browers
    socket.on('createMessage', (newMessage) => {
        console.log('createMessage: ', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Starting chat server on port ${port}`);
});
