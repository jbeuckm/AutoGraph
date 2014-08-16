angular.module('AutoGraph').factory('AutographSerializer', function() {

    return {
        loadAutograph: function() {
            var string = localStorage.getItem('autograph');
            if (string) {
                return JSON.parse(string);
            } else {
                return {
                    components: {},
                    wires: {}
                };
            }
        },

        saveAutograph: function(placed) {
            localStorage.setItem('autograph', JSON.stringify(placed));
        }
    };

});
