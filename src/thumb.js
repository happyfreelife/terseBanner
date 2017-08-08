
	/**
	 * 缩略图
	 */
	Banner.prototype.thumb = function() {
		var s = this,
			o = this.option;

		if (!o.btn) s.btn();

		s.$btn.each(function(i) {
			var $img = $('<img src="' + s.thumbArr[i] + '">');

			$img.css({
				display: 'block',
				width: o.thumbWidth,
				height: o.thumbHeight || 'auto'
			});

			$(this).width('auto').height('auto').append($img);
		});

		s.$btn.parent().css('marginLeft', -(s.$btn.outerWidth(true) * s.$btn.length / 2));
	};
