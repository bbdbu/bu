//-------------------------------------------------------------------
// module : bu
// service: bu.events
//-------------------------------------------------------------------
angular.module('bu')
.factory('bu.events', [
  '$rootScope', '$window', '$timeout', '$q', 'bu.console',

  function($rootScope, $window, $timeout, $q, $c) {
    var service = {};
    var $console = $c.instance('bu.events');

    function fire(sender, ev, data) {
      $rootScope.$emit(ev, data);
    }
    function wait(waiter, ev, callback) {
      $console.debug('[' + waiter + '] waits on ' + ev);
      var unsubscribe = $rootScope.$on(ev, function(e, data) {
        $console.debug('[' + waiter + '] << ' + ev);
        if (callback) {
          callback(data);
        }
      });
      return unsubscribe;
    }
    service.fire = fire;
    service.wait = wait;

    return service;
  }
]);
