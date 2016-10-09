// var io = require('socket.io')(6001);

// io.on('connection', function (socket) {
//     console.log('New connection!', socket.id)

//     // Send Message
//     // socket.send('Message from server.')

//     // Fire Event
//     // socket.emit('serverInfo', {version: .1})


//     // socket.broadcast.send('New User')

//     // Join to room
//     // socket.join('vip', function(error){
//     //     console.log(socket.rooms)
//     // });
// });

var io = require('socket.io')(6001),
    Redis = require('ioredis'),
    redis = new Redis();

redis.psubscribe('*', function (error, count) {
    //
});

redis.on('pmessage', function (pattern, channel, message) {
    message = JSON.parse(message);
    io.emit(message.event, message.data);
    console.log(channel, message);
});