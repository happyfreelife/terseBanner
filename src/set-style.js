

/**
 * 设置轮播元素的样式
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
	Banner.prototype.setStyle = function(elem) {
		var options = this.options,
			$banner = this.$elem,
			$arrow = this.$arrow,
			$arrowBox = this.$arrowBox,
			$btn = this.$btn,
			$btnBox = this.$btnBox,
			$thumb = this.$thumb,
			$thumbList = this.$thumbList,
			$thumbSlideBtn = this.$thumbSlideBtn,
			$thumbBox = this.$thumbBox;

		switch (elem) {
			case 'arrow' :
				if ($arrow.css('backgroundImage') === 'none') {
					if (!$arrow.height()) {
						$arrow.height(parseInt($banner.height() * 0.1));
					}

					$arrow.filter('.prev').html('<img src="' + Global.prevArrow + '">');
					$arrow.filter('.next').html('<img src="' + Global.nextArrow + '">');

					$arrow.find('img').on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'arrowBoxPos' :
				if ($arrowBox.css('top') === 'auto' && $arrowBox.css('bottom') === 'auto') {
					$arrowBox.css({
						top: '50%',
						marginTop: -$arrow.outerHeight() / 2
					});
				}

				if ($arrowBox.css('left') === 'auto' && $arrowBox.css('right') === 'auto') {
					$arrowBox.css({
						left: '50%',
						marginLeft: -$arrowBox.width() / 2
					});
				}

				$banner.append($arrowBox.css('position', 'absolute'));
				break;

			case 'btnBoxPos' :
				if ($btnBox.css('top') === 'auto' && $btnBox.css('bottom') === 'auto') {
					$btnBox.css('bottom', 10);
				}
				if ($btnBox.css('left') === 'auto' && $btnBox.css('right') === 'auto') {
					$btnBox.css({
						left: '50%',
						marginLeft: -$btn.outerWidth(true) * $btn.length / 2
					});
				}
				$banner.append($btnBox.css('position', 'absolute'));
				break;

			case 'thumb':
				$thumb.each(function() {
					if ($(this).find('img')[0].complete) {
						$(this).find('img').css('marginTop', function() {
							return ($(this).parent().height() - $(this).height()) / 2;
						});
					} else {
						$(this).find('img').on('load', function() {
							$(this).css('marginTop', function() {
								return ($(this).parent().height() - $(this).height()) / 2;
							});
						});
					}
				});

				$thumb.css({
					width: options.thumb.width,
					height: options.thumb.height,
					marginRight: options.thumb.gap
				});
				$thumb.last().css('marginRight', 0);
				break;

			case 'thumbSlideBtn':
				$thumbSlideBtn.css('top', ($thumbList.height() - $thumbSlideBtn.height()) / 2);
				break;

			case 'thumbList':
				$thumbList.css({
					left: 0,
					width: $thumb.outerWidth(true) * $thumb.length - options.thumb.gap
				});
				break;

			case 'thumbBox':
				var thumbVisible,
					thumbBoxWidth,
					thumbWidth = $thumb.outerWidth(true);

				if ($.isNumeric(options.thumb.visible)) {
					thumbVisible = Math.min(options.thumb.visible,
					parseInt($banner.width() / thumbWidth));
				} else {
					thumbVisible = parseInt($banner.width() / thumbWidth);
				}

				thumbBoxWidth = thumbWidth * thumbVisible - options.thumb.gap;

				$thumbBox.css({
					left: '50%',
					width: thumbBoxWidth,
					height: $thumbList.height(),
					marginLeft: - thumbBoxWidth / 2
				});

				if ($thumbList.width() <= $thumbBox.width()) {
					$thumbSlideBtn.hide();
				} else {
					$thumbSlideBtn.filter('.prev').css({
						left: options.thumb.gap,
						backgroundImage: 'url(' + Global.prevThumbBtn + ')'
					});

					$thumbSlideBtn.filter('.next').css({
						right: options.thumb.gap,
						backgroundImage: 'url(' + Global.nextThumbBtn + ')'
					});
				}
				break;
		}
	};
}));


