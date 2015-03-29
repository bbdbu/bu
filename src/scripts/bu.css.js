//-------------------------------------------------------------------
// module: bu
// directives:
// - buFontSize (font-size)
// - buColor (color)
// - buHeight (height)
// - buZIndex (z-index)
// - buPosition (position)
// - buFloat (float)
//-------------------------------------------------------------------
_([
  'font-size',       // buFontSize, bu-font-size
  'color',           // buColor, bu-color
  'height',          // buHeight, bu-height
  'width',           // buWidth, bu-width
  'z-index',         // buZIndex, bu-z-index
  'position',        // buPosition, bu-position
  'float',           // buFloat, bu-float
  'background-color',// buBackgroundColor, bu-background-color
  'text-align'       // buTextAlign, bu-text-align
])
.forEach(function(css) {

  // construct the directive name from a css property
  var directive = "bu" + css[0].toUpperCase() + css.substring(1).replace(/-(\w)/g, function(m) {
    return m[1].toUpperCase();
  });

  // declare directive
  angular.module('bu').directive(directive, [
    'bu.console',
    function($c) {
      return {
        restrict: 'A',
        scope   : false, // multiple directives cannot request isolated scopes.
        link    : function(scope, element, attrs) {
          var attribute = 'bu-' + css;
          var $console = $c.instance('bu.css');

          element.css(css, element.attr(attribute));

          /* watch for attribute value change */
          scope.$watch(function() {
            return element.attr(attribute);
          }, function(value) {
            element.css(css, value);
          });
        }
      };
    }
  ]);
});
