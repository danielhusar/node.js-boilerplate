(function (window, document, undefined) {
	/**
   * Global namesapce
   *
   * @namespace: APP
   */
  function AppNamespace() {
		this.events = {};
		this.settings = {};
	}
  window.APP = new AppNamespace();
	
	_.mixin(_.str.exports());
	
	/**
   * Defining named conditions to be used by APP.when, APP.whenSome and APP.whenAll
   *
   * @namespace APP
   */
  APP.device = {
    'desktop'  : function () { return APP.device.ie() || Modernizr.mq('only screen and (min-width: 1025px)'); },
    'tablet'   : function () { return (! APP.device.desktop()) && Modernizr.mq('only screen and (min-width: 569px)'); },
    'mobile'   : function () { return ! (APP.device.tablet() || APP.device.desktop()); },
    'ie'       : function () { return !! ($.browser.msie && ! APP.device.ieMobile()); }
  };
	
	/**
   * Function that will execute callback only if one of devices passes
   *
   * Especially useful for executing some for mobile only, tablets only, IE only etc.
   *
   * Sample Usage:
   *
   *   // Set up a namespace
   *   namespace('APP');
   *
   *   APP.for('mobile', callback);                      // => V will run the callback  (just for the mobile)
	 *   APP.for('desktop', callback);                     // => V will run the callback  (just for the desktop)
	 *   APP.for('mobile,desktop', callback);              // => V will run the callback  (for the mobile and desktop)

   *
   * @namespace APP
   * @chainable
   *
   * @param     {Anything}  conditions  If conditions is a string, named conditions would be used, otherwise, value would be casted to bool (described above)
   * @param     {Function}  callback    Callback to be triggered when conditions return true
   * @return    {Object}                APP Object (so you can chain methods)
   */
  APP.for = function (conditions, callback) {
    var result;
    var method;

    if (_.isString(conditions))  {

      conditions = conditions.split(','); // create an array of device

      result     = _.some(conditions, function (condition) {
        return !! (_.result(APP.device, condition) || false);
      });

    }

    if (result) {
      callback();
    }

    return APP;
  }
	
	
	/**
   * Executes some code only on given pages
   *
   * Sample Usage:
   *
   *
   *   1. Given I am on 'home' page:
   *
   *     APP.onPages('home,contact', function (page) {
   *       console.log('Code Executed Successfully on page "' + page + '"');
   *     });
   *     // => Code Executed Successfully on page "home" (Pages allowed: "home,vod")
   *
   *
   *   2. Given I am on 'about' page:
   *
   *     APP.onPages('home,contact', function (page) {
   *       console.log('Code Executed Successfully on page "' + page + '"');
   *     });
   *     // (nothing happens)
   *
   *
   *
   *
   * @chainable
   *
   * @param  {String}   pageName  Comma separated page names to execute callback on, if 'all' is provided, will always execute
   * @param  {Function} callback  Callback to execute, takes one param (string) - page name
   * @return {Object}             APP Object, chainable method
   */
	APP.onPages = function (pageNames, callback) {
    var pages;
    var currentPage;

    if (!_.isString(pageNames)) { pageNames = ''; }

    pages       = pageNames.split(',');
    currentPage = (window.location.pathname && window.location.pathname != '/') ? window.location.pathname : '/home';

    if (_.contains(pages, currentPage)) {
      callback(APP.settings.environment.page.path);
    }

    return APP;
  };

})(this, this.document);


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
