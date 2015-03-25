//-------------------------------------------------------------------
// module : bu
// service: bu.container
//
// (usage)
// <div bu-container
//      bu-container-mode="scroll"
//      bu-container-padding="1rem 2rem">
//   <div bu-content></div>
// </div>
//-------------------------------------------------------------------
angular.module('bu').directive('buContainer', [
  '$q', '$injector',
  'bu.console', 'bu.events', 'bu.settings', 'bu.utility',

  function($q, $injector, $c, $events, $settings, $u) {
    var SPECIFICATION = {
      name    : 'buContainer',
      options : ['mode', 'padding'],
      defaults: {
        mode   : 'page',
        padding: '0'
      }
    };
    var $console = $c.instance('bu.page');

    function linker(scope, element, attrs) {
      var options = $u.createOptions(SPECIFICATION, attrs);

      // apply options //
      element.css('padding', options.padding);
      if (options.mode === 'scroll') {
        element.css({ height: 'auto' });
      }
    }

    return {
      restrict: 'A',
      scope   : $u.createDirectiveScope(SPECIFICATION),
      link    : linker,
    };
  }
]);
