 
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
