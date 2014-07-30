angular.module('AutoGraph').factory('AutographSerializerService', function() {

    return {
        loadAutograph: function() {
            var string = localStorage.getItem('autograph');
            if (string) {
                return JSON.parse(string);
            } else {
                return {};
            }
        },

        saveAutograph: function(placedComponents) {
            localStorage.setItem('autograph', JSON.stringify(placedComponents));
        }
    };

});
