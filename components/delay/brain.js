(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

    };

    this.controller = function($scope) {

        $scope.processFunction = function(tickSource, inputs, callback) {
            console.log("process delay");
            console.log(tickSource);
            console.log($scope.component);

            setTimeout(function(){
                callback(null, inputs);
            }, $scope.component.delay);
        };

    };



});
