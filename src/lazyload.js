
	/**
	 * 图片延迟加载
	 */
	Banner.prototype.lazyload = function() {
		var s = this,
			o = s.option,
			currentIndex = arguments[0] || 0,
			$banner = s.$banner,
			$list = s.$list,
			$item = s.$item,
			$visibleItem = $item.eq(currentIndex),
			visibleItemImg = $visibleItem.data('origin');

		if (!visibleItemImg) return;

		function showVisibleItem() {
			if (currentIndex === -1) {
				$visibleItem = $list.children().first();
			}

			if (o.adaptive) {
				$visibleItem.find('img[data-src]').attr('src', visibleItemImg);
			} else {
				$visibleItem.css('backgroundImage', 'url(' + visibleItemImg + ')');
			}

			if (!currentIndex) {
				var img = new Image();

				img.src = visibleItemImg;

				var loaded = function() {
					/**
					 * slide动画模式下，
					 * 第一个列表项复制之后添加到列表的最后面 => first-duplicate，
					 * 在 first 图片源文件加载完成之后，
					 * 需要将 first-duplicate 中的图片和 first 图片同步
					 * $list.children().last() => first-duplicate 
					 * $item.first() => first
					 */
					if (o.animation === 'slide' && s.len > 1) {
						$list.children().last().attr('style', function() {
							return $item.first().attr('style');
						})
						.hide()
						.data('origin', '');

						if (o.adaptive) {
							$list.children().last().html($item.first().html());
						}

						if (Util.IS_MOBILE) {
							$list.children().last().show();
						}
					}

					$visibleItem.data('origin', '');
				};

				if (img.complete) {
					loaded();
				} else {
					img.onload = loaded;
				}
			} else {
				$visibleItem.data('origin', '');

				$('.tb-loading').fadeOut(300, function() {
					$(this).remove();

					setTimeout(function() {
						$list.height('auto');
					}, 50);
				});

				if (o.animation === 'slide' && s.len > 1) {
					if (currentIndex === -1) {
						if (o.adaptive) {
							$item.last().html($list.children().first().html());
						}

						/**
					 	 * slide动画模式下，
						 * 最后一个列表项复制之后添加到列表的最前面 => last-duplicate，
						 * 在 last-duplicate 中的图片源文件加载完成之后，
						 * 需要将 last 图片 和 last-duplicate 中的图片同步
						 * $item.last() => last
						 * $list.children().first() => last-duplicate
						 */
						$item.last().attr('style', function() {
							return $list.children().first().attr('style');
						})
						.show()
						.data('origin', '')
						.find('.tb-loading').fadeOut(300, function() {
							$(this).remove();
						});
					}

					if (currentIndex === s.len - 1) {
						/**
					 	 * slide动画模式下，
						 * 最后一个列表项复制之后添加到列表的最前面 => last-duplicate，
						 * 在 last 图片源文件加载完成之后，
						 * 需要将 last-duplicate 中的图片和 last 图片同步
						 * $list.children().first() => last-duplicate
						 * $item.last() => last
						 */
						$list.children().first().attr('style', function() {
							return $item.last().attr('style');
						})
						.hide()
						.data('origin', '');

						if (o.adaptive) {
							// 加载动画需要300ms之后移除
							// 如果不设置延时会把加载动画的代码也复制到新的列表第一个元素中
							setTimeout(function() {
								$list.children().first().html($item.last().html());
							}, 350);
						}

						if (Util.IS_MOBILE) {
							$list.children().first().show();
						}
					}
				}
			}
		}

		// 第一张图片不设置loading动画
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
					'<img src="' + Util.LOADING_IMAGE + '">' +
				'</div>';

			$visibleItem.append($loading);

			if (o.animation === 'slide' && currentIndex === -1) {
				$list.children().first().append($loading);
			}

			$('.tb-loading').css({
				background: loadingBackground,
				height: function() {
					return Math.max(
						$banner.height(),
						$.isNumeric(parseInt($banner.css('maxHeight'))) ? parseInt($banner.css('maxHeight')) : 0,
						$.isNumeric(parseInt($banner.css('minHeight'))) ? parseInt($banner.css('minHeight')) : 0
					);
				}
			});

			$list.height($('.tb-loading').height());

			$('.tb-loading img').css('top', function() {
				return ($banner.height() - $(this).height()) / 2;
			});

			if (o.animation === 'fade' || o.animation === 'flash') {
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
