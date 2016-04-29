/**
 * terseBanner
 * Version: 2.0.2
 * URI: https://github.com/happyfreelife/easyBanner/
 */

;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory(jQuery, window, document));
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'), window, document);
	} else {
		factory(jQuery, window, document);
	}
}(this, function ($, window, document) {
	/**
	 * Utility property and method
	 */
	var Util = {
		// 是否为ie8以下的浏览器
		isLTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),

		// 是否支持触摸事件
		isSupportTouch: 'ontouchstart' in window,

		// 是否是手机端
		isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),

		// 是否支持CSS3动画过渡
		isSupportTransition: (function () {
			var style = document.body.style || document.documentElement.style;
			return style.transition !== undefined || style.WebkitTransition !== undefined;
		}()),

		// 箭头 - 上一个
		prevArrowImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC',

		// 箭头 - 下一个
		nextArrowImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC',

		// 加载动画
		loaderImage: 'data:image/gif;base64,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'
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
		this.$list = this.$elem.children().first();
		this.$item = this.$list.children();
		this.len   = this.$item.length;
		this.currentIndex = 0;
		this.activeIndex  = 0;
		this.latestIndex  = 0;
		this.isHovered    = false;
		this.isAnimated   = false;

		// 在移动端，动画方式必须是slide
		if (Util.isSupportTouch) {
			this.options.animation = 'slide';
		}

		this.addDefaultStyle();
	};

	// 写入轮播元素的默认样式
	TB.prototype.addDefaultStyle = function() {
		$('head').append(
			'<style>\n' +
				'.tb-list, .tb-list > *, .tb-thumb-list, .tb-thumb dl{position: relative;overflow: hidden;}\n' +

				'.tb-list > * > *{position: relative;float: left;min-height: 1px;background-repeat: no-repeat;background-position: center top;}\n' +
				'.tb-list > .touching{-webkit-transition-duration: 0ms !important;transition-duration: 0ms !important;}\n' +

				'.tb-arrow a{position: absolute;top: 0;cursor: pointer;}\n' +
				'.tb-arrow a.prev{left: 0;}\n' +
				'.tb-arrow a.next{right: 0;}\n' +
				'.tb-arrow a img{display: inline-block;max-height: 100%;}\n' +

				'.tb-btn a{display: inline-block;width: 10px;height: 10px;margin: 0 5px;background-color: #fff;border-radius: 50%;cursor: pointer;}\n' +
				'.tb-btn a.active{background-color: #09c;}\n' +

				'.tb-thumb{position: absolute;width: 100%;overflow: hidden;bottom: 10px;left: 0;}\n' +
				'.tb-thumb a{position: relative;float: left;width: 30px;cursor: pointer;background-color: #666;z-index: 1;' +
					'height: ' + this.options.thumb.height + 'px;' +
				'}\n' +
				'.tb-thumb dl dd{position: relative;float: left;overflow: hidden;cursor: pointer;' +
					'width: ' + this.options.thumb.width + 'px;' +
					'height: ' + this.options.thumb.height + 'px;' +
					'margin-right: ' + this.options.thumb.gap + 'px;' +
				'}\n' +
				'.tb-thumb dl dd img{position: relative;display: block;width: 100%;}\n' +

				'.tb-loader{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}\n' +
				'.tb-loader img{position: absolute;left: 50%;width: 40px;height: 40px;margin-left: -20px;}\n' +
			'</style>'
		);

 		this.build();
	};

	// 创建轮播的初始结构
	TB.prototype.build = function() {
		var $banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			options = this.options,
			thumbArr = [],
			self = this,
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		if ($banner.css('position') === 'static') {
			$banner.css('position', 'relative');
		}

		$banner.css({
			tapHighlightColor: 'transparent',
			userSelect: 'none'
		});

		$list.width(this.len * 2 * 100 + '%').wrap('<div class="tb-list"/>');

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
					// userSelect: 'none'
				});

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				}

				$(this).data('thumb', src);
			});

			// setTimeout(function() {
				// $banner.height($list.height());
			// }, 20);
		}

		// 标准模式
		if (!options.adaptive) {
			$item.each(function() {
				var $img = $(this).find('img'),
					src = $img.attr('src') || $img.attr('data-src');

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				} else {
					$(this).css('backgroundImage', 'url(' + src + ')');
				}

				$(this).data('thumb', src).height($banner.height());

				$img.remove();
			});
		}

		$item.width($list.parent().width());

		if (this.len <= 1) return;

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
	};

	// 轮播元素自动设置样式
	TB.prototype.autoSetStyle = function(elem) {
		var $banner = this.$elem,
			$arrow = this.$arrow,
			$arrowBox = this.$arrowBox,
			$btn = this.$btn,
			$btnBox = this.$btnBox,
			$thumb = this.$thumb,
			$thumbList = this.$thumbList,
			$thumbInnerBox = this.$thumbInnerBox,
			$thumbSlideBtn = this.$thumbSlideBtn,
			$thumbBox = this.$thumbBox;

		switch (elem) {
			case 'arrow' :
				if ($arrow.css('backgroundImage') === 'none') {
					if (!$arrow.height()) {
						$arrow.height(parseInt($banner.height() * 0.1));
					}

					$arrow.filter('.prev').html('<img src="' + Util.prevArrowImage + '">');
					$arrow.filter('.next').html('<img src="' + Util.nextArrowImage + '">');

					$arrow.find('img').on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'arrowBoxSize' :
				if ($arrowBox.width() === $banner.width()) {
					$arrowBox.width($banner.width());
				}
				break;

			case 'arrowBoxPos' :
				if ($arrowBox.css('top') === 'auto' && $arrowBox.css('bottom') === 'auto') {
					$arrowBox.css({
						top: '50%',
						marginTop: -$arrow.outerHeight() / 2
					});
				}

				if ($arrowBox.css('left') === 'auto' && $arrowBox.css('right') === 'auto') {
					$arrowBox.css({
						left: '50%',
						marginLeft: -$arrowBox.width() / 2
					}).addClass('center');
				}

				$banner.append($arrowBox.css('position', 'absolute'));
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
				$banner.append($btnBox.css('position', 'absolute'));
				break;

			case 'thumb':
				$thumb.each(function() {
					if ($(this).find('img')[0].complete) {
						$(this).find('img').css('marginTop', function() {
							return ($(this).parent().height() - $(this).height()) / 2;
						});
					} else {
						$(this).find('img').on('load', function() {
							$(this).css('marginTop', function() {
								return ($(this).parent().height() - $(this).height()) / 2;
							});
						});
					}
				});

				$thumb.last().css('marginRight', 0);
				break;

			case 'thumbList':
				$thumbList.css({
					left: 0,
					width: $thumb.outerWidth(true) * $thumb.length/* - this.options.thumb.gap*/
				});
				break;

			case 'thumbInnerBox':
				var thumbBoxWidth = $thumbBox.width(),
					thumbListWidth = $thumbList.width(),
					thumbSlideBtnPosition = $thumbInnerBox.siblings('a').css('position');

				if (thumbListWidth <= thumbBoxWidth) {
					$thumbInnerBox.siblings('a').remove();

					$thumbInnerBox.css({
						margin: '0 auto',
						width: thumbListWidth
					});
				} else {
					$thumbInnerBox.css({
						float: 'left',
						width: function() {
							return thumbSlideBtnPosition === 'relative' || thumbSlideBtnPosition === 'static' ?
							thumbBoxWidth - $thumbInnerBox.siblings('a').outerWidth(true) * 2 : thumbBoxWidth;
						}
					});
				}

				$thumbInnerBox.parent().height($thumbInnerBox.height());
				break;

			case 'thumbSlideBtn':
				if ($thumbSlideBtn.css('backgroundImage') === 'none') {
					$thumbSlideBtn.filter('.prev').text('<');
					$thumbSlideBtn.filter('.next').text('>');

					$thumbSlideBtn.css({
						fontSize: $thumbSlideBtn.height() / 5,
						lineHeight: $thumbSlideBtn.height() + 'px',
						textAlign: 'center',
						color: '#fff'
					});
				}
				break;
		}
	};

	// 添加箭头
	TB.prototype.addArrow = function() {
		if (!this.options.arrow || Util.isMobile) {
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
				if (self.isAnimated) return;

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

	// 添加按钮
	TB.prototype.addBtn = function() {
		if (!this.options.btn) {
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

		// 按钮中添加数字
		if (this.options.btn === 'ol') {
			this.$btn.find('i').each(function(index) {
				$(this).text(index + 1);
			});
		}

		if (!Util.isMobile) {
			this.$btn.on(
				self.options.useHover ? 'mouseenter' : 'click',
				function() {
					if (self.isAnimated) return;

					self.currentIndex = $(this).index();
					self.play();
				}
			);
		}

		this.addThumb();
	};

	// 添加缩略图
	TB.prototype.addThumb = function() {
		if (!(typeof this.options.thumb === 'object' &&
			parseInt(this.options.thumb.width) > 0 &&
			parseInt(this.options.thumb.height) > 0 &&
			parseInt(this.options.thumb.gap) >= 0))
		{
			this.bindAnimation();
			return;
		}

		var self = this,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item;

		for (var i = 0, str = '', thumb; i < this.len; i++) {
			thumb = this.thumbArr[i];
			str += '<dd><img src="' + thumb + '"></dd>';
		}

		$banner.append(
			'<div class="tb-thumb">' +
				'<a class="prev disabled"></a>' +
				'<div class="tb-thumb-list">' +
					'<dl>' + str + '</dl>' +
				'</div>' +
				'<a class="next"></a>' +
			'</div>'
		);

		this.$thumbBox = $('.tb-thumb', $banner);
		this.$thumbSlideBtn = $('.tb-thumb a', $banner);
		this.$thumbInnerBox = $('.tb-thumb-list', $banner);
		this.$thumbList = $('.tb-thumb-list dl', $banner);
		this.$thumb =$('.tb-thumb-list dl dd', $banner);

		this.autoSetStyle('thumb');
		this.autoSetStyle('thumbList');
		this.autoSetStyle('thumbInnerBox');
		this.autoSetStyle('thumbSlideBtn');

		this.$thumb.first().addClass('active');

		this.$thumb.on(
			self.options.useHover ? 'mouseenter' : 'click',
			function() {
				if (self.isAnimated) return;
				self.currentIndex = $(this).index();
				self.play();
			}
		);

		this.$thumbSlideBtn.on({
			click: function() {
				if ($(this).hasClass('disabled')) return;

				var thumbListPos,
					$this = self.$thumbList,
					$thumbInnerBox = self.$thumbInnerBox;

				if ($(this).hasClass('prev')) {
					thumbListPos = Math.min(0, parseInt($this.css('left')) + $thumbInnerBox.width() + self.options.thumb.gap);
				} else {
					thumbListPos = Math.max(
						$thumbInnerBox.width() - ($this.width() - self.options.thumb.gap),
						parseInt($this.css('left')) - $thumbInnerBox.width() - self.options.thumb.gap
					);
				}

				self.animation.thumbListSlide(thumbListPos);
			},

			// 阻止连续点击箭头按钮时选中按钮
			selectstart: function() {
				return false;
			}
		});


		this.bindAnimation();
	};

	// 绑定动画
	TB.prototype.bindAnimation = function() {
		var self = this,
			options = this.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			A = this.animation = {};

		A.none = function() {
			self.animationDetermineIndex();

			$item.eq(self.currentIndex).show().siblings().hide();

			self.directiveElementActive();

			options.after.call(self, $banner, self.activeIndex);
		};

		A.fade = function() {
			self.animationDetermineIndex();

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

			self.directiveElementActive();
		};

		A.flashFade = A.fade;

		A.slide = function() {
			var slideDirection = 'left';

			if (self.currentIndex === self.latestIndex) return;

			if (self.currentIndex < self.latestIndex) {
				slideDirection = 'right';
			}

			// first item to last item
			if (self.currentIndex < 0) {
				self.currentIndex = self.len - 1;

				$item.first().hide();
				$item.eq(self.len - 1).show().next().show();

				$list.css('left', -$item.width());

				slideDirection = 'right';
			}

			// last item to first item
			if (self.currentIndex > self.len) {
				self.currentIndex = 1;
				$item.first().show().siblings().hide();
				// slideDirection = 'left';
			}

			if (slideDirection === 'right') {
				$list.css('left', '-100%');
			}

			$item.eq(self.currentIndex).show();

			if (Util.isSupportTransition) {
				setTimeout(function() {
					self.isAnimated = true;

					var listTransform = slideDirection === 'left' ?
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
					left: slideDirection === 'left' ? '-100%' : 0
				}, options.duration, self.animation.slideCallback);
			}

			self.directiveElementActive();
		};

		A.thumbListSlide = function() {
			var $thumbBox = self.$thumbBox,
				$thumbInnerBox = self.$thumbInnerBox,
				$thumbList = self.$thumbList,
				$thumb = self.$thumb,
				$thumbSlideBtn = self.$thumbSlideBtn;

			var thumbVisibleCount = Math.ceil($thumbBox.width() / $thumb.outerWidth(true)),
				thumbListPos = arguments[0] ||
				Math.max(
					-parseInt(self.activeIndex / thumbVisibleCount) * $thumb.outerWidth(true) * thumbVisibleCount,
					$thumb.outerWidth(true) * thumbVisibleCount - $thumbList.width()
				);

			// 根据activeIndex来判定高亮的缩略图所在的位置
			// 直接切换到高亮缩略图对应的那一组
			$thumbList.stop(true, false).animate({ left: thumbListPos }, function() {
				// 禁用缩略图列表切换按钮
				var left = parseInt($thumbList.css('left'));

				if (!left) {
					$thumbSlideBtn.filter('.prev').addClass('disabled').siblings('a').removeClass('disabled');
				} else if (Math.abs(left) + $thumbInnerBox.width() === $thumbList.width()) {
					$thumbSlideBtn.filter('.next').addClass('disabled').siblings('a').removeClass('disabled');
				} else {
					$thumbSlideBtn.removeClass('disabled');
				}
			});
		};

		A.fadeCallback = function() {
			self.isAnimated = false;

			if (options.animation === 'fade') {
				$list.prev().css('left', -self.currentIndex * 100 + '%');
				$list.prev().html($list.html());
			}

			$item.eq(self.currentIndex).siblings().css('opacity', 0);

			options.after.call(self, $banner, self.activeIndex);

			if (self.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		A.slideCallback = function() {
			self.isAnimated = false;

			self.latestIndex =
			self.currentIndex === self.len ? 0 :
			self.currentIndex === -1 ? self.len - 1 : self.currentIndex;

			$list.css({
				left: 0,
				'transition': 'none',
				transform: 'translate3d(0, 0, 0)',
				'-webkit-transform': 'translate3d(0, 0, 0)'
			});

			$item.eq(self.currentIndex).show().siblings().hide();

			$list.css('transition', 'transform ' + options.duration + 'ms');

			options.after.call(self, $banner, self.activeIndex);

			if (self.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		setTimeout(function() {
			options.init.call(self, $banner, 0);
			options.before.call(self, $banner, 0);
			options.after.call(self, $banner, 0);
		}, 20);

		this.bindResizeEvent();
	};

	// 动画时索引的判定
	TB.prototype.animationDetermineIndex = function() {
		this.currentIndex =
		this.currentIndex === this.len ? 0 :
		this.currentIndex === -1 ? this.len - 1 : this.currentIndex;
	};

	// 指示类的元素高亮
	TB.prototype.directiveElementActive = function() {
		this.activeIndex =
		this.currentIndex === this.len ? 0 :
		this.currentIndex === -1 ? this.len - 1 : this.currentIndex;

		if (this.$btn) {
			this.$btn.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (this.$thumb) {
			this.$thumb.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
			this.animation.thumbListSlide();
		}
	};

	// 浏览器视口变化事件
	TB.prototype.bindResizeEvent = function() {
		var self = this,
			$banner = this.$elem,
			$list = this.$list;

		$(window).resize(function() {
			$list.children().width($list.parent().width());

			// adaptive
			if (this.options.adaptive) {
				$banner.height($list.height());
			}

			// animation: fade
			if (this.options.animation === 'fade') {
				$list.prev().children().width($banner.width());
			}

			if (this.options.arrow) {
				self.$arrowBox.css('marginLeft', function() {
					return -($(this).width() / 2);
				});
			}
		});

		if (Util.isSupportTouch) {
			this.bindTouchEvent();
		}

		if (typeof this.options.auto === 'number' && this.options.auto > 0) {
			this.useAuto = true;
			this.setPlayTimer();
		}

		this.lazyLoad();
	};

	// 触屏事件
	TB.prototype.bindTouchEvent = function() {
		var $banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			self = this,
			touch,          // 触摸事件
			touchStartTime, // 触摸开始时刻
			touchStarX,     // 触摸开始的X坐标
			touchCurrentX,  // 触摸进行时的X坐标
			touchRange,     // 触摸距离
			touchDirection, // 触摸方向
			touchDuration,  // 触摸持续时间
			touchEndTime,   // 触摸开始时刻

			touchStart = function(e) {
				e.preventDefault();
				if (self.isAnimated) return;

				touch = e.touches[0];
				touchStartTime = Date.now();
				touchStarX = touch.pageX - $banner.offset().left;
			},

			touchMove = function(e) {
				e.preventDefault();
				if (self.isAnimated) return;

				touch = e.touches[0];
				touchCurrentX = touch.pageX - $banner.offset().left;
				touchRange = touchCurrentX - touchStarX;

				if (!$list.hasClass('touching')) {
					if (touchRange < 0) {
						touchDirection = 'left';
						self.currentIndex++;
					} else if (touchRange > 0) {
						touchDirection = 'right';
						self.currentIndex--;
					} else return;

					// first item to last item
					if (self.currentIndex < 0) {
						self.currentIndex = self.len - 1;

						$item.first().hide();
						$item.eq(self.len - 1).show().next().show();

						$list.css('left', -$item.width());

						touchDirection = 'right';
					}

					// last item to first item
					if (self.currentIndex > self.len) {
						self.currentIndex = 1;
						$item.first().show().siblings().hide();
						// touchDirection = 'left';
					}

					if (touchDirection === 'right') {
						$list.css('left', '-100%');
					}

					$item.eq(self.currentIndex).show();

					$list.addClass('touching');
				}

				$list.css({
					transform: 'translate3d(' + touchRange + 'px, 0, 0)',
					'-webkit-transform': 'translate3d(' + touchRange + 'px, 0, 0)'
				});
			},

			touchEnd = function(e) {
				e.preventDefault();
				if (self.isAnimated || !touchRange) return;
				self.isAnimated = true;

				touchEndTime = Date.now();
				touchDuration = touchEndTime - touchStartTime;

				var listTransform;

				// 触摸速度足够或触摸距离超过banner宽度的一半列表滑动
				if (touchDuration < 300 || Math.abs(touchRange) >= $item.width() / 2) {
					listTransform = touchDirection === 'left' ? 'translate3d(' + -$item.width() + 'px, 0, 0)' :
					'translate3d(' + $item.width() + 'px, 0, 0)';

					self.directiveElementActive();
				}

				// 触摸速度过低并且触摸距离不超过banner宽度的一半，列表回拉
				if (touchDuration > 300 && Math.abs(touchRange) < $item.width() / 2) {
					listTransform = 'translate3d(0, 0, 0)';
					touchDirection === 'left' ? self.currentIndex-- : self.currentIndex++;
				}

				$list.removeClass('touching').css({
					transform: listTransform,
					'-webkit-transform': listTransform
				});

				setTimeout(function() {
					self.animation.slideCallback();
				}, self.options.duration);

			};

		$banner[0].addEventListener('touchstart', touchStart, false);
		$banner[0].addEventListener('touchmove', touchMove, false);
		$banner[0].addEventListener('touchend', touchEnd, false);
	};

	// 图片延迟加载
	TB.prototype.lazyLoad = function() {
		var options = this.options,
			currentIndex = arguments[0] || 0,
			$banner = this.$elem,
			$list = this.$list,
			$visibleItem = $list.children().eq(currentIndex),
			visibleItemImg = $visibleItem.data('origin');

		var showVisibleItem = function() {
			if (options.adaptive) {
				$('img[data-src]', $visibleItem).attr('src', visibleItemImg);
			} else {
				$visibleItem.css('backgroundImage', 'url(' + visibleItemImg + ')');
			}

			$visibleItem.data('origin', '');
			$visibleItem.find('.tb-loader').fadeOut(400, function() {
				$(this).remove();
			});
		};

		if (!visibleItemImg) return;

		if (!currentIndex) {
			showVisibleItem();

			if (options.animation === 'slide') {
				this.lazyLoad(this.len);
			}
		} else {
			// 添加loading动画
			var loaderBackground;

			if ($banner.css('backgroundColor') === 'rgba(0, 0, 0, 0)' ||
				$banner.css('backgroundColor') === 'transparent') {
				loaderBackground = '#fff';
			} else {
				loaderBackground = $banner.css('backgroundColor');
			}

			$visibleItem.append(
				'<div class="tb-loader">' +
					'<img src="' + Util.loaderImage + '">' +
				'</div>'
			);

			$('.tb-loader', $visibleItem).css('background', loaderBackground);
			$('.tb-loader img', $visibleItem).css('top', function() {
				return ($banner.height() - $(this).height()) / 2;
			});


			// 绑定图片加载完成的事件
			var img = new Image();

			img.src = visibleItemImg;

			if (img.complete) {
				showVisibleItem();
			} else {
				img.onload = showVisibleItem;
			}
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

		this.lazyLoad(this.currentIndex);
	};

	TB.prototype.switchTo = function() {
		if (this.isAnimated) return;

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
		animation: 'slide', // 动画模式: ['none', 'fade', 'flashFade' 'slide']
		adaptive : false,   // 图片自适应
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画
		arrow    : false,   // 导航箭头
		btn      : true,    // 导航按钮: [true, false, 'ol', 'equal']
		auto     : 5000,    // 自动轮播: [为0时禁用此功能]
		duration : 800,     // 动画速度
		init     : $.noop,  // 初始化完成后执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		after    : $.noop,  // 动画完成时执行的回调函数
		thumb    : {        // 缩略图
			// width: 150,
			// height: 100,
			// gap: 10
		}
	};
}));
