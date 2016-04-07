 /**
 * jquery.terseBanner.js
 * Version: 2.0.0
 * URI: https://github.com/happyfreelife/easyBanner/
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
	 * Utility property and method
	 */
	var Util = {
		isIE: /msie|trident/i.test(navigator.userAgent),

		isLTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),

		isSupportTransition: (function () {
			var style = document.body.style || document.documentElement.style;
			return style.transition !== undefined || style.WebkitTransition !== undefined;
		}()),

		isSupportTouch: 'ontouchstart' in window,

		// isSupportTransition: false,

		prevArrowImageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC',

		nextArrowImageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC'
	};


	/**
	 * Plugin construct function
	 */
	function TerseBanner(elem, options) {
		this.$elem = $(elem);
		this.options = options;
	}

	// shortcut variable
	var TB = TerseBanner;


	/**
	 * Private method
	 */
	TB.prototype.init = function() {
		this.$list = this.$elem.children().first().addClass('tb-list');
		this.$item = this.$list.children();
		this.len   = this.$item.length;
		this.currentIndex = 0;
		this.activeIndex  = 0;
		this.latestIndex  = 0;
		this.isHovered    = false;
		this.isAnimated   = false;

		if (this.len <= 1) {
			return;
		}

		if (Util.isSupportTouch) {
			this.options.animation = 'slide';
			bindTouchEvent();
		}

		if (typeof this.options.auto === 'number' && this.options.auto > 0) {
			this.useAuto = true;
			this.setPlayTimer();
		}

		this.build();
	};

	// 创建轮播的初始结构
	TB.prototype.build = function() {
		this.addDefaultStyle();

		var $banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			options = this.options,
			thumbArr = [],
			self = this,
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		if ($banner.css('position') === 'static') {
			$banner.addClass('relative');
		}

		$list.wrap('<div class="relative"/>').width(this.len * 2 * 100 + '%');

		$item.width($banner.width());

		// 自适应模式
		if (options.adaptive) {
			if ($banner.css('maxWidth') === 'none') {
				$banner.css('maxWidth', '100%');
			}

			$item.each(function() {
				var $img = $(this).find('img'),
					src = $img.attr('src') || $img.attr('data-src');

				$img.css({
					display: 'block',
					maxWidth: '100%',
					userSelect: 'none'
				});

				$(this).data('thumb', src);
			});

			setTimeout(function() {
				$banner.height($list.height());
			}, 20);
		}

		// 标准模式
		if (!options.adaptive) {
			$item.each(function() {
				var $img = $(this).find('img'),
					src = $img.attr('src') || $img.attr('data-src');

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				}

				$(this)
					.data('thumb', src)
					.height($banner.height())
					.css('backgroundImage', 'url(' + src + ')');

				$img.remove();
			});
		}

		// 获取图片缩略图的路径
		$item.each(function() {
			var thumb = $(this).data('thumb');

			thumbArr.push(thumb.match(regExp) ? thumb.match(regExp)[1] : thumb);

			self.thumbArr = thumbArr;
		});

		// animation: slide
		if (options.animation === 'slide') {
			if (Util.isSupportTransition) {
				$list.css({
					transform: 'translate3d(0, 0, 0)',
					'-webkit-transform': 'translate3d(0, 0, 0)',
					transition: 'transform ' + options.duration + 'ms',
					// '-webkit-transition': '-webkit-transform ' + options.duration + 'ms'
				});
			}

			$list.css('left', 0);
			$item.css('float', 'left').first().show().siblings().hide();
			$item.first().clone(true).hide().appendTo($list);
		}

		// animation: fade
		if (options.animation === 'fade') {
			$list.before($list.clone(true).css({
				position: 'absolute',
				top: 0,
				left: 0
			}));
		}

		// animation: fade || flashFade
		if (options.animation === 'fade' || options.animation === 'flashFade') {
			if (Util.isSupportTransition) {
				$item.css('transition', 'opacity ' + options.duration + 'ms');
			}
			$item.first().siblings().css('opacity', 0);
		}


		this.addArrow();
		this.bindResizeEvent();
	};

	// 写入轮播元素的默认样式
	TB.prototype.addDefaultStyle = function() {
		$('head').append(
			'<style>\n' +
				'.relative, ' +
				'.tb-list{' +
					'position: relative;' +
					'overflow: hidden;' +
				'}\n' +

				'.tb-arrow, ' +
				'.tb-btn, ' +
				'.tb-thumb{' +
					'position: absolute;' +
				'}\n' +

				'.tb-list > *{' +
					'float: left;' +
					'background-repeat: no-repeat;' +
					'background-position: center top;' +
				'}\n' +

				'.tb-arrow a{' +
					'position: absolute;' +
					'cursor: pointer;' +
					'top: 0;' +
				'}\n' +
				'.tb-arrow a.prev{' +
					'left: 0;' +
				'}\n' +
				'.tb-arrow a.next{' +
					'right: 0;' +
				'}\n' +
				'.tb-arrow a img{' +
					'display: inline-block;' +
					'max-height: 100%;' +
				'}\n' +

				'.tb-btn a{' +
					'display: inline-block;' +
					'width: 10px;' +
					'height: 10px;' +
					'margin: 0 5px;' +
					'background: #fff;' +
					'border-radius: 50%;' +
					'cursor: pointer;' +
				'}\n' +
				'.tb-btn a.active{' +
					'background: #09c;' +
				'}\n'
			'</style>'
		);
	};

	// 轮播元素自动设置样式
	TB.prototype.autoSetStyle = function(elem) {
		var $banner = this.$elem,
			$arrow = this.$arrow,
			$arrowBox = this.$arrowBox,
			$btn = this.$btn,
			$btnBox = this.$btnBox;

		switch (elem) {
			case 'arrow' :
				if ($arrow.css('backgroundImage') === 'none') {
					$arrow.filter('.prev').html('<img src="' + Util.prevArrowImageData + '">');
					$arrow.filter('.next').html('<img src="' + Util.nextArrowImageData + '">');

					$arrow.height(parseInt($banner.height() * 0.1));

					$arrow.find('img').css('userSelect', 'none')
					.on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'arrowBoxSize' :
				if (!$arrowBox.width()) {
					$arrowBox.width('100%');
				}
				break;

			case 'arrowBoxPos' :
				if ($arrowBox.css('top') === 'auto' && $arrowBox.css('bottom') === 'auto') {
					$arrowBox.css({
						top: '50%',
						marginTop: -$arrow.height() / 2
					});
				}
				if ($arrowBox.css('left') === 'auto' && $arrowBox.css('right') === 'auto') {
					$arrowBox.css({
						left: '50%',
						marginLeft: -$arrowBox.width() / 2
					});
				}

				$banner.append($arrowBox);
				break;

			case 'btnBoxPos' :
				if ($btnBox.css('top') === 'auto' && $btnBox.css('bottom') === 'auto') {
					$btnBox.css('bottom', 10);
				}
				if ($btnBox.css('left') === 'auto' && $btnBox.css('right') === 'auto') {
					$btnBox.css({
						left: '50%',
						marginLeft: -$btn.outerWidth(true) * $btn.length / 2
					});
				}
				$banner.append($btnBox);
				break;
		}
	};

	// 添加控制箭头
	TB.prototype.addArrow = function() {
		if (!this.options.navArrow) {
			this.addBtn();
			return;
		}

		var $banner = this.$elem,
			self = this;

		$banner.append(
			'<div class="tb-arrow">' +
				'<a class="prev"></a>' +
				'<a class="next"></a>' +
			'</div>'
		);

		this.$arrowBox = $('.tb-arrow', $banner);
		this.$arrow = $('.tb-arrow a', $banner);

		this.autoSetStyle('arrow');
		this.autoSetStyle('arrowBoxSize');
		this.autoSetStyle('arrowBoxPos');

		this.$arrow.on({
			click: function() {
				if (self.isAnimated) {
					return;
				}

				if ($(this).hasClass('prev')) {
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

		this.addBtn();
	};

	// 添加序列按钮
	TB.prototype.addBtn = function() {
		if (!this.options.navBtn) {
			this.addThumb();
			return;
		}

		var self = this,
			$banner = this.$elem;

		for (var i = 0, item = ''; i < this.len; i++) {
			item += '<a><i></i></a>';
		}
		$banner.append($('<div class="tb-btn"/>').append(item));

		this.$btnBox = $('.tb-btn', $banner);
		this.$btn = $('.tb-btn a', $banner);

		this.$btn.first().addClass('active');
		this.autoSetStyle('btnBoxPos');

		// 导航按键中添加数字
		if (this.options.navBtn === 'ol') {
			this.$btn.find('i').each(function(index) {
				$(this).text(index + 1);
			});
		}

		this.$btn.on(self.options.useHover ? 'mouseenter' : 'click', function() {
			if (self.isAnimated) {
				return;
			}

			self.currentIndex = $(this).index();
			self.play();
		});

		this.addThumb();
	};

	// 添加缩略图
	TB.prototype.addThumb = function() {
		if (!(typeof this.options.thumb === 'object' &&
			$.isNumeric(this.options.thumb.width) &&
			$.isNumeric(this.options.thumb.height))) 
		{
			this.lazyLoad();
			return;
		}

		var $banner = this.$elem,
			$list = this.$list,
			$item = this.$item;

		for (var i = 0, str = '', thumb; i < this.len; i++) {
			thumb = this.thumbArr[i];
			str += '<dd><img src="' + thumb + '"></dd>';
		}

		$banner.append(
			'<div class="tb-thumb">' +
				'<a class="prev"></a>' +
				'<div class="relative">' +
					'<dl>' + str + '</dl>' +
				'</div>' +
				'<a class="next"></a>' +
			'</div>'
		);

		/*'.tb-thumb dl dd{' +
			'float: left;' +
			'overflow: hidden;' +
		'}\n' +

		'.tb-thumb dl dd img{' +
			'display: block;' +
			'position: relative' +
		'}\n' +
		*/
		this.$thumbBox = $('.tb-thumb', $banner);
		this.$thumbInnerBox = $('.tb-thumb .relative', $banner);
		this.$thumbList = $('.tb-thumb .relative dl', $banner);
		this.$thumb =$('.tb-thumb .relative dl dd', $banner);

		this.$thumb.css({
			width: this.options.thumb.width,
			height: this.options.thumb.height
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

	// 绑定动画
	TB.prototype.bindAnimation = function() {
		var self = this,
			options = this.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			$btn = this.$btn,
			$btnBox = this.$btnBox,
			A = this.animation = {};

		function determineIndex() {
			self.currentIndex =
			self.currentIndex === self.len ? 0 :
			self.currentIndex === -1 ? self.len - 1 : self.currentIndex;
		}

		function activeElement() {
			self.activeIndex =
			self.currentIndex === self.len ? 0 :
			self.currentIndex === -1 ? self.len - 1 : self.currentIndex;

			if (options.navBtn) {
				$btn.eq(self.activeIndex).addClass('active').siblings().removeClass('active');
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

			if (Util.isSupportTransition) {
				$item.eq(self.currentIndex).css('opacity', 1);

				setTimeout(self.animation.fadeCallback, self.options.duration);
			} else {
				$item.eq(self.currentIndex).animate({
					opacity: 1
				}, {
					duration: self.options.duration,
					complete: self.animation.fadeCallback
				});
			}

			activeElement();
		};

		A.flashFade = A.fade;

		A.slide = function() {
			var direction = 'left';

			if (self.currentIndex === self.latestIndex) {
				return;
			}

			if (self.currentIndex < self.latestIndex) {
				direction = 'right';
			}

			// first item to last item
			if (self.currentIndex < 0) {
				self.currentIndex = self.len - 1;

				$item.first().hide();
				$item.eq(self.len - 1).show().next().show();

				$list.css('left', -$item.width());

				direction = 'right';
			}

			// last item to first item
			if (self.currentIndex > self.len) {
				self.currentIndex = 1;
				$item.first().show().siblings().hide();
				// direction = 'left';
			}

			if (direction === 'right') {
 				$list.css('left', '-100%');
			}

			$item.eq(self.currentIndex).show();

			if (Util.isSupportTransition) {
				setTimeout(function() {
					self.isAnimated = true;

					var listTransform = direction === 'left' ?
						'translate3d(' + -$item.width() + 'px, 0, 0)' :
						'translate3d(' + $item.width() + 'px, 0, 0)';

					$list.css({
						transform: listTransform,
						'-webkit-transform': listTransform
					});

					setTimeout(self.animation.slideCallback, options.duration - 20);
				}, 20);
			}

			if (!Util.isSupportTransition) {
				self.isAnimated = true;
				$list.animate({
					left: direction === 'left' ? '-100%' : 0
				}, options.duration, self.animation.slideCallback);
			}

			activeElement();
		};

		A.fadeCallback = function() {
			self.isAnimated = false;

			$list.prev().css('left', -self.currentIndex * 100 + '%');

			$item.eq(self.currentIndex).siblings().css('opacity', 0);

			options.after.call(self, $banner, self.activeIndex);

			if (options.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		A.slideCallback = function() {
			self.isAnimated = false;

			self.latestIndex = self.currentIndex;

			$list.css({
				left: 0,
				'transition': 'none',
				transform: 'translate3d(0, 0, 0)',
				'-webkit-transform': 'translate3d(0, 0, 0)'
			});

			$item.eq(self.currentIndex).show().siblings().hide();

			$list.css('transition', 'transform ' + options.duration + 'ms');

			options.after.call(self, $banner, self.activeIndex);

			if (options.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		setTimeout(function() {
			options.init.call(self, $banner, 0);
			options.before.call(self, $banner, 0);
			options.after.call(self, $banner, 0);
		}, 20);
	};

	// 浏览器视口变化事件
	TB.prototype.bindResizeEvent = function() {
		var self = this,
			$banner = this.$elem,
			$list = this.$list;

		$(window).resize(function() {
			$list.children().width($banner.width());

			// adaptive
			if (this.options.adaptive) {
				$banner.height($list.height());
			}

			// animation: fade
			$list.prev().children().width($banner.width());
		});
	};

	// 触屏事件
	TB.prototype.bindTouchEvent = function() {

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
		}, self.options.auto);

		this.$elem.off('mouseenter');
		this.$elem.off('mouseleave');
		this.$elem.on({
			mouseenter: clear,
			mouseleave: reset
		});
	};

	// 播放
	TB.prototype.play = function() {
		this.activeIndex = this.currentIndex;

		this.animation[this.options.animation]();

		this.options.before.call(this, this.$elem, this.activeIndex);
	};

	TB.prototype.switchTo = function() {
		if (this.isAnimated) {
			return;
		}

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > this.len)) {
			throw new Error('TerseBanner\'s index overflow!');
		}

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


	/**
	 * Plugin main method
	 */
	$.fn.terseBanner = function(option) {
		if (Util.isLTIE8) {
			throw new Error('terseBanner cannot work under IE8!');
		}

		return this.each(function() {
			var terseBanner = $(this).data('terseBanner');

			if (!terseBanner) {
				options = $.extend(true, {}, $.fn.terseBanner.defaults, typeof option === 'object' && option);

				$(this).data('terseBanner', (terseBanner = new TerseBanner(this, options)));

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
		animation: 'slide', // 动画模式: ['none', 'fade', 'flashFade' 'slide', 'scanning']
		adaptive : false,   // 图片自适应
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画: [true, false]
		navArrow : false,   // 导航箭头: [true, false]
		navBtn   : true,    // 导航按钮: [true, false, 'ol', 'equal']
		auto     : 5000,    // 自动轮播: [Number][等于0时禁用此功能]
		duration : 800,     // 动画速度
		init     : $.noop,  // 初始化完成后执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		after    : $.noop,  // 动画完成时执行的回调函数
		thumb    : {}       // 缩略图
	};
}));
