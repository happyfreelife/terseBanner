
	/**
	 * 轮播初始化
	 */
	Banner.prototype.init = function() {
		// 添加元素的默认样式
		this.stylesheet();

		this.$list = this.$elem.children().first();
		this.$item = this.$list.children();
		this.len = this.$item.length;
		this.currentIndex = 0;
		this.activeIndex = 0;
		this.latestIndex = 0;
		this.isHovered = false;
		this.isAnimated = false;

		var self = this,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			options = this.options,
			thumbArr = [],
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		if ($banner.css('position') === 'static') {
			$banner.css('position', 'relative');
		}

		$banner.css({
			tapHighlightColor: 'transparent',
			userSelect: 'none'
		});

		// 自适应模式
		if (options.adaptive) {
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
		if (!options.adaptive) {
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

				self.thumbArr = thumbArr;
			});
		} catch (e) {}

		// 设置内部元素的结构和宽度
		$list.wrap('<div class="tb-list"/>');
		$list.width((self.len + 2) * 100 + '%');
		$item.width($banner.width());

		// 触屏模式下，动画只能是'slide'
		if (Util.isSupportTouch) {
			options.animation = 'slide';
		}

		// animation: slide
		if (options.animation === 'slide') {
			if (Util.isSupportTransition) {
				$list.css(Util.transform, 'translate3d(0, 0, 0)');
				$list.css('transition', 'transform ' + options.speed + 'ms');
			}

			$list.css('left', 0);
			$item.css('float', 'left').first().show().siblings().hide();
			$item.first().clone(true).addClass('first-duplicate').hide().appendTo($list);
			$item.last().clone(true).addClass('last-duplicate').hide().prependTo($list);
		}

		// animation: fade || flash
		if (options.animation === 'fade' || options.animation === 'flash') {
			if (Util.isSupportTransition) {
				$item.css('transition', 'opacity ' + options.speed + 'ms');
			}

			$item.first().siblings().css('opacity', 0);
		}

		// animation: fade
		if (options.animation === 'fade') {
			$list.before($list.clone(true).addClass('fade-bottom').css({
				position: 'absolute',
				top: 0,
				left: 0
			}));
		}
		
		if (!Util.isSupportTouch && $.isNumeric(options.auto) && options.auto > 0) {
			self.useAuto = true;
			self.setPlayTimer();
		}

		// Banner的宽度改变时，列表和元素自动修正宽度
		setInterval(function() {
			$item.width($banner.width());

			if (Util.isSupportTouch) {
				$list.width($item.width() * (self.len + 2));
			}

			if (options.animation === 'fade') {
				$list.prev().children().width($banner.width());
			}
		}, 50);

		// 使用延迟加载的方法加载banner的第一张图片
		self.lazyload();

		self.addElement().arrow();
	};
