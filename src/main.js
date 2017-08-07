
	/**
	 * Plugin main method
	 */
	// 播放
	Banner.prototype.play = function() {
		this.activeIndex = this.currentIndex;

		if (this.len > 1) {
			this.animation[this.option.animation]();
			this.lazyload(this.currentIndex);
		}
	};

	// 自动轮播定时器
	Banner.prototype.setPlayTimer = function() {
		var s = this,
			clear = function() {
				s.isHovered = true;
				clearInterval(s.playTimer);
			},
			reset = function() {
				s.isHovered = false;
				if (!s.isAnimated) {
					s.setPlayTimer();
				}
			};

		clearInterval(s.playTimer);

		s.playTimer = setInterval(function() {
			s.option.before.call(s, s.$elem, s.$item, s.currentIndex);
			s.currentIndex++;
			s.play();
		}, s.option.auto);

		s.$elem.off('mouseenter.terseBanner');
		s.$elem.off('mouseleave.terseBanner');
		s.$elem.on({
			'mouseenter.terseBanner': clear,
			'mouseleave.terseBanner': reset
		});
	};

	// 导航按钮和缩略图添加高亮样式
	Banner.prototype.activeBtnAndThumb = function() {
		var s = this;

		s.activeIndex =
		s.currentIndex === s.len ? 0 :
		s.currentIndex === -1 ? s.len - 1 : s.currentIndex;

		if (s.$btn) {
			s.$btn.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (s.$thumb) {
			s.$thumb.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
			if (s.$thumbSlideBtn.is(':visible')) {
				s.animation.thumbListSlide();
			}
		}
	};

	// 切换轮播图片
	Banner.prototype.playTo = function() {
		var s = this;

		if (s.isAnimated) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > s.len)) {
			throw new Error('TerseBanner\'s index overflow!');
		}

		s.option.before.call(s, s.$elem, s.$item, s.currentIndex);
		
		switch (arguments[0]) {
			case 'prev':
				if(!Util.isSupportTouch) {
					s.currentIndex--;
					s.play();
				} else {
					s.slidePrev();
				}
				break;

			case 'next':
				if(!Util.isSupportTouch) {
					s.currentIndex++;
					s.play();
				} else {
					s.slideNext();
				}
				break;

			default:
				if(!Util.isSupportTouch) {
					s.currentIndex = arguments[0];
					s.play();
				}
				break;
		}
	};


	$.fn.terseBanner = function(opt) {
		if (Util.isLTIE8) {
			throw new Error('terseBanner cannot work under IE8!');
		}

		return this.each(function() {
			var terseBanner = $(this).data('terseBanner');

			if (!terseBanner) {
				var option = $.extend(true, {}, $.fn.terseBanner.defaults,
					typeof opt === 'object' && opt);

				$(this).data('terseBanner', (terseBanner = new Banner(this, option)));

				terseBanner.init();
			} else {
				if (opt === 'prev') {
					terseBanner.playTo.call(terseBanner, 'prev');
				} else if (opt === 'next') {
					terseBanner.playTo.call(terseBanner, 'next');
				} else if ($.isNumeric(opt)) {
					terseBanner.playTo.call(terseBanner, opt);
				}
			}
		});
	};


	/**
	 * Plugin default option
	 */
	$.fn.terseBanner.defaults = {
		animation: 'slide', // 动画模式: ['slide', 'fade', 'flash', 'none']
		adaptive : false,   // 图片宽度自适应
		arrow    : false,   // 切换箭头
		btn      : true,    // 指示按钮: [true, false]
		auto     : 5000,    // 自动轮播: [为0时禁用此功能]
		speed    : 800,     // 动画速度
		init     : $.noop,  // 轮播初始化完成时执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		after    : $.noop,  // 动画完成时执行的回调函数
		thumb    : {}       // 缩略图
	};
