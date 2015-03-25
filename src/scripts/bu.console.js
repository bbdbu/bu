//-------------------------------------------------------------------
// module : bu
// service: bu.console
//
// usage  :
// - first instantiate context by calling $console.instance()
// - call log, info, warn, debug, error in two syntaxes
//   - $console.debug('hello')
//   - $console.debug('{0}', 'hello')
//   - $console.debug('{0} {1}', ['hello', 'world'])
// - data() is an alias for native log function for recursive object
//   debugging
//-------------------------------------------------------------------
angular.module('bu')
.factory('bu.console', [
  '$log', 'bu.settings',

  function($log, $settings) {
    var service = function(context) {
      this.context = context;
    };
    service.instance = function(context) {
      return new service(context);
    };
    service.supplant = function(str, o) {
      /* replace {0} with list element or value*/
      return str.replace(
        /\{([^{}]*)\}/g,
        function (a, index) {
          var value;
          if (angular.isArray(o)) {
            value = o[index];
          } else {
            value = o;
          }
          if (angular.isObject(value)) {
            return JSON.stringify(value, undefined, 2);
          } else if (angular.isString(value) || angular.isNumber(value)) {
            return value;
          } else {
            return index; // INVALID TYPE
          }
        }
      );
    };
    service.timestamp = function(date) {
      return service.supplant('{0}:{1}:{2}:{3}', [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ]);
    };
    service.prototype = {
      _log: function(alias, args) {
        var now, message;
        if (!$settings.LOGGING) return;

        now = service.timestamp(new Date());
        if (this.hasOwnProperty('context')) {
          message = service.supplant('{0} - {1}: {2}', [now, this.context, args[0]]);
        } else {
          message = service.supplant('{0}: {1}', [now, args[0]]);
        }

        if (args.length == 1) {
          $log[alias].call(null, message);
        } else if (args.length == 2) {
          $log[alias].call(null, service.supplant(message, args[1]));
        } else {
          $log.error.call(null, 'too many arguments');
        }
      },

      /* various aliases */
      log  : function() { this._log('log',   arguments); },
      info : function() { this._log('info',  arguments); },
      warn : function() { this._log('warn',  arguments); },
      debug: function() { this._log('debug', arguments); },
      error: function() { this._log('error', arguments); },

      data : function(obj) {
        if (!$settings.LOGGING) return;
        $log.log(obj);
      },
      assert: function() {
        if (!$settings.LOGGING) return;
        console.assert(arguments[0], arguments[1]);
      }
    };

    return service;
  }
]);
