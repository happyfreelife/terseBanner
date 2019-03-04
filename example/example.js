if (/msie (6.0|7.0|8.0|9.0)/i.test(navigator.userAgent)) {
	document.write('您的浏览器版本过低，此页面无法正常显示，请先升级浏览器！');
}

if (window.innerWidth < 768) {
	location.href = 'mobile.html';
}

$('[class^="banner-"] ul li').each(function() {
	$(this).css('backgroundColor', $(this).attr('bg'));
});

$('.code i').click(function() {
	$(this).toggleClass('active');
	$(this).next('.wrapper').toggle();
});

$(document).click(function(e) {
	if (!$(e.target).parents().hasClass('code') && $('.code i').hasClass('active')) {
		$('.code i').trigger('click');
	}
});
// requirejs.config({ baseUrl: '../src' });

// requirejs([
// 	'util', 'banner', 'style', 'init', 'arrow', 'btn', 'thumb', 'animate', 'touch', 'lazyload', 'main'
// ], function() {
	
// });
