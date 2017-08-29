
	/**
	* 切换箭头
	*/
	Banner.prototype.arrow = function() {
		var s = this,
			o = this.option,
			$banner = this.$banner,
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

				o.before.call(s, s.$banner, s.$item, s.currentIndex);


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
			if (!$arrow.height()) {
				var bannerHeight = Math.max(
					$banner.height(),
					$.isNumeric(parseInt($banner.css('maxHeight'))) ? parseInt($banner.css('maxHeight')) : 0,
					$.isNumeric(parseInt($banner.css('minHeight'))) ? parseInt($banner.css('minHeight')) : 0
				);

				$arrow.height(parseInt(bannerHeight * 0.1));
				$arrow.css('marginTop', -$arrow.outerHeight() / 2);
			}

			$arrow.filter('.prev').html('<img src="' + Util.PREV_ARROW + '">');
			$arrow.filter('.next').html('<img src="' + Util.NEXT_ARROW + '">');

			$arrow.find('img').on('dragstart', function() {
				return false;
			});
		}
	};
