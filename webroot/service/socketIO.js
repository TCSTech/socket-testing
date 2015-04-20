/* @ngInject */
angular.module('socketTest').factory('socketIO',function($rootScope, $q) {
    'use strict';
    var socket = io.connect();

	var socketIO = {};
    socketIO.on = function(eventName, callback) {
        var deferred = $q.defer();
        socket.on(eventName, function() {
            var args = arguments;
            $rootScope.safeApply(function () {
                callback.apply(socket, args);
                deferred.resolve(args);
            });
        });
        return deferred.promise;
    };

    socketIO.emit = function(eventName, data, callback) {
        var deferred = $q.defer();
        socket.emit(eventName, data, function() {
            var args = arguments;
            $rootScope.safeApply(function () {
                if(callback) {
                    callback.apply(socket, args);
                    deferred.resolve(args);
                }
            });
        });
        return deferred.promise;
    };

	return socketIO;
});