import _ from 'underscore';
import $ from 'jquery';
import imagesLoaded from 'imagesloaded';
import Backbone from 'backbone';

window._ = _;
window.$ = $;
window.jQuery = $;

Backbone.$ = $;

imagesLoaded.makeJQueryPlugin(window.$);

require('../components/iconic/client/iconic.min.js');
require('waypoints/lib/jquery.waypoints.js');
require('../lib/vendor/jquery.mobile.events.js');
require('../node_modules/jquery.finger/dist/jquery.finger.min.js');
require('../node_modules/jquery.ui.widget/jquery.ui.widget.js');
require('../node_modules/blueimp-file-upload/js/jquery.iframe-transport.js');
require('../node_modules/blueimp-file-upload/js/jquery.fileupload.js');
window.withinviewport = require('../node_modules/withinviewport/withinviewport.js');
withinviewport.defaults.top = -300;
withinviewport.defaults.bottom = -300;
require('../node_modules/withinviewport/jquery.withinviewport.js');
