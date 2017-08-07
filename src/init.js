
	/**
	 * 轮播初始化
	 */
	Banner.prototype.init = function() {
		var s = this;

		s.$list = s.$elem.children().first();
		s.$item = s.$list.children();
		s.len = s.$item.length;
		s.currentIndex = 0;
		s.activeIndex = 0;
		s.latestIndex = 0;
		s.isHovered = false;
		s.isAnimated = false;

		var o = s.option,
			$banner = s.$elem,
			$list = s.$list,
			$item = s.$item,
			thumbArr = [],
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		// 写入默认样式
		s.stylesheet();

		if ($banner.css('position') === 'static') {
			$banner.css('position', 'relative');
		}

		$banner.css({
			tapHighlightColor: 'transparent',
			userSelect: 'none'
		});

		// 自适应模式
		if (o.adaptive) {
			if ($banner.css('maxWidth') === 'none') {
				$banner.css('maxWidth', '100%');
			}

			$item.each(function() {
				var $img = $(this).children('img'),
					src = $img.attr('src') || $img.attr('data-src');

				$img.css({
					display: 'block',
					maxWidth: '100%'
				});

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				}

				$(this).data('thumb', src);
			});
		}

		// 标准模式
		if (!o.adaptive) {
			$item.each(function() {
				var $img = $(this).children('img'),
					src = $img.attr('src') || $img.attr('data-src');

				if ($img.length) {
					if ($img.attr('data-src')) {
						$(this).data('origin', src);
					} else {
						$(this).css('backgroundImage', 'url(' + src + ')');
					}

					$(this).data('thumb', src);

					$img.remove();
				}

				$(this).height($banner.height());
			});
		}

		// 获取图片缩略图的路径
		try {
			$item.each(function() {
				var thumb = $(this).data('thumb');

				thumbArr.push(thumb.match(regExp) ? thumb.match(regExp)[1] : thumb);

				s.thumbArr = thumbArr;
			});
		} catch (e) {}

		// 设置内部元素的结构和宽度
		$list.wrap('<div class="tb-list"/>');
		$list.width((s.len + 2) * 100 + '%');
		$item.width($banner.width());

		// 触屏模式下，动画只能是'slide'
		if (Util.isSupportTouch) {
			o.animation = 'slide';
		}

		// animation: slide
		if (o.animation === 'slide') {
			if (Util.isSupportTransition) {
				$list.css(Util.transform, 'translate3d(0, 0, 0)');
				$list.css('transition', 'transform ' + o.speed + 'ms');
			}

			$list.css('left', 0);
			$item.css('float', 'left').first().show().siblings().hide();
			$item.first().clone(true).addClass('first-duplicate').hide().appendTo($list);
			$item.last().clone(true).addClass('last-duplicate').hide().prependTo($list);
		}

		// animation: fade || flash
		if (o.animation === 'fade' || o.animation === 'flash') {
			if (Util.isSupportTransition) {
				$item.css('transition', 'opacity ' + o.speed + 'ms');
			}

			$item.first().siblings().css('opacity', 0);
		}

		// animation: fade
		if (o.animation === 'fade') {
			$list.before($list.clone(true).addClass('fade-bottom').css({
				position: 'absolute',
				top: 0,
				left: 0
			}));
		}
		
		if (!Util.isSupportTouch && $.isNumeric(o.auto) && o.auto > 0) {
			s.useAuto = true;
			s.setPlayTimer();
		}

		// Banner的宽度改变时，列表和列表项自动更改宽度
		if (!Util.isSupportTouch) {
			setInterval(function() {
				$item.width($banner.width());
	
				if (o.animation === 'fade') {
					$list.prev().children().width($banner.width());
				}
			}, 50);
		}

		// 使用延迟加载的方法加载banner的第一张图片
		s.lazyload();

		s.addElement().arrow();
	};
