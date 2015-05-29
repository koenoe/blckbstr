(function() {
  'use strict';

  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/',
        config: {
          templateUrl: 'scripts/home/home.html',
          controller: 'Home',
          controllerAs: 'vm'
        }
      }
    ];
  }

  angular
    .module('app.home')
    .run(appRun);
})();
