const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const {generateMessage,sendLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var app = express();
const port = process.env.port || 3000;
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
var users = new Users();

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('joinFromClient',(params,callback)=>{
        "use strict";

        if(!isRealString(params.name) || !isRealString(params.name)){
           return callback('Name and room name are require');
        }


        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessageFromServer',generateMessage('Admin','Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessageFromServer',generateMessage(`Admin: ${params.name} Joined`));

        callback();
    });

    socket.on('newMessageFromClient',(arrivedMessageFromClient,callback)=>{
        console.log('New Message from client',arrivedMessageFromClient);

        var user = users.getUser(socket.id);
        if(user  && isRealString(arrivedMessageFromClient.text)){
            io.to(user.room).emit('newMessageFromServer',generateMessage(user.name,arrivedMessageFromClient.text));

        }
        callback('This is from the server')

    });


    socket.on('sendLocationFromClient',(coords)=>{
        "use strict";
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessageFromServer',sendLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessageFromServer',generateMessage('Admin',`${user.name} left`));

        }
        console.log('Disconnected from server');
    });
});


server.listen(port, () => {
    console.log(`Server Up on ${port}!`);
});
