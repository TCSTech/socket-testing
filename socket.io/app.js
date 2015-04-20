var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var monitor = require('os-monitor');
var redis = require('redis');
var util = require('util');

client=redis.createClient();
client.on('error', function(err) {
    console.log('Error: ' + err);
});



app.use(express.static('../webroot'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + 'index.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

var users = [];

io.on('connection', function(socket) {
    console.log('a user connnected');

    client.monitor(function(err, res) {
        console.log('Entering monitoring mode');
    });

    client.on('monitor', function (time, args) {
        console.log(time + ": " + util.inspect(args));
        io.emit('redis', args);
    });

    monitor.on('monitor', function(event) {
        io.emit('cpu update', event);
    });


    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('set username', function(username) {

    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

monitor.start({stream: true}).pipe(process.stdout);