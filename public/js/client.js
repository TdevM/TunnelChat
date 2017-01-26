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

    // socket.emit('newMessageFromClient',{
    //    from:'Mishra',
    //    text:'Hello, Your Chat app is just Awesome!',
    //  //   timeStamp: new Date().getTime()
    // },function (data) {
    //     console.log(data);
    // });
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessageFromServer',function (message) {
    console.log('New Message',message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
    "use strict";
     e.preventDefault();

     socket.emit('newMessageFromClient',{
         from:'User',
         text:jQuery('[name=message]').val()
     },function () {
         
     });
});