function cpuLoadCtrl($scope) {
    var self = this,
        options = {
            chart: {
                title: 'My System'
            },
            height: 400,
            series: {
                0: {axis: 'CPU'},
                1: {axis: 'Mem'}
            },
            axes: {
                y: {
                    CPU: {label: 'Load Average'},
                    Mem: {label: 'Free Memory'}
                }
            }
        },
        data = new google.visualization.DataTable();

    data.addColumn('datetime', 'timestamp');
    data.addColumn('number', 'Load Average');
    data.addColumn('number', 'Free Memory');


    $scope.$watch(function () {
        return self.current;
    }, function (latest) {
        if (latest) {
            data.addRow([new Date(latest.timestamp * 1000), latest.loadavg[0], latest.freemem]);
            self.chart.draw(data, options);
        }
    }, true);
}

angular.module('socketTest').controller('cpuLoadCtrl', cpuLoadCtrl);

angular.module('socketTest').directive('cpuLoad', function () {
    return {
        restrict:         'E',
        replace:          true,
        scope:            {},
        bindToController: {
            current: '='
        },
        templateUrl:      'directive/cpu-load/cpu-load.html',
        link:             function (scope, element, attrs, cpuLoad) {
            console.log(element);
            cpuLoad.chart = new google.charts.Line(element[0]);
        },
        controller:       'cpuLoadCtrl',
        controllerAs:     'cpuLoad'
    };
});
