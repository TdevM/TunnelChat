const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
var {generateMessage} = require('./utils/message');

let app = express();
let port = process.env.port || 3000;
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessageFromServer',generateMessage('Admin','Welcome to the Chat App'));

    socket.broadcast.emit('newMessageFromServer',generateMessage('Admin','New User Joined'));

    socket.on('newMessageFromClient',(arrivedMessageFromClient,callback)=>{
        console.log('New Message from client',arrivedMessageFromClient);

        io.emit('newMessageFromServer',generateMessage(arrivedMessageFromClient.from,arrivedMessageFromClient.text));
        callback('This is from the server')
    });

    socket.on('disconnect',()=>{
        console.log('Disconnected from server');
    });
});


server.listen(port, () => {
    console.log(`Server Up on ${port}!`);
});
