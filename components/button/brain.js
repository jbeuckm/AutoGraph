(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

        element.on('click', function(){
            console.log(element);
            element.addClass('flash');
            setTimeout(function(){
                element.removeClass('flash');
            }, 500);
            scope.generateTick();
        });
    };

    this.controller = function($scope) {
//        console.log($scope);
    };

});
