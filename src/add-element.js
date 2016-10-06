

/**
 * 自动添加轮播必须的元素
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'set-style',
			'bind-animation'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('set-style'),
			require('bind-animation')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.addElement = function() {
		var self = this,
			$banner = this.$elem,
			$list = this.$list,
			options = this.options;

		function beforeCallback() {
			options.before.call(self, self.$elem, self.$item, self.currentIndex);
		}

		return {
			arrow: function() {
				if (!options.arrow || Global.isMobile) {
					self.addElement().btn();
					return;
				}

				$banner.append(
					'<div class="tb-arrow">' +
						'<a class="prev"></a>' +
						'<a class="next"></a>' +
					'</div>'
				);

				self.$arrowBox = $('.tb-arrow', $banner);
				self.$arrow = $('.tb-arrow a', $banner);

				self.setStyle('arrow');
				self.setStyle('arrowBoxPos');

				self.$arrow.on({
					click: function() {
						if (self.isAnimated) return;

						beforeCallback();

						$(this).hasClass('prev') ? self.currentIndex-- : self.currentIndex++;
						
						self.play();
					},

					// 阻止连续点击箭头按钮时选中按钮
					selectstart: function() {
						return false;
					}
				});

				self.addElement().btn();
			},

			btn: function() {
				if (!options.btn) {
					self.addElement().thumb();
					return;
				}

				for (var i = 0, item = ''; i < self.len; i++) {
					item += '<a><i></i></a>';
				}
				$banner.append($('<div class="tb-btn"/>').append(item));

				self.$btnBox = $('.tb-btn', $banner);
				self.$btn = $('.tb-btn a', $banner);

				self.$btn.first().addClass('active');

				self.setStyle('btnBoxPos');

				// 导航按钮中添加序列数字
				if (options.btn === 'ol') {
					self.$btn.find('i').each(function(index) {
						$(this).text(index + 1);
					});
				}

				if (!Global.isMobile) {
					self.$btn.on(
						self.options.useHover ? 'mouseenter' : 'click',
						function() {
							if (self.isAnimated) return;

							beforeCallback();

							self.currentIndex = $(this).index();
							
							self.play();
						}
					);
				}

				self.addElement().thumb();
			},

			thumb: function() {
				if (!(typeof options.thumb === 'object' &&
					parseInt(options.thumb.width) > 0 &&
					parseInt(options.thumb.height) > 0 &&
					parseInt(options.thumb.gap) >= 0))
				{
					self.bindAnimation();
					return;
				}

				for (var i = 0, str = '', thumb; i < self.len; i++) {
					thumb = self.thumbArr[i];
					str += '<dd><img src="' + thumb + '"></dd>';
				}

				$banner.append(
					'<div class="tb-thumb">' +
						'<dl>' + str + '</dl>' +
						'<a class="prev disabled"></a>' +
						'<a class="next"></a>' +
					'</div>'
				);

				self.$thumbBox = $('.tb-thumb', $banner);
				self.$thumbSlideBtn = $('.tb-thumb a', $banner);
				self.$thumbList = $('.tb-thumb dl', $banner);
				self.$thumb =$('.tb-thumb dl dd', $banner);

				self.setStyle('thumb');
				self.setStyle('thumbSlideBtn');
				self.setStyle('thumbList');
				self.setStyle('thumbBox');

				self.$thumb.first().addClass('active');

				self.$thumb.on(
					self.options.useHover ? 'mouseenter' : 'click',
					function() {
						if (self.isAnimated) return;

						beforeCallback();
						self.currentIndex = $(this).index();
						self.play();
					}
				);

				self.$thumbSlideBtn.on({
					click: function() {
						if ($(this).hasClass('disabled')) return;

						var thumbVisible,
							thumbListOffset,
							$thumbBox = self.$thumbBox,
							$thumbList = self.$thumbList,
							$thumb = self.$thumb,
							thumbListLeft = parseInt($thumbList.css('left'));

						if ($.isNumeric(self.options.thumb.visible)) {
							thumbVisible = Math.min(self.options.thumb.visible,
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

						self.animation.thumbListSlide(thumbListOffset);
					},

					// 阻止连续点击箭头按钮时选中按钮
					selectstart: function() {
						return false;
					}
				});


				self.bindAnimation();
			},
		};
	};
}));