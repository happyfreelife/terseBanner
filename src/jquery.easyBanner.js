/**
 * jquery.easyBanner.js
 * version   1.4.6
 * url       https://github.com/happyfreelife/easyBanner/
 */

(function($, window, document) {

	// 判断浏览器是否支持CSS3的transition属性
	isSupportTransition = 'transition' in document.documentElement.style;

	// 判断浏览器是否是ie
	isIE = /msie|trident/i.test(navigator.userAgent);


	/******************** Automatic ********************/
	function Automatic($elem) {

		/**
		 * 样式检测
		 * @param  {String} prop css属性名
		 * @param  {String || Array} val  css属性值
		 * @return {Boolean}
		 */
		function cssDetector($elem, prop, val) {
			if ($.isArray(val)) {
				for (var i in val) {
					if ($elem.css(prop) === val[i]) {
						return true;
					}
				}
				return false;
			}
			return $elem.css(prop) === val;
		}

		var T = $elem;

		T.automatic = {
			/********** 主容器 **********/
			containerPos: function() {
				if (cssDetector(T, 'position', 'static')) {
					T.css('position', 'relative');
				}
			},

			/********** 箭头 **********/
			arrowBg: function($elem) {
				if (
					cssDetector($elem, 'background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
					cssDetector($elem, 'background-image', 'none')
				) {
					$elem.filter('.prev').html('&lt;');
					$elem.filter('.next').html('&gt;');

					$elem.css({
						height: parseInt(T.height() * 0.13),
						lineHeight: parseInt(T.height() * 0.13) + 'px',
						fontSize: parseInt(T.height() * 0.13),
						fontFamily: isIE ? 'SimHei' : 'monospace',
						userSelect: 'none',
						cursor: 'pointer',
						color: '#fff'
					});
				}
			},

			arrowWrapBox: function($elem) {
				var wrapWidth;

				// 缩放网页会导致T.width()的数值不精确(返回小数)
				if (T.width().toString().indexOf('.') > -1) {
					wrapWidth = parseInt(T.width().toFixed(0));
				} else {
					wrapWidth = T.width();
				}

				if ($elem.width() === wrapWidth) {
					$elem.width('100%');
				}
			},

			arrowWrapPos: function($elem) {
				if (cssDetector($elem, 'top', 'auto') && cssDetector($elem, 'bottom', 'auto')) {
					$elem.css({
						top: '50%',
						marginTop: -$elem.height() / 2,
						height: 0
					});
				}

				if (cssDetector($elem, 'left', 'auto') && cssDetector($elem, 'right', 'auto')) {
					$elem.css('marginLeft', parseInt((1 - $elem.width() / T.width()) / 2 * 100) + '%');
				}
			},

			/********** 序列按钮 **********/
			serialBtnBg: function($elem) {
				if (
					cssDetector($elem, 'background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
					cssDetector($elem, 'background-image', 'none')
				) {
					return '.eb-serial > *{background-color: #fff;border-radius: 50%;}\n' +
						'.eb-serial > .active{background-color: #ffa500;}\n';
				}
			},

			serialBtnBox: function($elem, type) {
				if (type === 'equal') {
					var len = $elem.length;

					if (cssDetector($elem, 'borderRightWidth', ['0px', 'medium'])) {
						$elem.css('borderRightWidth', 1);
					}

					if (cssDetector($elem, 'borderRightColor', ['#999', 'rgb(153, 153, 153)'])) {
						$elem.css('borderRightColor', '#fff');
					}

					if (cssDetector($elem, 'borderRightStyle', 'none')) {
						$elem.css('borderRightStyle', 'solid');
					}

					if (cssDetector($elem, 'height', '0px')) {
						$elem.css('height', 10);
					}

					$elem.css({
						width: $elem.parent().width() / len - parseInt($elem.css('border-right-width')),
						borderLeft: 'none',
						borderRadius: 0
					});

					$elem.eq(len - 1).css({
						width: $elem.parent().width() / len,
						borderRightWidth: 0
					});
				} else {
					if (cssDetector($elem, 'width', '0px') && cssDetector($elem, 'height', '0px')) {
						$elem.css({
							width: 10,
							height: 10
						});
					}

					if (cssDetector($elem, 'margin', ['auto', '0px', ''])) {
						$elem.css('margin', '0 5px');
					}
				}
			},

			serialBtnWrapPos: function($elem) {
				if (cssDetector($elem, 'top', 'auto') && cssDetector($elem, 'bottom', 'auto')) {
					$elem.css('bottom', T.height() * 0.04);
				}

				if (cssDetector($elem, 'left', 'auto') && cssDetector($elem, 'right', 'auto')) {
					$elem.css({
						left: '50%',
						marginLeft: -$elem.children().outerWidth(true) * $elem.children().length / 2
					});
				}
			},

			/********** 缩略图 **********/
			thumbImgBox: function($elem) {
				var $thumbItem = $elem.parent();

				$elem.hide();

				// $thumbItem已定高
				if (!cssDetector($thumbItem, 'height', '0px')) {
					$elem.height($thumbItem.height());
				} else {
					$elem.height(T.height() * 0.125);
					$thumbItem.height($elem.height());
				}

				$elem.width(T.width() / T.height() * $elem.height());

				// $thumbItem已定宽
				if (!cssDetector($thumbItem, 'width', '0px')) {
					$elem.css({
						position: 'relative',
						left: '50%',
						marginLeft: -$elem.outerWidth() / 2
					});
				}

				$elem.show();
			},

			thumbArrowBg: function($elem) {
				if (
					cssDetector($elem, 'background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
					cssDetector($elem, 'background-image', 'none')
				) {
					$elem.filter('.prev').html('&lt;');
					$elem.filter('.next').html('&gt;');

					$elem.css({
						fontSize: $elem.parent().height() * 0.5,
						lineHeight: $elem.height() + 'px',
						fontFamily: isIE ? 'SimHei' : 'monospace',
						userSelect: 'none',
						cursor: 'pointer',
						color: '#fff'
					});
				}
			},

			thumbArrowPos: function($elem) {
				$elem.each(function() {
					if (cssDetector($(this), 'top', 'auto') && cssDetector($(this), 'bottom', 'auto')) {
						$(this).css('top', ($(this).parent().height() - $(this).height()) / 2);
					}

					if (cssDetector($(this), 'left', 'auto') && cssDetector($(this), 'right', 'auto')) {
						$(this).css($(this).hasClass('prev') ? 'left' : 'right', 0);
					}
				});
			},

			thumbListBox: function($elem) {
				var $prevArrow = $elem.siblings('.prev'),
					$nextArrow = $elem.siblings('.next'),
					thumbWrapWidth = $elem.parent().width(),
					thumbListWidth = 
					thumbWrapWidth -
					$prevArrow.outerWidth(true) -
					$nextArrow.outerWidth(true) -
					parseInt($prevArrow.css('left')) -
					parseInt($nextArrow.css('right'));

				thumbListWidth = Math.min(thumbListWidth, thumbWrapWidth);

				$elem.wrap('<div/>').parent().css({
					position: 'absolute',
					left: (thumbWrapWidth - thumbListWidth) / 2,
					width: thumbListWidth,
					height: $elem.height(),
					overflow: 'hidden',
					userSelect: 'none'
				});
			},

			thumbListWrapPos: function($elem) {
				if (cssDetector($elem, 'top', 'auto') && cssDetector($elem, 'bottom', 'auto')) {
					$elem.css('bottom', T.height() / 25);
				}

				if ($elem.children().outerWidth() <= T.width()) {
					$elem.css({
						width: $elem.children().outerWidth(),
						left: (1 - $elem.children().outerWidth() / T.width()) / 2 * 100 + '%'
					});
				} else {
					$elem.width('100%');
				}
			}
		};
	}


	/******************** Animation ********************/
	function Animation($elem) {
		var T = $elem;

		T.animation = {
			// 判定当前显示项的索引是否溢出
			determineIndex: function() {
				T.activeIndex =
					T.currentIndex === T.len ? 0 : T.currentIndex === -1 ? T.len - 1 : T.currentIndex;
			},

			// 序列元素当前项高亮
			serialActive: function() {
				this.determineIndex();

				if (T.options.serial === true || T.options.serial === 'equal') {
					T.$serialBtn.eq(T.activeIndex).addClass('active').siblings().removeClass('active');
				}

				if (T.options.serial === 'thumb') {
					T.$thumbItem.eq(T.activeIndex).addClass('active').siblings().removeClass('active');

					// 判定当前图片对应的缩略图是否在缩略图列表的可见范围内
					var currentItemThumbLeft = T.currentIndex * T.$thumbItem.outerWidth(true),
						currentThumbListLeft = Math.abs(parseInt(T.$thumbList.css('left'))),
						thumbListWrapWidth = T.$thumbList.parent().width();

					// 如果不在列表的可见范围内，滑动到当前图片对应的缩略图的位置
					if (
						currentItemThumbLeft < currentThumbListLeft ||
						currentItemThumbLeft > (currentThumbListLeft + thumbListWrapWidth)
					) {
						var left = parseInt(currentItemThumbLeft / thumbListWrapWidth) * thumbListWrapWidth;
						left = Math.min(left, T.$thumbList.width() - thumbListWrapWidth);

						this.thumbSlide(-left);
					}
				}
			},

			// 缩略图列表滑动
			thumbSlide: function(left) {
				if (T.$thumbList.animating) {
					return false;
				}

				// if (isSupportTransition) {
				// 	T.$thumbList.animating = true;
				// 	T.$thumbList.css('left', left).addClass('transition-left-' + T.options.speed);

				// 	setTimeout(T.animation.thumbSlideComplete, T.options.speed + 20);
				// } else {
					T.$thumbList.animating = true;
					T.$thumbList.animate({
						left: left
					}, {
						duration: T.options.speed,
						complete: T.animation.thumbSlideComplete
					});
				// }
			},

			// 动画模式 - 无效果
			none: function() {
				this.determineIndex();
				T.$item.eq(T.currentIndex).show().siblings().hide();
				this.serialActive();
				Lazyload(T.$item, T.currentIndex, T.currentIndex);
			},

			// 动画模式 - 淡入淡出
			fade: function() {
				this.determineIndex();

				T.currentIndex = T.activeIndex;

				T.$list.animating = true;
				// T.$item.removeClass('top-item').eq(T.currentIndex).addClass('top-item');

				T.$list.css('left', -T.currentIndex * 100 + '%');

				if (isSupportTransition) {
					T.$item.eq(T.currentIndex).css('opacity', 1);

					setTimeout(T.animation.fadeComplete, T.options.speed);
				} else {
					T.$item.eq(T.currentIndex).animate({
						opacity: 1
					}, {
						duration: T.options.speed,
						complete: T.animation.fadeComplete
					});
				}

				this.serialActive();

				Lazyload(T.$item, T.currentIndex, T.currentIndex);
			},

			// 动画模式 - 滑动
			slide: function() {
				T.$item = T.$list.children();

				if (isSupportTransition) {
					var transitionDuration = T.$list.css('transition-duration');

					// 当前显示最后一屏，点击了序列按钮来切换不连续的屏幕
					if (T.lastTimeIndex === T.len && !T.$list.data('switch-prev')) {
						T.$list.css({
							transition: 'none',
							'-webkit-transtion': 'none',
							transform: 'translate3d(0, 0, 0)',
							'-webkit-transform': 'translate3d(0, 0, 0)'
						});
					}

					// 第一屏 -> 最后一屏
					if (T.currentIndex < 0) {
						T.currentIndex = T.len - 1;
						T.$list.css({
							transition: 'none',
							'-webkit-transtion': 'none'
						});
						T.$list.css({
							transform: 'translate3d(-' + T.$list.children().width() * T.len + 'px, 0, 0)',
							'-webkit-transform': 'translate3d(-' + T.$list.children().width() * T.len + 'px, 0, 0)'
						});
					}

					// 最后一屏 -> 第一屏
					if (T.currentIndex > T.len) {
						T.currentIndex = 1;
						T.$list.css({
							transition: 'none',
							'-webkit-transtion': 'none',
							transform: 'translate3d(0, 0, 0)',
							'-webkit-transform': 'translate3d(0, 0, 0)'
						});
					}

				} else {
					// 第一屏 -> 最后一屏
					if (T.currentIndex < 0) {
						T.currentIndex = T.len - 1;
						T.$list.css('left', -T.$list.children().width() * T.len);
					}

					// 最后一屏 -> 第一屏
					if (T.currentIndex > T.len) {
						T.currentIndex = 1;
						T.$list.css('left', 0);
					}
				}

				T.lastTimeIndex = T.currentIndex;

				if (isSupportTransition) {
					setTimeout(function() {
						var translate3d = 'translate3d(-' + T.$list.children().width() * T.currentIndex + 'px, 0, 0)';

						T.$list.animating = true;

						T.$list.css({
							transition: 'transform ' + transitionDuration,
							'-webkit-transition': '-webkit-transform ' + transitionDuration,
							transform: translate3d,
							'-webkit-transform': translate3d
						});

						setTimeout(T.animation.slideComplete, T.options.speed - 20);
					}, 20);
				} else {
					T.$list.animating = true;
					T.$list.animate({
						left: -T.currentIndex * 100 + '%'
					}, {
						duration: T.options.speed,
						complete: T.animation.slideComplete
					});
				}

				this.serialActive();

				Lazyload(T.$item, T.currentIndex, T.currentIndex);
			},

			// 单次fade动画执行完之后调用的函数
			fadeComplete: function() {
				T.$list.animating = false;

				T.$list.prev().css('left', -T.currentIndex * 100 + '%');
				T.$item.eq(T.currentIndex).siblings().css('opacity', 0);

				if (T.options.autoPlay && !T.$list.hovering) {
					T.setPlayTimer();
				}
			},

			// 单次slide动画执行完之后调用的函数
			slideComplete: function() {
				T.$list.animating = false;
				T.$list.data('switch-prev', false);

				T.options.after.call(T, T, T.currentIndex);

				if (T.options.autoPlay && !T.$list.hovering) {
					T.setPlayTimer();
				}
			},

			// 单次thumbSlide动画执行完之后调用的函数
			thumbSlideComplete: function() {
				T.$thumbList.animating = false;

				var left = parseInt(T.$thumbList.css('left')),
					$prev = T.$thumbList.parent().prev(),
					$next = T.$thumbList.parent().next();

				// 缩略图列表滑动到左右边界时给对应的按钮添加禁用样式
				left ? $prev.removeClass('disabled') : $prev.addClass('disabled');

				if (T.$thumbList.parent().width() - T.$thumbList.width() !== left) {
					$next.removeClass('disabled');
				} else {
					$next.addClass('disabled');
				}
			}
		};
	}


	/******************** Lazyload ********************/
	/**
	 * 图片延迟加载
	 * @param  {HTMLElement} $item   列表项元素
	 * @param  {Number} loadingIndex 当前加载项的索引
	 * @param  {Number} currentIndex 当前显示项的索引
	 */
	function Lazyload($item, loadingIndex, currentIndex) {
		// 最多只能预加载一张图片
		if (loadingIndex >= $item.length || loadingIndex - currentIndex > 1) {
			return;
		}

		if ($item.filter('.loading').css('backgroundImage') === 'none' && // 没有手动设置loading动画
			!$('#loading-animation').length // 自动化的loading样式还没有添加
		) {
			setLoadingStyle();
		}
		$item.removeClass('loading');

		var img = new Image(),
			$loadAnimation = $('<div class="loading-animation"><i></i></div>'),
			$loadingItem = $item.eq(loadingIndex),
			loadingItemSrc = $loadingItem.attr('data-src');

		if ($loadingItem.attr('data-src')) {
			$loadingItem.removeAttr('data-src');

			// 不对第1张图片设置loading动画
			if (!loadingIndex) {
				$loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');
			} else {
				$loadingItem.addClass('loading');
				$loadingItem.append($loadAnimation);
			}

			// 给图片绑定加载完成事件
			img.src = loadingItemSrc;
			if (img.complte) {
				showLoadingItem();
			} else {
				img.onload = showLoadingItem;
			}
		} else {
			preload();
		}

		// 预加载下一张图片
		function preload() {
			Lazyload($item, loadingIndex + 1, currentIndex);
		}

		// 设置loading动画的样式
		function setLoadingStyle() {
			var style =
				'.loading-animation {' +
				'position: relative;' +
				'width: 100%;' +
				'height: 100%;' +
				'background: #e5e5e5;' +
				'}' + '\n';

			if (isSupportTransition) {
				style +=
					'.loading-animation i {' +
					'position: absolute;' +
					'top: 50%;' +
					'left: 50%;' +
					'width:' + $item.height() / 4 + 'px;' +
					'height:' + $item.height() / 4 + 'px;' +
					'line-height:' + $item.height() / 4 + 'px;' +
					'margin-top: -' + $item.height() / 4 / 2 + 'px;' +
					'margin-left: -' + $item.height() / 4 / 2 + 'px;' +
					'background: linear-gradient(to right, #fff 10%, transparent 42%);' +
					'background: -webkit-linear-gradient(left, #fff 10%, transparent 42%);' +
					'border-radius: 50%;' +
					'animation: loading 1.5s infinite linear;' +
					'-webkit-animation: loading 1.5s infinite linear;' +
					'}' + '\n' +

					'.loading-animation i:before {' +
					'position: absolute;' +
					'top: 0;' +
					'left: 0;' +
					'content: "";' +
					'width: 50%;' +
					'height: 50%;' +
					'background: #fff;' +
					'border-top-left-radius: 100%;' +
					'}' + '\n' +

					'.loading-animation i:after {' +
					'position: absolute;' +
					'top: 12.5%;' +
					'left: 12.5%;' +
					'content: "";' +
					'width: 75%;' +
					'height: 75%;' +
					'background: #e5e5e5;' +
					'border-radius: 50%;' +
					'}' + '\n' +

					'@-webkit-keyframes loading {' +
					'0% {-webkit-transform: rotate(0deg);}' +
					'100% {-webkit-transform: rotate(360deg);}' +
					'}' + '\n' +

					'@keyframes loading {' +
					'0% {transform: rotate(0deg);}' +
					'100% {transform: rotate(360deg);}' +
					'}';
			}

			$('head').append('<style id="loading-animation">' + style + '</style>');
		}

		function showLoadingItem() {
			/**
			 * $loadingItem已缓存，在这里必须更新一次
			 * 否则会导致调用的$loadingItem不是该方法需要的引起异常
			 */
			$loadingItem = $item.eq(loadingIndex);
			$loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');
			$loadingItem.children('.loading-animation').remove();

			if ($loadingItem.hasClass('loading') && // 正在加载项有loading样式
				$loadingItem.is(':visible') && // 正在加载项是可见的(animation: slide)
				$loadingItem.css('opacity') === '1' // 正在加载项是完全不透明的(animation: fade)
			) {
				$loadingItem.hide().fadeIn();
			}

			$loadingItem.removeClass('loading').addClass('loaded');

			preload();
		}
	}


	$.fn.easyBanner = function(option) {
		var options = $.extend({
			animation: 'slide', // 动画模式: ['slide', 'fade', 'none']
			trigger: 'click', // 触发动画的事件类型: ['click', 'hover']
			arrow: true, // 左右箭头按钮
			serial: true, // 序列按钮[true, false, 'equal', 'thumb']
			autoPlay: true, // 自动轮播
			speed: 800, // 动画速度
			interval: 5000, // 自动轮播间隔
			during: $.noop, // 在动画进行时执行的函数
			after: $.noop // 在动画完成时执行的函数
		}, option);

		return this.each(function() {
			var $this = $(this),
				$list = $this.children(),
				$item = $list.children(),
				len = $item.length,
				currentIndex = 0,
				embeddedStyle = '';

			// 轮播列表初始化
			function init() {
				// 给主容器绑定属性
				$this.$list = $list;
				$this.$item = $item;
				$this.len = len;
				$this.options = options;
				$this.currentIndex = 0;
				$this.activeIndex = 0;
				$this.lastTimeIndex = 0;

				$list.hovering = false;

				if (options.responsive) {
					if ($this.css('maxWidth') === 'none') {
						$this.css('maxWidth', '100%');
					}

					$this.height('auto');
				}

				$list.wrap('<div class="eb-list"/>').parent().css({
					position: 'relative',
					overflow: 'hidden'
				});

				$list.css({
					position: 'relative',
					display: 'block',
					overflow: 'hidden',
					width: len * 2 * 100 + '%'
				});


				if ($item.css('float') === 'none') {
					$item.css('float', 'left');
				}
				$item.css({
					display: 'block',
					width: $this.width()
				});

				if (!options.responsive) {
					$item.css({
						height: $this.height(),
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center top'
					});
				}

				$this.automatic.containerPos();
				switch (options.animation) {
					case 'fade':
						if (isSupportTransition) {
							$item.css('transition', 'opacity ' + options.speed + 'ms');
						}

						// embeddedStyle += '.top-item{z-index: 0 !important;}\n';
						break;

					case 'slide':
						if (isSupportTransition) {
							$list.css({
								transition: 'transform ' + options.speed + 'ms',
								'-webkit-transition': '-webkit-transform ' + options.speed + 'ms',
								transform: 'translate3d(0, 0, 0)',
								'-webkit-transform': 'translate3d(0, 0, 0)'
							});
						} else {
							$list.css('left', 0);
						}
						break;
				}


				// 改变浏览器视口大小时自动调整背景图片的位置
				$(window).resize(function() {
					$list.children().width($this.width());

					// fade
					$list.prev().children().width($this.width());

					// slide
					if (isSupportTransition && options.animation === 'slide') {
						var translate3d = 'translate3d(-' + $list.children().width() * $this.currentIndex + 'px, 0, 0)';
						$list.css({
							'transform': translate3d,
							'-webkit-transform': translate3d
						});
					}
				});
			}

			// 提取图片: 将图片转为背景图片;获取手动设置的缩略图地址
			function convertImage() {
				var $itemImg = $item.find('img'),
					thumbSrcArr = [],
					thumbSrcRegExp = new RegExp('\\?thumb=(.*\\.(jpg|jpeg|gif|png))$');

				// 获取手动设置的缩略图的地址
				$itemImg.each(function() {
					var src = $(this).attr('src') || $(this).data('src');
					if (src.match(thumbSrcRegExp)) {
						thumbSrcArr.push(src.match(thumbSrcRegExp)[1]);
					}
					$this.thumbSrcArr = thumbSrcArr;
				});

				if ($itemImg.filter('[data-src]').length === len) {
					// 根据data-src自动开启Lazyload
					$itemImg.each(function() {
						var src = $(this).data('src');
						$(this).parent().attr('data-src', src).data('thumb', src);
						$(this).remove();
					});

					/**
					 * 在这里添加loading样式是为了在Lazyload方法中选取这个元素
					 * 然后检测有无手动设置loading的动画样式
					 */
					$item.last().addClass('loading');
					Lazyload($item, currentIndex, currentIndex);
				} else {
					// 若使用响应式图片，就不把图片转换为背景图片
					if (options.responsive) {
						$itemImg.css({
							display: 'block',
							maxWidth: '100%',
							userSelect: 'none'
						});

						$itemImg.on('dragstart', function() {
							return false;
						});

						if (options.animation === 'fade') {
							$item.width($this.width());

							if (len > 1) {
								$list.before($list.clone(true).css({
									position: 'absolute',
									top: 0,
									left: 0
								}));
							}
						}
					} else {
						// 标准模式，将图片转为父级元素的背景图片后删除
						$itemImg.each(function() {
							var src = $(this).attr('src');
							$(this).parent().css('background-image', 'url(' + src + ')').data('thumb', src);
							$(this).remove();
						});
					}
				}


				$item.width($this.width());
				if (options.animation === 'slide' && len > 1) {
					$item.first().clone(true).appendTo($list);
				}

				if (options.animation === 'fade') {
					$item.first().siblings().css('opacity', 0);
				}

				options.during.call($this[0], $this, $this.currentIndex);
				options.after.call($this[0], $this, $this.currentIndex);
			}

			// 给轮播添加方向箭头
			function createArrow() {
				$this.append(
					'<div class="eb-arrow">' +
					'<a class="prev" style="float: left;"></a>' +
					'<a class="next" style="float: right;"></a>' +
					'<div style="clear: both;"></div>' +
					'</div>'
				);

				var $arrowWrap = $('.eb-arrow', $this),
					$arrow = $('a', $arrowWrap);

				// 自动化样式
				$this.automatic.arrowBg($arrow);
				$this.automatic.arrowWrapBox($arrowWrap);
				$this.automatic.arrowWrapPos($arrowWrap);

				$arrowWrap.appendTo($this).css('position', 'absolute');

				arrowBindEvent.call($arrow);
			}

			// 给轮播添加序列按钮
			function createSerialBtn() {
				for (var i = 0, item = ''; i < len; i++) {
					item += '<a></a>';
				}
				$this.append('<div class="eb-serial">' + item + '</div>');

				var $serialBtnWrap = $('.eb-serial', $this),
					$serialBtn = $serialBtnWrap.children();

				// 自动化样式
				$serialBtn.css({
					float: 'left',
					cursor: 'pointer'
				});
				$this.automatic.serialBtnBox($serialBtn, options.serial);
				embeddedStyle += $this.automatic.serialBtnBg($serialBtn);
				$this.automatic.serialBtnWrapPos($serialBtnWrap);

				$serialBtnWrap.appendTo($this).css('position', 'absolute')
					.children(':first').addClass('active');

				serialBindEvent.call($serialBtn);

				$this.$serialBtn = $serialBtn;
			}

			// 给轮播添加序列缩略图
			function createSerialThumb() {
				for (var i = 0, src = '', item = ''; i < len; i++) {
					src = $this.thumbSrcArr[i] || $item.eq(i).data('thumb');
					item += '<li><img src="' + src + '"></li>';
				}
				$this.append('<div class="eb-thumb"><ul>' + item + '</ul></div>');

				var $thumbListWrap = $('.eb-thumb', $this), // 缩略图列表容器
					$thumbList = $thumbListWrap.children(), // 缩略图列表
					$thumbItem = $thumbList.children(), // 缩略图列表项
					$thumbImg = $thumbItem.children(), // 缩略图列表项中的图片
					$thumbArrow; // 缩略图的方向箭头

				$thumbItem.css({
					float: 'left',
					overflow: 'hidden',
					marginLeft: 0,
					cursor: 'pointer'
				});
				$thumbItem.first().addClass('active');
				$thumbItem.last().css('marginRight', 0);

				// 自动化样式
				$this.automatic.thumbImgBox($thumbImg);

				// 必须在获取到缩略图尺寸之后才能进行自动化处理和事件绑定
				if ($thumbImg[0].complete) {
					thumbAutomatic();
				} else {
					$thumbImg[0].onload = thumbAutomatic;
				}

				function thumbAutomatic() {
					// 计算缩略图列表的宽度
					$thumbList = $thumbListWrap.children();
					$thumbList.css({
						position: 'relative',
						left: 0,
						width: $thumbItem.outerWidth(true) * $thumbItem.length - parseInt($thumbItem.css('margin-right')),
						height: $thumbItem.outerHeight(true)
					});

					// 缩略图列表容器定位
					$thumbListWrap.css({
						position: 'absolute',
						// overflow: 'hidden',
						height: $thumbItem.outerHeight(true)
					});
					$this.automatic.thumbListWrapPos($thumbListWrap);

					// 缩略图列表过长时，自动添加方向箭头并绑定滚动事件
					if ($thumbList.width() > $thumbListWrap.width()) {
						$thumbListWrap.prepend('<a class="prev disabled"/>');
						$thumbListWrap.append('<a class="next"/>');

						$thumbArrow = $('a', $thumbListWrap);
						$thumbArrow.css('position', 'absolute');

						$this.automatic.thumbArrowBg($thumbArrow);
						$this.automatic.thumbArrowPos($thumbArrow);
					}

					$this.automatic.thumbListBox($thumbList);

					thumbArrowBindEvent.call($thumbArrow);
					serialBindEvent.call($thumbItem);
				}

				$this.$thumbItem = $thumbItem;
				$this.$thumbList = $thumbList;
			}

			// 给方向箭头绑定事件
			function arrowBindEvent() {
				$(this).on({
					click: function() {
						if ($list.animating) {
							return;
						}
						if ($(this).hasClass('prev')) {
							$list.data('switch-prev', true);
							$this.currentIndex--;
						} else {
							$this.currentIndex++;
						}
						play();
					},

					// 阻止连续点击箭头按钮时选中按钮
					selectstart: function() {
						return false;
					}
				});
			}

			// 给序列按钮、缩略图绑定事件
			function serialBindEvent() {
				$(this).on(
					options.trigger === 'click' ? 'click' : 'mouseenter',
					function() {
						if ($list.animating || $this.activeIndex === $(this).index()) return;
						$this.currentIndex = $(this).index();
						play();
					}
				);
			}

			// 给缩略图列表按钮绑定事件
			function thumbArrowBindEvent() {
				$(this).click(function() {
					var $thumbList = $this.$thumbList, // 缩略图列表
						$thumbListWrap = $thumbList.parent(), // 缩略图列表容器
						left = parseInt($thumbList.css('left')), // 缩略图列表位置

						thumbListLeftOverWidth = Math.abs(parseInt($thumbList.css('left'))), // 缩略图列表溢出列表容器的左侧宽度
						thumbListRightOverWidth = $thumbList.width() - $thumbListWrap.width() - // 缩略图列表溢出列表容器的右侧宽度
						Math.abs(parseInt($thumbList.css('left')));

					if ($(this).hasClass('prev')) {
						// 比较"列表溢出的宽度"和"列表容器的宽度"来设置列表滑动的距离
						if (!thumbListLeftOverWidth) {
							return;
						}

						left = thumbListLeftOverWidth < $thumbListWrap.width() ? 0 : left + $thumbListWrap.width();
					}

					if ($(this).hasClass('next')) {
						if (!thumbListRightOverWidth) {
							return;
						}

						left = thumbListRightOverWidth < $thumbListWrap.width() ? left - thumbListRightOverWidth :
							left - $thumbListWrap.width();
					}

					$this.animation.thumbSlide(left);
				});
			}

			// 播放轮播动画
			function play() {
				$this.activeIndex = $this.currentIndex /* = currentIndex*/ ;

				$this.animation[$this.options.animation]();
				options.during.call($this[0], $this, $this.currentIndex);
			}

			// 设置轮播自动播放的定时器
			function setPlayTimer() {
				/**
				 * 动画执行完之后，清除原来的自动定时器再重新设置一个
				 * 这样可以避免动画执行时间对自动播放间隔时间造成的误差
				 */
				clearInterval($this.playTimer);

				$this.playTimer = setInterval(function() {
					$this.currentIndex++;
					play();
				}, options.interval);
			}

			// 取消轮播自动播放的定时器
			function cancelPlayTimer() {
				// 判定鼠标是否悬浮在容器之外的缩略图上
				// var isMouseoverThumb = function(e) {
				// 	if (e.pageY - $this.offset().top > $this.outerHeight()) {
				// 		e.stopPropagation();
				// 		return true;
				// 	}
				// };

				$this.hover(function(e) {
					// if (!isMouseoverThumb(e)) {
						$list.hovering = true;
						clearInterval($this.playTimer);
					// }
				}, function(e) {
					// if (!isMouseoverThumb(e)) {
						$list.hovering = false;
						if (!$list.animating) {
							setPlayTimer();
						}
					// }
				});
			}

			(function() {
				Automatic($this);
				init();
				convertImage();
				Animation($this);

				if (len <= 1) {
					return;
				}
				if (options.arrow) {
					createArrow();
				}
				if (options.serial === true || options.serial === 'equal') {
					createSerialBtn();
				}
				if (options.serial === 'thumb') {
					createSerialThumb();
				}
				if (options.autoPlay) {
					setPlayTimer();
					cancelPlayTimer();
				}

				$this.setPlayTimer = setPlayTimer;

				$('head').append('<style>' + embeddedStyle + '</style>');
			}());
		});
	};
}(jQuery, window, document));