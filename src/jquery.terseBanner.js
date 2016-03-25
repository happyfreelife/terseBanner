 /**
 * jquery.terseBanner.js
 * Version: 2.0.0
 * URI: https://github.com/happyfreelife/easyBanner/
 * Date: 2016/3/22 16:33:26
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
		this.latestIndex  = 0; // **********************************
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

		this.addDefaultStyle();
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
				'.tb-arrow .prev{' +
					'left: 0;' +
				'}\n' +
				'.tb-arrow .next{' +
					'right: 0;' +
				'}\n' +
				'.tb-arrow a img{' +
					'display: block;' +
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

		if ($banner.css('position') === 'static') {
			$banner.addClass('relative');
		}

		$list.wrap('<div class="relative"/>').width(this.len * 2 * 100 + '%');

		$item.width($banner.width());

		if (options.adaptive) {
			if ($banner.css('maxWidth') === 'none') {
				$banner.css('maxWidth', '100%');
			}
		} else {
			$item.height($banner.height());
		}

		switch (options.animation) {
			case 'slide':
				if (Util.isSupportTransition) {
					$list.css({
						transform: 'translate3d(0, 0, 0)',
						'-webkit-transform': 'translate3d(0, 0, 0)',
						transition: 'transform ' + options.speed + 'ms',
						// '-webkit-transition': '-webkit-transform ' + options.speed + 'ms'
					});
				}

				$list.css('left', 0);

				$item.css('float', 'left').first().show().siblings().hide();
				break;

			case 'fade':
			case 'flashFade':
				if (Util.isSupportTransition) {
					$item.css('transition', 'opacity ' + options.speed + 'ms');
				}
				break;
		}

		this.bindWindowResize();
		this.handleImage();
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
				if (
					($arrow.css('backgroundColor') === 'rgba(0, 0, 0, 0)' ||
					$arrow.css('backgroundColor') === 'transparent') &&
					$arrow.css('backgroundImage') === 'none'
				) {
					$arrow.filter('.prev').html('<img src="' + Util.prevArrowImageData + '">');
					$arrow.filter('.next').html('<img src="' + Util.nextArrowImageData + '">');

					$arrow.height(parseInt($banner.height() * 0.13));

					$arrow.find('img').css({
						userSelect: 'none',
						marginTop: function() {
							return ($arrow.height() - $(this).height()) / 2;
						}
					}).on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'arrowBoxSize' :
				var bannerWidth;

				// 缩放网页会导致返回的轮播容器的宽度不精确(产生小数)
				if ($banner.width().toString().indexOf('.') > -1) {
					bannerWidth = parseInt($banner.width().toFixed(0));
				} else {
					bannerWidth = $banner.width();
				}

				if ($arrowBox.width() === bannerWidth) {
					$arrowBox.width('100%');
				}
				break;

			case 'arrowBoxPos' :
				if ($arrowBox.css('top') === 'auto' && $arrowBox.css('bottom') === 'auto') {
					$arrowBox.css({
						top: '50%',
						height: 0,
						marginTop: -$arrowBox.height() / 2
					});
				}
				if ($arrowBox.css('left') === 'auto' && $arrowBox.css('right') === 'auto') {
					$arrowBox.css('marginLeft', ($banner.width() - $arrowBox.width()) / 2 + 'px');
				}

				$banner.append($arrowBox.css('position', 'absolute'));
				break;

			case 'btnBoxPos' :
				if ($btnBox.css('top') === 'auto' && $btnBox.css('bottom') === 'auto') {
					$btnBox.css('bottom', $banner.height() * 0.04);
				}
				if ($btnBox.css('left') === 'auto' && $btnBox.css('right') === 'auto') {
					$btnBox.css({
						left: '50%',
						marginLeft: -$btn.outerWidth(true) * $btn.length / 2
					});
				}
				$banner.append($btnBox.css('position', 'absolute'));
				break;
		}
	};

	// 视口大小发生变化时，轮播图片的尺寸自动调整
	TB.prototype.bindWindowResize = function() {
		var self = this,
			$banner = this.$elem,
			$list = this.$list;

		$(window).resize(function() {
			$list.children().width($banner.width());

			// fade
			$list.prev().children().width($banner.width());

			// slide
			/*if (Util.isSupportTransition) {
				var translate = 'translate3d(-' + $list.children().width() *
					self.currentIndex + 'px, 0, 0)';

				$list.css({
					'transform': translate,
					'-webkit-transform': translate
				});
			}*/
		});
	};

	// 轮播图片处理
	TB.prototype.handleImage = function() {
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
		if (options.adaptive) {
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
		if (!options.adaptive) {
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
				if (options.adaptive) {
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
					self.switchPrevItem = true;
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

		this.lazyLoad();
	};

	// 添加缩略图
	TB.prototype.addThumb = function() {

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
			$item = this.$item,
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

				setTimeout(self.animation.fadeCallback, self.options.speed);
			} else {
				$item.eq(self.currentIndex).animate({
					opacity: 1
				}, {
					duration: self.options.speed,
					complete: self.animation.fadeCallback
				});
			}

			options.before.call(self, $banner, self.activeIndex);

			activeElement();

			// Lazyload($item, self.currentIndex, self.currentIndex);
		};

		A.flashFade = A.fade;

		/*A.slide = function() {
			self.isAnimated = true;

			options.before.call(this, $banner, this.currentIndex);

			if (Util.isSupportTransition) {
				var transitionDuration = $list.css('transition-duration');

				// 当前显示最后一屏，点击了序列按钮来切换不连续的屏幕
				if (self.lastTimeIndex === self.len && !self.switchPrevItem) {
					$list.css({
						transition: 'none',
						// '-webkit-transtion': 'none',
						transform: 'translate3d(0, 0, 0)',
						'-webkit-transform': 'translate3d(0, 0, 0)'
					});
				}

				// 第一屏 -> 最后一屏
				if (self.currentIndex < 0) {
					self.currentIndex = self.len - 1;
					$list.css({
						transition: 'none',
						// '-webkit-transtion': 'none'
					});
					$list.css({
						transform: 'translate3d(-' + $item.width() * self.len + 'px, 0, 0)',
						'-webkit-transform': 'translate3d(-' + $item.width() * self.len + 'px, 0, 0)'
					});
				}

				// 最后一屏 -> 第一屏
				if (self.currentIndex > self.len) {
					self.currentIndex = 1;
					$list.css({
						transition: 'none',
						// '-webkit-transtion': 'none',
						transform: 'translate3d(0, 0, 0)',
						'-webkit-transform': 'translate3d(0, 0, 0)'
					});
				}

				self.lastTimeIndex = self.currentIndex;

				setTimeout(function() {
					var translate3d = 'translate3d(-' + $item.width() * self.currentIndex + 'px, 0, 0)';

					$list.animating = true;

					$list.css({
						transform: translate3d,
						transition: 'transform ' + transitionDuration,
						'-webkit-transform': translate3d,
					});

					setTimeout(self.animation.slideCallback, self.options.speed - 20);
				}, 20);
			}

			if (!Util.isSupportTransition) {

			}

			activeElement();
		};*/

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
				$item.eq(self.len).show().siblings().hide();
				direction = 'right';
			}

			/*if (self.currentIndex === self.len) {
				T.$item.first().show().siblings().hide();
				self.currentIndex = 0;
			}*/

			// last item to first item
			if (self.currentIndex > self.len) {
				self.currentIndex = 1;
				direction = 'left';
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

					setTimeout(self.animation.slideCallback, options.speed - 20);
				}, 20);
			}

			if (!Util.isSupportTransition) {
				self.isAnimated = true;
				$list.animate({
					left: direction === 'left' ? '-100%' : 0
				}, options.speed, animation.slideComplete);
			}

			activeElement();

			// Lazyload($item, self.currentIndex, self.currentIndex);

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

			$list.css('transition', 'transform ' + options.speed + 'ms');

			options.after.call(self, $banner, self.currentIndex);

			if (options.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		options.init.call(this, $banner);
		options.before.call(this, $banner);
		options.after.call(this, $banner);
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
		if (Util.isLTIE8) {
			throw new Error('terseBanner cannot work under IE8!');
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
		adaptive : false,   // 图片自适应
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画: [true, false]
		navArrow : false,   // 导航箭头: [true, false]
		navBtn   : true,    // 导航按钮: [true, false, 'ol', 'equal']
		auto     : 5000,    // 自动轮播: [Number][等于0时禁用此功能]
		speed    : 800,     // 动画速度
		init     : $.noop , // 初始化完成后执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		end      : $.noop , // 动画完成时执行的回调函数
		thumb    : {        // 缩略图
			// width: 100,
			// height: 50,
			// gap: 20
		}
	};
}));
