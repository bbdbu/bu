//-------------------------------------------------------------------
// module : bu
// service: bu.images
//-------------------------------------------------------------------
angular.module('bu')
.factory('bu.images', ['bu.console', '$q',
  function($c, $q) {
    var service = {};
    var $console = $c.instance('bu.images');

    function load(src) {
      var defer = $q.defer();
      var image = new Image();

      image.src = src;
      image.onload = function() {
        $console.debug('finished loading\n' + src + ' (width: ' + image.width + ', height: ' + image.height + ')');
        defer.resolve({ width : image.width, height: image.height });
      };
      $console.debug('started loading\n' + src);
      return defer.promise;
    }

    service.load = load;
    return service;
  }
]);
