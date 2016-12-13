/**
 * terseBanner
 * Version: 2.1.3
 * URI: https://github.com/happyfreelife/terseBanner
 * Date: 2016-12-13
 **/

/**
 * 全局变量
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory(window, document));
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(window, document);
	} else {
		window.terseBanner = window.terseBanner || {};
		window.terseBanner.Global = factory(window, document);
	}
}(window, function (window, document) {
	var Global = {
		// 是否为ie8以下的浏览器
		isLTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),

		// 是否支持触摸事件
		isSupportTouch: 'ontouchstart' in window,

		// 是否是手机端
		isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),

		// 是否支持CSS3动画过渡
		isSupportTransition: (function () {
			var style = document.body.style || document.documentElement.style;
			return style.transition !== undefined || style.WebkitTransition !== undefined;
		}()),

		transformProperty: typeof document.body.style.transform === 'string' ? 'transform' : 'WebkitTransform',

		// 箭头 - 上一个
		prevArrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC',

		// 箭头 - 下一个
		nextArrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC',

		// 缩略图切换按钮 - 上一个
		prevThumbBtn : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REI4MjIyMTU4OTAyMTFFNkFEM0VDOUJCMDg3MkUwMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REI4MjIyMTY4OTAyMTFFNkFEM0VDOUJCMDg3MkUwMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQjgyMjIxMzg5MDIxMUU2QUQzRUM5QkIwODcyRTAyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQjgyMjIxNDg5MDIxMUU2QUQzRUM5QkIwODcyRTAyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkyMmQIAAAQJSURBVHjatJdPTBR3FMdnZmfrLtvFABXoH5SQKNiCtpc2VcFYeuViDzVBExM9wN68kMCxF7i0nABJJHJsQ3orx7omFkw2HKBLaFNjomhCKiLr7s7iusuu34ffIRudmf3tRif5ZHdnf/P7vt977/d+b3RN/QqBU+A4+AwcAh/yvzTYBI/BP2ARWCqT6gpjDoMfwBl+/wBkwEuwyzE+3q/h/XXwF/id36s24Cq4ABrBM65q1+O5Io0Rb9WDJ+BXcMNNwOdyXwR/Bj+CHU70kgJ6mQUVOTYBAuB7cALEnMLiNJnEdxIcofuKiqFy84jO0D0EEeaJqwHitlka8QgY2ru5CqCF4pcZTscQ/AK6uHKjgiSWML3gb9Nl3HPQCo6BeScDLoGL4IGiy3UmZKavr6+1v7+/bWNjI7e1tZXgjnAz4iuQBH+XrqCR2Sq/UwoG2OKpwcHBzsnJyZNyM5FI5Hp6eu7E43E3IyQnwvyU3fXE9sAV0A3+r0Q8Eol02eLpdFqrra2V+cz5+fn73AFOz2bBp/yMGdyz58BWheKdExMTsr20VCqlBYPBvQGxWOyZSx6UziFa34m2GPA1t4lVgdu7IH7SFq+pqdF8Pp82Ojp6b3Z29j9WRK/L4q74xmDWmyVlVcXtJ5zER0ZGlnDbr7CDdjmu02DBscq4Xx5Ic+VviY+NjdniQU5cVPCmaB42WHxyZR54MTAw8EXpyiXm9sqHh4crEbcv0fzI5IMFL3FsrU+mpqb2sz0QCGj5fL4wNDS0Nj4+vlqFuO3VkEq1y3d0dBzcMzmX03Rd10zT1HZ2dnZnZmakYuarEN+/DJZRL0OCc3NzD5aWlpJ+v18zDEPLZDJaXV2df3V19VxbW1ujYvFyOoktgweD32Ogub29ne3t7Y0uLy+nJPbiBcuytJaWluDi4uJZGFFfhRGi+dTgMRnycKHcDyaTySxy4dbKykpKst82oqmp6UAVRhSpuS4GxBlHX7kHkP3Z7u7uckakFYzwUTNusFNZp0WaihFunlhYWDjb3t5ezzpfrsFdt88CKQhR0KCQyXtGSDicPNHc3HwAlbKdie01RwM1LTv7f2NbHVY14k1PhEKvHbi2tvbcI5z2cbzJ439/+8kxfBM0V5JE9MTtaDT6FAUqj6J0f3p6+p5HOHVq3GSj+5bYdfAtuyLVlkzibYTD4QC8YvFgMx08WWBLdhcMvMumVGdGFyhsuIgrNaWSPHfYHbWyh1Npyw3Opbu05Ue4oAjD7fliIg3jn+Ao+JKry1ZRau2EE28ugGtgQ/XNSGL5B4/Mz9nDFUpcXe7VTF5aP2ZRmgE/uXVcKqsS9513eTktlIi+l5fTN6vXadDBhGrgPbuYbTLO/9LlSq/nrwQYANVjpXwdco3fAAAAAElFTkSuQmCC',

		// 缩略图切换按钮 - 下一个
		nextThumbBtn: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDNEMERGQUY4OTAyMTFFNkJCMDZEOTRDNkUxQTNCREQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDNEMERGQjA4OTAyMTFFNkJCMDZEOTRDNkUxQTNCREQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEM0QwREZBRDg5MDIxMUU2QkIwNkQ5NEM2RTFBM0JERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEM0QwREZBRTg5MDIxMUU2QkIwNkQ5NEM2RTFBM0JERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj3A5lwAAAQmSURBVHjarJfdT1tlHMfPS18oteNthRrFLSSzaNLpEm90K4ZgSAyYkKiZUZfswgvhgsT4H3ivN0vAC0l2uYXo1bxkTXBgMiABh2i4soAxbSfd+kJXoK3fX/2epdnOOX3KdpIPLafnPL/v7+V5nt+ja+pXELwDXgMvgzB4gb8VQAbsgT/AMiiqDKorPPMK+BBc4ncfOACHoMJnTN5v5/0dcAf8yO8nFvAF+AT0gn16VXF5r0YxEq1ukAY3wA9OBkyH+2LwW3AZlDjQIQ3oTRyq8dkHoA28B86Du3ZpsRtM8jsDzjB8NcVUOUVEZ+qSYIp14ihAwnadInaBoT2fqwr6afwq02mbgu9AjJ4bDiE+ZBHKoF7F6MgzD8FZ8Cr42U7AFfA5+MthULlXjEajPdPT09FQKNS2vb2d5hhGCyIugBz4rTEFvaxW+T/vIOAwFot1Li4uxjs7O8VzbWpqamN2dnYTX0MUUlOoiRA/ZXalLeWXubDkXUJampycPCfGC4VC/cbMzMwbEBHjexWFdFgOhing8Zz9umH6OF2VcDgcnJiYiJimqRWLRc3v92tjY2N9mUymtrKysseaMBREiNgIuCUC4uAjkG0SQu/6+noKRn1DQ0M9Ho+nUUQknU5rq6uru4oijsFL4HcR8AF4iwLcQlgfdGFhYQdG22xESCQ0REJFRJVT/m8R8DHDUVKo5HrFi4g2XHYiGIm9JlNU7nukHmTAT8EpUFZcVB6LsCLxZE2kUqkqRKQowjGl4JEM9hnX7KMWVjZLxG4ul9OGh4dP+3w+vVQqafjUxsfHI4lEIptMJh/QUycBZeMZ1ngZ4Hhubm4HhiuSCl3XtaOj//0YHBzsYLG5XgZ3KLNFAfX5PDAw0Lu5uTnc1dXlPTg40AzD0Lxer9RAbn5+XlbUQBPbJflzv0munIx3Ly8vv9vf3x+Q/Iv3gUBAw1TNj4yMJLLZbNkl/FYK9g1uPEGFZfQp4319fX7LeHt7u7axsZFHUd5GXZTpfc0lhWIzKQLuMVemgvGCm/F4PH47n8+XFRwyafOewU7FioLbVcZO2L20tOTouaJxq8EVm3etIkyAniYvlrDxRCORiK3nDHtQcUfsoc2iNQ1vsK0OuQxgbm1tPazLDwZP6rm1HYutm40NSZHr8/vcE2yrdm1tLdPR0eFDX3AKqdgfHR29A+OPWixi6Q+v8ezw1Fr9PXibXZFh87IUzjG6oSANi2i/ovEqW7JfwZcnbUp1DnTM3zwtGFdqSmVH/IU9wln2cE+25XoLfaD17hk6JG15qtnBRBrGBXAOvElvyyc4G1gFJ9FcAl+Bf1RPRlKUt7hDvs7uxQp9VeFoJofWF3lonQPfOB1Wn8fhVGc67A6nP/FE9Eyn48bV66LstCyoMO9V6d2/zPOfDLnS8fw/AQYANJumLDwDguMAAAAASUVORK5CYII=',

		// 加载动画
		loadingImage: 'data:image/gif;base64,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'
	};

	return Global;
}));


/**
 * Plugin construct function
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(window, document);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(window, document);
	} else {
		window.terseBanner = window.terseBanner || {};
		window.terseBanner.Banner = factory(window, document);
	}
}(window, function (window, document) {
	function Banner(elem, options) {
		this.$elem = $(elem);
		this.options = options;
	}

	return Banner;
}));


/**
 * 轮播初始化
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'default-style',
			'add-element'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('default-style'),
			require('add-element')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.init = function() {
		this.$list = this.$elem.children().first();
		this.$item = this.$list.children();
		this.len = this.$item.length;
		this.currentIndex = 0;
		this.activeIndex = 0;
		this.latestIndex = 0;
		this.isHovered = false;
		this.isAnimated = false;

		// 在移动端，动画模式只能是slide
		if (Global.isSupportTouch) {
			this.options.animation = 'slide';
		}

		var self = this,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			options = this.options,
			thumbArr = [],
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		options.init.call(self, $banner, $item);

		if ($banner.css('position') === 'static') {
			$banner.css('position', 'relative');
		}

		$banner.css({
			tapHighlightColor: 'transparent',
			userSelect: 'none'
		});

		$list.width(self.len * 2 * 100 + '%').wrap('<div class="tb-list"/>');

		// 自适应模式
		if (options.adaptive) {
			if ($banner.css('maxWidth') === 'none') {
				$banner.css('maxWidth', '100%');
			}

			setTimeout(function() {
				$list.height($banner.height());
			}, 50);

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

				if ($img.attr('data-src')) {
					$(this).data('origin', src);
				} else {
					$(this).css('backgroundImage', 'url(' + src + ')');
				}

				$(this).data('thumb', src).height($banner.height());

				$img.remove();
			});
		}

		$item.width($banner.width());

		if (self.len <= 1) return;

		// 获取图片缩略图的路径
		try {
			$item.each(function() {
				var thumb = $(this).data('thumb');

				thumbArr.push(thumb.match(regExp) ? thumb.match(regExp)[1] : thumb);

				self.thumbArr = thumbArr;
			});
		} catch (e) {}

		// animation: slide
		if (options.animation === 'slide') {
			if (Global.isSupportTransition) {
				$list.css(Global.transformProperty, 'translate3d(0, 0, 0)');
				$list.css('transition', 'transform ' + options.duration + 'ms');
			}

			$list.css('left', 0);
			$item.css('float', 'left').first().show().siblings().hide();
			$item.first().clone(true).addClass('first-clone').hide().appendTo($list);
			$item.last().clone(true).addClass('last-clone').hide().prependTo($list);
		}

		// animation: fade
		if (options.animation === 'fade') {
			$list.before($list.clone(true).css({
				position: 'absolute',
				top: 0,
				left: 0
			}));
		}

		// animation: fade || flash
		if (options.animation === 'fade' || options.animation === 'flash') {
			$item.first().siblings().css('opacity', 0);
		}

		self.defaultStyle();

		self.addElement().arrow();
	};
}));


/**
 * 写入轮播元素的默认样式
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
	
	Banner.prototype.defaultStyle = function() {
		var style =
			'.tb-list,\n' +
			'.tb-list > *,\n' +
			'.tb-thumb dl{\n' +
			'    position: relative;\n' +
			'    overflow: hidden;\n' +
			'}\n' +

			'.tb-list > * > *{\n' +
			'    position: relative;\n' +
			'    float: left;\n' +
			'    min-height: 1px;\n' +
			'    background-repeat: no-repeat;\n' +
			'    background-position: center top;\n' +
			'}\n' +
			'.tb-list > .touching{\n' +
			'    -webkit-transition-duration: 0ms !important;\n' +
			'    transition-duration: 0ms !important;\n' +
			'}\n' +

			'.tb-arrow{\n' +
			'    width: 95%;\n' +
			'}\n' +
			'.tb-arrow a{\n' +
			'    position: absolute;\n' +
			'    top: 0;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-arrow a.prev{\n' +
			'    left: 0;\n' +
			'}\n' +
			'.tb-arrow a.next{\n' +
			'    right: 0;\n' +
			'}\n' +
			'.tb-arrow a img{\n' +
			'    display: inline-block;\n' +
			'    max-height: 100%;\n' +
			'}\n' +

			'.tb-btn a{\n' +
			'    display: inline-block;\n' +
			'    width: 10px;\n' +
			'    height: 10px;\n' +
			'    margin: 0 5px;\n' +
			'    background-color: #fff;\n' +
			'    border-radius: 50%;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-btn a.active{\n' +
			'    background-color: #09c;\n' +
			'}\n' +

			'.tb-thumb{\n' +
			'    position: absolute;\n' +
			'    bottom: 10px;\n' +
			'    left: 0;\n' +
			'    width: 100%;\n' +
			'    overflow: hidden;\n' +
			'}\n' +
			'.tb-thumb a{\n' +
			'    position: absolute;\n' +
			'    width: 32px;\n' +
			'    height: 32px;\n' +
			'    background-repeat: no-repeat;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-thumb dl dd{\n' +
			'    position: relative;\n' +
			'    float: left;\n' +
			'    margin-left: 0;\n' +
			'    overflow: hidden;\n' +
			'    cursor: pointer;\n' +
			'}\n' +
			'.tb-thumb dl dd img{\n' +
			'    position: relative;\n' +
			'    display: block;\n' +
			'    width: 100%;\n' +
			'}\n' +

			'.tb-loading{\n' +
			'    position: absolute;\n' +
			'    top: 0;\n' +
			'    left: 0;\n' +
			'    width: 100%;\n' +
			'    height: 100%;\n' +
			'}\n' +
			'.tb-loading img{\n' +
			'    position: absolute;\n' +
			'    left: 50%;\n' +
			'    width: 40px;\n' +
			'    height: 40px;\n' +
			'    margin-left: -20px;\n' +
			'}\n';

		if (!$('#tb-default-style').length) {
			$('head').append('<style id="tb-default-style">\n' + style + '</style>');
		}
	};
}));


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





/**
 * 绑定事件
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'lazyload'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('lazyload')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	Banner.prototype.bindEvent = function() {
		var self = this,
			options = self.options,
			$banner = this.$elem,
			$list = this.$list,
			$item = $list.children(),
			touch,          // 触摸事件
			touchStartTime, // 触摸开始时刻
			touchStarX,     // 触摸开始的X坐标
			touchMoveX,     // 触摸进行时的X坐标
			touchRange,     // 触摸距离
			touchToLeft, // 触摸方向
			touchDuration,  // 触摸持续时间
			touchEndTime;   // 触摸结束时刻

		return {
			widthChangeEvent: function() {
				setInterval(function() {
					$item.width($banner.width());

					if (options.adaptive) {
						$list.height($item.filter(':visible').height());
						$banner.height($list.height());
					}

					if (options.animation === 'fade') {
						$list.prev().children().width($banner.width());
					}

					if (options.arrow) {
						self.$arrowBox.css('marginLeft', function() {
							return -self.$elem.width() / 2;
						});
					}
				}, 50);

				if ($.isNumeric(options.auto) && options.auto > 0) {
					self.useAuto = true;
					self.setPlayTimer();
				}

				self.lazyload();
			},

			touchEvent: function() {
				if (!Global.isSupportTouch) return;

				function touchStart (e)  {
					e.preventDefault();
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchStartTime = Date.now();
					touchStarX = touch.pageX - $banner.offset().left;
				}

				function touchMove (e) {
					e.preventDefault();
					if (self.isAnimated) return;

					touch = e.touches[0];
					touchMoveX = touch.pageX - $banner.offset().left;
					touchRange = touchMoveX - touchStarX;

					options.before.call(self, self.$elem, self.$item, self.currentIndex);

					if (!$list.hasClass('touching')) {
						if (touchRange < 0) {
							touchToLeft = true;
							self.currentIndex++;
						} else if (touchRange > 0) {
							touchToLeft = false;
							self.currentIndex--;
						} else return;

						if (touchToLeft === false) {
							$list.css('left', '-100%');
						}

						$item.eq(self.currentIndex + 1).show();

						$list.addClass('touching');
					}

					$list.css(Global.transformProperty, 'translate3d(' + touchRange + 'px, 0, 0)');

					self.lazyload(self.currentIndex);
				}

				function touchEnd (e) {
					e.preventDefault();
					if (self.isAnimated || !touchRange) return;
					self.isAnimated = true;

					touchEndTime = Date.now();
					touchDuration = touchEndTime - touchStartTime;

					var listTransform;

					// 触摸速度足够或触摸距离超过轮播宽度的一半列表滑动
					if (touchDuration < 300 || Math.abs(touchRange) >= $item.width() / 2) {
						listTransform = touchToLeft ? 'translate3d(' + -$item.width() + 'px, 0, 0)' :
						'translate3d(' + $item.width() + 'px, 0, 0)';

						self.activeBtnAndThumb();
					}

					// 触摸速度过低并且触摸距离不超过banner宽度的一半，列表回拉
					if (touchDuration > 300 && Math.abs(touchRange) < $item.width() / 2) {
						listTransform = 'translate3d(0, 0, 0)';
						touchToLeft ? self.currentIndex-- : self.currentIndex++;
					}

					$list.removeClass('touching').css(Global.transformProperty, listTransform);

					setTimeout(function() {
						self.animation.slideCallback();
					}, options.duration);

					touchRange = 0;
				}

				$banner[0].addEventListener('touchstart', touchStart, false);
				$banner[0].addEventListener('touchmove', touchMove, false);
				$banner[0].addEventListener('touchend', touchEnd, false);
			}
		};
	};
}));








/**
 * 图片延迟加载
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
	Banner.prototype.lazyload = function() {
		var self = this,
			options = this.options,
			currentIndex = arguments[0] || 0,
			$banner = this.$elem,
			$list = this.$list,
			$item = this.$item,
			$visibleItem = $item.eq(currentIndex),
			visibleItemImg = $visibleItem.data('origin');

		if (!visibleItemImg) return;

		function afterCallback() {
			options.after.call(self, self.$elem, self.$item, self.currentIndex);
		}


		function showVisibleItem() {
			if (currentIndex === -1) {
				$visibleItem = $list.children().first();
			}

			if (options.adaptive) {
				$visibleItem.find('img[data-src]').attr('src', visibleItemImg);
			} else {
				$visibleItem.css('backgroundImage', 'url(' + visibleItemImg + ')');
			}

			if (!currentIndex) {
				var img = new Image();

				img.src = visibleItemImg;

				function loaded() {
					/**
					 * slide动画模式下，
					 * 第一张和克隆之后添加到列表的最后，
					 * 最后一张图片克隆之后添加到列表的最前，
					 * 在它们的图片源文件加载完成之后，
					 * 需要将列表前后同一张图片的两个列表项同步
					 */
					if (options.animation === 'slide') {
						if (options.adaptive) {
							$list.children().last().html($item.first().html());
						}

						$list.children().last().attr('style', function() {
							return $item.first().attr('style');
						})
						.hide()
						.data('origin', '');
					}

					$visibleItem.data('origin', '');

					afterCallback();
				}

				if (img.complete) {
					loaded();
				} else {
					img.onload = loaded;
				}
			} else {
				$visibleItem.data('origin', '');

				$banner.find('.tb-loading').fadeOut(400, function() {
					$(this).remove();
				});

				if (options.animation === 'slide') {
					if (currentIndex === -1) {
						if (options.adaptive) {
							$item.last().html($list.children().first().html());
						}
						
						$item.last().attr('style', function() {
							return $list.children().first().attr('style');
						})
						.hide()
						.data('origin', '');
					}

					if (currentIndex === self.len - 1) {
						if (options.adaptive) {
							$list.children().first().html($item.last().html());
						}
						
						$list.children().first().attr('style', function() {
							return $item.last().attr('style');
						})
						.hide()
						.data('origin', '');
					}
					
				}

				afterCallback();
			}
		}

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
					'<img src="' + Global.loadingImage + '">' +
				'</div>';

			$visibleItem.append($loading);

			if (options.animation === 'slide' && currentIndex === -1) {
				$list.children().first().append($loading);
			}

			$('.tb-loading').css({
				background: loadingBackground,
				height: $banner.height()
			});

			$('.tb-loading img').css('top', function() {
				return ($banner.height() - $(this).height()) / 2;
			});

			if (options.animation === 'fade' || options.animation === 'flash') {
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
}));


/**
 * Plugin main method
 */
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define([
			'global',
			'banner',
			'init'
		], function (Global, Banner) {
			return factory($, window, document, Global, Banner);
		});
	} else if (typeof exports !== 'undefined') {
		module.exports = factory($, window, document,
			require('global'),
			require('banner'),
			require('init')
		);
	} else {
		window.terseBanner = window.terseBanner || {};
		factory($, window, document, window.terseBanner.Global, window.terseBanner.Banner);
	}
}(window, function (jQuery, window, document, Global, Banner) {
	// 播放
	Banner.prototype.play = function() {
		this.activeIndex = this.currentIndex;

		this.animation[this.options.animation]();

		this.lazyload(this.currentIndex);
	};

	// 自动轮播定时器
	Banner.prototype.setPlayTimer = function() {
		var self = this,
			clear = function() {
				self.isHovered = true;
				clearInterval(self.playTimer);
			},
			reset = function() {
				self.isHovered = false;
				if (!self.isAnimated) {
					self.setPlayTimer();
				}
			};

		clearInterval(self.playTimer);

		self.playTimer = setInterval(function() {
			self.options.before.call(self, self.$elem, self.$item, self.currentIndex);
			self.currentIndex++;
			self.play();
		}, self.options.auto);

		self.$elem.off('mouseenter');
		self.$elem.off('mouseleave');
		self.$elem.on({
			mouseenter: clear,
			mouseleave: reset
		});
	};

	// 导航按钮和缩略图添加高亮样式
	Banner.prototype.activeBtnAndThumb = function() {
		this.activeIndex =
		this.currentIndex === this.len ? 0 :
		this.currentIndex === -1 ? this.len - 1 : this.currentIndex;

		if (this.$btn) {
			this.$btn.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (this.$thumb) {
			this.$thumb.eq(this.activeIndex).addClass('active').siblings().removeClass('active');
			if (this.$thumbSlideBtn.is(':visible')) {
				this.animation.thumbListSlide();
			}
		}
	};

	// 切换轮播图片
	Banner.prototype.switchTo = function() {
		if (this.isAnimated) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > this.len)) {
			throw new Error('TerseBanner\'s index overflow!');
		}

		this.options.before.call(this, this.$elem, this.$item, this.currentIndex);
		switch (arguments[0]) {
			case 'prev':
				this.currentIndex--;
				break;

			case 'next':
				this.currentIndex++;
				break;

			default:
				this.currentIndex = arguments[0];
				break;
		}

		this.play();
	};


	$.fn.terseBanner = function(option) {
		if (Global.isLTIE8) {
			throw new Error('terseBanner cannot work under IE8!');
		}

		return this.each(function() {
			var terseBanner = $(this).data('terseBanner');

			if (!terseBanner) {
				options = $.extend(true, {}, $.fn.terseBanner.defaults, typeof option === 'object' && option);

				$(this).data('terseBanner', (terseBanner = new Banner(this, options)));

				terseBanner.init();
			} else {
				if (option === 'prev') {
					terseBanner.switchTo.call(terseBanner, 'prev');
				} else if (option === 'next') {
					terseBanner.switchTo.call(terseBanner, 'next');
				} else if ($.isNumeric(option)) {
					terseBanner.switchTo.call(terseBanner, option);
				}
			}
		});
	};


	/**
	 * Plugin default options
	 */
	$.fn.terseBanner.defaults = {
		animation: 'slide', // 动画模式: ['none', 'fade', 'flash' 'slide']
		adaptive : false,   // 图片宽度自适应
		useHover : false,   // 导航按钮和缩略图支持hover事件触发动画
		arrow    : false,   // 导航箭头
		btn      : true,    // 导航按钮: [true, false, 'ol']
		auto     : 5000,    // 自动轮播: [为0时禁用此功能]
		duration : 800,     // 动画速度
		init     : $.noop,  // 轮播初始化时执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		after    : $.noop,  // 动画完成时执行的回调函数
		thumb    : { }      // 缩略图
	};
}));