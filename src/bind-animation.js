
	/**
	 * 绑定动画
	 */
	Banner.prototype.bindAnimation = function() {
		var s = this,
			o = s.option,
			$banner = s.$elem,
			$list = s.$list,
			$item = $list.children(),
			$thumbBox = s.$thumbBox,
			$thumbList = s.$thumbList,
			$thumb = s.$thumb,
			$thumbSlideBtn = s.$thumbSlideBtn,
			thumbVisible,
			thumbListLeft,
			animation = s.animation = {};

		// 单张图片时，移除不必要的元素
		if (s.len === 1) {
			$banner.find('.tb-arrow, .tb-btn, .tb-thumb, [class$="duplicate"]').remove();
		}

		function afterCallback() {
			o.after.call(s, s.$elem, s.$item, s.currentIndex);
		}

		// 处理可能会超出范围的索引
		function handleCurrentIndex() {
			s.currentIndex =
			s.currentIndex === s.len ? 0 :
			s.currentIndex === -1 ? s.len - 1 : s.currentIndex;
		}

		animation.slide = function() {
			var slidToLeft = true;

			if (s.currentIndex === s.latestIndex) return;

			if (s.currentIndex < s.latestIndex) {
				slidToLeft = false;
			}

			if (slidToLeft === false) {
				$list.css('left', '-100%');
			}

			$item.eq(s.currentIndex + 1).show();

			if (Util.isSupportTransition) {
				setTimeout(function() {
					s.animating = true;

					var listTransform = slidToLeft ?
						'translate3d(' + -$item.width() + 'px, 0, 0)' :
						'translate3d(' + $item.width() + 'px, 0, 0)';

					$list.css(Util.transform, listTransform);

					setTimeout(s.animation.slideCallback, o.speed - 50);
				}, 50);
			} else {
				s.animating = true;

				$list.animate({
					left: slidToLeft? '-100%' : 0
				}, o.speed, s.animation.slideCallback);
			}

			s.activeBtnAndThumb();
		};

		animation.flash = 
		animation.fade = function() {
			handleCurrentIndex();

			s.animating = true;

			$list.css('left', -s.currentIndex * 100 + '%');

			if (Util.isSupportTransition) {
				$item.eq(s.currentIndex).css('opacity', 1);	
				setTimeout(s.animation.fadeCallback, o.speed);	
			} else {
				$item.eq(s.currentIndex).animate({ opacity: 1 }, {
					speed: o.speed * 0.8,
					complete: s.animation.fadeCallback
				});
			}

			s.activeBtnAndThumb();
		};

		animation.none = function() {
			handleCurrentIndex();

			$item.eq(s.currentIndex).show().siblings().hide();
			$item.eq(s.currentIndex).addClass('active').siblings().removeClass('active');

			s.activeBtnAndThumb();

			afterCallback();
		};

		animation.thumbListSlide = function() {
			if ($thumbList.is(':animated')) return;

			if ($.isNumeric(o.thumb.visible)) {
				thumbVisible = Math.min(o.thumb.visible,
					parseInt($banner.width() / $thumb.outerWidth(true)));
			} else {
				thumbVisible = parseInt($banner.width() / $thumb.outerWidth(true));
			}

			thumbListLeft = $.isNumeric(arguments[0]) ?
			arguments[0] : Math.max(
				-parseInt(s.activeIndex / thumbVisible) * $thumb.outerWidth(true) * thumbVisible,
				$thumbBox.width() - $thumbList.width()
			);

			// 禁用缩略图列表切换按钮
			$thumbList.stop(true, false).animate({ left: thumbListLeft }, function() {
				var thumbListLeft = parseInt($thumbList.css('left'));

				if (!thumbListLeft) {
					$thumbSlideBtn.filter('.prev').addClass('disabled').siblings('a').removeClass('disabled');
				} else if (Math.abs(thumbListLeft) + $thumbBox.width() === $thumbList.width()) {
					$thumbSlideBtn.filter('.next').addClass('disabled').siblings('a').removeClass('disabled');
				} else {
					$thumbSlideBtn.removeClass('disabled');
				}
			});
		};

		animation.slideCallback = function() {
			s.animating = false;

			s.latestIndex =
			s.currentIndex =
			s.currentIndex === -1 ? s.len - 1 :
			s.currentIndex === s.len ? 0 : s.currentIndex;

			$list.css({
				left: 0,
				transition: 'none'
			});

			$list.css(Util.transform, 'translate3d(0, 0, 0)');

			$item.eq(s.currentIndex + 1).show().siblings().hide();
			$item.eq(s.currentIndex + 1).addClass('active').siblings().removeClass('active');

			setTimeout(function() {
				$list.css('transition', 'transform ' + o.speed + 'ms');
			}, 50);

			afterCallback();

			if (s.useAuto && !s.isHovered) {
				s.setPlayTimer();
			}
		};

		animation.fadeCallback = function() {
			s.animating = false;

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
		};

		// 轮播初始化完成时调用的函数
		o.init.call(s, s.$elem, s.$item, 0);
		
		s.touch();
	};
