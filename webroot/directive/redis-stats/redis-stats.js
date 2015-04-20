function redisStats($scope) {
    var self = this;
    //this.stats = [];
    //$scope.$watch(function() {
    //    return self.current;
    //}, function(val) {
    //    if(val) {
    //        self.stats.push(val);
    //    }
    //}, true);
}



angular.module('socketTest').controller('redisStats',redisStats).directive('redisStats', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
        bindToController: {
            current: '='
        },
		templateUrl: 'directive/redis-stats/redis-stats.html',
		link: function(scope, element, attrs, fn) {
		},
        controller: 'redisStats',
        controllerAs: 'redis'
	};
});
