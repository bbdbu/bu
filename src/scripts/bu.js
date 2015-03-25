//-------------------------------------------------------------------
// module: bu - buk content presentation
//-------------------------------------------------------------------
angular.module('bu', [])
/* utility */
.factory('bu.utility', ['$rootScope', 'bu.console',
  function($rootScope, $c) {
    var service = {};
    var $console = $c.instance('bu.utility');

    function createOptions(spec, attrs) {
      var result = {};
      var value;

      /* step 1 - fill with defaults */
      if (angular.isDefined(spec.defaults)) {
        angular.extend(result, spec.defaults);
      }

      /* step 2 - override with "options" */
      if (angular.isDefined(attrs[spec.name + 'Options'])) {
        angular.extend(result,
          $rootScope.$eval(attrs[spec.name + 'Options']));
      }

      /* step 3 - override with individual attribute */
      angular.forEach(spec.options, function(option) {
        value = attrs[spec.name + option[0].toUpperCase() + option.slice(1)];
        if (angular.isDefined(value)) result[option] = value;
      });
      return result;
    }

    function createDirectiveScope(spec) {
      var result = {};
      result[spec.name + 'Options'] = '@';
      angular.forEach(spec.options, function(option) {
        result[spec.name + option[0].toUpperCase() + option.slice(1)] = '@';
      });
      $console.debug('scope string\n{0}', result);
      return result;
    }

    service.createOptions = createOptions;
    service.createDirectiveScope = createDirectiveScope;
    return service;
  }
]);
