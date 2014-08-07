(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

        element.on('click', function(){
            console.log(scope.component.uuid);
            scope.receiveTick();
        });
    };

    this.controller = function($scope) {
        console.log($scope);
    };

});
