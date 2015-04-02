//-------------------------------------------------------------------
// module: bu - buk content presentation
//-------------------------------------------------------------------
angular.module('bu', [])
.run(['$window', '$rootScope', 'bu.settings', function($window, $rootScope, $settings) {
  // window resize event //
  angular.element($window).bind('resize orientationchange', _.throttle(function(e) {
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

