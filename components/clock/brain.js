(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

    };

    this.controller = function($scope) {

        $scope.interval = function() {
            $scope.generateTick();
        };

        $scope.interval = setInterval($scope.interval, 500);



        $scope.processFunction = function(tickSource, inputs, callback) {

            console.log('clock tickSource = '+tickSource);

            setTimeout(function(){
                callback(null, inputs);
            }, $scope.component.period);

        };

    };

});
