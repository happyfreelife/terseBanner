

/**
 * Plugin main method
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'init'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('init')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	// 播放
	Banner.prototype.play = function() {
		this.activeIndex = this.currentIndex;

		this.animation[this.options.animation]();

		this.lazyload(this.currentIndex);
	};

	// 自动轮播定时器
	Banner.prototype.setPlayTimer = function() {
		var self = this,
			clear = function() {
				self.isHovered = true;
				clearInterval(self.playTimer);
			},
			reset = function() {
				self.isHovered = false;
				if (!self.isAnimated) {
					self.setPlayTimer();
				}
			};

		clearInterval(self.playTimer);

		self.playTimer = setInterval(function() {
			self.options.before.call(self, self.$elem, self.$item, self.currentIndex);
			self.currentIndex++;
			self.play();
		}, self.options.auto);

		self.$elem.off('mouseenter');
		self.$elem.off('mouseleave');
		self.$elem.on({
			mouseenter: clear,
			mouseleave: reset
		});
	};

	// 导航按钮和缩略图添加高亮样式
	Banner.prototype.activeBtnAndThumb = function() {
		this.activeIndex =
		this.currentIndex === this.len ? 0 :
		this.currentIndex === -1 ? this.len - 1 : this.currentIndex;

		if (this.$btn) {
			this.$btn.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (this.$thumb) {
			this.$thumb.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
			if (this.$thumbSlideBtn.is(':visible')) {
				this.animation.thumbListSlide();
			}
		}
	};

	// 切换轮播图片
	Banner.prototype.switchTo = function() {
		if (this.isAnimated) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > this.len)) {
			throw new Error('TerseBanner\'s index overflow!');
		}

		this.options.before.call(this, this.$elem, this.$item, this.currentIndex);
		switch (arguments[0]) {
			case 'prev':
				this.currentIndex--;
				break;

			case 'next':
				this.currentIndex++;
				break;

			default:
				this.currentIndex = arguments[0];
				break;
		}

		this.play();
	};


	$.fn.terseBanner = function(option) {
		if (Global.isLTIE8) {
			throw new Error('terseBanner cannot work under IE8!');
		}

		return this.each(function() {
			var terseBanner = $(this).data('terseBanner');

			if (!terseBanner) {
				options = $.extend(true, {}, $.fn.terseBanner.defaults, typeof option === 'object' && option);

				$(this).data('terseBanner', (terseBanner = new Banner(this, options)));

				terseBanner.init();
			} else {
				if (option === 'prev') {
					terseBanner.switchTo.call(terseBanner, 'prev');
				} else if (option === 'next') {
					terseBanner.switchTo.call(terseBanner, 'next');
				} else if ($.isNumeric(option)) {
					terseBanner.switchTo.call(terseBanner, option);
				}
			}
		});
	};


	/**
	 * Plugin default options
	 */
	$.fn.terseBanner.defaults = {
		animation: 'slide', // 动画模式: ['none', 'fade', 'flash' 'slide']
		adaptive : false,   // 图片宽度自适应
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画
		arrow    : false,   // 导航箭头
		btn      : true,    // 导航按钮: [true, false, 'ol']
		auto     : 5000,    // 自动轮播: [为0时禁用此功能]
		duration : 800,     // 动画速度
		init     : $.noop,  // 轮播初始化时执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		after    : $.noop,  // 动画完成时执行的回调函数
		thumb    : { }      // 缩略图
	};
}));