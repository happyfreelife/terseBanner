requirejs.config({
	baseUrl: '../src',
	paths: {
		'jquery': '../lib/jquery-1.11.3.min'
	}
});

define([
	'jquery',
	'global',
	'banner',
	'init',
	'default-style',
	'set-style',
	'add-element',
	'bind-animation',
	'bind-event',
	'lazyload',
	'main'
], function($) {
	$('#simple').terseBanner({
		arrow: true
	});

	$('#lazyload ul li img').each(function() {
		$(this).attr('data-src', $(this).attr('data-src') + '?' + Date.now());
	});
	
	$('#lazyload').terseBanner({
		arrow: true,
		adaptive: true,
		auto: 0
	});

	$('#touch').terseBanner({
		after: function($banner, $item, currentIndex) {
			
		}
	});
	$(document).click(function() {
		$('#touch').terseBanner('next');
	});
});
