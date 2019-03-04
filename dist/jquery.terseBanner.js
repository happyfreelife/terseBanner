/**
 * terseBanner
 * Version: 2.4.0
 * URI: https://github.com/happyfreelife/terseBanner
 * Date: 2019-03-04
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
		IS_LTIE8: /msie (6.0|7.0)/i.test(navigator.userAgent),

		// 是否是移动端
		// IS_MOBILE: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
		IS_MOBILE: document.ontouchstart === null,

		// 是否支持CSS3动画过渡
		IS_SUPPORT_TRANSITION: 'transition' in document.documentElement.style,

		TRANSFORM: typeof document.documentElement.style.transform === 'string' ? 'transform' : 'webkitTransform',

		// 箭头 - 上一个
		PREV_ARROW: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdGOUJEQTlBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdGOUJEQUFBRjU5MTFFNUFFQjJBQzRBNEM1MkYzMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5QkRBN0FGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y5QkRBOEFGNTkxMUU1QUVCMkFDNEE0QzUyRjMzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhEdN5oAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARBJREFUeNq82EEOwDAIA8Hl/58OH4gizSG9R20D2Isbe7JThcfCt4UfGf5beCXhTYYFCOsWljvskrC5wp4MWzmcgHBwwnkLxzSc7lAUQi0JJSg79jp3Fa5QJ0N5DVU5FPPQA0LrCB0nNKrQ30JbDN00NOHQu0PLD0khBIyQS0KcCSkohKeQuUJUCwkvBMOQJ0MMDek1hN6GmfcnYvt38r1wHbju3Gfc1zxHPLesE6xLrIOsu6zz7CvsY+yb7NPMBcwhzD3MWcx1zJHMrczJzOW8B/DewXsO71W8x/HeyHsq78W8h/PezzkD5xqco3BuwzkR51Kcg3Huxjkf54qcY3Juyjkt58KcQzuUa86+zxFgAFs9FmHsomPPAAAAAElFTkSuQmCC',

		// 箭头 - 下一个
		NEXT_ARROW: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABuCAMAAAC0hHtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QURDRjhFMjJBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QURDRjhFMjNBRjU4MTFFNUIzMzhBRTk0RUZERDg4OUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRENGOEUyMEFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRENGOEUyMUFGNTgxMUU1QjMzOEFFOTRFRkREODg5QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqC2oS0AAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAARxJREFUeNq82MtuwlAQRMHT///TKEJRILzsWuAtKgmwPbenm12VuRlsBpvBZrAZbAabwWawGWwGm8FmsBlsBpvBZrAZbAabwWawGWwGm8FmsBlsBt9+lrl38MOvz9xr+PH+Zu4VPPAEZ+45PPSOZu4ZPDiFMvcID8/ZzP2HJ06SzN3DU2dl5m7hyTSQuT94Ou9k7hdCosvcFVJmzdwPxFTeVx1+T/xf8D7gfcfnDJ9rfI/wvcU5gXMJ5yDOXZzzeK7gOYbnJp7TmAswh2DuwZyFuQ5zJOZWzMmYy3EPwL0D9xzcq3CPw70R91Tci3EPx70fewbsNbBHwd4GeyLspbAHw94Nez7sFbHHxN4Ue1rshbGH1qisPbtdFwEGAFZuFsthqI7FAAAAAElFTkSuQmCC',

		// 加载动画
		LOADING_IMAGE: 'data:image/gif;base64,R0lGODlhKAAoANUnAPz6/Pz+/PTy9Ozq7JSSlPT29Ly6vHx6fHRydOzu7OTi5Nze3KyqrISChNza3MzKzNTS1KSipIyKjGxubOTm5LSytMTCxHx+fJyanKSmpKyurIyOjLy+vMzOzNTW1ISGhLS2tMTGxHR2dJSWlJyenGxqbGRmZP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjQ5NEM3OEU3QkU2MTFFNzkwQzBGMzU5NjIwNjQzODAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjQ5NEM3OEY3QkU2MTFFNzkwQzBGMzU5NjIwNjQzODAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NDk0Qzc4QzdCRTYxMUU3OTBDMEYzNTk2MjA2NDM4MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NDk0Qzc4RDdCRTYxMUU3OTBDMEYzNTk2MjA2NDM4MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAkHACcALAAAAAAoACgAAAb/wJNwSCwSAQCjcsk0JjKXRmbQrFoTB5PWdEhYv8qMqbQ1ZcDLgWaEeQSGgEtZe0miiR3yllAQxvVbDXZCAxUZD4NKA3qAEUMRcyaOQw4TWxiJRRqRJgheJwNZWwdUfg1zD0wEnCYKQwMRDQcRpYSAWpNKGGORrkeZJwUIcxVMD5yCYJBbJbVGABtlJSUQaAAMCCUNDlUFEcMmDdV3JwIDwEsCDgro5EwBb+53AQ8fZB9u8lYBYlp6GfH0nQCQQMCgY7fIpBKYgAAZAp8+sGogEMCqPW9uSWt3hYxHE15YaeFYRcCcEl7sSdNCUZ9FQASSHOO0UF/DaQRKAcjAaEwEZpJfCJ478uCUNkQCwSBJyrSp06dNBzjo86VAiAXyKtBxtiTACC2+0FD4SMLKHxMhyDkos+HLgwN8yAEQZcKC0oBFYNFSRIKABaD7JJr4gBfqEGFaEFA1XITBmDOMnzlwUDiy5ctBAAAh+QQJBwAnACwAAAAAKAAoAAAG/8CTcEgsDgUdSMLIbDqJAM3EZJpoAM9sVkM1lagVbVawoASIgu+3WxKImQmM+hAadrp4U+ddFIjyJRVnHWt5EEMFFSITGwtPI2peVCWOaXlebicAI5JVDk2WlyYMQgydVKRCDoVeEk0LolQEQlFrJQxYQgaXJU0Kp3gYaA8QA0UWlwdNAAexFmICCHlhTSGiDblaENJUGNlMFawNCnwnAhYGDt++DAQYFpnl8vP09fb3RhQcBhT4Why2OBQpwIBBPHsUpqyZQG6IqVH+dk2iYoDIw1T3drGqeKTgwXoUWJXo568JwEkcSzahYMBAQ5UwY8qcSZPegw8HIizRYuHDiFiPWh50+rDOyC8qI+R9YGPi0JM7XxrIO8DqQZYCDag8MxKAwoAzRSLgKWFsDISXUOSYILEuwVIvKetZk2S1CAAID8reA4GHWs0FJdQ4qimkgwQJewgrnhkEACH5BAkHACcALAAAAAAoACgAAAb/wJNwSCwKKYyPJEMxOp/Q4WNiqpZKj6g2SqGWqtbmdkzMfMHgDHl9aqDRDWIBElKwjZ83WCL1mggCYwFGGW9naicOZ2AEWx0NIwVEA4tgJQNCBIYmdlAAF1VZRA9XVlhCn3omFlEBI1+dRBQZDUuxAG56op4PC3cVlSYlAHdkBRJop8VkAhUNFwQOy3cBxNPX2MXV2WMCtA0ZgUUC4tkJF4sX5SccCAgc3AzJJgxDAlQmE+vFn2dnDdbuCdOHLUAuONbYuYOXrVClekQEJOB2QgAoMOooPhHA4AI4TBo9JQxJsqTGABQW7IOS4IGDQWwSEPiCwAJMKAsQVCFxcwuAYw3JPLQC+qWEUDIUioIhEQUXml1bFgRrFEUDGAQTiQDgIEECh5ECdKKpoAWAhlrSimhYpKGIBTgrnQDoKSSsFRMI1gFwQEJChbhrBugBabIfmAaSTAqBIBYBBMWTLFggDDlbEAAh+QQJBwAnACwAAAAAKAAoAAAG/8CTcEgsGo/IpHLJbDqfUGEBBAJEr6eKyQQyFiqSC8aDLWpLleLgsG13lwUPBQmoVArEwGZbMvVLZEkFEn4hTwp9bW0jSh5tEk8PiooHSohbGE8Qk20NSw8fGAJPAgicJmllShyJbQdWqkkABqZ+EgOxTAIQDwqwucDBRQIeHqPCRwAgE34TVUQKDAwKwCB+bWhDCrUI1KoJE61bE8cMigyxjqcQQubX6KqO4n7sJxTc3mUCzJMlxyfRpgHToigbMiJ1EqH5dXCIAAcQ/jWceDBAAYZPFjCIwAHPEgobEIgwgHEJCIUXEigRIAJbqiYL5jFKwmGSiJJI3P3x4/EIwV42CCSeADBgAEYS80yoROJBnASGCz5skbCAiAVOCALIipDoQL4TAth0/SfgwiQLSwI4qGBA6NVJhoYMGLEFgQWcTgzw4fNyCFG8T5pOqjcRAN02GAADmyVBAkmKwoIAACH5BAkHACcALAAAAAAoACgAAAb/wJNwSCwaj8ikcslsIgEFpxTZER0e06wQcDCZDlGtMYAsdL9h8Rb0ISiODytWPQR5TSLBsQBABjQEC0wBH3cmEFkOJiUbTQR3JQ5ZCQgmDE0KlSURYgkLZE0CEJJ0paanqKmqTQMaGxIaA0UACwt9ph2VdwgdQwsNXg1vdBQTXiV3E7IAF8cmF7diDIuGi5cL1HeCahLVdxIn2NWkYt3I1eBc51/RWtPelkK/wcNqA8aQi7JbDg7tahDWmUAwZ9WQAQwkSGCwz6DDJQUE/PND4QGENE4GYEAw4YIFUH4ynLuwjZWuY5eSWDBUAowTDPm81DMCrBoiJgKMCSwBIkkXYoEFTwDwoEGDB5A54aU8ApNlPQARqG26VaBmtaBFKJw0EQEkB28WhnytdmAiEQoYDjSwEC2AOUMSbgFgsO7AzCnMvJUlogAEgwd66IwQaALDw3A7766CcObAzcNCBwwwuyQIACH5BAkHACcALAAAAAAoACgAAAb/wJNwSCwaj8ikcslsHhMGQ8JJNSYOJtNhWu0asiWToWsMLAyWgtEQzo7Jw4CmfaAUr9ntsTAIMBdZgQRWUVxFCggmEX5KX4EmCGpUJCZhA0sWj1oAVRVZkUsFWIFvVAAGEQtNFAQIBwaccFUAsbK2t7i5ulQBEBkZEIy7RQERjxnCw0IQlc0mELkFUZJCGZqKuSBZIETGmhHZYdxDzG1Z0LgAILBExY8RtcpCABARERDx8vr7/E5mBhpCCGBCIYMEAiHyKSngLYsIdEgcJAqEQeGRAJScVVKAJMAoZyGaLDAXqMSgI4A0mixCq0AyT9cgUSPC7NoHIgtaISCgSoiGZpiVBhoREDMDuYlZJngQkinmAYsnrD0qcekEgI90OAmYGKZNhSQAItBxMMQBmJImyJ6AQNKEBKhDBEBwEK/mNYgKCJQo8QrukgExqbIU4JcJAAzXCCQblkDCIwlC9wHoYK9DYSNBAAAh+QQJBwAnACwAAAAAKAAoAAAG/8CTcEgsGo/IpHIYSCQCy2g0QSiVNgmp1hggmL4mAmBLPiVKYFMpWyYOIpdNCDo8p9ft4UD0RWuIAF5gEnRDBRURHoVIEWlqA24bVhJsQwAbfRBLF44mD0UBAwljRQNoXxFLEp0OWwUTpxVLIadfB6RaD7AEBUsAGqcNCm0FA7hLAw8OvXnNzs/QXAUAi9FHCwS7C9ZICwhpE9vRAMcBmGBoBNVtHQcHHZZotWrHbQAHtqSv8/TPBfgmbgkx10kMtHYi4A3xdmfYuHonHEiwQqAVNyQByEG8yLFNkwUUNl4sEAGWiQYKO54AsOpOSo4h+qS5IBLJAA81hWDopMbhSmAHBgw4WGfKRCol51gJGZD0SiUhEL58WEeEAU88ABqoSdOAmRAAESR4QMbP6BgDd8AYaEYLnQRmXsoScDaAgQQMFnA1KGtCgsqdPDGo9MDXIscAVmWWiEB1nAWAB/KSCQIAIfkECQcAJwAsAAAAACgAKAAABv/Ak3BILBqPyKRySOEYKMtolFMymUocqdZImVStJej2WFiIiQarumQYFwGab2NB5KjVbWJgsChENWBWCANDCiVfV2cnABhXIh5KBVWIJhp1XyUWRWlqIn5IC3dqBEUKBgYKRgSidEgUlFYYW413hEkXoiYdW4ZfGAFKCgh3EQBjChgEBsZLAwwbGB3MbtTV1tdSAQunC8DYSgKrYAQC30gB4ogE3tcCHBYJQw5XoiUO2Am4JhflJ5y5eawZmGQii79cVgJW+1dQyDxYJu61u1DlQD90udZ9E2DAQj8h4daQM5cEgINTDqaRXPlN2zMMFj6xHBIgzp0GqWYKsQCxgcxglQBEBLqjSUuBZ5CSKKCXcQsDKxPiIZmH0AQpLauqtDqSAKIVBlsgVCGg0sgISpMkauFT1siAYaIYsDuRYMMGqdcGEJiEwELZNCVAkBTgQEHbE8IQbNVZRMBHxpAjDwkCADs='
	};


	/**
	 * Plugin construct function
	 */
	function Banner(banner, option) {
		this.$banner = $(banner);
		this.option = option;
	}

 
	/**
	 * 写入轮播元素的默认样式
	 */
	Banner.prototype.style = function() {
		var style =
			'.tb-list,\n' +
			'.tb-list > *\n{' +
			'    position: relative;\n' +
			'    overflow: hidden;\n' +
			'}\n' +

			'.tb-list > *\n{' +
			'    list-style: none;\n' +
			'}\n' +

			'.tb-list > * > *{\n' +
			'    position: relative;\n' +
			'    float: left;\n' +
			'    min-height: 1px;\n' +
			'    background-repeat: no-repeat;\n' +
			'    background-position: center center;\n' +
			'}\n' +
			'.tb-list > .touching{\n' +
			'    -webkit-transition-duration: 0ms !important;\n' +
			'    transition-duration: 0ms !important;\n' +
			'}\n' +

			'.tb-arrow{\n' +
			'    position: absolute;\n' +
			'    width: 95%;\n' +
			'    top: 50%;\n' +
			'    left: 2.5%;\n' +
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
			'    left: 50%;\n' +
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

		if (!$('#tb-style').length) {
			$(document).ready(function($) {
				$('head').append('<style id="tb-style">\n' + style + '</style>');
			});
		}
	};


	/**
	 * 轮播初始化
	 */
	Banner.prototype.init = function() {
		var s = this;

		s.$list = s.$banner.children().first();
		s.$item = s.$list.children();
		s.len = s.$item.length;
		s.currentIndex = 0;
		s.activeIndex = 0;
		s.latestIndex = 0;
		s.isHovered = false;
		s.isAnimated = false;

		var o = s.option,
			$banner = s.$banner,
			$list = s.$list,
			$item = s.$item,
			thumbArr = [],
			regExp = new RegExp('\\?thumb=(.*\\.(gif|jpg|jpeg|png))$');

		// 写入默认样式
		s.style();

		// 设置内部元素的结构和宽度
		$list.wrap('<div class="tb-list"/>');
		$list.width((s.len + 2) * 100 + '%');
		$item.width($banner.width());

		if ($banner.css('position') === 'static') {
			$banner.css('position', 'relative');
		}

		$banner.css({
			tapHighlightColor: 'transparent',
			userSelect: 'none'
		});

		// 自适应模式
		if (o.adaptive) {
			$banner.addClass('tb-adaptive');
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

		// 触屏模式下，动画只能是'slide'
		if (Util.IS_MOBILE) {
			o.animation = 'slide';
		}

		// animation: slide
		if (o.animation === 'slide') {
			if (Util.IS_SUPPORT_TRANSITION) {
				$list.css(Util.TRANSFORM, 'translate3d(0, 0, 0)');
				$list.css('transition', 'transform ' + o.speed + 'ms');
			}

			$list.css('left', 0);
			$item.css('float', 'left').first().show().siblings().hide();
			$item.first().clone(true).addClass('first-duplicate').hide().appendTo($list);
			$item.last().clone(true).addClass('last-duplicate').hide().prependTo($list);
		}

		// animation: fade || flash
		if (o.animation === 'fade' || o.animation === 'flash') {
			if (Util.IS_SUPPORT_TRANSITION) {
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
		
		if (
			!Util.IS_MOBILE &&
			$.isNumeric(o.auto) &&
			o.auto > 0 &&
			s.len > 1
		) {
			s.useAuto = true;
			s.setPlayTimer();
		}

		// Banner的宽度改变时，列表和列表项自动更改宽度
		if (!Util.IS_MOBILE) {
			setInterval(function() {
				$list.children().width($banner.width());

				if (!o.adaptive) {
					$list.children().height($banner.height());
				}
	
				if (o.animation === 'fade') {
					$list.prev().children().width($banner.width());

					if (!o.adaptive) {
						$list.prev().children().height($banner.height());
					}
				}
			}, 50);
		}

		// 当列表项的数量只有一个时不使用任何功能
		if (s.len === 1) return;
		
		// 自动添加必需的结构
		if (o.arrow) s.arrow();
		if (o.btn) s.btn();
		if ($.isNumeric(o.thumbWidth) && o.thumbWidth > 0) s.thumb();
		if (Util.IS_MOBILE) s.touch();

		// 绑定动画
		s.animate();

		// 若使用了延迟加载， 在这里加载第一张图片
		s.lazyload();

		// Banner初始化完成之后的回调函数
		o.init.call(s);
	};


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

		function setArrowHeight() {
			var bannerHeight = Math.max(
				$banner.height(),
				$.isNumeric(parseInt($banner.css('maxHeight'))) ? parseInt($banner.css('maxHeight')) : 0,
				$.isNumeric(parseInt($banner.css('minHeight'))) ? parseInt($banner.css('minHeight')) : 0
			);

			$arrow.height(parseInt(bannerHeight * 0.1));

			$arrow.filter('.prev').html('<img src="' + Util.PREV_ARROW + '">');
			$arrow.filter('.next').html('<img src="' + Util.NEXT_ARROW + '">');

			$arrow.find('img').on('dragstart', function() {
				return false;
			});

			setTimeout(function() {
				$arrow.css('marginTop', -$arrow.outerHeight() / 2);
			}, 0);
		}

		// 没有定义箭头的样式，就自动设置
		if (!$arrow.width() && $arrow.css('backgroundImage') === 'none') {
			/* 自适应模式下，最外层容器没有高度
			 * 计算之后的箭头高度为0，无法显示
			 * 在首张图片加载完成之后再计算
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
			} else {
				setArrowHeight();
			}
		}
	};


	/**
	 * 指示按钮
	 */
	Banner.prototype.btn = function() {
		var s = this,
			o = this.option,
			$banner = this.$banner,
			$btn;

		for (var i = 0, item = ''; i < s.len; i++) {
			item += '<a></a>';
		}
		$banner.append($('<div class="tb-btn"/>').append(item));

		s.$btn = $btn = $('.tb-btn a', $banner);

		$btn.first().addClass('active');

		setTimeout(function() {
			$btn.parent().css({
				marginLeft: -($btn.outerWidth(true) * $btn.length / 2)
			});
		}, 0);

		if (!Util.IS_MOBILE) {
			$btn.on('click.terseBanner', function() {
				if (s.isAnimated) return;

				o.before.call(s, s.currentIndex);
				s.currentIndex = $(this).index();
				s.play();
			});
		}
	};


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


	/**
	 * 绑定动画
	 */
	Banner.prototype.animate = function() {
		var s = this,
			o = s.option,
			$banner = s.$banner,
			$list = s.$list,
			$item = $list.children();

		// 单张图片时不使用任何动画
		if (s.len === 1) {
			$banner.find('.tb-arrow, .tb-btn').hide();
			return;
		}

		if (o.animation === 'slide') {
			s.animation = function() {
				var slidToLeft = true;

				if (s.currentIndex === s.latestIndex) return;

				if (s.currentIndex < s.latestIndex) {
					slidToLeft = false;
				}

				if (slidToLeft === false) {
					$list.css('left', '-100%');
				}

				$item.eq(s.currentIndex + 1).show();

				if (Util.IS_SUPPORT_TRANSITION) {
					setTimeout(function() {
						s.isAnimated = true;

						var listTransform = slidToLeft ?
							'translate3d(' + -$item.width() + 'px, 0, 0)' :
							'translate3d(' + $item.width() + 'px, 0, 0)';

						$list.css(Util.TRANSFORM, listTransform);

						setTimeout(slideCallback, o.speed - 50);
					}, 50);
				} else {
					s.isAnimated = true;

					$list.animate({
						left: slidToLeft? '-100%' : 0
					}, o.speed, slideCallback);
				}

				s.btnActive();
			};
		}
		
		if (o.animation === 'flash' || o.animation === 'fade') {
			s.animation = function() {
				handleCurrentIndex();

				s.isAnimated = true;

				$list.css('left', -s.currentIndex * 100 + '%');

				if (Util.IS_SUPPORT_TRANSITION) {
					$item.eq(s.currentIndex).css('opacity', 1);	
					setTimeout(fadeCallback, o.speed);	
				} else {
					$item.eq(s.currentIndex).animate({ opacity: 1 }, {
						speed: o.speed * 0.8,
						complete: fadeCallback
					});
				}

				s.btnActive();
			};
		}

		if (o.animation === 'none') {
			s.animation = function() {
				handleCurrentIndex();

				$item.eq(s.currentIndex).show().siblings().hide();
				$item.eq(s.currentIndex).addClass('active').siblings().removeClass('active');

				s.btnActive();

				afterCallback();
			};
		}

		function afterCallback() {
			o.after.call(s, s.currentIndex);
		}

		// 处理可能会超出范围的索引
		function handleCurrentIndex() {
			s.currentIndex =
			s.currentIndex === s.len ? 0 :
			s.currentIndex === -1 ? s.len - 1 : s.currentIndex;
		}

		function slideCallback() {
			s.isAnimated = false;

			s.latestIndex =
			s.currentIndex =
			s.currentIndex === -1 ? s.len - 1 :
			s.currentIndex === s.len ? 0 : s.currentIndex;

			$list.css({
				left: 0,
				transition: 'none'
			});

			$list.css(Util.TRANSFORM, 'translate3d(0, 0, 0)');

			$item.eq(s.currentIndex + 1).show().siblings().hide();
			$item.eq(s.currentIndex + 1).addClass('active').siblings().removeClass('active');

			setTimeout(function() {
				$list.css('transition', 'transform ' + o.speed + 'ms');
			}, 50);

			afterCallback();

			if (s.useAuto && !s.isHovered) {
				s.setPlayTimer();
			}
		}

		function fadeCallback() {
			s.isAnimated = false;

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
		}
	};


	/**
	 * 绑定事件
	 */
	Banner.prototype.touch = function() {
		var s = this,
			o = s.option,
			$banner = s.$banner,
			$list = s.$list,
			$item = $list.children(),
			transform = Util.TRANSFORM,
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
			var offset = $list.attr('style').match(/translate3d\((-?\d+)px/);
			if (offset) return parseInt(offset[1]);
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
			if (s.isAnimated) return;

			s.touching = true;

			touch = e.touches[0];
			touchStartTime = Date.now();
			touchStartX = touch.pageX;
			touchStartY = touch.pageY;

			listOffset = getListOffset();
		}

		function touchMove (e) {
			if (s.isAnimated) return;

			touch = e.touches[0];
			touchRangeX = touch.pageX - touchStartX;
			touchRangeY = touch.pageY - touchStartY;

			// 触摸水平滑动距离 小于 触摸垂直滑动距离时不执行滑动动画
			if (Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

			e.preventDefault();

			if (touchRangeX < 0) {
				touchDirection = 'left';
			} else if (touchRangeX > 0) {
				touchDirection = 'right';
			}

			$list.css(transform, 'translate3d(' + (listOffset + touchRangeX) + 'px, 0, 0)');
		}

		function touchEnd (e) {
			if (s.isAnimated || !touchRangeX || Math.abs(touchRangeX) < Math.abs(touchRangeY)) return;

			s.isAnimated = true;

			touchDuration = Date.now() - touchStartTime;

			// 触摸停留时间小于300ms 或者
			// 触摸水平距离超过轮播宽度的一半时切换到下一个元素
			if (touchDuration < 300 || Math.abs(touchRangeX) >= $item.width() / 2) {
				o.before.call(s, s.currentIndex);
				
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

				listOffset = getListOffset();

				s.lazyload(s.currentIndex);

				s.btnActive();
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
				s.isAnimated = false;
				s.touching = false;

				o.after.call(s, s.currentIndex);
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
			if (Util.IS_MOBILE && !s.touching) {
				$item.width($banner.width());
				$item.height($banner.height());
				$list.width($item.width() * (s.len + 2));
				$list.css(Util.TRANSFORM, 'translate3d(' + -$item.width() * (s.currentIndex + 1) + 'px, 0, 0)');

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
			$banner = s.$banner,
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

						if (Util.IS_MOBILE) {
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

						if (Util.IS_MOBILE) {
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
					'<img src="' + Util.LOADING_IMAGE + '">' +
				'</div>';

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
		this.animation();
		this.lazyload(this.currentIndex);
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
			s.option.before.call(s, s.currentIndex);
			s.currentIndex++;
			s.play();
		}, s.option.auto);

		s.$banner.off('mouseenter.terseBanner');
		s.$banner.off('mouseleave.terseBanner');
		s.$banner.on({
			'mouseenter.terseBanner': clear,
			'mouseleave.terseBanner': reset
		});
	};

	// 指示按钮或缩略图添加高亮样式
	Banner.prototype.btnActive = function() {
		if (!this.option.btn) return;

		var s = this;

		s.activeIndex =
		s.currentIndex === s.len ? 0 :
		s.currentIndex === -1 ? s.len - 1 : s.currentIndex;

		s.$btn.eq(s.activeIndex).addClass('active').siblings().removeClass('active');
	};

	// 切换轮播图片
	Banner.prototype.playTo = function(targetIndex) {
		var s = this;

		// 正在执行的动画不可中断，动画执行时进行的切换操作无效
		if (s.isAnimated) return;

		// 使用自定义方法切换时，检测传入的目标索引是否溢出
		if ($.isNumeric(targetIndex) && (targetIndex < 0 || targetIndex > s.len)) {
			throw new Error('terseBanner\'s index overflow!');
		}

		s.option.before.call(s, s.currentIndex);

		switch (targetIndex) {
			case 'prev':
				if(!Util.IS_MOBILE) {
					s.currentIndex--;
					s.play();
				} else {
					s.slidePrev();
				}
				break;

			case 'next':
				if(!Util.IS_MOBILE) {
					s.currentIndex++;
					s.play();
				} else {
					s.slideNext();
				}
				break;

			default:
				if(!Util.IS_MOBILE) {
					s.currentIndex = targetIndex;
					s.play();
				}
				break;
		}
	};


	$.fn.terseBanner = function(opt) {
		if (Util.IS_LTIE8) {
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
		animation  : 'slide', // 动画模式: ['slide', 'fade', 'flash', 'none']
		adaptive   : false,   // 图片宽度自适应
		arrow      : false,   // 切换箭头
		btn        : true,    // 指示按钮(在移动端中不可点击)
		auto       : 5000,    // 自动轮播的间隔(毫秒数，为0时禁用此功能)
		speed      : 800,     // 动画速度
		thumbWidth : 0,       // 缩略图宽度
		thumbHeight: 0,       // 缩略图高度
		init       : $.noop,  // 初始化完时执行的回调函数
		before     : $.noop,  // 动画开始时执行的回调函数
		after      : $.noop,  // 动画完成时执行的回调函数
	};

}));
