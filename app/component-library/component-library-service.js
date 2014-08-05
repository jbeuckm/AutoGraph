angular.module('AutoGraph').factory('componentLibraryService', function ($rootScope, $document, $http, $q) {

    /**
     * Load the model template and create the directive for given component
     * @param slug
     */
    function loadComponent(path, slug) {

        var model;

        return $http.get(path + slug + '/model.json').then(function(result){
            model = result.data;

            angular.module('AutoGraph').compileProvider.directive(slug + "ComponentType", function () {
                return {
                    type: 'svg',
                    restrict: 'E',
                    replace: true,
                    templateUrl: '../components/' + slug + '/template.svg'
                };
            });

            return model;
        });

    }


    return {

        loadComponentLibrary: function (path) {

            return $http.get(path + 'components.json')
                .then(function (result) {

                    var promises = [];

                    for (var i in result.data) {
                        promises.push(loadComponent(path, result.data[i]));
                    }

                    return $q.all(promises).then(function (models) {
                        return models;
                    });

                });

        }

    };

});
