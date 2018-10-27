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
    console.log('newMessage', msg);
});