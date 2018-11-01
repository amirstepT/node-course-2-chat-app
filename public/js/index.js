var socket = io();
            
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'jen@exmaple.com',
    //     text: 'Hey, what up yo'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) { // this is the listener for a custom event that we titled 'newEmail'
    //console.log('newMessage', msg);
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

socket.on('newLocationMessage', function (message) {
    //console.log('On location emitted');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    var formattedTime = moment(message.createdAt).format('h:mm a');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var locationButton = jQuery('#send-location'); // using $ instead of 'jQuery'
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    } else {
        locationButton.attr('disabled', 'disabled').text('Sending location...')
        //console.log('location emitting');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send location');
            //console.log('Got the location from getCurr Pos');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location.');
        });
    }

});

