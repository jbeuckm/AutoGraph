angular.module('AutoGraph').service('cursorModeService', function(){

    this.setCursorMode = function(mode, object) {
        this.mode = mode;
        this.object = object;
    };

});
