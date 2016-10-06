

/**
 * 写入轮播元素的默认样式
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	
	Banner.prototype.defaultStyle = function() {
		var style =
			'.tb-list,\n' +
			'.tb-list > *,\n' +
			'.tb-thumb dl{\n' +
			'    position: relative;\n' +
			'    overflow: hidden;\n' +
			'}\n' +

			'.tb-list > * > *{\n' +
			'    position: relative;\n' +
			'    float: left;\n' +
			'    min-height: 1px;\n' +
			'    background-repeat: no-repeat;\n' +
			'    background-position: center top;\n' +
			'}\n' +
			'.tb-list > .touching{\n' +
			'    -webkit-transition-duration: 0ms !important;\n' +
			'    transition-duration: 0ms !important;\n' +
			'}\n' +

			'.tb-arrow{\n' +
			'    width: 95%;\n' +
			'}\n' +
			'.tb-arrow a{\n' +
			'    position: absolute;\n' +
			'    top: 0;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-arrow a.prev{\n' +
			'    left: 0;\n' +
			'}\n' +
			'.tb-arrow a.next{\n' +
			'    right: 0;\n' +
			'}\n' +
			'.tb-arrow a img{\n' +
			'    display: inline-block;\n' +
			'    max-height: 100%;\n' +
			'}\n' +

			'.tb-btn a{\n' +
			'    display: inline-block;\n' +
			'    width: 10px;\n' +
			'    height: 10px;\n' +
			'    margin: 0 5px;\n' +
			'    background-color: #fff;\n' +
			'    border-radius: 50%;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-btn a.active{\n' +
			'    background-color: #09c;\n' +
			'}\n' +

			'.tb-thumb{\n' +
			'    position: absolute;\n' +
			'    bottom: 10px;\n' +
			'    left: 0;\n' +
			'    width: 100%;\n' +
			'    overflow: hidden;\n' +
			'}\n' +
			'.tb-thumb a{\n' +
			'    position: absolute;\n' +
			'    width: 32px;\n' +
			'    height: 32px;\n' +
			'    background-repeat: no-repeat;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-thumb dl dd{\n' +
			'    position: relative;\n' +
			'    float: left;\n' +
			'    margin-left: 0;\n' +
			'    overflow: hidden;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-thumb dl dd img{\n' +
			'    position: relative;\n' +
			'    display: block;\n' +
			'    width: 100%;\n' +
			'}\n' +

			'.tb-loading{\n' +
			'    position: absolute;\n' +
			'    top: 0;\n' +
			'    left: 0;\n' +
			'    width: 100%;\n' +
			'    height: 100%;\n' +
			'}\n' +
			'.tb-loading img{\n' +
			'    position: absolute;\n' +
			'    left: 50%;\n' +
			'    width: 40px;\n' +
			'    height: 40px;\n' +
			'    margin-left: -20px;\n' +
			'}\n';

		if (!$('#tb-default-style').length) {
			$('head').append('<style id="tb-default-style">\n' + style + '</style>');
		}
	};
}));