(function() {
  'use strict';

  /* @ngInject */
  function logger($log, toastr) {
    
    function error(message, data, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message, data);
    }

    function info(message, data, title) {
      toastr.info(message, title);
      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      toastr.success(message, title);
      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      toastr.warning(message, title);
      $log.warn('Warning: ' + message, data);
    }

    var service = {
      showToasts: true,

      error   : error,
      info    : info,
      success : success,
      warning : warning,

      // straight to console; bypass toastr
      log     : $log.log
    };

    return service;
  }

  angular
    .module('blocks.logger')
    .factory('logger', logger);
  
}());
