angular.module('AutoGraph').factory('componentLibraryService', function ($rootScope, $document, $http, $q) {

    /**
     * Load the model template and create the directive for given component
     * @param slug
     */
    function loadComponent(path, slug) {

        var d = $q.defer();

        $http.get(path + slug + '/model.json')
            .then(function(result){
                var model = result.data;

                var templateUrl = path + slug + '/template.svg';

                $http.get(templateUrl)
                    .catch(function(err){
                        templateUrl = "base-component/default-template.svg";
                    })
                    .finally(function(){

                        angular.module('AutoGraph').compileProvider.directive(slug + "ComponentType", function () {
                            return {
                                type: 'svg',
                                restrict: 'E',
                                replace: true,
                                templateUrl: templateUrl
                            };
                        });

                        d.resolve(model);
                    });

            })
            .catch(function(err){
                d.reject(err);
            });

        return d.promise;

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
