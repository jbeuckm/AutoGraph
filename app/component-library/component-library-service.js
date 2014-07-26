angular.module('AutoGraph').factory('componentLibraryService', function($http) {

    return {

        loadComponentLibrary: function(libraryJSON) {

            return $http.get(libraryJSON)
                .then(function(result) {
                    return result.data;
                });
        }

    };

});
