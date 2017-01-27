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

    var formattedTime = moment(message.timeStamp).format('h mm a');
    console.log('New Message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from},${formattedTime}: ${message.text}`)
    jQuery('#messages').append(li);
});


socket.on('newLocationMessageFromServer',function (message) {
    var formattedTime = moment(message.timeStamp).format('h mm a');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}, ${formattedTime}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit',function(e){
     e.preventDefault();

     var messageTextBox = jQuery('[name=message]');
     socket.emit('newMessageFromClient',{
         from:'User',
         text:messageTextBox.val()
     },function () {
         jQuery(messageTextBox).val('');
     });
});

var locationButton = jQuery('#send-location');

 locationButton.on('click',function () {
     if(!navigator.geolocation){
         return alert('Geolocation not supported by your Browser');
     }

    // locationButton.attr('disabled,disabled').text('Sending Location...');
     navigator.geolocation.getCurrentPosition(function (position) {
       //  locationButton.removeAttr('disabled');
         console.log(position);
         socket.emit('sendLocationFromClient',{
            latitude:position.coords.latitude,
             longitude:position.coords.longitude
         });
     },function () {
       // locationButton.removeAttr('disabled');

         alert('Unable to fetch your Location');
     });
 });