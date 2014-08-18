angular.module('AutoGraph').service('CursorMode', function(){

    this.setCursorMode = function(mode, object) {
        this.mode = mode;
        this.object = object;
    };

});
