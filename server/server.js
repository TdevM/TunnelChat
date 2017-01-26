const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');


let app = express();
let port = process.env.port || 3000;
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    // socket.emit('newEmail',{
    //     from:'tga@live.in',
    //     text:'Hello, This was sent from the server',
    //     createdAt:123
    // });

    // socket.on('createEmail',(arrivedEmail)=>{
    //     console.log('An Email was Arrived',arrivedEmail);
    // });

    // socket.emit('newMessageFromServer',{
    //    from:'Tridev',
    //    text:'Hi! Welcome to my Chat App',
    //    timeStamp: new Date().getTime()
    // });


    socket.emit('newMessageFromServer',{
        from:'Admin New',
        text:'Welcome to Chat App',
        timeStamp: new Date().getTime()
    });

    socket.broadcast.emit('newMessageFromServer',{
        from:'Admin',
        text:'New User Joined',
        timeStamp: new Date().getTime()
    });

    socket.on('newMessageFromClient',(arrivedMessageFromClient)=>{
        console.log('New Message from client',arrivedMessageFromClient);

        io.emit('newMessageFromServer',{
            from:arrivedMessageFromClient.from,           // Emits an event to every single connection
            text:arrivedMessageFromClient.text,
            timeStamp: new Date().getTime()
        });

        // // socket.broadcast.emit('newMessageFromServer',{
        // //         from:arrivedMessageFromClient.from,
        // //         text:arrivedMessageFromClient.text,
        // //         timeStamp: new Date().getTime()
        // });
    });

    socket.on('disconnect',()=>{
        console.log('Disconnected from server');
    });
});


server.listen(port, () => {
    console.log(`Server Up on ${port}!`);
});
