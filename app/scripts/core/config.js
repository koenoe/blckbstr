(function() {
  'use strict';

  /* @ngInject */
  function configure ($locationProvider, $logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

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