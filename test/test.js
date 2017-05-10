$(function() {
	requirejs.config({
		baseUrl: '../src',
		paths: {
			main: 'main'
		}
	});
	
	define(['main'], function() {
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
				console.log('after: ' + currentIndex);
				
			}
		});
	});
});