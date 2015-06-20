(function() {
  'use strict';

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  /* @ngInject */
  function getRoutes() {
    return [
      {
        url: '/movie',
        config: {
          templateUrl: 'scripts/movie/movie.html',
          controller: 'MovieController',
          controllerAs: 'movie'
        }
      }
    ];
  }

  angular
    .module('app.movie')
    .run(appRun);
})();
