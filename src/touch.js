
	/**
	 * 绑定事件
	 */
	Banner.prototype.touch = function() {
		var s = this,
			o = s.option,
			$banner = s.$banner,
			$list = s.$list,
			$item = $list.children(),
			transform = Util.TRANSFORM,
			listOffset,      // 列表当前的偏移量
			listTarget,      // 列表滑动的目标位置
			touch,           // 触摸事件
			touchStartTime,  // 触摸开始时刻
			touchStartX,     // 触摸开始的X坐标
			touchStartY,     // 触摸开始的X坐标
			touchRangeX,     // 触摸水平滑动距离
			touchRangeY,     // 触摸垂直滑动距离
			touchDirection,  // 触摸方向
			touchDuration;   // 触摸持续时间

		function getListOffset() {
			return parseInt($list.attr('style').match(/translate3d\((-?\d+)px/)[1]);
		}

		$list.css({
			transitionProperty: 'transform',
			transitionDuration: '0ms'
		});

		setTimeout(function() {
			$list.width($item.width() * (s.len + 2));
			$list.css(transform, 'translate3d(' + -$item.width() + 'px, 0, 0)');
			$list.children().show();
		}, 50);

		function touchStart (e)  {
			if (s.isAnimated) return;

			s.touching = true;

			touch = e.touches[0];
			touchStartTime = Date.now();
			touchStartX = touch.pageX;
			touchStartY = touch.pageY;

			listOffset = getListOffset();
		}

		function touchMove (e) {
			if (s.isAnimated) return;

			touch = e.touches[0];
			touchRangeX = touch.pageX - touchStartX;
			touchRangeY = touch.pageY - touchStartY;

			// 触摸水平滑动距离 小于 触摸垂直滑动距离时不执行滑动动画
			if (Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

			e.preventDefault();

			if (touchRangeX < 0) {
				touchDirection = 'left';
			} else if (touchRangeX > 0) {
				touchDirection = 'right';
			}

			$list.css(transform, 'translate3d(' + (listOffset + touchRangeX) + 'px, 0, 0)');
		}

		function touchEnd (e) {
			if (s.isAnimated || !touchRangeX || Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

			s.isAnimated = true;

			touchDuration = Date.now() - touchStartTime;

			// 触摸停留时间小于300ms 或者
			// 触摸水平距离超过轮播宽度的一半时切换到下一个元素
			if (touchDuration < 300 || Math.abs(touchRangeX) >= $item.width() / 2) {
				o.before.call(s, s.$banner, s.$item, s.currentIndex);
				
				if (touchDirection === 'left') {
					listTarget = 'translate3d(' + (listOffset - $item.width()) + 'px, 0, 0)';
					s.currentIndex++;
				} else {
					listTarget = 'translate3d(' + (listOffset + $item.width()) + 'px, 0, 0)';
					s.currentIndex--;
				}

				$list.css({
					transitionDuration: o.speed / 3 + 'ms',
					transform: listTarget
				});

				listOffset = getListOffset();

				s.lazyload(s.currentIndex);

				s.btnActive();
			}

			// 触摸停留时间大于300ms 并且
			// 触摸水平距离小于轮播宽度的一半时回退到当前元素
			if (touchDuration >= 300 && Math.abs(touchRangeX) < $item.width() / 2) {
				listTarget = 'translate3d(' + listOffset + 'px, 0, 0)';
				$list.css('transitionDuration', '200ms');
				$list.css(transform, listTarget);
			}

			setTimeout(function() {
				$list.css('transitionDuration', '0ms');

				// 切换到最后一个元素时
				if (!listOffset) {
					listOffset = -$item.width() * s.len;
					$list.css(transform, 'translate3d(' + listOffset + 'px, 0, 0)');
				}

				// 切换到第一个元素时
				if (listOffset === -$item.width() * (s.len + 1)) {
					listOffset = -$item.width();
					$list.css(transform, 'translate3d(' + listOffset + 'px, 0, 0)');
				}

				s.currentIndex =
				s.currentIndex === -1 ? s.len - 1 :
				s.currentIndex === s.len ? 0 : s.currentIndex;

				touchRangeX = 0;
				s.isAnimated = false;
				s.touching = false;

				o.after.call(s, s.$banner, s.$item, s.currentIndex);
			}, o.speed / 3);
		}

		$banner[0].addEventListener('touchstart', touchStart, false);
		$banner[0].addEventListener('touchmove', touchMove, false);
		$banner[0].addEventListener('touchend', touchEnd, false);

		s.slidePrev = function() {
			touchRangeX = $item.width() / 2;
			touchRangeY = 0;
			touchDirection = 'right';
			touchEnd();
		};

		s.slideNext = function() {
			touchRangeX = $item.width() / 2;
			touchRangeY = 0;
			touchDirection = 'left';
			touchEnd();
		};

		// 视口宽度发生改变时，列表和列表项自动更改宽度
		setInterval(function() {
			if (Util.IS_MOBILE && !s.touching) {
				$item.width($banner.width());
				$list.width($item.width() * (s.len + 2));
				$list.css(Util.TRANSFORM, 'translate3d(' + -$item.width() * (s.currentIndex + 1) + 'px, 0, 0)');

				listOffset = getListOffset();
			}
		}, 50);
	};
