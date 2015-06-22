(function() {
  'use strict';

  /* @ngInject */
  function configure ($locationProvider, $logProvider, $routeProvider, $sceDelegateProvider, routehelperConfigProvider, exceptionHandlerProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // Whitelist external urls
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',

      'http://www.youtube.com/**',
      'http://letterboxd.com/**',
      'http://www.imdb.com/**',
      'http://image.tmdb.org/**'
    ]);

    // Enable html 5 routing instead of hashtags
    $locationProvider.html5Mode(true);

    // Configure the common route provider
    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    routehelperConfigProvider.config.docTitle = 'BLCKBSTR: ';

    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);
  }

  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[BLCKBSTR Error] ', //Configure the exceptionHandler decorator
    appTitle: 'BLCKBSTR',
    version: '1.0.0'
  };

  var core = angular.module('app.core');

  core.config(toastrConfig);
  core.value('config', config);
  core.config(configure);

})();