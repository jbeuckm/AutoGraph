angular.module('AutoGraph').factory('componentLibraryService', function ($rootScope, $document, $http, $q) {

    function loadDirective(url) {
        var d = $q.defer();

        function onScriptLoad(e) {
            $rootScope.$apply(function () {
                d.resolve(e);
            });
        }

        var scriptTag = $document[0].createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = true;
        scriptTag.src = url;
        scriptTag.onreadystatechange = function () {
            if (this.readyState == 'complete') onScriptLoad();
        };
        scriptTag.onload = onScriptLoad;

        var s = $document[0].getElementsByTagName('body')[0];
        s.appendChild(scriptTag);

        return d.promise;

    }


    return {

        loadComponentLibrary: function (path) {

            return $http.get(path + 'components.json')
                .then(function (result) {

                    var modelLoadingPromises = [];

                    for (var j in result.data) {
                        modelLoadingPromises.push($http.get(path + result.data[j] + '/model.json').then(function (model) {

                            angular.module('AutoGraph').compileProvider.directive(model.data.slug + "ComponentType", function () {
                                return {
                                    type: 'svg',
                                    restrict: 'E',
                                    replace: true,
                                    templateUrl: '../components/' + model.data.slug + '/template.svg'
                                };
                            });

                            return model;
                        }));
                    }

                    return $q.all(modelLoadingPromises).then(function () {
                        return arguments[0].map(function (d) {
                            return d.data;
                        });
                    });

                });

        }

    };

});
