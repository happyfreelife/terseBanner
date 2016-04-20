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

		isSupportTouch: 'ontouchstart' in window,

		isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),

		isSupportTransition: (function () {
			var style = document.body.style || document.documentElement.style;
			return style.transition !== undefined || style.WebkitTransition !== undefined;
		}()),

		// isSupportTransition: false,

		prevArrowImageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC',

		nextArrowImageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC',

		loaderImageData: 'data:image/gif;base64,R0lGODlhKAAoALMJANbW1uHh4YGBgZeXl7q6uvLy8sTExLOzs1RUVP///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUY2NkY5NzIwNTQzMTFFNjk1QjQ5QzE2QzcwODdBMDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUY2NkY5NzEwNTQzMTFFNjk1QjQ5QzE2QzcwODdBMDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDpBMUUxOTE4MTQwMDVFNjExQjlBOEY2NzhGNzM4NUM4NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMUUxOTE4MTQwMDVFNjExQjlBOEY2NzhGNzM4NUM4NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUKAAkALAAAAAAoACgAAATXMMlJq7046827/2AoXoZgjKKgVkGBTgBRqQIF3G9SqAdFT4UbIJegDSU/iTBAJKgGk2RASJQMVLLiKrGscgVXlwqRmOImZqYGMBicJgesZQoUAtQZQ7t9BJg2dmcbe3t4a3aGgIRQHGkjegNHjTkBWV6XMIEALhcABgSgoSCaghWhp5YdQgZdnZ+omLFlRIkZjiK3gHacHUF2HpqqgRt0EmY3tSyIMLXHFLkY0F1UXDe8Ob59Z85VrdTVd7Tf39wvreA2pSPf6M/JIAWJ7LLP4fT3+Pn6IREAIfkEBQoACQAsBAAEABgAEgAABFswyUlrAjbrkTglhhZq0yAI2aBWnmScqKW2GUxkxkq1BEx2gxElABOmOgGJqeOTBAgETElX6SUlACj0GhhIf1gtqADOPMVlTfaW1hS+7bgbQK/Dy3a7PFA31OURACH5BAUKAAkALAUABAAdAA4AAARjMMlJJxg16y1xBtwUgNRgUkdIEQTZJV5CxhxLBJMZ0ypg5xoex8CanQowWQWpCdiQGAzhNSEIBFMAADchHlxdiuF6vWm1zMI0dCFfLecAV+UWgGXn+8YqSDW1cyoDgRlyKioRACH5BAUKAAkALAsABAAZABEAAARcMMmZAqE462SIwd9WBBhhUkO6AUB5TurKFpN5wUOYBWwr2RJDbJPokRLAwCCxJEqMyNcQ43uyjhRAs7jNALAa7PLgJDa7ZVAw7STQ2PB4RkCvC3Rwu12eoCPsBhEAIfkEBQoACQAsEgAEABIAGAAABF0wmZCqvRgYnADlkrFZBkGA4ZgE5gmKagugcAW0aJoU7feKnQNBJRkMcoTCxTggoowJaC4aPU6X1uvFp+12s7mj2CuwDGbeLoF7JQgEB/L77QQBBnMBGJl3aQ90CREAIfkEBQoACQAsEgAEABIAHgAABHIwgZKqvViCzCv4F2AY3bdZ45mZlkiWYDW+HJvMnRenIUEEnIAq4POpOoYigdZR/nItIxQzmVqtg6xWAh0kvGBvbpu9mi8U84twtgyOncDhMucQBEBJuTMQ+C8EXnAJAX4CTFB3f2aGbFcAhmeGaVc+HBEAIfkEBQoACQAsEwAFABEAHwAABGYwyZlCoTgDkHvZXbgFIRVsXCmdoLq2E+tKKECWLKrWqcreswBwRsQQjkiDCskklJoEZXFKBAwGUtf1WtxuO8qe5JqVOLkT5UAiaCcutFBbQEFn5pN1CU/kj/V3AggaHX4uBgJlKhEAIfkEBQoACQAsDAASABgAEgAABFowyUlrAjiDYvvUmudlRhaIaIoCakoQbGu99ClPhUEThgwMtsAudhEQOgML4GVLDASCJCUwqKIMUIFNmjBwPdmjp9qbZSlfp9WSLaPSkjNaUHHXxZMk/EZsRQAAIfkEBQoACQAsBgAWAB0ADgAABGMwyUmrTeHSMLQNAJBdhCAQHhWuhWq+qbqG0vAKA5AG6DTzt17GYAEQCMQJSFcSHCjPBGpATRSOhNGnokt0vOCE8RibfClVieHYLYfBZx45Vm1Tz4l1r4zH+7QebWhRbnx7KREAIfkEBQoACQAsBAATABkAEQAABFvQiElFujjrW+v+mUQhE2ieKFoQaWu03wCDR3YEKAAOg371mwBgmPGxMDxZgsBMCIeFTFTDwzCPT5+J91o2L0MA7mOoWr9g4jZzLao35vMRMwZ1MQbCfaYh1DMRACH5BAUKAAkALAUADAARABgAAARUEAhBkr34kjlN/gk3DQCIGaJgZsdUrSwsz3Rt3/hqDEPN87DfD7brYQqvD89zMRAIJYDUEsgEnoRCQloCYbtcEAB7CX+wVYs58+yqp5+A+z2HyRMRACH5BAUKAAkALAQABgAOAB0AAARkMMmZDKF4CjEy3gLgTQc4att1GibVUeDrikkgHBQuByPwyiODRHhKFFTF3mDJBEqazYxvmWAmrxjaCUAgaDGBrthjERsKUvMkAEBLwl4KYM6TuCeFOaDu0fMzbHNFekmCSQV/EQA7'
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
		this.$list = this.$elem.children().first().addClass('tb-img-list');
		this.$item = this.$list.children();
		this.len   = this.$item.length;
		this.currentIndex = 0;
		this.activeIndex  = 0;
		this.latestIndex  = 0;
		this.isHovered    = false;
		this.isAnimated   = false;

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

		$list.wrap('<div class="tb-img"/>').width(this.len * 2 * 100 + '%');

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

		$item.width($banner.width());

		if (this.len <= 1) {
			return;
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
	};

	// 写入轮播元素的默认样式
	TB.prototype.addDefaultStyle = function() {
		$('head').append(
			'<style>\n' +
				'.relative, .tb-img, .tb-img-list, .tb-thumb-list{position: relative;overflow: hidden;}\n' +

				'.tb-img-list > *{position: relative;float: left;min-height: 1px;background-repeat: no-repeat;background-position: center top;}\n' +

				'.tb-arrow a{position: absolute;top: 0;cursor: pointer;}\n' +
				'.tb-arrow a.prev{left: 0;}\n' +
				'.tb-arrow a.next{right: 0;}\n' +
				'.tb-arrow a img{display: inline-block;max-height: 100%;}\n' +

				'.tb-btn a{display: inline-block;width: 10px;height: 10px;margin: 0 5px;background: #fff;border-radius: 50%;cursor: pointer;}\n' +
				'.tb-btn a.active{background: #09c;}\n' +

				'.tb-thumb{position: absolute;width: 100%;overflow: hidden;bottom: 10px;left: 0;}\n' +
				'.tb-thumb a{float: left;width: 30px;cursor: pointer;background: #666;' +
					'height: ' + this.options.thumb.height + 'px;' +
				'}\n' +
				'.tb-thumb dl{position: relative;overflow: hidden;}\n' +
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
				if ($arrowBox.width() === $banner.width()) {
					$arrowBox.width('100%');
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
					});
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
				$thumbList.width($thumb.outerWidth(true) * $thumb.length - this.options.thumb.gap);
				break;

			case 'thumbInnerBox':
				var thumbBoxWidth = $thumbBox.width(),
					thumbListWidth = $thumbList.width();

				if (thumbListWidth <= thumbBoxWidth) {
					$thumbInnerBox.siblings('a').remove();

					$thumbInnerBox.css({
						margin: '0 auto',
						width: thumbListWidth
					});
				} else {
					$thumbInnerBox.css({
						float: 'left',
						width: thumbBoxWidth - $thumbBox.find('a').outerWidth(true) * 2
					});
				}
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
		if (!this.options.arrow) {
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

		this.$btn.on(
			self.options.useHover ? 'mouseenter' : 'click',
			function() {
				if (self.isAnimated) {
					return;
				}

				self.currentIndex = $(this).index();
				self.play();
			}
		);

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
				if (self.isAnimated) {
					return;
				}

				self.currentIndex = $(this).index();
				self.play();
			}
		);

		this.$thumbSlideBtn.on({
			click: function() {
				if (self.isAnimated || $(this).hasClass('disabled')) {
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

		function determineIndex() {
			self.currentIndex =
			self.currentIndex === self.len ? 0 :
			self.currentIndex === -1 ? self.len - 1 : self.currentIndex;
		}

		function activeElement() {
			self.activeIndex =
			self.currentIndex === self.len ? 0 :
			self.currentIndex === -1 ? self.len - 1 : self.currentIndex;

			if (self.$btn) {
				self.$btn.eq(self.activeIndex).addClass('active').siblings().removeClass('active');
			}

			if (self.$thumb) {
				self.$thumb.eq(self.activeIndex).addClass('active').siblings().removeClass('active');
				A.thumbListSlide();
			}
		}

		A.none = function() {
			determineIndex();

			$item.eq(self.currentIndex).show().siblings().hide();

			activeElement();

			options.after.call(self, $banner, self.activeIndex);
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

		A.thumbListSlide = function() {
			var $thumbBox = self.$thumbBox,
				$thumbList = self.$thumbList,
				$thumbSlideBtn = self.$thumbSlideBtn,
				$thumb = self.$thumb,
				thumbVisibleCount = Math.floor($thumbBox.width() / $thumb.outerWidth(true));

			if (!self.activeIndex) {
				$thumbSlideBtn.filter('.prev').addClass('disabled').siblings('a').removeClass('disabled');
			} else if (self.activeIndex === self.len - 1) {
				$thumbSlideBtn.filter('.next').addClass('disabled').siblings('a').removeClass('disabled');
			} else {
				$thumbSlideBtn.removeClass('disabled');
			}

			// 根据activeIndex来判定高亮的缩略图所在的位置
			// 直接切换到高亮缩略图对应的那一组
			$thumbList.animate({
				left:
				-Math.min(
					parseInt(self.activeIndex / thumbVisibleCount) * $thumb.outerWidth(true) * thumbVisibleCount,
					$thumbList.width() - $thumb.outerWidth(true) * thumbVisibleCount
				)
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

		this.bindResizeEvent();
	};

	// 浏览器视口变化事件
	TB.prototype.bindResizeEvent = function() {
		var self = this,
			$banner = this.$elem,
			$list = this.$list;

		$(window).resize(function() {
			$list.children().width($banner.width());

			// adaptive
			// if (this.options.adaptive) {
				// $banner.height($list.height());
			// }

			// animation: fade
			if (this.options.animation === 'fade') {
				$list.prev().children().width($banner.width());
			}

			self.$arrowBox.css('marginLeft', function() {
				return -($(this).width() / 2);
			});

			// thumb
		});

		if (Util.isSupportTouch) {
			this.options.animation = 'slide';
			bindTouchEvent();
		}

		this.lazyLoad();
	};

	// 触屏事件
	TB.prototype.bindTouchEvent = function() {

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

		if (!visibleItemImg) {
			return;
		}

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
					'<img src="' + Util.loaderImageData + '">' +
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

		if (typeof this.options.auto === 'number' && this.options.auto > 0) {
			this.useAuto = true;
			this.setPlayTimer();
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
		animation: 'slide', // 动画模式: ['none', 'fade', 'flashFade' 'slide']
		adaptive : false,   // 图片自适应
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画: [true, false]
		arrow    : false,   // 导航箭头: [true, false]
		btn      : true,    // 导航按钮: [true, false, 'ol', 'equal']
		auto     : 5000,    // 自动轮播: [Number][等于0时禁用此功能]
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
