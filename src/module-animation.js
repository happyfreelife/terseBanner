/**
 * easyBanner Module -  Animation
 * Require jquery.easyBanner.js
 */

$(function() {
	var E = $.easyBanner;

	E.animation = {
		/**
		 * 判定当前显示项的索引是否溢出
		 */
		determineIndex: function() {
			E.activeIndex =
			E.currentIndex =
			E.currentIndex === E.len ? 0 : E.currentIndex === -1 ? E.len - 1 : E.currentIndex;
		},

		/**
		 * 序列按钮和缩略图当前项高亮
		 */
		active: function() {
			this.determineIndex();

			if (E.options.serialBtn === true) {
				E.$serialBtn.eq(E.activeIndex).addClass('active').siblings().removeClass('active');
			}

			if (E.options.serialBtn === 'thumb') {
				E.$thumb.eq(E.activeIndex).addClass('active').siblings().removeClass('active');
			}
		},

		/**
		 * 缩略图的宽度超过容器的宽度时滚动
		 */
		thumbScroll: function() {

		},

		/**
		 * 动画效果 - 无
		 */
		none: function() {
			this.determineIndex();
			E.$item.eq(E.currentIndex).show().siblings().hide();
			this.active();
		},

		/**
		 * 动画效果 - 淡入淡出
		 */
		fade: function() {
			this.determineIndex();

			E.$list.animating = true;

			E.$item.removeClass().eq(E.currentIndex).addClass('top-item').css('opacity', 0);

			if (E.isSupportTransition) {
				E.$item.eq(E.currentIndex).addClass('transition-' + E.options.speed).css('opacity', 1);
				setTimeout(E.animation.fadeComplete, E.options.speed);
			} else {
				E.$item.eq(E.currentIndex).animate({
					opacity: 1
				}, {
					duration: E.options.speed,
					complete: E.animation.fadeComplete
				})
			}

			this.active();

			E.imgPreLoader(E.currentIndex);
		},

		/**
		 * 动画效果 - 滑动
		 */
		slide: function() {

			E.$item = E.$list.children();
			var lastIndex = E.$list.data('lastIndex'),
				slideDirection = 'left';

			if (E.currentIndex === lastIndex) {
				return;
			}

			clearInterval(self.playTimer);

			if (E.currentIndex < lastIndex) {
				slideDirection = 'right';
			}

			// first item >> last item
			if (E.currentIndex < 0) {
				E.currentIndex = E.len - 1;
				E.$item.eq(E.len).show().siblings().hide();
				slideDirection = 'right';
			}

			// first item >> last item
			if (E.currentIndex > E.len) {
				E.currentIndex = 1;
				slideDirection = 'left';
			}

			if (slideDirection === 'right') {
				E.$list.css('left', '-100%');
			}
			// console.log(E.currentIndex);

			E.$item.eq(E.currentIndex).show();


			// 使用CSS3 Transition进行动画过渡
			// 相对于jQuery的animate执行的动画，可以大幅度提升流畅度
			if (E.isSupportTransition) {
				setTimeout(function() {
					E.$list.animating = true;
					E.$list.css('left', slideDirection === 'left' ? '-100%' : 0)
						.addClass('transition-' + E.options.speed);

					setTimeout(E.animation.slideComplete, E.options.speed - 20);
				}, 20);
			} else {
				E.$list.animating = true;
				E.$list.animate({
					left: slideDirection === 'left' ? '-100%' : 0
				}, {
					duration: E.options.speed,
					complete: E.animation.slideComplete
				})
			}

			this.active();

			E.imgPreLoader(E.currentIndex);
		},

		/**
		 * fade动画的回调函数
		 */
		fadeComplete: function() {
			E.$list.animating = false;
			E.$item.eq(E.currentIndex).siblings().css('opacity', 0);
			if (E.options.autoPlay && !E.$list.hovered) {
				E.setPlayTimer();
			}
		},

		/**
		 * slide动画的回调函数 
		 */
		slideComplete: function() {
			if (E.currentIndex === E.len) {
				E.$item.first().show().siblings().hide();
				E.currentIndex = 0;
			}

			E.$list.animating = false;
			E.$list.css('left', 0).removeClass();
			E.$list.data('lastIndex', E.currentIndex);

			E.$item.eq(E.currentIndex).show().siblings().hide();

			if (E.options.autoPlay && !E.$list.hovered) {
				E.setPlayTimer();
			}
		}
	};
});
