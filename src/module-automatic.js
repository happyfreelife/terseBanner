/**
 * easyBanner module - automatic
 * @require    jquery.easyBanner.js
 */

;(function ($, window, document, undefined) {
    window.moduleFlag = 'automatic';
    
    var E = $.easyBanner;

    /**
     * 样式检测器
     * @param  {String} prop css属性名
     * @param  {String || Array} val  css属性值
     * @return {Boolean}
     */
    $.fn.cssDetector = function(prop, val) {
        if ($.isArray(val)) {
            for (var i in val) {
                if ($(this).css(prop) === val[i]) {
                    return true;
                }
            }
            return false;
        }
        return $(this).css(prop) === val;
    };

    

    /**
     * 
     */
    $.fn.sd = function() {
        
    };
})(jQuery, window, document);
