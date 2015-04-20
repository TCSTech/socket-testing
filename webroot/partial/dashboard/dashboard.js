var DashboardCtrl = function (socketIO) {
    'use strict';
    var self = this;
    this.messages=[];
    this.redis=[];

    this.sendMessage = function() {
        console.log(self.newMessage);
        socketIO.emit('chat message', self.newMessage);
        self.newMessage = '';
        return false;
    };

    socketIO.on('chat message', function(msg) {
        self.messages.push(msg);
    });

    socketIO.on('cpu update', function(theUpdate) {
        self.cpu = theUpdate;
    });

    socketIO.on('redis', function(values) {
        self.redis.push(values);
    });
};
angular.module('socketTest').controller('DashboardCtrl', DashboardCtrl);