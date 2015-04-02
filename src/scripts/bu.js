//-------------------------------------------------------------------
// module: bu - buk content presentation
// event : BU:RESIZE
//-------------------------------------------------------------------
angular.module('bu', [])
.run(['$window', '$rootScope', 'bu.settings', 'bu.events', function($window, $rootScope, $settings, $e) {
  // window resize event //
  angular.element($window).bind('resize orientationchange', _.throttle(function(e) {
    $e.fire('bu', 'BU:RESIZE');
    $rootScope.$apply(function() { /* force dirty check */ });
  }, $settings.RESIZE_INTERVAL, { leading: false, trailing: true }));
}]);

// bu-lang="en"
// bu-lang="ko"
// font-loading basic styles .., 400, 700

// h1, h2, h3, h4, h5: sans
// pre code : fixed
// p table (header: sans, content: serif)
// quote (serif)
// ISO 639 two letter codes for languages
//

