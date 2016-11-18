

/**
 * 绑定动画
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'bind-event'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('bind-event')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.bindAnimation = function() {
		var self = this,
			options = this.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			$thumbBox = this.$thumbBox,
			$thumbList = this.$thumbList,
			$thumb = this.$thumb,
			$thumbSlideBtn = this.$thumbSlideBtn,
			thumbVisible,
			thumbListLeft,
			animation = this.animation = {};

		function afterCallback() {
			options.after.call(self, self.$elem, self.$item, self.currentIndex);
		}

		// 处理可能会超出范围的索引
		function handleCurrentIndex() {
			self.currentIndex =
			self.currentIndex === self.len ? 0 :
			self.currentIndex === -1 ? self.len - 1 : self.currentIndex;
		}

		animation.slide = function() {
			var slidToLeft = true;

			if (self.currentIndex === self.latestIndex) return;

			if (self.currentIndex < self.latestIndex) {
				slidToLeft = false;
			}

			if (slidToLeft === false) {
				$list.css('left', '-100%');
			}

			// console.log($item.eq(self.currentIndex + 1));
			$item.eq(self.currentIndex + 1).show();

			if (Global.isSupportTransition) {
				setTimeout(function() {
					self.isAnimated = true;

					var listTransform = slidToLeft ?
						'translate3d(' + -$item.width() + 'px, 0, 0)' :
						'translate3d(' + $item.width() + 'px, 0, 0)';

					$list.css(Global.transformProperty, listTransform);

					setTimeout(self.animation.slideCallback, options.duration - 50);
				}, 50);
			}

			if (!Global.isSupportTransition) {
				self.isAnimated = true;

				$list.animate({
					left: slidToLeft? '-100%' : 0
				}, options.duration, self.animation.slideCallback);
			}

			self.activeBtnAndThumb();
		};

		animation.fade = function() {
			handleCurrentIndex();

			self.isAnimated = true;

			$list.css('left', -self.currentIndex * 100 + '%');

			$item.eq(self.currentIndex).animate({
				opacity: 1
			}, {
				duration: options.duration * 0.8,
				complete: self.animation.fadeCallback
			});

			self.activeBtnAndThumb();
		};

		animation.flash = animation.fade;

		animation.none = function() {
			handleCurrentIndex();

			$item.eq(self.currentIndex).show().siblings().hide();

			self.activeBtnAndThumb();

			if (!$item.eq(self.currentIndex).data('origin')) {
				afterCallback();
			}
		};

		animation.thumbListSlide = function() {
			if ($thumbList.is(':animated')) return;

			if ($.isNumeric(options.thumb.visible)) {
				thumbVisible = Math.min(options.thumb.visible,
					parseInt($banner.width() / $thumb.outerWidth(true)));
			} else {
				thumbVisible = parseInt($banner.width() / $thumb.outerWidth(true));
			}

			thumbListLeft = $.isNumeric(arguments[0]) ?
			arguments[0] : Math.max(
				-parseInt(self.activeIndex / thumbVisible) * $thumb.outerWidth(true) * thumbVisible,
				$thumbBox.width() - $thumbList.width()
			);

			// 禁用缩略图列表切换按钮
			$thumbList.stop(true, false).animate({ left: thumbListLeft }, function() {
				var thumbListLeft = parseInt($thumbList.css('left'));

				if (!thumbListLeft) {
					$thumbSlideBtn.filter('.prev').addClass('disabled').siblings('a').removeClass('disabled');
				} else if (Math.abs(thumbListLeft) + $thumbBox.width() === $thumbList.width()) {
					$thumbSlideBtn.filter('.next').addClass('disabled').siblings('a').removeClass('disabled');
				} else {
					$thumbSlideBtn.removeClass('disabled');
				}
			});
		};

		animation.slideCallback = function() {
			self.isAnimated = false;

			self.latestIndex =
			self.currentIndex =
			self.currentIndex === -1 ? self.len - 1 :
			self.currentIndex === self.len ? 0 : self.currentIndex;

			$list.css({
				left: 0,
				'transition': 'none'
			});

			$list.css(Global.transformProperty, 'translate3d(0, 0, 0)');

			$item.eq(self.currentIndex + 1).show().siblings().hide();

			setTimeout(function() {
				$list.css('transition', 'transform ' + options.duration + 'ms');
			}, 50);

			if (!$item.eq(self.currentIndex).data('origin')) {
				afterCallback();
			}

			if (self.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		animation.fadeCallback = function() {
			self.isAnimated = false;

			if (options.animation === 'fade') {
				$list.prev().css('left', -self.currentIndex * 100 + '%');
				$list.prev().html($list.html());
			}

			$item.eq(self.currentIndex).siblings().css('opacity', 0);

			if (!$item.eq(self.currentIndex).data('origin')) {
				afterCallback();
			}

			if (self.useAuto && !self.isHovered) {
				self.setPlayTimer();
			}
		};

		setTimeout(function() {
			options.before.call(self, self.$elem, self.$item, 0);

			if (!self.currentIndex && !$item.eq(self.currentIndex).data('origin')) {
				afterCallback();
			}
		}, 50);

		self.bindEvent().widthChangeEvent();
		self.bindEvent().touchEvent();
	};
}));


