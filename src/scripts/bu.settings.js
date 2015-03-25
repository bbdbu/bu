//-------------------------------------------------------------------
// module : bu
// service: bu.settings
//
// (note)
// - please check preprocess configuration for certain flags
//-------------------------------------------------------------------
angular.module('bu')
.value('bu.settings', {
  /* bu.console */

  /* jshint ignore:start */
  LOGGING: !('/* @echo build */' === 'release'), /* logging (disable/enable) */
  /* jshint ignore:end */

  /* bu.flex */
  FLEX_RESIZE_INTERVAL: 200, /* unit: ms */
});
