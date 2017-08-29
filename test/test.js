requirejs.config({
	baseUrl: '../src',
	paths: {
		
	}
});

requirejs([
	'util',
	'banner',
	'style',
	'init',
	'arrow',
	'btn',
	'thumb',
	'animate',
	'touch',
	'lazyload',
	'main'
], function() {
	$('.banner[id!="lazyload"][id!="thumb"]').each(function() {
		var animation = this.id;

		$(this).terseBanner({
			arrow: true,
			animation: animation || 'slide',
			useHover: true
		});
	});

	$('#lazyload ul li img').attr('data-src', function() {
		return $(this).attr('data-src') + '?' + Date.now();
	});

	$('#lazyload').terseBanner({
		arrow: true,
		adaptive: true,
		animation: 'fade',
		auto: 0
	});

	$('#thumb').terseBanner({
		adaptive: true,
		thumbWidth: 120
	});


	// 移动端
	$('#touch').terseBanner({
		arrow: true
	});
});
