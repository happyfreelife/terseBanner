

/**
 * 轮播初始化
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'default-style',
			'add-element'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('default-style'),
			require('add-element')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.init = function() {
		this.$list = this.$elem.children().first();
		this.$item = this.$list.children();
		this.len = this.$item.length;
		this.currentIndex = 0;
		this.activeIndex = 0;
		this.latestIndex = 0;
		this.isHovered = false;
		this.isAnimated = false;

		// 在移动端，动画模式只能是slide
		if (Global.isSupportTouch) {
			this.options.animation = 'slide';
		}

		var self = this,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			options = this.options,
			thumbArr = [],
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		options.init.call(self, $banner, $item);

		if ($banner.css('position') === 'static') {
			$banner.css('position', 'relative');
		}

		$banner.css({
			tapHighlightColor: 'transparent',
			userSelect: 'none'
		});

		$list.width(self.len * 2 * 100 + '%').wrap('<div class="tb-list"/>');

		// 自适应模式
		if (options.adaptive) {
			if ($banner.css('maxWidth') === 'none') {
				$banner.css('maxWidth', '100%');
			}

			setTimeout(function() {
				$list.height($banner.height());
			}, 50);

			$item.each(function() {
				var $img = $(this).children('img'),
					src = $img.attr('src') || $img.attr('data-src');

				$img.css({
					display: 'block',
					maxWidth: '100%'
				});

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				}

				$(this).data('thumb', src);
			});
		}

		// 标准模式
		if (!options.adaptive) {
			$item.each(function() {
				var $img = $(this).children('img'),
					src = $img.attr('src') || $img.attr('data-src');

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				} else {
					$(this).css('backgroundImage', 'url(' + src + ')');
				}

				$(this).data('thumb', src).height($banner.height());

				$img.remove();
			});
		}

		$item.width($banner.width());

		if (self.len <= 1) return;

		// 获取图片缩略图的路径
		try {
			$item.each(function() {
				var thumb = $(this).data('thumb');

				thumbArr.push(thumb.match(regExp) ? thumb.match(regExp)[1] : thumb);

				self.thumbArr = thumbArr;
			});
		} catch (e) {}

		// animation: slide
		if (options.animation === 'slide') {
			if (Global.isSupportTransition) {
				$list.css(Global.transformProperty, 'translate3d(0, 0, 0)');
				$list.css('transition', 'transform ' + options.duration + 'ms');
			}

			$list.css('left', 0);
			$item.css('float', 'left').first().show().siblings().hide();
			$item.first().clone(true).addClass('first-clone').hide().appendTo($list);
			$item.last().clone(true).addClass('last-clone').hide().prependTo($list);
		}

		// animation: fade
		if (options.animation === 'fade') {
			$list.before($list.clone(true).css({
				position: 'absolute',
				top: 0,
				left: 0
			}));
		}

		// animation: fade || flash
		if (options.animation === 'fade' || options.animation === 'flash') {
			$item.first().siblings().css('opacity', 0);
		}

		self.defaultStyle();

		self.addElement().arrow();
	};
}));