(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {
/*
        element.on('click', function(){
            element.addClass('flash-fill');
            setTimeout(function(){
                element.removeClass('flash-fill');
            }, 500);
            scope.generateTick();
        });
*/
    };

    this.controller = function($scope) {
        console.log($scope);
        $scope.processFunction = function(inputs) {
            console.log("process counter");
            console.log(this);
            $scope.component.count++;
        };
    
    };
    


});
