(function() {
  'use strict';

  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/movie',
        config: {
          templateUrl: 'scripts/movie/movie.html',
          controller: 'Movie',
          controllerAs: 'vm'
        }
      }
    ];
  }

  angular
    .module('app.movie')
    .run(appRun);
})();
