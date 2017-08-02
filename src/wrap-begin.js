;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function (jQuery) {
			factory(jQuery, window, document);
		});
	} else if (typeof module === 'object' && typeof module.exports) {
		module.exports = factory(require('jQuery'), window, document);
	} else {
		factory(jQuery, window, document);
	}
}(window, function ($, window, document) {