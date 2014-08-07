(function() {

    this.link = function(scope, element, attributes, ctrl, transclude) {

        element.on('click', function(){
            console.log('hi')
        });
    };


});
