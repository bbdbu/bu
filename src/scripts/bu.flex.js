//-------------------------------------------------------------------
// module   : bu
// directive: bu-flex
//-------------------------------------------------------------------
angular.module('bu')
.directive('buFlex', ['$timeout', 'bu.console', 'bu.events', 'bu.settings',

  function($timeout, $c, $events, $settings) {
    var $console = $c.instance('bu-flex');

    function linker(scope, element, attrs) {
      var orientation = element.attr('bu-flex');

      //-------------------------------------------------------------
      // sanity checks
      //-------------------------------------------------------------
      if (!orientation || (orientation !== 'column' && orientation !== 'row')) {
        $console.debug('orientation - ' + (orientation || 'undefined'));
        $console.error('orientation must be either of "column" and "row"');
      }
      //-------------------------------------------------------------

      function reposition() {
        var total = 0, count = 0;
        var elem, attr;
        var children = element.children();

        // calculate current dimensions
        angular.forEach(children, function(child) {
          elem = angular.element(child);
          attr = elem.attr('bu-flex-element');

          // sanity checks //
          if (attr !== 'fixed' && attr !== 'expand') {
            $console.debug('flex element - ' + (attr || 'undefined'));
            $console.error('flex element must be either of "fixed" and "expand"');
          }

          if (orientation === 'row') {
            total = total + Math.ceil(elem.outerWidth(true));
          } else if (orientation === 'column') {
            total = total + Math.ceil(elem.outerHeight(true));
          }
          if (attr === 'expand') {
            count = count + 1;
          }
        });

        // HACK //
        total = total + 1; // avoid one pixel problem
        $console.debug('total - ' + total);

        // assign new dimensions
        angular.forEach(children, function(child) {
          elem = angular.element(child);
          attr = elem.attr('bu-flex-element');

          if (attr === 'expand') {
            /* split the remaining space */
            if (orientation === 'row') {
              elem.width(elem.width() + Math.floor((element.width() - total) / count));
            } else if (orientation === 'column') {
              elem.height(elem.height() + Math.floor((element.height() - total) / count));
            } else {
              $console.assert(false, 'invalid orientation - ' + orientation || 'undefined');
            }
          }
        });
      }

      function resizeHandler(value, old) {
        $console.debug('repositioning');
        $console.debug('old - ' + old + ', new - ' + value);

        if (value && angular.isDefined(attrs.buFlexEvent)) {
          $timeout(function() {
            $events.fire('bu.flex', attrs.buFlexEvent);
          });
        }
        value && reposition();
      }

      if (orientation === 'row') {
        /* remove span element spacing */
        element.contents().filter(function() {
          return this.nodeType === 3;
        }).remove();

        scope.$watch(function() {
          return element[0].offsetWidth;
        }, _.throttle(resizeHandler, $settings.FLEX_RESIZE_INTERVAL, {
          leading : false,
          trailing: true
        }));
      } else if (orientation === 'column') {
        scope.$watch(function() {
          return element[0].offsetHeight;
        }, _.throttle(resizeHandler, $settings.FLEX_RESIZE_INTERVAL, {
          leading : false,
          trailing: true
        }));
      } else {
        $console.assert(false, 'invalid orientation - ' + orientation || 'undefined');
      }

      reposition();
    }

    return {
      restrict: 'A',
      link    : linker,
    };
  }
]);
