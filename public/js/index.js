/**
 * Created by Tridev on 26-01-2017.
 */

var socket = io();
socket.on('connect',function(){
    console.log('Connected to server');

    // socket.emit('createEmail',{
    //     from:'tga@live.in',
    //     to:'cr14b17@gmail.com',
    //     text:'Hello, This was sent from the client',
    //     createdAt:123
    // });

    socket.emit('newMessageFromClient',{
       from:'Mishra',
       text:'Hello, Your Chat app is just Awesome!',
        timeStamp: new Date().getTime()
    });
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessageFromServer',function (message) {
    console.log('New Message Arrived',message);
});
//
// socket.on('newEmail',function (email) {
//     console.log('New Email Arrived',email);
// });