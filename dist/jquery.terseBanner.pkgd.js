/**
 * terseBanner
 * Version: 2.2.4
 * URI: https://github.com/happyfreelife/terseBanner
 * Date: 2017-08-07
 **/
;(function (window, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function (jQuery) {
			factory(jQuery, window, document);
		});
	} else if (typeof module === 'object' && typeof module.exports) {
		module.exports = factory(require('jQuery'), window, document);
	} else {
		factory(jQuery, window, document);
	}
}(window, function ($, window, document) {
	/**
	 * 全局变量
	 */
	var Util = {
		// 是否为ie8以下的浏览器
		isLTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),

		// 是否是手机端
		isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),

		// 是否支持触摸事件
		isSupportTouch: 'ontouchstart' in window,

		// 是否支持CSS3动画过渡
		isSupportTransition: (function () {
			var style = document.body.style || document.documentElement.style;
			return style.transition !== undefined || style.webkitTransition !== undefined;
		}()),

		transform: typeof document.body.style.transform === 'string' ? 'transform' : 'webkitTransform',

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


	/**
	 * Plugin construct function
	 */
	function Banner(elem, option) {
		this.$elem = $(elem);
		this.option = option;
	}


	/**
	 * 写入轮播元素的默认样式
	 */
	Banner.prototype.stylesheet = function() {
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
			'    position: absolute;\n' +
			'    width: 96%;\n' +
			'    left: 2%;\n' +
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

			'.tb-btn{\n' +
			'    position: absolute;\n' +
			'    bottom: 20px;\n' +
			'}\n' +		
			'.tb-btn a{\n' +
			'    float: left;\n' +
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
			'    bottom: 20px;\n' +
			'    left: 0;\n' +
			'    width: 100%;\n' +
			'}\n' +
			'.tb-thumb > div{' +
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

		if (!$('#tb-stylesheet').length) {
			$('head').append('<style id="tb-stylesheet">\n' + style + '</style>');
		}
	};


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


	/**
	 * 设置轮播元素的样式
	 */
	Banner.prototype.setStyle = function(elem) {
		var s = this,
			o = s.option,
			$banner = s.$elem,
			$arrow = s.$arrow,
			$arrowBox = s.$arrowBox,
			$btn = s.$btn,
			$btnBox = s.$btnBox,
			$thumb = s.$thumb,
			$thumbList = s.$thumbList,
			$thumbSlideBtn = s.$thumbSlideBtn,
			$thumbBox = s.$thumbBox;

		switch (elem) {
			case 'arrow' :
				if ($arrow.css('backgroundImage') === 'none') {
					if (!$arrow.height()) {
						var bannerHeight = Math.max(
							$banner.height(),
							$.isNumeric(parseInt($banner.css('maxHeight'))) ? parseInt($banner.css('maxHeight')) : 0,
							$.isNumeric(parseInt($banner.css('minHeight'))) ? parseInt($banner.css('minHeight')) : 0
						);

						$arrow.height(parseInt(bannerHeight * 0.1));
					}

					$arrow.filter('.prev').html('<img src="' + Util.prevArrow + '">');
					$arrow.filter('.next').html('<img src="' + Util.nextArrow + '">');

					$arrow.find('img').on('dragstart', function() {
						return false;
					});
				}
				break;

			case 'arrowBoxPos' :
				$arrowBox.css({
					top: '50%',
					marginTop: -$arrow.outerHeight() / 2
				});
				break;

			case 'btnBoxPos' :
				$btnBox.css({
					left: '50%',
					marginLeft: -$btn.outerWidth(true) * $btn.length / 2
				});
				$banner.append($btnBox);
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
					width: o.thumb.width,
					height: o.thumb.height,
					marginRight: o.thumb.gap
				});
				$thumb.last().css('marginRight', 0);
				break;

			case 'thumbSlideBtn':
				$thumbSlideBtn.css({
					top: '50%',
					marginTop: -$thumbSlideBtn.height() / 2
				});
				break;

			case 'thumbList':
				$thumbList.css({
					left: 0,
					width: $thumb.outerWidth(true) * $thumb.length - o.thumb.gap
				});
				break;

			case 'thumbBox':
				var thumbVisible,
					thumbBoxWidth,
					thumbWidth = $thumb.outerWidth(true);

				if ($.isNumeric(o.thumb.visible)) {
					thumbVisible = Math.min(o.thumb.visible,
					parseInt($banner.width() / thumbWidth));
				} else {
					thumbVisible = parseInt($banner.width() / thumbWidth);
				}

				thumbBoxWidth = thumbWidth * thumbVisible - o.thumb.gap;

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
						left: o.thumb.gap,
						backgroundImage: 'url(' + Util.prevThumbBtn + ')'
					});

					$thumbSlideBtn.filter('.next').css({
						right: o.thumb.gap,
						backgroundImage: 'url(' + Util.nextThumbBtn + ')'
					});
				}
				break;
		}
	};


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


	/**
	 * 绑定动画
	 */
	Banner.prototype.bindAnimation = function() {
		var s = this,
			o = s.option,
			$banner = s.$elem,
			$list = s.$list,
			$item = $list.children(),
			$thumbBox = s.$thumbBox,
			$thumbList = s.$thumbList,
			$thumb = s.$thumb,
			$thumbSlideBtn = s.$thumbSlideBtn,
			thumbVisible,
			thumbListLeft,
			animation = s.animation = {};

		// 单张图片时，移除不必要的元素
		if (s.len === 1) {
			$banner.find('.tb-arrow, .tb-btn, .tb-thumb, [class$="duplicate"]').remove();
		}

		function afterCallback() {
			o.after.call(s, s.$elem, s.$item, s.currentIndex);
		}

		// 处理可能会超出范围的索引
		function handleCurrentIndex() {
			s.currentIndex =
			s.currentIndex === s.len ? 0 :
			s.currentIndex === -1 ? s.len - 1 : s.currentIndex;
		}

		animation.slide = function() {
			var slidToLeft = true;

			if (s.currentIndex === s.latestIndex) return;

			if (s.currentIndex < s.latestIndex) {
				slidToLeft = false;
			}

			if (slidToLeft === false) {
				$list.css('left', '-100%');
			}

			$item.eq(s.currentIndex + 1).show();

			if (Util.isSupportTransition) {
				setTimeout(function() {
					s.animating = true;

					var listTransform = slidToLeft ?
						'translate3d(' + -$item.width() + 'px, 0, 0)' :
						'translate3d(' + $item.width() + 'px, 0, 0)';

					$list.css(Util.transform, listTransform);

					setTimeout(s.animation.slideCallback, o.speed - 50);
				}, 50);
			} else {
				s.animating = true;

				$list.animate({
					left: slidToLeft? '-100%' : 0
				}, o.speed, s.animation.slideCallback);
			}

			s.activeBtnAndThumb();
		};

		animation.flash = 
		animation.fade = function() {
			handleCurrentIndex();

			s.animating = true;

			$list.css('left', -s.currentIndex * 100 + '%');

			if (Util.isSupportTransition) {
				$item.eq(s.currentIndex).css('opacity', 1);	
				setTimeout(s.animation.fadeCallback, o.speed);	
			} else {
				$item.eq(s.currentIndex).animate({ opacity: 1 }, {
					speed: o.speed * 0.8,
					complete: s.animation.fadeCallback
				});
			}

			s.activeBtnAndThumb();
		};

		animation.none = function() {
			handleCurrentIndex();

			$item.eq(s.currentIndex).show().siblings().hide();
			$item.eq(s.currentIndex).addClass('active').siblings().removeClass('active');

			s.activeBtnAndThumb();

			afterCallback();
		};

		animation.thumbListSlide = function() {
			if ($thumbList.is(':animated')) return;

			if ($.isNumeric(o.thumb.visible)) {
				thumbVisible = Math.min(o.thumb.visible,
					parseInt($banner.width() / $thumb.outerWidth(true)));
			} else {
				thumbVisible = parseInt($banner.width() / $thumb.outerWidth(true));
			}

			thumbListLeft = $.isNumeric(arguments[0]) ?
			arguments[0] : Math.max(
				-parseInt(s.activeIndex / thumbVisible) * $thumb.outerWidth(true) * thumbVisible,
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
			s.animating = false;

			s.latestIndex =
			s.currentIndex =
			s.currentIndex === -1 ? s.len - 1 :
			s.currentIndex === s.len ? 0 : s.currentIndex;

			$list.css({
				left: 0,
				transition: 'none'
			});

			$list.css(Util.transform, 'translate3d(0, 0, 0)');

			$item.eq(s.currentIndex + 1).show().siblings().hide();
			$item.eq(s.currentIndex + 1).addClass('active').siblings().removeClass('active');

			setTimeout(function() {
				$list.css('transition', 'transform ' + o.speed + 'ms');
			}, 50);

			afterCallback();

			if (s.useAuto && !s.isHovered) {
				s.setPlayTimer();
			}
		};

		animation.fadeCallback = function() {
			s.animating = false;

			if (o.animation === 'fade') {
				$list.prev().css('left', -s.currentIndex * 100 + '%');
				$list.prev().html($list.html());
			}

			$item.eq(s.currentIndex).siblings().css('opacity', 0);
			$item.eq(s.currentIndex).addClass('active').siblings().removeClass('active');

			afterCallback();

			if (s.useAuto && !s.isHovered) {
				s.setPlayTimer();
			}
		};

		// 轮播初始化完成时调用的函数
		o.init.call(s, s.$elem, s.$item, 0);
		
		s.touch();
	};


	/**
	 * 绑定事件
	 */
	Banner.prototype.touch = function() {
		if (!Util.isSupportTouch) return;

		var s = this,
			o = s.option,
			$banner = s.$elem,
			$list = s.$list,
			$item = $list.children(),
			transform = Util.transform,
			listOffset,      // 列表当前的偏移量
			listTarget,      // 列表滑动的目标位置
			touch,           // 触摸事件
			touchStartTime,  // 触摸开始时刻
			touchStartX,     // 触摸开始的X坐标
			touchStartY,     // 触摸开始的X坐标
			touchRangeX,     // 触摸水平滑动距离
			touchRangeY,     // 触摸垂直滑动距离
			touchDirection,  // 触摸方向
			touchDuration;   // 触摸持续时间

		function getListOffset() {
			return parseInt($list.attr('style').match(/translate3d\((-?\d+)px/)[1]);
		}

		$list.css({
			transitionProperty: 'transform',
			transitionDuration: '0ms'
		});

		setTimeout(function() {
			$list.width($item.width() * (s.len + 2));
			$list.css(transform, 'translate3d(' + -$item.width() + 'px, 0, 0)');
			$list.children().show();
		}, 50);

		function touchStart (e)  {
			if (s.animating) return;

			s.touching = true;

			touch = e.touches[0];
			touchStartTime = Date.now();
			touchStartX = touch.pageX;
			touchStartY = touch.pageY;

			listOffset = getListOffset();
		}

		function touchMove (e) {
			if (s.animating) return;

			touch = e.touches[0];
			touchRangeX = touch.pageX - touchStartX;
			touchRangeY = touch.pageY - touchStartY;

			// 触摸水平滑动距离 小于 触摸垂直滑动距离时不执行滑动动画
			if (Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

			if (touchRangeX && !s.beforeCalled) {
				o.before.call(s, s.$elem, s.$item, s.currentIndex);
				s.beforeCalled = true;
			}

			if (touchRangeX < 0) {
				touchDirection = 'left';
			} else if (touchRangeX > 0) {
				touchDirection = 'right';
			}

			$list.css(transform, 'translate3d(' + (listOffset + touchRangeX) + 'px, 0, 0)');
		}

		function touchEnd (e) {
			if (s.animating || !touchRangeX || Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

			// if (e) {
			// 	e.preventDefault();
			// }

			s.animating = true;

			touchDuration = Date.now() - touchStartTime;

			// 触摸停留时间小于300ms 或者
			// 触摸水平距离超过轮播宽度的一半时切换到下一个元素
			if (touchDuration < 300 || Math.abs(touchRangeX) >= $item.width() / 2) {
				if (touchDirection === 'left') {
					listTarget = 'translate3d(' + (listOffset - $item.width()) + 'px, 0, 0)';
					s.currentIndex++;
				} else {
					listTarget = 'translate3d(' + (listOffset + $item.width()) + 'px, 0, 0)';
					s.currentIndex--;
				}

				$list.css({
					transitionDuration: o.speed / 3 + 'ms',
					transform: listTarget
				});
				// $list.css('transitionDuration', o.speed / 3 + 'ms');
				// $list.css(transform, listTarget);

				listOffset = getListOffset();

				s.lazyload(s.currentIndex);

				

				s.activeBtnAndThumb();
			}

			// 触摸停留时间大于300ms 并且
			// 触摸水平距离小于轮播宽度的一半时回退到当前元素
			if (touchDuration >= 300 && Math.abs(touchRangeX) < $item.width() / 2) {
				listTarget = 'translate3d(' + listOffset + 'px, 0, 0)';
				$list.css('transitionDuration', '200ms');
				$list.css(transform, listTarget);
			}

			setTimeout(function() {
				$list.css('transitionDuration', '0ms');

				// 切换到最后一个元素时
				if (!listOffset) {
					listOffset = -$item.width() * s.len;
					$list.css(transform, 'translate3d(' + listOffset + 'px, 0, 0)');
				}

				// 切换到第一个元素时
				if (listOffset === -$item.width() * (s.len + 1)) {
					listOffset = -$item.width();
					$list.css(transform, 'translate3d(' + listOffset + 'px, 0, 0)');
				}

				s.currentIndex =
				s.currentIndex === -1 ? s.len - 1 :
				s.currentIndex === s.len ? 0 : s.currentIndex;

				touchRangeX = 0;
				s.animating = false;
				s.touching = false;
				s.beforeCalled = false;

				o.after.call(s, s.$elem, s.$item, s.currentIndex);
			}, o.speed / 3);
		}

		$banner[0].addEventListener('touchstart', touchStart, false);
		$banner[0].addEventListener('touchmove', touchMove, false);
		$banner[0].addEventListener('touchend', touchEnd, false);

		s.slidePrev = function() {
			touchRangeX = $item.width() / 2;
			touchRangeY = 0;
			touchDirection = 'right';
			touchEnd();
		};

		s.slideNext = function() {
			touchRangeX = $item.width() / 2;
			touchRangeY = 0;
			touchDirection = 'left';
			touchEnd();
		};

		// 视口宽度发生改变时，列表和列表项自动更改宽度
		setInterval(function() {
			if (Util.isSupportTouch && !s.touching) {
				$item.width($banner.width());
				$list.width($item.width() * (s.len + 2));
				$list.css(Util.transform, 'translate3d(' + -$item.width() * (s.currentIndex + 1) + 'px, 0, 0)');

				listOffset = getListOffset();
			}
		}, 50);
	};


	/**
	 * 图片延迟加载
	 */
	Banner.prototype.lazyload = function() {
		var s = this,
			o = s.option,
			currentIndex = arguments[0] || 0,
			$banner = s.$elem,
			$list = s.$list,
			$item = s.$item,
			$visibleItem = $item.eq(currentIndex),
			visibleItemImg = $visibleItem.data('origin');

		if (!visibleItemImg) return;

		function showVisibleItem() {
			if (currentIndex === -1) {
				$visibleItem = $list.children().first();
			}

			if (o.adaptive) {
				$visibleItem.find('img[data-src]').attr('src', visibleItemImg);
			} else {
				$visibleItem.css('backgroundImage', 'url(' + visibleItemImg + ')');
			}

			if (!currentIndex) {
				var img = new Image();

				img.src = visibleItemImg;

				var loaded = function() {
					/**
					 * slide动画模式下，
					 * 第一个列表项复制之后添加到列表的最后面 => first-duplicate，
					 * 在 first 图片源文件加载完成之后，
					 * 需要将 first-duplicate 中的图片和 first 图片同步
					 * $list.children().last() => first-duplicate 
					 * $item.first() => first
					 */
					if (o.animation === 'slide' && s.len > 1) {
						$list.children().last().attr('style', function() {
							return $item.first().attr('style');
						})
						.hide()
						.data('origin', '');

						if (o.adaptive) {
							$list.children().last().html($item.first().html());
						}

						if (Util.isSupportTouch) {
							$list.children().last().show();
						}
					}

					$visibleItem.data('origin', '');
				};

				if (img.complete) {
					loaded();
				} else {
					img.onload = loaded;
				}
			} else {
				$visibleItem.data('origin', '');

				$('.tb-loading').fadeOut(300, function() {
					$(this).remove();

					setTimeout(function() {
						$list.height('auto');
					}, 50);
				});

				if (o.animation === 'slide' && s.len > 1) {
					if (currentIndex === -1) {
						if (o.adaptive) {
							$item.last().html($list.children().first().html());
						}

						/**
					 	 * slide动画模式下，
						 * 最后一个列表项复制之后添加到列表的最前面 => last-duplicate，
						 * 在 last-duplicate 中的图片源文件加载完成之后，
						 * 需要将 last 图片 和 last-duplicate 中的图片同步
						 * $item.last() => last
						 * $list.children().first() => last-duplicate
						 */
						$item.last().attr('style', function() {
							return $list.children().first().attr('style');
						})
						.show()
						.data('origin', '')
						.find('.tb-loading').fadeOut(300, function() {
							$(this).remove();
						});
					}

					if (currentIndex === s.len - 1) {
						/**
					 	 * slide动画模式下，
						 * 最后一个列表项复制之后添加到列表的最前面 => last-duplicate，
						 * 在 last 图片源文件加载完成之后，
						 * 需要将 last-duplicate 中的图片和 last 图片同步
						 * $list.children().first() => last-duplicate
						 * $item.last() => last
						 */
						$list.children().first().attr('style', function() {
							return $item.last().attr('style');
						})
						.hide()
						.data('origin', '');

						if (o.adaptive) {
							// 加载动画需要300ms之后移除
							// 如果不设置延时会把加载动画的代码也复制到新的列表第一个元素中
							setTimeout(function() {
								$list.children().first().html($item.last().html());
							}, 350);
						}

						if (Util.isSupportTouch) {
							$list.children().first().show();
						}
					}
				}
			}
		}

		// 第一张图片不设置loading动画
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
					'<img src="' + Util.loadingImage + '">' +
				'</div>';

			console.log('append');
			$visibleItem.append($loading);

			if (o.animation === 'slide' && currentIndex === -1) {
				$list.children().first().append($loading);
			}

			$('.tb-loading').css({
				background: loadingBackground,
				height: function() {
					return Math.max(
						$banner.height(),
						$.isNumeric(parseInt($banner.css('maxHeight'))) ? parseInt($banner.css('maxHeight')) : 0,
						$.isNumeric(parseInt($banner.css('minHeight'))) ? parseInt($banner.css('minHeight')) : 0
					);
				}
			});

			$list.height($('.tb-loading').height());

			$('.tb-loading img').css('top', function() {
				return ($banner.height() - $(this).height()) / 2;
			});

			if (o.animation === 'fade' || o.animation === 'flash') {
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


	/**
	 * Plugin main method
	 */
	// 播放
	Banner.prototype.play = function() {
		this.activeIndex = this.currentIndex;

		if (this.len > 1) {
			this.animation[this.option.animation]();
			this.lazyload(this.currentIndex);
		}
	};

	// 自动轮播定时器
	Banner.prototype.setPlayTimer = function() {
		var s = this,
			clear = function() {
				s.isHovered = true;
				clearInterval(s.playTimer);
			},
			reset = function() {
				s.isHovered = false;
				if (!s.isAnimated) {
					s.setPlayTimer();
				}
			};

		clearInterval(s.playTimer);

		s.playTimer = setInterval(function() {
			s.option.before.call(s, s.$elem, s.$item, s.currentIndex);
			s.currentIndex++;
			s.play();
		}, s.option.auto);

		s.$elem.off('mouseenter.terseBanner');
		s.$elem.off('mouseleave.terseBanner');
		s.$elem.on({
			'mouseenter.terseBanner': clear,
			'mouseleave.terseBanner': reset
		});
	};

	// 导航按钮和缩略图添加高亮样式
	Banner.prototype.activeBtnAndThumb = function() {
		var s = this;

		s.activeIndex =
		s.currentIndex === s.len ? 0 :
		s.currentIndex === -1 ? s.len - 1 : s.currentIndex;

		if (s.$btn) {
			s.$btn.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
		}

		if (s.$thumb) {
			s.$thumb.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
			if (s.$thumbSlideBtn.is(':visible')) {
				s.animation.thumbListSlide();
			}
		}
	};

	// 切换轮播图片
	Banner.prototype.playTo = function() {
		var s = this;

		if (s.isAnimated) return;

		if ($.isNumeric(arguments[0]) && (arguments[0] < 0 || arguments[0] > s.len)) {
			throw new Error('TerseBanner\'s index overflow!');
		}

		s.option.before.call(s, s.$elem, s.$item, s.currentIndex);
		
		switch (arguments[0]) {
			case 'prev':
				if(!Util.isSupportTouch) {
					s.currentIndex--;
					s.play();
				} else {
					s.slidePrev();
				}
				break;

			case 'next':
				if(!Util.isSupportTouch) {
					s.currentIndex++;
					s.play();
				} else {
					s.slideNext();
				}
				break;

			default:
				if(!Util.isSupportTouch) {
					s.currentIndex = arguments[0];
					s.play();
				}
				break;
		}
	};


	$.fn.terseBanner = function(opt) {
		if (Util.isLTIE8) {
			throw new Error('terseBanner cannot work under IE8!');
		}

		return this.each(function() {
			var terseBanner = $(this).data('terseBanner');

			if (!terseBanner) {
				var option = $.extend(true, {}, $.fn.terseBanner.defaults,
					typeof opt === 'object' && opt);

				$(this).data('terseBanner', (terseBanner = new Banner(this, option)));

				terseBanner.init();
			} else {
				if (opt === 'prev') {
					terseBanner.playTo.call(terseBanner, 'prev');
				} else if (opt === 'next') {
					terseBanner.playTo.call(terseBanner, 'next');
				} else if ($.isNumeric(opt)) {
					terseBanner.playTo.call(terseBanner, opt);
				}
			}
		});
	};


	/**
	 * Plugin default option
	 */
	$.fn.terseBanner.defaults = {
		animation: 'slide', // 动画模式: ['slide', 'fade', 'flash', 'none']
		adaptive : false,   // 图片宽度自适应
		arrow    : false,   // 切换箭头
		btn      : true,    // 指示按钮: [true, false]
		auto     : 5000,    // 自动轮播: [为0时禁用此功能]
		speed    : 800,     // 动画速度
		init     : $.noop,  // 轮播初始化完成时执行的回调函数
		before   : $.noop,  // 动画开始时执行的回调函数
		after    : $.noop,  // 动画完成时执行的回调函数
		thumb    : {}       // 缩略图
	};

}));
