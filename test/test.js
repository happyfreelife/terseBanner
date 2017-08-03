requirejs.config({
	baseUrl: '../src',
	paths: {
		'jquery': '../lib/jquery-1.11.3.min'
	}
});

define([
	'jquery',
	'util',
	'banner',
	'stylesheet',
	'init',
	'set-style',
	'add-element',
	'bind-animation',
	'touch',
	'lazyload',
	'main'
], function($) {
	$('.banner[id!="lazyload"]').each(function() {
		var animation = this.id;

		$(this).terseBanner({
			arrow: true,
			animation: animation || 'slide',
			useHover: true
		});
	});

	$('#lazyload ul li img').each(function() {
		$(this).attr('data-src', $(this).attr('data-src') + '?' + Date.now());
	});
	
	$('#lazyload').terseBanner({
		arrow: true,
		adaptive: true,
		auto: 0
	});


	$('#touch').terseBanner();

	$('#touch button').click(function() {
		$('#touch').terseBanner(this.className);
	});
});
