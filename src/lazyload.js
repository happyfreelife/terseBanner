

/**
 * 图片延迟加载
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.lazyload = function() {
		var self = this,
			options = this.options,
			currentIndex = arguments[0] || 0,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			$visibleItem = $item.eq(currentIndex),
			visibleItemImg = $visibleItem.data('origin');

		if (!visibleItemImg) return;

		function afterCallback() {
			options.after.call(self, self.$elem, self.$item, self.currentIndex);
		}


		function showVisibleItem() {
			if (currentIndex === -1) {
				$visibleItem = $list.children().first();
			}

			if (options.adaptive) {
				$visibleItem.find('img[data-src]').attr('src', visibleItemImg);
			} else {
				$visibleItem.css('backgroundImage', 'url(' + visibleItemImg + ')');
			}

			if (!currentIndex) {
				var img = new Image();

				img.src = visibleItemImg;

				function loaded() {
					/**
					 * slide动画模式下，
					 * 第一张和克隆之后添加到列表的最后，
					 * 最后一张图片克隆之后添加到列表的最前，
					 * 在它们的图片源文件加载完成之后，
					 * 需要将列表前后同一张图片的两个列表项同步
					 */
					if (options.animation === 'slide') {
						if (options.adaptive) {
							$list.children().last().html($item.first().html());
						}

						$list.children().last().attr('style', function() {
							return $item.first().attr('style');
						})
						.hide()
						.data('origin', '');
					}

					$visibleItem.data('origin', '');

					afterCallback();
				}

				if (img.complete) {
					loaded();
				} else {
					img.onload = loaded;
				}
			} else {
				$visibleItem.data('origin', '');

				$banner.find('.tb-loading').fadeOut(400, function() {
					$(this).remove();
				});

				if (options.animation === 'slide') {
					if (currentIndex === -1) {
						if (options.adaptive) {
							$item.last().html($list.children().first().html());
						}
						
						$item.last().attr('style', function() {
							return $list.children().first().attr('style');
						})
						.hide()
						.data('origin', '');
					}

					if (currentIndex === self.len - 1) {
						if (options.adaptive) {
							$list.children().first().html($item.last().html());
						}
						
						$list.children().first().attr('style', function() {
							return $item.last().attr('style');
						})
						.hide()
						.data('origin', '');
					}
					
				}

				afterCallback();
			}
		}

		if (!currentIndex) {
			showVisibleItem();
		} else {
			// 设置loading动画的背景色和轮播的背景色一样
			var loadingBackground;
			if ($banner.css('backgroundColor') === 'rgba(0, 0, 0, 0)' ||
				$banner.css('backgroundColor') === 'transparent') {
				loadingBackground = '#fff';
			} else {
				loadingBackground = $banner.css('backgroundColor');
			}

			// 添加loading动画
			var $loading = 
				'<div class="tb-loading">' +
					'<img src="' + Global.loadingImage + '">' +
				'</div>';

			$visibleItem.append($loading);

			if (options.animation === 'slide' && currentIndex === -1) {
				$list.children().first().append($loading);
			}

			$('.tb-loading').css({
				background: loadingBackground,
				height: $banner.height()
			});

			$('.tb-loading img').css('top', function() {
				return ($banner.height() - $(this).height()) / 2;
			});

			if (options.animation === 'fade' || options.animation === 'flash') {
				$('.tb-loading').hide().fadeIn();
			}

			// 绑定图片加载完成的事件
			var img = new Image();

			if (currentIndex === -1) {
				visibleItemImg = $item.last().data('origin');
			}

			img.src = visibleItemImg;

			if (img.complete) {
				showVisibleItem();
			} else {
				img.onload = showVisibleItem;
			}
		}
	};
}));