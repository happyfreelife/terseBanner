
	/**
	 * 绑定动画
	 */
	Banner.prototype.animate = function() {
		var s = this,
			o = s.option,
			$banner = s.$banner,
			$list = s.$list,
			$item = $list.children();

		// 单张图片时不使用任何动画
		if (s.len === 1) {
			$banner.find('.tb-arrow, .tb-btn').hide();
			return;
		}

		if (o.animation === 'slide') {
			s.animation = function() {
				var slidToLeft = true;

				if (s.currentIndex === s.latestIndex) return;

				if (s.currentIndex < s.latestIndex) {
					slidToLeft = false;
				}

				if (slidToLeft === false) {
					$list.css('left', '-100%');
				}

				$item.eq(s.currentIndex + 1).show();

				if (Util.IS_SUPPORT_TRANSITION) {
					setTimeout(function() {
						s.isAnimated = true;

						var listTransform = slidToLeft ?
							'translate3d(' + -$item.width() + 'px, 0, 0)' :
							'translate3d(' + $item.width() + 'px, 0, 0)';

						$list.css(Util.TRANSFORM, listTransform);

						setTimeout(slideCallback, o.speed - 50);
					}, 50);
				} else {
					s.isAnimated = true;

					$list.animate({
						left: slidToLeft? '-100%' : 0
					}, o.speed, slideCallback);
				}

				s.btnActive();
			};
		}
		
		if (o.animation === 'flash' || o.animation === 'fade') {
			s.animation = function() {
				handleCurrentIndex();

				s.isAnimated = true;

				$list.css('left', -s.currentIndex * 100 + '%');

				if (Util.IS_SUPPORT_TRANSITION) {
					$item.eq(s.currentIndex).css('opacity', 1);	
					setTimeout(fadeCallback, o.speed);	
				} else {
					$item.eq(s.currentIndex).animate({ opacity: 1 }, {
						speed: o.speed * 0.8,
						complete: fadeCallback
					});
				}

				s.btnActive();
			};
		}

		if (o.animation === 'none') {
			s.animation = function() {
				handleCurrentIndex();

				$item.eq(s.currentIndex).show().siblings().hide();
				$item.eq(s.currentIndex).addClass('active').siblings().removeClass('active');

				s.btnActive();

				afterCallback();
			};
		}

		function afterCallback() {
			o.after.call(s, s.$banner, s.$item, s.currentIndex);
		}

		// 处理可能会超出范围的索引
		function handleCurrentIndex() {
			s.currentIndex =
			s.currentIndex === s.len ? 0 :
			s.currentIndex === -1 ? s.len - 1 : s.currentIndex;
		}

		function slideCallback() {
			s.isAnimated = false;

			s.latestIndex =
			s.currentIndex =
			s.currentIndex === -1 ? s.len - 1 :
			s.currentIndex === s.len ? 0 : s.currentIndex;

			$list.css({
				left: 0,
				transition: 'none'
			});

			$list.css(Util.TRANSFORM, 'translate3d(0, 0, 0)');

			$item.eq(s.currentIndex + 1).show().siblings().hide();
			$item.eq(s.currentIndex + 1).addClass('active').siblings().removeClass('active');

			setTimeout(function() {
				$list.css('transition', 'transform ' + o.speed + 'ms');
			}, 50);

			afterCallback();

			if (s.useAuto && !s.isHovered) {
				s.setPlayTimer();
			}
		}

		function fadeCallback() {
			s.isAnimated = false;

			if (o.animation === 'fade') {
				$list.prev().css('left', -s.currentIndex * 100 + '%');
				$list.prev().html($list.html());
			}

			$item.eq(s.currentIndex).siblings().css('opacity', 0);
			$item.eq(s.currentIndex).addClass('active').siblings().removeClass('active');

			afterCallback();

			if (s.useAuto && !s.isHovered) {
				s.setPlayTimer();
			}
		}
	};
