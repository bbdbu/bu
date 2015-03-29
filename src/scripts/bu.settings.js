//-------------------------------------------------------------------
// module : bu
// service: bu.settings
//
// (note)
// - please check preprocess configuration for certain flags
//-------------------------------------------------------------------
angular.module('bu')
.value('bu.settings', {
  // bu.console //

  /* jshint ignore:start */
  LOGGING: !('/* @echo build */' === 'release'), /* logging (disable/enable) */
  /* jshint ignore:end */

  // resizing interval //
  RESIZE_INTERVAL: 200, /* unit: ms */

  // bu.responsive //
  RESPONSIVE_SMALL : 320,
  RESPONSIVE_LARGE : 640,

  // bu.background //
  BG_SIZE    : 'cover',
  BG_POSITION: 'center',
  BG_REPEAT  : 'no-repeat'
});
