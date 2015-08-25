
$(function() {
    /********** highlight **********/ 
    try {
        Array.prototype.forEach = function(callback, thisArg) {
            for (var i = 0, len = this.length; i < len; i++) {
                if (typeof callback === 'function') {
                    callback.call(thisArg, this[i], i, this);
                }
            }
        };
        
        hljs.configure({tabReplace: '    '});
        hljs.initHighlightingOnLoad();
        
        $('pre code').each(function() {
            $(this).text($(this).text().replace('\n', ''));
        
            var lines = $(this).text().split('\n').length - 1,
                $lineNumber = $('<div/>').addClass('line-number');
            
            for (i = 1; i <= lines; i++) {
                $lineNumber.append($('<a/>').text(i));
            }
            $(this).parent().append($lineNumber);
        });
    } catch (e) {

    }

    /********** tab **********/ 
    $('.tab ul li').click(function() {
        $(this).addClass('active').siblings().removeClass();
        $(this).parent().next().children().eq($(this).index()).show().siblings().hide();
    });


    /********** banner-index **********/ 
    $('.banner-index').easyBanner({
        arrow: false
    });


    /********** banner-automatic **********/ 
    $('.banner-automatic').easyBanner();

    $('.banner-fade').easyBanner({
        animation: 'fade'
    });

    $('.banner-custom').easyBanner({});

    $('.banner-serial').easyBanner({
        arrow: false,
        serial: 'equal'
    });
});