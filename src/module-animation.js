/**
 * easyBanner module - Animation
 * @require jquery.easyBanner.js
 */

;(function ($, window, document, undefined) {
	var E = $.easyBanner,
		B = E.banner;

	/**
	 * 判定当前显示项的索引是否溢出
	 */
	B.determineIndex = function() {
		B.activeIndex =
		B.currentIndex =
		B.currentIndex === B.len ? 0 : B.currentIndex === -1 ? B.len - 1 : B.currentIndex;
	};

	/**
	 * 序列按钮和缩略图当前项高亮
	 */
	B.active = function() {
		B.determineIndex();

		if (B.options.serialBtn === true) {
			B.$serialBtn.eq(B.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (B.options.serialBtn === 'thumb') {
			B.$thumb.eq(B.activeIndex).addClass('active').siblings().removeClass('active');
		}
	};

	/**
	 * 缩略图的宽度超过容器的宽度时滚动
	 */
	B.thumbScroll = function() {

	},

	/**
	 * 动画效果 - 无
	 */
	B.none = function() {
		B.determineIndex();
		B.$item.eq(B.currentIndex).show().siblings().hide();
		B.active();
	};

	/**
	 * 动画效果 - 淡入淡出
	 */
	B.fade = function() {
		B.determineIndex();

		B.$list.animating = true;

		B.$item.removeClass().eq(B.currentIndex).addClass('top-item').css('opacity', 0);

		if (window.isSupportTransition) {
			B.$item.eq(B.currentIndex).addClass('transition-' + B.options.speed).css('opacity', 1);
			setTimeout(B.fadeComplete, B.options.speed);
		} else {
			B.$item.eq(B.currentIndex).animate({
				opacity: 1
			}, {
				duration: B.options.speed,
				complete: B.fadeComplete
			})
		}

		B.active();

		B.imgPreLoader(B.currentIndex);
	};

	/**
	 * 动画效果 - 滑动
	 */
	B.slide = function() {
		B.$item = B.$list.children();
		var lastIndex = B.$list.data('lastIndex'),
			slideDirection = 'left';

		if (B.currentIndex === lastIndex) {
			return;
		}

		clearInterval(self.playTimer);

		// 滑动动画在执行之前需要将第1个item克隆一份,
		// 还需要判定此次动画的方向，所以不能使用普通的索引判定方法
		if (B.currentIndex < lastIndex) {
			slideDirection = 'right';
		}

		// first item >> last item
		if (B.currentIndex < 0) {
			B.currentIndex = B.len - 1;
			B.$item.eq(B.len).show().siblings().hide();
			slideDirection = 'right';
		}

		// first item >> last item
		if (B.currentIndex > B.len) {
			B.currentIndex = 1;
			slideDirection = 'left';
		}

		if (slideDirection === 'right') {
			B.$list.css('left', '-100%');
		}

		B.$item.eq(B.currentIndex).show();


		// 使用CSS3 Transition进行动画过渡
		// 相对于jQuery的animate执行的动画，可以大幅度提升流畅度
		if (window.isSupportTransition) {
			setTimeout(function() {
				B.$list.animating = true;
				B.$list.css('left', slideDirection === 'left' ? '-100%' : 0)
					.addClass('transition-' + B.options.speed);

				setTimeout(B.slideComplete, B.options.speed - 20);
			}, 20);
		} else {
			B.$list.animating = true;
			B.$list.animate({
				left: slideDirection === 'left' ? '-100%' : 0
			}, {
				duration: B.options.speed,
				complete: B.slideComplete
			})
		}

		B.active();

		B.imgPreLoader(B.currentIndex);
	};

	/**
	 * fade动画的回调函数
	 */
	B.fadeComplete = function() {
		B.$list.animating = false;
		B.$item.eq(B.currentIndex).siblings().css('opacity', 0);
		if (B.options.autoPlay && !B.$list.hovered) {
			B.setPlayTimer();
		}
	};

	/**
	 * slide动画的回调函数 
	 */
	B.slideComplete = function() {
		if (B.currentIndex === B.len) {
			B.$item.first().show().siblings().hide();
			B.currentIndex = 0;
		}

		B.$list.animating = false;
		B.$list.css('left', 0).removeClass();
		B.$list.data('lastIndex', B.currentIndex);

		B.$item.eq(B.currentIndex).show().siblings().hide();

		if (B.options.autoPlay && !B.$list.hovered) {
			B.setPlayTimer();
		}
	}
})(jQuery, window, document);
