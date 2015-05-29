(function() {
  'use strict';

  angular
    .module('app.movie')
    .run(appRun);

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/',
        config: {
          templateUrl: 'scripts/movie/movie.html',
          controller: 'Movie',
          controllerAs: 'vm'
        }
      }
    ];
  }
})();
