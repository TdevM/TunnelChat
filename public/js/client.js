/**
 * Created by Tridev on 26-01-2017.
 */

var socket = io();


function scrollToBottom() {
    //Selectors
    var messages =jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight+scrollTop + newMessageHeight + lastMessageHeight >=scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect',function(){
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('joinFromClient',params,function (err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No Error');
        }
    });

});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});


socket.on('updateUserList',function (users) {

    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {

        ol.append(jQuery('<li></li>').text(user));
        jQuery('#users').html(ol);
    });
    console.log('Users List',users);
});
socket.on('newMessageFromServer',function (message) {

    var template = jQuery('#message-template').html();
     var formattedTime = moment(message.timeStamp).format('h:mm a');

    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        timeStamp:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // console.log('New Message',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from},${formattedTime}: ${message.text}`)
    // jQuery('#messages').append(li);
});


socket.on('newLocationMessageFromServer',function (message) {

    var formattedTime = moment(message.timeStamp).format('h:mm a');
    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template,{
       from:message.from,
        url:message.url,
        timeStamp:formattedTime
    });
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from}, ${formattedTime}: `);
    // a.attr('href',message.url);
    // li.append(a);
    jQuery('#messages').append(html);
    scrollToBottom();

});

jQuery('#message-form').on('submit',function(e){
     e.preventDefault();

     var messageTextBox = jQuery('[name=message]');
     socket.emit('newMessageFromClient',{
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