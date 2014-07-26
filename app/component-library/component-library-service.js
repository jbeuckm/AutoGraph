angular.module('AutoGraph').factory('componentLibraryService', function($http, $q) {

    return {

        loadComponentLibrary: function(path) {

            return $http.get(path + 'components.json')
                .then(function(result) {

                    var promises = [];

                    for (var i in result.data) {
                        promises.push($http.get(path + result.data[i] + '/model.json'));
                    }

                    return $q.all(promises).then(function(){
                        return arguments[0].map(function(d){ return d.data; });
                    });

                });
        }

    };

});
