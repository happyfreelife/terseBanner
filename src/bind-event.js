
	/**
	 * 绑定事件
	 */
	Banner.prototype.bindEvent = function() {
		var self = this,
			options = self.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			transformProperty = Global.transformProperty,
			transformValue,
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

		var getCurrentPosition = function() {
			return parseInt($list.attr('style').match(/translate3d\((-?\d+)px/)[1]);
		};

		return {
			widthChangeEvent: function() {
				setInterval(function() {
					$item.width($banner.width());

					if (Global.isSupportTouch) {
						$list.width($item.width() * (self.len + 2));
					}

					if (options.animation === 'fade') {
						$list.prev().children().width($banner.width());
					}

					if (Global.isSupportTouch && !self.touching) {
						$list.css(transformProperty, 'translate3d(' + -$item.width() * (self.currentIndex + 1) + 'px, 0, 0)');

						currentPosition = getCurrentPosition();
					}
				}, 50);

				self.lazyload();
			},

			touchEvent: function() {
				if (!Global.isSupportTouch) return;

				$list.css({
					'transition-property': 'transform',
					'transition-duration': '0ms'
				});
				setTimeout(function() {
					$list.width($item.width() * (self.len + 2));
					$list.css(transformProperty, 'translate3d(' + -$item.width() + 'px, 0, 0)');
					$item.show();
				}, 50);

				function touchStart (e)  {
					if (self.isAnimated) return;

					self.touching = true;

					touch = e.touches[0];
					touchStartTime = Date.now();
					touchStartX = touch.pageX;
					touchStartY = touch.pageY;

					currentPosition = getCurrentPosition();
				}

				function touchMove (e) {
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchRangeX = touch.pageX - touchStartX;
					touchRangeY = touch.pageY - touchStartY;

					// 触摸水平滑动距离 小于 触摸垂直滑动距离时不执行滑动动画
					if (Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

					if (touchRangeX && !self.beforeUsed) {
						options.before.call(self, self.$elem, self.$item, self.currentIndex);
						self.beforeUsed = true;
					}

					if (touchRangeX < 0) {
						touchDirection = 'left';
					} else if (touchRangeX > 0) {
						touchDirection = 'right';
					}

					$list.css(transformProperty, 'translate3d(' + (currentPosition + touchRangeX) + 'px, 0, 0)');
				}

				function touchEnd (e) {
					if (self.isAnimated ||
						!touchRangeX ||
						Math.abs(touchRangeX) < Math.abs(touchRangeY)
					) return;

					if (e) e.preventDefault();

					self.isAnimated = true;

					touchDuration = Date.now() - touchStartTime;

					// 触摸停留时间小于300ms 或者
					// 触摸水平距离超过轮播宽度的一半时切换到下一个元素
					if (touchDuration < 300 || Math.abs(touchRangeX) >= $item.width() / 2) {
						if (touchDirection === 'left') {
							transformValue = 'translate3d(' + (currentPosition - $item.width()) + 'px, 0, 0)';
							self.currentIndex++;
						} else {
							transformValue = 'translate3d(' + (currentPosition + $item.width()) + 'px, 0, 0)';
							self.currentIndex--;
						}

						$list.css('transition-duration', '200ms');
						$list.css(transformProperty, transformValue);

						currentPosition = getCurrentPosition();

						self.currentIndex =
						self.currentIndex === -1 ? self.len - 1 :
						self.currentIndex === self.len ? 0 : self.currentIndex;

						self.activeBtnAndThumb();
					}

					// 触摸停留时间大于300ms 并且
					// 触摸水平距离小于轮播宽度的一半时回退到当前元素
					if (touchDuration >= 300 && Math.abs(touchRangeX) < $item.width() / 2) {
						transformValue = 'translate3d(' + currentPosition + 'px, 0, 0)';
						$list.css('transition-duration', '200ms');
						$list.css(transformProperty, transformValue);
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

						options.after.call(self, self.$elem, self.$item, self.currentIndex);

						self.touching = false;
						touchRangeX = 0;
						self.beforeUsed = false;

						self.lazyload(self.currentIndex);
					}, 200);
				}

				$banner[0].addEventListener('touchstart', touchStart, false);
				$banner[0].addEventListener('touchmove', touchMove, false);
				$banner[0].addEventListener('touchend', touchEnd, false);

				self.slideToPrev = function() {
					touchRangeX = $item.width() / 2;
					touchRangeY = 0;
					touchDirection = 'right';
					touchEnd();
				};

				self.slideToNext = function() {
					touchRangeX = $item.width() / 2;
					touchRangeY = 0;
					touchDirection = 'left';
					touchEnd();
				};
			}
		};
	};
