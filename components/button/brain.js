(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

        element.on('click', function(){
            scope.receiveTick();
        });
    };

    this.controller = function($scope) {
        console.log($scope);
    };

});
