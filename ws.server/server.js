var io = require('socket.io')(6001),
    Redis = require('ioredis'),
    redis = new Redis();

redis.psubscribe('*', function (error, count) {
    //
});

// from Laravel
redis.on('pmessage', function (pattern, channel, message) {
    message = JSON.parse(message);
    io.emit(message.event, message.data);
    console.log(channel, message);
});

// from Vue.js
io.on('connection', function(socket){

    // Добавлена новая заявка
    socket.on('ProposalAdd', function (data) {
        var data = data;
        socket.broadcast.emit('VueProposalAdded', data);
    });

    // Заявка завершена
    socket.on('ProposalFinish', function (data) {
        var data = data;
        socket.broadcast.emit('VueProposalFinished', data);
    });

    // Заявка удалена
    socket.on('ProposalDelete', function (data) {
        var data = data;
        socket.broadcast.emit('VueProposalDeleted', data);
    });

    // Завершение заявки
    socket.on('ProposalFinishing', function (data) {
        var data = data;
        socket.broadcast.emit('VueProposalFinishing', data);
    });

    // Удаление заявки
    socket.on('ProposalDeleting', function (data) {
        var data = data;
        socket.broadcast.emit('VueProposalDeleting', data);
    });

});