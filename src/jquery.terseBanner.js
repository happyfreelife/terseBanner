 /**
 * jquery.terseBanner.js
 * Version: 2.0.0
 * URI: https://github.com/happyfreelife/easyBanner/
 * Date:2016/3/18 12:21:59
 */

;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory(jQuery, window, document));
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(root.jQuery, root, root.document);
	}
}(this, function ($, window, document) {
	/**
	 * Plugin construct function
	 */
	function TerseBanner(elem, options) {
		this.$elem = $(elem);
		this.options = options;
	}

	// shortcut variable
	var TB = TerseBanner;

	TB.prototype.init = function() {
		this.$list = this.$elem.children().first().addClass('tb-list');
		this.$item = this.$list.children();
		this.len   = this.$item.length;
		this.currentIndex  = 0;
		this.activeIndex   = 0;
		this.lastTimeIndex = 0; // **********************************
		this.isHovered     = false;
		this.isAnimated    = false;

		if (typeof this.options.autoPlay === 'number' && this.options.autoPlay > 0) {
			this.useAutoPlay = true;
			this.setPlayTimer();
		}

		// 检测是否启用自适应功能
		if (this.$elem.hasClass('responsive')) {
			this.options.responsive = true;
		}

		this.addDefaultStyle();
	};

	// 写入轮播元素的默认样式
	TB.prototype.addDefaultStyle = function() {
		$('head').append(
			'<style>\n' +
				'.terse-banner, ' +
				'.tb-list-box, ' +
				'.tb-list{' +
					'position: relative;' +
					'overflow: hidden;' +
				'}\n' +
				'.tb-list > *{' +
					'float: left;' +
					'background-repeat: no-repeat;' +
					'background-position: center top;' +
				'}\n' +
				'.tb-nav-arrow a{' +
					'position: absolute;' +
					'cursor: pointer;' +
					'top: 0;' +
				'}\n' +
				'.tb-nav-arrow .prev{' +
					'left: 0;' +
				'}\n' +
				'.tb-nav-arrow .next{' +
					'right: 0;' +
				'}\n' +
				'.tb-nav-arrow a img{' +
					'display: block;' +
					'max-height: 100%;' +
				'}\n' +

				'.tb-nav-btn a{' +
					'display: inline-block;' +
					'width: 10px;' +
					'height: 10px;' +
					'margin: 0 5px;' +
					'background: #fff;' +
					'border-radius: 50%;' +
					'cursor: pointer;' +
				'}\n' +
				'.tb-nav-btn a.active{' +
					'background: #09c;' +
				'}\n' +
			'</style>'
		);

		this.setInitStyle();
	};
		
	// 设置轮播的初始样式
	TB.prototype.setInitStyle = function() {
		var $banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			options = this.options;

		$banner.addClass('terse-banner');

		$list.wrap('<div class="tb-list-box"/>').width(this.len * 2 * 100 + '%');

		$item.width($banner.width());

		if (options.responsive) {
			if ($banner.css('maxWidth') === 'none') {
				$banner.css('maxWidth', '100%');
			}
		} else {
			$item.height($banner.height());
		}

		switch (options.animation) {
			case 'slide':
				if (util.isSupportTransition) {
					$list.css({
						transform: 'translate3d(0, 0, 0)',
						'-webkit-transform': 'translate3d(0, 0, 0)',
						transition: 'transform ' + options.speed + 'ms',
						// '-webkit-transition': '-webkit-transform ' + options.speed + 'ms'
					});
				} else {
					$list.css('left', 0);
				}
				break;

			case 'fade':
			case 'flashFade':
				if (util.isSupportTransition) {
					$item.css('transition', 'opacity ' + options.speed + 'ms');
				}
				break;
		}

		this.bindWindowResize();
		this.handleBannerImage();
	};

	// 视口大小发生变化时，轮播图片的尺寸自动调整
	TB.prototype.bindWindowResize = function() {
		var $banner = this.$elem,
			$list = this.$list;

		$(window).resize(function() {
			$list.children().width($banner.width());

			// fade
			$list.prev().children().width($banner.width());

			// slide
			if (util.isSupportTransition) {
				var translate = 'translate3d(-' + $list.children().width() *
					this.currentIndex + 'px, 0, 0)';

				$list.css({
					'transform': translate,
					'-webkit-transform': translate
				});
			}
		});
	};

	TB.prototype.handleBannerImage = function() {
		var $list = this.$list,
			$item = this.$item,
			$img = $item.children('img'),
			imgRegExp = new RegExp('\\?thumbnail=(.*\\.(jpg|jpeg|gif|png))$'),
			thumbnailImg = [],
			options = this.options;

		// 获取手动设置的缩略图
		$img.each(function() {
			var src = $(this).attr('src') || $(this).data('src');

			if (src.match(imgRegExp)) {
				thumbnailImg.push(src.match(thumbSrcRegExp)[1]);
			}
			this.thumbnailImg = thumbnailImg;
		});

		// 延迟加载模式
		if ($img.filter('[data-src]').length === this.len) {
			$img.each(function() {
				var src = $(this).data('src');

				$(this).parent().data('image', src).data('thumbnail', src);
				$(this).remove();
			});

			// $item.last().addClass('loading');
			// Lazyload($item, currentIndex, currentIndex);
		}

		// 自适应模式
		if (options.responsive) {
			$img.css({
				display: 'block',
				maxWidth: '100%',
				userSelect: 'none'
			});

			if (options.animation === 'fade') {
				$item.width(this.$elem.width());
			}
		}

		// 标准模式
		if (!options.responsive) {
			$img.each(function() {
				var src = $(this).attr('src');

				$(this)
					.parent()
					.css('background-image', 'url(' + src + ')')
					.data('thumb', src);

				$(this).remove();
			});
		}

		$item.width(this.$elem.width());

		switch (options.animation) {
			case 'slide':
				$item.first().clone(true).appendTo(this.$list);
				break;

			case 'fade':
				if (options.responsive) {
					$list.before($list.clone(true).css({
						position: 'absolute',
						top: 0,
						left: 0
					}));
				}
				break;

			case 'fade':
			case 'flashFade':
				$item.first().siblings().css('opacity', 0);
				break;
		}

		this.addNavArrow();
	};

	// 添加导航箭头
	TB.prototype.addNavArrow = function() {
		if (!this.options.navArrow) {
			this.addNavBtn();
			return;
		}

		var $banner = this.$elem,
			self = this;

		$banner.append(
			'<div class="tb-nav-arrow">' +
				'<a class="prev"></a>' +
				'<a class="next"></a>' +
			'</div>'
		);

		this.$navArrowBox = $('.tb-nav-arrow', $banner);
		this.$navArrow = $('.tb-nav-arrow a', $banner);

		this.autoSetStyle('navArrow');
		this.autoSetStyle('navArrowBoxSize');
		this.autoSetStyle('navArrowBoxPos');

		this.$navArrow.on({
			click: function() {
				if (self.isAnimated) { return; }

				if ($(this).hasClass('prev')) {
					$banner.data('switchPrev', true);
					self.currentIndex--;
				} else {
					self.currentIndex++;
				}
				self.play();
			},

			// 阻止连续点击箭头按钮时选中按钮
			selectstart: function() {
				return false;
			}
		});

		this.addNavBtn();
	};

	// 添加导航按钮
	TB.prototype.addNavBtn = function() {
		if (!this.options.navBtn) {
			this.lazyLoad();
			return;
		}

		var self = this,
			$banner = this.$elem;

		for (var i = 0, item = ''; i < this.len; i++) {
			item += '<a><i></i></a>';
		}
		$banner.append($('<div class="tb-nav-btn"/>').append(item));

		this.$navBtnBox = $('.tb-nav-btn', $banner);
		this.$navBtn = $('.tb-nav-btn a', $banner);

		this.$navBtn.first().addClass('active');
		this.autoSetStyle('navBtnBoxPos');

		// 导航按键中添加数字
		if (this.options.navBtn === 'ol') {
			this.$navBtn.find('i').each(function(index) {
				$(this).text(index + 1);
			});
		}

		this.$navBtn.on(self.options.useHover ? 'mouseenter' : 'click', function() {
			if (self.isAnimated) { return; }

			self.currentIndex = $(this).index();
			// self.play();
		});

		this.lazyLoad();
	};

	// 图片延迟加载
	TB.prototype.lazyLoad = function() {
		if (!this.options.lazyLoad) {
			this.bindAnimation();
			return;
		}

		this.bindAnimation();
	};

	// 给轮播的元素自动设置样式
	TB.prototype.autoSetStyle = function(elem) {
		var $banner = this.$elem,
			$navArrow = this.$navArrow,
			$navArrowBox = this.$navArrowBox,
			$navBtn = this.$navBtn,
			$navBtnBox = this.$navBtnBox;

		switch (elem) {
			case 'navArrow' :
				if (
					($navArrow.css('backgroundColor') === 'rgba(0, 0, 0, 0)' ||
					$navArrow.css('backgroundColor') === 'transparent') &&
					$navArrow.css('backgroundImage') === 'none'
				) {
					$navArrow.filter('.prev').html('<img src="' + util.prevArrowImageData + '">');
					$navArrow.filter('.next').html('<img src="' + util.nextArrowImageData + '">');

					$navArrow.height(parseInt($banner.height() * 0.13));

					$navArrow.find('img').css({
						userSelect: 'none',
						marginTop: function() {
							return ($navArrow.height() - $(this).height()) / 2;
						}
					}).on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'navArrowBoxSize' :
                var bannerWidth;
            
                // 缩放网页会导致返回的轮播容器的宽度不精确(产生小数)
				if ($banner.width().toString().indexOf('.') > -1) {
					bannerWidth = parseInt($banner.width().toFixed(0));
				} else {
					bannerWidth = $banner.width();
				}

				if ($navArrowBox.width() === bannerWidth) {
					$navArrowBox.width('100%');
				}
				break;

			case 'navArrowBoxPos' :
				if ($navArrowBox.css('top') === 'auto' && $navArrowBox.css('bottom') === 'auto') {
					$navArrowBox.css({
						top: '50%',
						height: 0,
						marginTop: -$navArrowBox.height() / 2
					});
				}
				if ($navArrowBox.css('left') === 'auto' && $navArrowBox.css('right') === 'auto') {
					$navArrowBox.css('marginLeft', ($banner.width() - $navArrowBox.width()) / 2 + 'px');
				}

                $banner.append($navArrowBox.css('position', 'absolute'));
				break;

			case 'navBtnBoxPos' :
				if ($navBtnBox.css('top') === 'auto' && $navBtnBox.css('bottom') === 'auto') {
					$navBtnBox.css('bottom', $banner.height() * 0.04);
				}
				if ($navBtnBox.css('left') === 'auto' && $navBtnBox.css('right') === 'auto') {
					$navBtnBox.css({
						left: '50%',
						marginLeft: -$navBtn.outerWidth(true) * $navBtn.length / 2
					});
				}
				$banner.append($navBtnBox.css('position', 'absolute'));
				break;
		}
	};

	// 设置自动轮播定时器
	TB.prototype.setPlayTimer = function() {
		var self = this,
			clear = function() {
				self.isHovered = true;
				clearInterval(self.playTimer);
			},
			reset = function() {
				self.isHovered = false;
				if (!self.isAnimated) { self.setPlayTimer(); }
			};

		clearInterval(this.playTimer);

		this.playTimer = setInterval(function() {
			self.currentIndex++;
			self.play();
		}, self.options.autoPlay);

		this.$elem.off('mouseenter');
		this.$elem.off('mouseleave');
		this.$elem.on({
			mouseenter : clear,
			mouseleave: reset
		});
	};

	// 动画
	TB.prototype.bindAnimation = function() {

		var self = this,
			options = this.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			$navBtn = this.$navBtn,
			$navBtnBox = this.$navBtnBox,
			A = this.animation = {};

		function determineIndex() {
			self.activeIndex =
			self.currentIndex =
				self.currentIndex === self.len ? 0 :
				self.currentIndex === -1 ? self.len - 1 : self.currentIndex;
		}

		function activeElement() {
			if (options.navBtn) {
				$navBtn.eq(self.activeIndex).addClass('active').siblings().removeClass('active');
			}

			if  (typeof options.thumbnail === 'object' && options.thumbnail !== {}) {

			}
		}

		A.none = function() {
			determineIndex();
			$item.eq(self.currentIndex).show().siblings().hide();
			activeElement();
		};

		A.fade = function() {
			determineIndex();

			self.isAnimated = true;

			$list.css('left', -self.currentIndex * 100 + '%');

			if (util.isSupportTransition) {
				$item.eq(self.currentIndex).css('opacity', 1);

				setTimeout(self.animation.fadeCallback, self.options.speed);
			} else {
				$item.eq(self.currentIndex).animate({
					opacity: 1
				}, {
					duration: self.options.speed,
					complete: self.animation.fadeCallback
				});
			}

			options.begin.call(self, $banner, self.activeIndex);

			activeElement();

			// Lazyload($item, self.currentIndex, self.currentIndex);
		};

		A.flashFade = A.fade;

		A.slide = function() {
			determineIndex();

			self.isAnimated = true;

			// this.data('switchPrev', false);

			options.begin.call(this, $banner, this.currentIndex);

			if (util.isSupportTransition) {
				var transitionDuration = $list.css('transition-duration');

				// 当前显示最后一屏，点击了序列按钮来切换不连续的屏幕
				if (self.lastTimeIndex === self.len && !$list.data('switch-prev')) {
					$list.css({
						transition: 'none',
						'-webkit-transtion': 'none',
						transform: 'translate3d(0, 0, 0)',
						'-webkit-transform': 'translate3d(0, 0, 0)'
					});
				}

				// 第一屏 -> 最后一屏
				if (self.currentIndex < 0) {
					self.currentIndex = self.len - 1;
					$list.css({
						transition: 'none',
						'-webkit-transtion': 'none'
					});
					$list.css({
						transform: 'translate3d(-' + $list.children().width() * self.len + 'px, 0, 0)',
						'-webkit-transform': 'translate3d(-' + $list.children().width() * self.len + 'px, 0, 0)'
					});
				}

				// 最后一屏 -> 第一屏
				if (self.currentIndex > self.len) {
					self.currentIndex = 1;
					$list.css({
						transition: 'none',
						'-webkit-transtion': 'none',
						transform: 'translate3d(0, 0, 0)',
						'-webkit-transform': 'translate3d(0, 0, 0)'
					});
				}
				

				setTimeout(function() {
					var translate3d = 'translate3d(-' + $list.children().width() * self.currentIndex + 'px, 0, 0)';

					$list.animating = true;

					$list.css({
						transform: translate3d,
						transition: 'transform ' + transitionDuration,
						'-webkit-transform': translate3d,
					});

					setTimeout(self.animation.slideComplete, self.options.speed - 20);
				}, 20);
			}

			if (!util.isSupportTransition) {

			}
		};

		A.fadeCallback = function() {
			self.isAnimated = false;

			$list.prev().css('left', -self.currentIndex * 100 + '%');

			$item.eq(self.currentIndex).siblings().css('opacity', 0);

			options.end.call(self, self.$elem, self.activeIndex);

			if (options.useAutoPlay && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		A.slideCallback = function() {
			options.end.call(self, self.$elem, self.activeIndex);

			if (options.useAutoPlay && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		options.init.call(this, $banner);
	};

	// 播放
	TB.prototype.play = function() {
		this.activeIndex = this.currentIndex;

		this.animation[this.options.animation]();

		this.options.begin.call(this, this.$elem, this.activeIndex);
	};

	/**
	 * Public method
	 */
	$.terseBanner = {};

	$.terseBanner.switchToNext = function($banner) {

	};

	$.terseBanner.switchToPrev = function($banner) {

	};

	$.terseBanner.switchToInex = function($banner, index) {

	};


	/**
	 * Plugin main method
	 */
	$.fn.terseBanner = function (option) {
		if (util.isLTIE8) {
			throw new Error('jquey.terseBanner.js cannot work under IE8!');
		}

		return this.each(function() {
			var data = $(this).data('terseBanner'),
				options = $.extend(true, {}, $.fn.terseBanner.defaults, typeof option === 'object' && option);

			if (!data) {
				$(this).data('terseBanner', (data = new TerseBanner(this, options)));
			}

			data.init();
		});
	};


	/**
	 * Plugin default options
	 */
	$.fn.terseBanner.defaults = {
		animation: 'slide', // 动画模式: ['none', 'fade', 'flashFade' 'slide', 'scanning']
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画: [true, false]
		navArrow : false,   // 导航箭头: [true, false]
		navBtn   : true,    // 导航按钮: [true, false, 'ol', 'equal']
		autoPlay : 5000,    // 自动轮播: [Number][等于0时禁用此功能]
		speed    : 800,     // 动画速度
		init     : $.noop , // 初始化完成后执行的函数
		begin    : $.noop,  // 动画开始时执行的函数
		end      : $.noop , // 动画完成时执行的函数
		thumbnail: {        // 缩略图
			// width: 100,
			// height: 50,
			// gap: 20
		}
	};


	/**
	 * css3 easing that you can use
	 */
	$.fn.terseBanner.css3Easing = {
		easeInExpo   : 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
		easeOutExpo  : 'cubic-bezier(0.19, 1, 0.22, 1)',
		easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
		easeInBack   : 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
		easeOutBack  : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
		easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
	};

	/**
	 * Extend jQuery Easing
	 */
	$.extend($.easing, {
		easeInExpo: function(x, t, b, c, d) {
			return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo: function(x, t, b, c, d) {
			return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo: function(x, t, b, c, d) {
			if (t === 0) return b;
			if (t === d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInBack: function(x, t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function(x, t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function(x, t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		}
	});

	/**
	 * Utility property and method
	 */
	var util = {
		isIE: /msie|trident/i.test(navigator.userAgent),

		isLTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),

		isSupportTransition: (function () {
			var style = document.body.style || document.documentElement.style;
			return style.transition !== undefined || style.WebkitTransition !== undefined;
		}()),

 		// isSupportTransition: false,

		prevArrowImageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC',

		nextArrowImageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC'
	};
}));
