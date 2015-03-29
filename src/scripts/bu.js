//-------------------------------------------------------------------
// module: bu - buk content presentation
//-------------------------------------------------------------------
angular.module('bu', [])
.run(['$window', '$rootScope', 'bu.settings', function($window, $rootScope, $settings) {
  // window resize event //
  angular.element($window).bind('resize orientationchange', _.throttle(function(e) {
    $rootScope.$apply(function() {
      /* force dirty check */
    });
  }, $settings['FLEX_RESIZE_INTERVAL'], {leading: false, trailing: true}));
}]);

