
	/**
	 * 自动添加轮播必须的元素
	 */
	Banner.prototype.addElement = function() {
		var s = this,
			o = this.option,
			$banner = this.$elem,
			$list = this.$list;

		function beforeCallback() {
			o.before.call(s, s.$elem, s.$item, s.currentIndex);
		}

		return {
			arrow: function() {
				if (!o.arrow || Util.isMobile) {
					s.addElement().btn();
					return;
				}

				$banner.append(
					'<div class="tb-arrow">' +
						'<a class="prev"></a>' +
						'<a class="next"></a>' +
					'</div>'
				);

				s.$arrowBox = $('.tb-arrow', $banner);
				s.$arrow = $('.tb-arrow a', $banner);

				s.setStyle('arrow');
				s.setStyle('arrowBoxPos');

				s.$arrow.on({
					'click.terseBanner': function() {
						if (s.isAnimated) return;

						beforeCallback();

						$(this).hasClass('prev') ? s.currentIndex-- : s.currentIndex++;
						
						s.play();
					},

					// 阻止连续点击箭头按钮时选中按钮
					'selectstart.terseBanner': function() {
						return false;
					}
				});

				s.addElement().btn();
			},

			btn: function() {
				if (!o.btn) {
					s.addElement().thumb();
					return;
				}

				for (var i = 0, item = ''; i < s.len; i++) {
					item += '<a></a>';
				}
				$banner.append($('<div class="tb-btn"/>').append(item));

				s.$btnBox = $('.tb-btn', $banner);
				s.$btn = $('.tb-btn a', $banner);

				s.$btn.first().addClass('active');

				s.setStyle('btnBoxPos');

				if (!Util.isMobile) {
					s.$btn.on('click.terseBanner', function() {
						if (s.isAnimated) return;

						beforeCallback();
						s.currentIndex = $(this).index();
						s.play();
					});
				}

				s.addElement().thumb();
			},

			thumb: function() {
				if (!(typeof o.thumb === 'object' &&
					parseInt(o.thumb.width) > 0 &&
					parseInt(o.thumb.height) > 0 &&
					parseInt(o.thumb.gap) >= 0))
				{
					s.bindAnimation();
					return;
				}

				for (var i = 0, str = '', thumb; i < s.len; i++) {
					thumb = s.thumbArr[i];
					str += '<dd><img src="' + thumb + '"></dd>';
				}

				$banner.append(
					'<div class="tb-thumb">' +
						'<div><dl>' + str + '</dl></div>' +
						'<a class="prev disabled"></a>' +
						'<a class="next"></a>' +
					'</div>'
				);

				s.$thumbBox = $('.tb-thumb', $banner);
				s.$thumbSlideBtn = $('.tb-thumb a', $banner);
				s.$thumbList = $('.tb-thumb dl', $banner);
				s.$thumb = $('.tb-thumb dl dd', $banner);

				s.setStyle('thumb');
				s.setStyle('thumbSlideBtn');
				s.setStyle('thumbList');
				s.setStyle('thumbBox');

				s.$thumb.first().addClass('active');

				s.$thumb.on('click.terseBanner', function() {
					if (s.isAnimated) return;

					beforeCallback();
					s.currentIndex = $(this).index();
					s.play();
				});

				s.$thumbSlideBtn.on({
					'click.terseBanner': function() {
						if ($(this).hasClass('disabled')) return;

						var thumbVisible,
							thumbListOffset,
							$thumbBox = s.$thumbBox,
							$thumbList = s.$thumbList,
							$thumb = s.$thumb,
							thumbListLeft = parseInt($thumbList.css('left'));

						if ($.isNumeric(s.o.thumb.visible)) {
							thumbVisible = Math.min(s.o.thumb.visible,
							parseInt($banner.width() / $thumb.outerWidth(true)));
						} else {
							thumbVisible = parseInt($banner.width() / $thumb.outerWidth(true));
						}

						if ($(this).hasClass('prev')) {
							thumbListOffset = Math.min(thumbListLeft + $thumb.outerWidth(true) * thumbVisible, 0);
						} else {
							thumbListOffset = Math.max(thumbListLeft - $thumb.outerWidth(true) * thumbVisible,
							$thumbBox.width() - $thumbList.width());
						}

						s.animation.thumbListSlide(thumbListOffset);
					},

					// 阻止连续点击箭头按钮时选中按钮
					'selectstart.terseBanner': function() {
						return false;
					}
				});

				s.bindAnimation();
			}
		};
	};
