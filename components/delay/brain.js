(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

    };

    this.controller = function($scope) {

        $scope.processFunction = function(tickSource, inputs, callback) {

            setTimeout(function(){
                callback(null, inputs);
            }, $scope.component.period);

        };

    };

});
