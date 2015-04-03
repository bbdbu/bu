//-------------------------------------------------------------------
// module: bu - buk content presentation
// event : BU:RESIZE
//-------------------------------------------------------------------
angular.module('bu', [])
.run(['$window', '$rootScope', 'bu.settings', 'bu.events', function($window, $rootScope, $settings, $e) {
  // window resize event //
  angular.element($window).bind('resize orientationchange', _.throttle(function(e) {
    $e.fire('bu', 'BU:RESIZE');
  }, $settings.RESIZE_INTERVAL, { leading: false, trailing: true }));
}]);
