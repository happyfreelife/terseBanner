

/**
 * 绑定事件
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'lazyload'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('lazyload')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.bindEvent = function() {
		var self = this,
			options = self.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			touch,          // 触摸事件
			touchStartTime, // 触摸开始时刻
			touchStarX,     // 触摸开始的X坐标
			touchMoveX,     // 触摸进行时的X坐标
			touchRange,     // 触摸距离
			touchToLeft, // 触摸方向
			touchDuration,  // 触摸持续时间
			touchEndTime;   // 触摸结束时刻

		return {
			widthChangeEvent: function() {
				setInterval(function() {
					$item.width($banner.width());

					if (options.adaptive) {
						$list.height($item.filter(':visible').height());
						$banner.height($list.height());
					}

					if (options.animation === 'fade') {
						$list.prev().children().width($banner.width());
					}

					if (options.arrow) {
						self.$arrowBox.css('marginLeft', function() {
							return -self.$elem.width() / 2;
						});
					}
				}, 50);

				if ($.isNumeric(options.auto) && options.auto > 0) {
					self.useAuto = true;
					self.setPlayTimer();
				}

				self.lazyload();
			},

			touchEvent: function() {
				if (!Global.isSupportTouch) return;

				function touchStart (e)  {
					e.preventDefault();
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchStartTime = Date.now();
					touchStarX = touch.pageX - $banner.offset().left;
				}

				function touchMove (e) {
					e.preventDefault();
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchMoveX = touch.pageX - $banner.offset().left;
					touchRange = touchMoveX - touchStarX;

					options.before.call(self, self.$elem, self.$item, self.currentIndex);

					if (!$list.hasClass('touching')) {
						if (touchRange < 0) {
							touchToLeft = true;
							self.currentIndex++;
						} else if (touchRange > 0) {
							touchToLeft = false;
							self.currentIndex--;
						} else return;

						if (touchToLeft === false) {
							$list.css('left', '-100%');
						}

						$item.eq(self.currentIndex + 1).show();

						$list.addClass('touching');
					}

					$list.css(Global.transformProperty, 'translate3d(' + touchRange + 'px, 0, 0)');

					self.lazyload(self.currentIndex);
				}

				function touchEnd (e) {
					e.preventDefault();
					if (self.isAnimated || !touchRange) return;
					self.isAnimated = true;

					touchEndTime = Date.now();
					touchDuration = touchEndTime - touchStartTime;

					var listTransform;

					// 触摸速度足够或触摸距离超过轮播宽度的一半列表滑动
					if (touchDuration < 300 || Math.abs(touchRange) >= $item.width() / 2) {
						listTransform = touchToLeft ? 'translate3d(' + -$item.width() + 'px, 0, 0)' :
						'translate3d(' + $item.width() + 'px, 0, 0)';

						self.activeBtnAndThumb();
					}

					// 触摸速度过低并且触摸距离不超过banner宽度的一半，列表回拉
					if (touchDuration > 300 && Math.abs(touchRange) < $item.width() / 2) {
						listTransform = 'translate3d(0, 0, 0)';
						touchToLeft ? self.currentIndex-- : self.currentIndex++;
					}

					$list.removeClass('touching').css(Global.transformProperty, listTransform);

					setTimeout(function() {
						self.animation.slideCallback();
					}, options.duration);

					touchRange = 0;
				}

				$banner[0].addEventListener('touchstart', touchStart, false);
				$banner[0].addEventListener('touchmove', touchMove, false);
				$banner[0].addEventListener('touchend', touchEnd, false);
			}
		};
	};
}));





