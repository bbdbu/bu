//-------------------------------------------------------------------
// module   : bu
// directive: bu-background
//-------------------------------------------------------------------
angular.module('bu')
.directive('buBackground', [
  'bu.settings',
  'bu.console', 'bu.utility', 'bu.images',

  function($settings, $c, $u, $images) {
    var $console = $c.instance('bu.background');
    var SPECIFICATION = {
      name    : 'buBackground',
      options : ['size', 'position', 'repeat'],
      defaults: {
        size    : $settings.BG_SIZE,
        position: $settings.BG_POSITION,
        repeat  : $settings.BG_REPEAT
      },
    };
    function linker(scope, element, attrs) {
      var options = $u.createOptions(SPECIFICATION, attrs);

      $images.load(attrs.buBackground)
      .then(function() {
        element.css({
          backgroundPosition: options.position,
          backgroundSize    : options.size,
          backgroundRepeat  : options.repeat,
          backgroundImage   : 'url(' + attrs.buBackground + ')',
        });
      });
    }
    return {
      restrict: 'A',
      scope   : $u.createDirectiveScope(SPECIFICATION),
      link    : linker,
    };
  }
]);
