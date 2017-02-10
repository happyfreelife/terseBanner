

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
			transformProperty = Global.transformProperty,
			currentPosition, // 列表当前的位置
			touch,           // 触摸事件
			touchStartTime,  // 触摸开始时刻
			touchStartX,     // 触摸开始的X坐标
			touchStartY,     // 触摸开始的X坐标
			touchRangeX,     // 触摸水平滑动距离
			touchRangeY,     // 触摸垂直滑动距离
			touchRange,
			touchDirection,  // 触摸方向
			touchDuration;   // 触摸持续时间

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

					if (Global.isSupportTouch) {
						
					}
				}, 50);

				// 移动端需要自适应
				// ...

				self.lazyload();
			},

			touchEvent: function() {
				if (!Global.isSupportTouch) return;

				// $list.css('transition', 'none');
				$list.css({
					'transition-property': 'transform',
					'transition-duration': '0ms'
				});
				$list.css(transformProperty, 'translate3d(' + -$item.width() + 'px, 0, 0)');
				$item.show();

				currentPosition = -$item.width();

				function touchStart (e)  {
					e.preventDefault();
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchStartTime = Date.now();
					touchStartX = touch.pageX;
					touchStartY = touch.pageY;
				}

				function touchMove (e) {
					e.preventDefault();
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchRangeX = touch.pageX - touchStartX;
					touchRangeY = touch.pageY - touchStartY;

					// 触摸水平滑动距离 大于 触摸垂直滑动距离时执行滑动动画
					if (Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

					options.before.call(self, self.$elem, self.$item, self.currentIndex);

					if (touchRangeX < 0) {
						touchDirection = 'left';
					} else if (touchRangeX > 0) {
						touchDirection = 'right';
					}

					$list.css(transformProperty, 'translate3d(' + (currentPosition + touchRangeX) + 'px, 0, 0)');

					self.lazyload(self.currentIndex);
				}

				function touchEnd (e) {
					e.preventDefault();
					if (self.isAnimated) return;
					self.isAnimated = true;

					touchDuration = Date.now() - touchStartTime;

					var listTransform;

					// 触摸停留时间小于300ms 或者
					// 触摸水平距离超过轮播宽度的一半时切换到下一个元素
					if (touchDuration < 300 || Math.abs(touchRangeX) >= $item.width() / 2) {
						$list.css('transition-duration', '200ms');

						if (touchDirection === 'left') {
							listTransform = 'translate3d(' + (currentPosition - $item.width()) + 'px, 0, 0)';
							self.currentIndex++;
							currentPosition -= $item.width();
						} else {
							listTransform = 'translate3d(' + (currentPosition + $item.width()) + 'px, 0, 0)';
							self.currentIndex--;
							currentPosition += $item.width();
						}

						$list.css(transformProperty, listTransform);

						self.currentIndex =
						self.currentIndex === -1 ? self.len - 1 :
						self.currentIndex === self.len ? 0 : self.currentIndex;

						self.activeBtnAndThumb();
					}

					// 触摸停留时间大于300ms 并且
					// 触摸水平距离小于轮播宽度的一半时回退到当前元素
					if (touchDuration >= 300 && Math.abs(touchRangeX) < $item.width() / 2) {
						$list.css('transition-duration', '200ms');

						listTransform = 'translate3d(' + currentPosition + 'px, 0, 0)';
						self.currentIndex--;

						$list.css(transformProperty, listTransform);
					}

					setTimeout(function() {
						$list.css('transition-duration', '0ms');

						self.isAnimated = false;

						// 切换到第一个元素时
						if (!currentPosition) {
							currentPosition = -$item.width() * self.len;
							$list.css(transformProperty, 'translate3d(' + currentPosition + 'px, 0, 0)');
						}

						// 切换到最后一个元素时
						if (currentPosition === -$item.width() * (self.len + 1)) {
							currentPosition = -$item.width();
							$list.css(transformProperty, 'translate3d(' + currentPosition + 'px, 0, 0)');
						}
					}, 200);
				}

				$banner[0].addEventListener('touchstart', touchStart, false);
				$banner[0].addEventListener('touchmove', touchMove, false);
				$banner[0].addEventListener('touchend', touchEnd, false);
			}
		};
	};
}));





