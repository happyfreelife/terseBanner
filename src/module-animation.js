/**
 * easyBanner Module -  Animation
 * Require jquery.easyBanner.js
 */

$(function() {
	var E = $.easyBanner;

	E.setAnimation = function($obj) {
		var T = $obj;

		/**
		 * 判定当前显示项的索引是否溢出
		 */
		T.determineIndex = function() {
			T.activeIndex =
			T.currentIndex =
			T.currentIndex === T.len ? 0 : T.currentIndex === -1 ? T.len - 1 : T.currentIndex;
		};

		/**
		 * 序列按钮和缩略图当前项高亮
		 */
		T.active = function() {
			T.determineIndex();

			if (T.options.serialBtn === true) {
				T.$serialBtn.eq(T.activeIndex).addClass('active').siblings().removeClass('active');
			}

			if (T.options.serialBtn === 'thumb') {
				T.$thumb.eq(T.activeIndex).addClass('active').siblings().removeClass('active');
			}
		};

		/**
		 * 缩略图的宽度超过容器的宽度时滚动
		 */
		T.thumbScroll = function() {

	;},

		/**
		 * 动画效果 - 无
		 */
		T.none = function() {
			T.determineIndex();
			T.$item.eq(T.currentIndex).show().siblings().hide();
			T.active();
		};

		/**
		 * 动画效果 - 淡入淡出
		 */
		T.fade = function() {
			T.determineIndex();

			T.$list.animating = true;

			T.$item.removeClass().eq(T.currentIndex).addClass('top-item').css('opacity', 0);

			if (T.isSupportTransition) {
				T.$item.eq(T.currentIndex).addClass('transition-' + T.options.speed).css('opacity', 1);
				setTimeout(T.fadeComplete, T.options.speed);
			} else {
				T.$item.eq(T.currentIndex).animate({
					opacity: 1
				}, {
					duration: T.options.speed,
					complete: T.fadeComplete
				})
			}

			T.active();

			T.imgPreLoader(T.currentIndex);
		};

		/**
		 * 动画效果 - 滑动
		 */
		T.slide = function() {

			T.$item = T.$list.children();
			var lastIndex = T.$list.data('lastIndex'),
				slideDirection = 'left';

			if (T.currentIndex === lastIndex) {
				return;
			}

			clearInterval(self.playTimer);

			if (T.currentIndex < lastIndex) {
				slideDirection = 'right';
			}

			// first item >> last item
			if (T.currentIndex < 0) {
				T.currentIndex = T.len - 1;
				T.$item.eq(T.len).show().siblings().hide();
				slideDirection = 'right';
			}

			// first item >> last item
			if (T.currentIndex > T.len) {
				T.currentIndex = 1;
				slideDirection = 'left';
			}

			if (slideDirection === 'right') {
				T.$list.css('left', '-100%');
			}
			// consolT.log(T.currentIndex);

			T.$item.eq(T.currentIndex).show();


			// 使用CSS3 Transition进行动画过渡
			// 相对于jQuery的animate执行的动画，可以大幅度提升流畅度
			if (T.isSupportTransition) {
				setTimeout(function() {
					T.$list.animating = true;
					T.$list.css('left', slideDirection === 'left' ? '-100%' : 0)
						.addClass('transition-' + T.options.speed);

					setTimeout(T.slideComplete, T.options.speed - 20);
				}, 20);
			} else {
				T.$list.animating = true;
				T.$list.animate({
					left: slideDirection === 'left' ? '-100%' : 0
				}, {
					duration: T.options.speed,
					complete: T.slideComplete
				})
			}

			T.active();

			T.imgPreLoader(T.currentIndex);
		};

		/**
		 * fade动画的回调函数
		 */
		T.fadeComplete = function() {
			T.$list.animating = false;
			T.$item.eq(T.currentIndex).siblings().css('opacity', 0);
			if (T.options.autoPlay && !T.$list.hovered) {
				T.setPlayTimer();
			}
		};

		/**
		 * slide动画的回调函数 
		 */
		T.slideComplete = function() {
			if (T.currentIndex === T.len) {
				T.$item.first().show().siblings().hide();
				T.currentIndex = 0;
			}

			T.$list.animating = false;
			T.$list.css('left', 0).removeClass();
			T.$list.data('lastIndex', T.currentIndex);

			T.$item.eq(T.currentIndex).show().siblings().hide();

			if (T.options.autoPlay && !T.$list.hovered) {
				T.setPlayTimer();
			}
		}
	};
});
