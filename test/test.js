$(function() {
	requirejs.config({
		baseUrl: '../src',
		paths: {
			global       : 'global',
			init         : 'init',
			defaultStyle : 'default-style',
			setStyle     : 'set-style',
			addElement   : 'add-element',
			bindAnimation: 'animation',
			bindEvent    : 'bind-event',
			lazyload     : 'lazyload',
			main         : 'main'
		}
	});
	
	define(['init'], function() {
		$('#simple').terseBanner({
			arrow: true
		});

		$('#lazyload ul li img').each(function() {
			$(this).attr('data-src', $(this).attr('data-src') + '?' + Date.now());
		});
		$('#lazyload').terseBanner({
			arrow: true,
			adaptive: true
		});
	});
});