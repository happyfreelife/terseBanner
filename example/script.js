
$(function() {
    /********** highlight **********/
    try {
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


    /********** index **********/
    $('.banner-index').easyBanner({
        arrow: false
    });


    /********** automatic **********/
    $('.banner-automatic').easyBanner();

    $('.banner-fade').easyBanner({
        animation: 'fade'
    });

    $('.banner-custom').easyBanner({});

    $('.banner-serial').easyBanner({
        arrow: false,
        serial: 'equal'
    });

    /********** lazyload **********/
    $('.banner-lazyload').easyBanner();

    var srcArr = [
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071138745.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071099354.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071110559.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071116913.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071120363.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071125484.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071130451.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071142741.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071148146.jpg",
        "http://b.zol-img.com.cn/desk/bizhi/image/5/1024x768/1417071153591.jpg",
    ];
    var $item, log = '';

    $('.overlay .click').click(function() {
        $('.overlay ').css('background', 'none');
        $(this).addClass('retest').text('Retest');

        $('.banner-test').empty().append('<ul/>');
        for (var i = 0, len = srcArr.length; i < len; i++) {
            $('.banner-test ul').append('<li><img data-src="' + srcArr[i] + '?cache=' + Math.random() + '"></li>');
        }
        $item = $('.banner-test ul li');
        
        $('.banner-test').easyBanner();

        timer = setInterval(function() {
            log = '';

            $item.each(function() {
                if ($(this).hasClass('loading')) {
                    log += '<p class="loading">' + ($(this).index() + 1) + 'th image is loading</p>';
                } else if ($(this).hasClass('loaded')) {
                    log += '<p class="loaded">' + ($(this).index() + 1) + 'th image was loaded</p>';
                } else {
                    if (!$(this).index()) {
                        log += '<p class="loading">1th image is loading</p>';
                    }
                    log += '<p>' + ($(this).index() + 1) + 'th image have not send the request</p>';
                }

                $('.console-log').html(log);
            });

            if ($item.filter('[class*="loaded"]').length === $item.length) {
                clearInterval(timer);
            }
        }, 50);
    });

    
    /********** thumbnail **********/
    $('.banner-thumb-auto').easyBanner({
        serial: 'thumb'
    });

    $('.banner-thumb-manual').easyBanner({
        serial: 'thumb'
    });

    $('.banner-thumb-list').easyBanner({
        serial: 'thumb'
    });

    $('.banner-thumb-custom').easyBanner({
        animation: 'fade',
        serial: 'thumb'
    });

});