//-------------------------------------------------------------------
// module : bu
// service: bu.page
//
// (usage)
// <div bu-page></div>
//-------------------------------------------------------------------
angular.module('bu').directive('buContent', [
  '$q', '$injector',
  'bu.console', 'bu.events', 'bu.settings', 'bu.utility',

  function($q, $injector, $c, $events, $settings, $u) {
    var SPECIFICATION = {
      name    : 'buContent',
      options : ['padding'],
      defaults: {
        padding: '0'
      }
    };
    var $console = $c.instance('bu.content');

    function linker(scope, element, attrs) {
      var options = $u.createOptions(SPECIFICATION, attrs);

      // apply options //
      element.css('padding', options.padding);
    }

    return {
      restrict: 'A',
      scope   : $u.createDirectiveScope(SPECIFICATION),
      link    : linker,
    };
  }
]);
