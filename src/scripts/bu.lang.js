//-------------------------------------------------------------------
// module   : bu
// directive: bu-lang - load google web font based on lang setting
// events   : BU:LANG:ACTIVE, BU:LANG:INACTIVE
// usage    :
//   <div class="bu content" bu-lang="en">
//     ...
//   </div>
//-------------------------------------------------------------------
angular.module('bu')
.directive('buLang', [
  '$window',
  'bu.console', 'bu.events', 'bu.settings', 'bu.langs', 'bu.fonts', 'bu.utility',

  function($window, $c, $e, $settings, $langs, $fonts, $u) {
    var $console = $c.instance('bu-lang');

    function linker(scope, element, attrs) {
      var fonts, code;

      /* sanity check */
      code = element.attr('bu-lang');
      if (!code || $langs[code.toLowerCase()] === undefined) {
        $console.error('unknown language code - ' + code);
      }

      /* get font list */
      if (code in $fonts) {
        fonts = $fonts[code];
      } else {
        $console.info('settings language to default - ' + $settings.LANG_DEFAULT);
        fonts = $fonts[$settings.LANG_DEFAULT];
      }

      /* load google web font */
      $window.WebFont.load({
        google: {
          families: [fonts.serif, fonts.sans, fonts.mono]
        },
        active  : function() {
          $console.debug('google fonts loaded');
          $e.fire('bu.lang', 'BU:LANG:ACTIVE');
        },
        inactive: function() {
          $console.debug('failed loading google fonts');
          $e.fire('bu.lang', 'BU:LANG:INACTIVE');
        }
      });
    }
    return {
      restrict: 'A',
      scope   : false,
      link    : linker,
    };
  }
]);
