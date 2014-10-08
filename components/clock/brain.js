(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

    };

    this.controller = function($scope) {

        $scope.interval = function() {
            console.log('clock tick');
            $scope.generateTick();
        };

        $scope.interval = setInterval($scope.interval, 500);



        $scope.processFunction = function(tickSource, inputs, callback) {

            console.log('tickSource = '+tickSource);

            setTimeout(function(){
                callback(null, inputs);
            }, $scope.component.period);

        };

    };

});
