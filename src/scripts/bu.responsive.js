//-------------------------------------------------------------------
// module   : bu
// directive: bu-responsive
// usage    :
//   <div bu-responsive="height"
//        bu-responsive-options="{'small': '300', 'large': '600'}">
//   </div>
//-------------------------------------------------------------------
angular.module('bu')
.directive('buResponsive', [
  'bu.console', 'bu.events', 'bu.settings', 'bu.utility',

  function($c, $e, $settings, $u) {
    var SPECIFICATION = {
      name    : 'buResponsive',
      options : [ 'small', 'large' ],
      defaults: {
        small: $settings.RESPONSIVE_SMALL,
        large: $settings.RESPONSIVE_LARGE,
      }
    };
    var $console = $c.instance('bu-responsive');

    function linker(scope, element, attrs) {
      var options = $u.createOptions(SPECIFICATION, attrs);
      var orientation = element.attr('bu-responsive');

      // sanity checks
      if (!orientation || (orientation !== 'height' && orientation !== 'width')) {
        $console.debug('orientation - ' + (orientation || 'undefined'));
        $console.error('orientation must be either of "height" and "width"');
      }

      function apply() {
        var value, small, large;

        small = parseInt(options.small);
        large = parseInt(options.large);

        if (orientation === 'height') {
          value = element[0].offsetHeight;
        } else if (orientation === 'width') {
          value = element[0].offsetWidth;
        }
        element.removeClass("small medium large");
        if (value <= small) {
          element.addClass('small');
          $console.debug('small - ' + value);
        } else if (value > small && value < large) {
          element.addClass('medium');
          $console.debug('medium - ' + value);
        } else {
          element.addClass('large');
          $console.debug('large - ' + value);
        }
      }

      scope.$watch(function() { apply(); });
      apply();
    }

    return {
      restrict: 'A',
      scope   : false,
      link    : linker
    };
  }
]);
