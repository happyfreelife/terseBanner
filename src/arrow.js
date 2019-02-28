
	/**
	* 切换箭头
	*/
	Banner.prototype.arrow = function() {
		var s = this,
			o = this.option,
			$banner = this.$banner,
			$list = s.$list,
			$item = s.$item,
			$arrow;

		$banner.append(
			'<div class="tb-arrow">' +
				'<a class="prev"></a>' +
				'<a class="next"></a>' +
			'</div>'
		);

		s.$arrow = $arrow = $('.tb-arrow a', $banner);

		$arrow.on({
			'click.terseBanner': function() {
				if (s.isAnimated) return;

				o.before.call(s, s.currentIndex);


				if (Util.IS_MOBILE) {
					$(this).hasClass('prev') ? s.slidePrev() : s.slideNext();
				} else {
					$(this).hasClass('prev') ? s.currentIndex-- : s.currentIndex++;
					s.play();
				}
			},

			// 阻止连续点击箭头按钮时选中按钮
			'selectstart.terseBanner': function() {
				return false;
			}
		});

		if ($arrow.css('backgroundImage') === 'none') {
			function setArrowHeight() {
				var bannerHeight = Math.max(
					$banner.height(),
					$.isNumeric(parseInt($banner.css('maxHeight'))) ? parseInt($banner.css('maxHeight')) : 0,
					$.isNumeric(parseInt($banner.css('minHeight'))) ? parseInt($banner.css('minHeight')) : 0
				);

				$arrow.height(parseInt(bannerHeight * 0.1));
			}

			if (!$arrow.height()) {
				setArrowHeight();

				/* 自适应模式下，最外层容器没有高度
				 * 计算之后的箭头高度为0，无法显示
				 * 在首张图片加载完成之后重新计算下
				 */
				if (o.adaptive) {
					var img = new Image(),
						$firstImage = $item.first().find('img');
					
					img.src = $firstImage.attr('src') || $firstImage.attr('data-src');

					if (img.complete) {
						setArrowHeight();
					} else {
						img.onload = setArrowHeight;
					}
				}
			}

			$arrow.filter('.prev').html('<img src="' + Util.PREV_ARROW + '">');
			$arrow.filter('.next').html('<img src="' + Util.NEXT_ARROW + '">');

			$arrow.find('img').on('dragstart', function() {
				return false;
			});
		}

		setTimeout(function() {
			$arrow.css('marginTop', -$arrow.outerHeight() / 2);
		}, 0);
	};
