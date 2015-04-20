angular.module('socketTest', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('socketTest').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('dashboard', {
        url: '/',
        templateUrl: 'partial/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'DB'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('socketTest').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    //google.load('visualization', '1.0', {'packages': ['corechart']});

});
