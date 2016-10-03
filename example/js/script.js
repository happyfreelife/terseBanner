$(function() {
	if (/msie (6.0|7.0|8.0)/i.test(navigator.userAgent)) {
		document.write('您的浏览器版本过低，此页面无法正常显示，请先升级浏览器！');
	}

	// 代码高亮
	try {
		hljs.configure({tabReplace: '	'});
		hljs.initHighlightingOnLoad();
		
		$('pre code').each(function() {
			$(this).text($(this).text().replace('\n', ''));
		});
	} catch (e) {}

	// 锚点滚动
	$.fn.anchorScroll = function(option) {
		return this.each(function() {
			var options = $.extend({
				fixed: 0,
				offset: 0
			}, {}, typeof option === 'object' && option);

			var $anchorMenu = $(this),
				$anchorItem = $anchorMenu.find('a'),
				pageIsScrolling = false;

			// 点击锚点时页面滚动
			$anchorItem.click(function(e) {
				e.preventDefault ? e.preventDefault() : e.returnValue = false;

				pageIsScrolling = true;

				try {
					var $target = $($(this).attr('href'));

					$('html, body').stop(true, false).animate({
						scrollTop: $target.offset().top + options.offset
					}, function() {
						pageIsScrolling = false;
					});

					$(this).addClass('active').siblings().removeClass('active');
				} catch (e) {}
			});

			$(window).on('scroll DOMContentLoaded load', function() {
				// 固定锚点菜单
				if ($(window).scrollTop() > options.fixed) {
					$anchorMenu.addClass('fixed').css({
						position: 'fixed',
						marginTop: 0,
						marginBottom: 0
					});
				} else {
					$anchorMenu.removeAttr('style').removeClass('fixed');
				}

				// 锚点菜单对应项添加高亮样式
				if (!pageIsScrolling) {
					$anchorItem.each(function() {
						try {
							var $target = $($(this).attr('href'));

							if ($(window).scrollTop() >= $target.offset().top + options.offset) {
								$(this).addClass('active').siblings().removeClass('active');
							} else {
								$(this).removeClass('active');
							}
						} catch (e) {}
					});
				}
			});
		});
	};
});

$(function() {
	$('.side').anchorScroll({
		fixed: 0,
		offset: -10
	});

	$('#top .banner').terseBanner();


	$('#custom').terseBanner({ arrow: true });


	$('#select').on({
		'mouseenter': function() {
			$(this).addClass('active');
		},
		'mouseleave': function() {
			$(this).removeClass('active');
		}
	});

	var animationDOM = $('#animation')[0].outerHTML;
	$('#animation').terseBanner({
		arrow: true,
		animation: 'fade'
	});

	$('#select a').click(function() {
		$('#select').trigger('mouseleave');

		var currentAnimation = $(this).text();

		if ($('#select span').text() !== currentAnimation) {
			$('#select span').text(currentAnimation);

			$('#animation').animate({
				left: '100%',
				opacity: 0
			}, function() {
				$(this).remove();
				$('#select').after(animationDOM);
				$('#animation').terseBanner({
					arrow: true,
					animation: currentAnimation
				});
			});
		}
	});


	$('#thumb').terseBanner({
		btn: false,
		thumb: {
			width: 150,
			height: 84,
			gap: 4,
			visible: 3
		}
	});

	$('#adaptive').terseBanner({ adaptive: true });
	var minWidth = 560,
		maxWidth = 960,
		step = 100;

	$('#scale a').click(function() {
		var bannerWidth = $(this).hasClass('larger') ? Math.min(maxWidth, $('#adaptive').width() + step) :
		Math.max(minWidth, $('#adaptive').width() - step);

		$('#adaptive').stop(true, false).animate({ width: bannerWidth }, 300);
	});


	var lazyloadDOM = $('#lazyload')[0].outerHTML;
	function addTimeStamp() {
		$('#lazyload ul li img').each(function() {
			$(this).attr('data-src', $(this).attr('data-src') + '?' + Date.now());
		});
	}

	addTimeStamp();
	$('#lazyload').terseBanner({
		arrow: true,
		adaptive: true,
		// animation: 'fade'
	});

	$('#reload').click(function() {
		$('#lazyload').animate({
			left: '100%',
			opacity: 0
		}, function() {
			$(this).remove();
			$('#reload').after(lazyloadDOM);

			addTimeStamp();
			$('#lazyload').terseBanner({
				arrow: true,
				adaptive: true,
				// animation: 'fade'
			});
		});
	});
});
