(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

    };

    this.controller = function($scope) {
        console.log($scope);
        $scope.processFunction = function(tickSource, inputs, callback) {
            console.log("process counter");
            console.log(this);
            $scope.component.count++;
            callback(null, inputs);
        };
    
    };
    


});
