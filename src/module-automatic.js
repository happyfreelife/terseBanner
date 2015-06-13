/**
 * easyBanner module - automatic
 * @require    jquery.easyBanner.js
 */

;(function ($, window, document, undefined) {
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

    E.automatic = {
        /**
         * 
         */
        arrowBtnWrapWidth: function () {
            // if ($(this).width() === E.banner.width()) {
                // $(this).css('width', '96%');
            // }
            console.log($(this).css('top'));
        },

        /**
         * 主容器自动设置定位
         */
        containerPosition: function() {
            // if ($(this).cssDetector('position', 'static')) {
                // $(this).css('position', 'relative');
            // }
            console.log($(this));
        }
    };



    // $.fn.hello = function () {
    //     console.log(hello);
    // }
    
    

    


    /**
     * 
     */
    // $.fn.arrowBtnWrapPosition = function() {
    //     if ($(this).cssDetector('top', 'auto') && $(this).cssDetector('bottom', 'auto')) {
    //         $(this).css({
    //             top : '50%',
    //             'margin-top': -$(this).height() / 2
    //         });
    //     }

    //     if ($(this).cssDetector('left', 'auto') && $(this).cssDetector('right', 'auto')) {
    //         $(this).css('margin-left', (E.banner.width() - $(this).width()) / E.banner.width() / 2 * 100 + '%');
    //     }
    // };

    // /**
    //  * 
    //  */
    // $.fn.arrowBtnBackground = function() {
    //     if ($(this).cssDetector('background-image', 'none')) {
    //         $('.prev', E.banner.$arrowBtnWrap).html('&lt;');
    //         $('.next', E.banner.$arrowBtnWrap).html('&gt;');

    //         $(this).css({
    //             'line-height': $(this).height() + 'px',
    //             'font-size'  : E.banner.height() * 0.133 + 'px',
    //             'font-family': 'SimHei',
    //             'text-align' : 'center',
    //             'user-select': 'none',
    //             cursor       : 'pointer',
    //             color        : '#fff'
    //         });
    //     }
    // };

    /**
     * 
     */
    $.fn.sd = function() {
        
    };
})(jQuery, window, document);
