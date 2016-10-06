

/**
 * Plugin construct function
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(window, document);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(window, document);
	} else {
		window.terseBanner = window.terseBanner || {};
		window.terseBanner.Banner = factory(window, document);
	}
}(window, function (window, document) {
	function Banner(elem, options) {
		this.$elem = $(elem);
		this.options = options;
	}

	return Banner;
}));