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
        url: '/movie/:slug',
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
