/**
 * jquery.easyBanner.js
 * @author    HappyFreeLife
 * @version   1.1.3
 * @url       https://github.com/happyfreelife/easyBanner/
 */

;(function ($, window, document, undefined) {
    $.easyBanner = {};

    $.easyBanner.defaults = {
        animation: 'slide',    // 动画模式: ['slide', 'fade']
        trigger  : 'click',    // 触发动画的事件类型: ['click', 'hover']
        direction: 'x',        // 滑动方向: ['x', 'y'](只适用于'slide'动画模式)
        arrowBtn : true,       // 左右箭头按钮
        serialBtn: true,       // 序列按钮
        lazyLoad : false,      // 图片预加载
        auto     : true,       // 自动轮播
        speed    : 800,        // 动画速度
        interval : 5000        // 自动轮播间隔
    };

    /**
     * 脚本加载器
     * @param  {String}   src      外部脚本路径
     * @param  {Function} callback 脚本加载完成后执行的函数
     */
    $.easyBanner.loadScript = function(src, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;

        if (/msie (6.0|7.0|8.0)/i.test(navigator.userAgent)) {
            script.onreadystatechange = function() {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    callback();
                }
            };
        } else {
            script.onload = callback;
        }

        document.getElementsByTagName('head')[0].appendChild(script);
    }

    /**
     * 样式检测器
     * @param  {String} prop css属性名
     * @param  {String || Array} val  css属性值
     * @return {Boolean}
     */
    $.fn.cssDetecter = function(prop, val) {
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
     * 插件主方法
     * @param  {Object} opt    自定义参数
     * @return {HTMLElement}   调用该方法的元素集合中的每个元素
     */
    $.fn.easyBanner = function(option) {
        var opt = $.extend($.easyBanner.defaults, option || {});

        return this.each(function() {
            var self  = this,
                $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
                $arrowBtn,
                $serialBtn,
                currentIndex = 0,
                horizonal = opt.direction.toLowerCase() === 'x' ? true : false,
                vertical = opt.direction.toLowerCase() === 'y' ? true : false,
                embedCss = '';

            // 判断浏览器是否支持CSS3动画
            var isSupportCss3Transition = 'transition' in document.documentElement.style;

            

            function init() {
                self.hovered = false;

                $list.wrap('<div class="wrap-list">');

                if ($this.cssDetecter('position', 'static')) {
                    $this.css('position', 'relative')
                }

                $('.wrap-list', $this).css({
                    position: 'relative',
                    width   : '100%',
                    height  : '100%',
                    overflow: 'hidden'
                });

                $list.css({
                    position: 'relative',
                    display : 'block',
                    height  : '100%'
                });

                $item.css({
                    display: 'block',
                    width  : $this.width(),
                    height : $this.height()
                });

                if (opt.animation === 'fade') {
                    $('head').append('<style type="text/css">.top-item{z-index: 1;}</style>');
                    $item.css({
                        position: 'absolute',
                        left    : 0,
                        top     : 0
                    });
                    $item.first().show().siblings().hide();
                }

                if (opt.animation === 'slide') {
                    if (isSupportCss3Transition) {
                        embedCss += '.transition-' + opt.speed + '{'
                        +                'transition: all ' + opt.speed + 'ms ease;'
                        +                '-webkit-transition: all ' + opt.speed + 'ms ease;'
                        +            '}\n';

                        setTimeout(function() {
                            $list.addClass('transition-' + opt.speed);
                        }, 10);
                    }

                    if (horizonal) {
                        $list.css({
                            left: 0,
                            width : (len + 1) * 100 + '%'
                        });

                        $item.css({
                            float : 'left',
                            width : $this.css('width')
                        });
                    }

                    if (vertical) {
                        $list.css({
                            'top': 0,
                            height: 'auto'
                        });
                    }
                }
            }

            // 图片转换为背景图片
            function imgToBackground() {
                $item.each(function() {
                    var $img = $(this).find('img');
                    if (opt.lazyLoad && $img.attr('data-src')) {
                        $(this).attr('background-image', $img.attr('data-src'));
                    } else {
                        var imgUrl = $img.attr('src') || $img.attr('data-src'),
                            bgStr = 'url(' + imgUrl + ') no-repeat center top';
                        $(this).css('background', bgStr);
                    }
                    $img.remove();
                });

                opt.lazyLoad ? imgPreLoader(currentIndex) : '';
            }

            function resizeHandler() {
                $(window).resize(function() {
                    $list.children().css('width', $this.css('width'));
                });
            }

            // 图片预加载器(延迟加载)
            function imgPreLoader(loadingItemIndex) {
                // 只能预加载当前图片之后的1张图片
                if (loadingItemIndex - currentIndex > 1) {
                    return false;
                }

                var img = new Image(),
                    $loadingItem = $item.eq(loadingItemIndex),
                    imgSrc = $loadingItem.attr('background-image'),
                    loadNextImg = function() {
                        $loadingItem.removeClass('loading').removeAttr('background-image');
                        loadingItemIndex ? $loadingItem.css('opacity', 0) : '';
                        $loadingItem.css('background', 'url(' + imgSrc + ') no-repeat center top');
                        loadingItemIndex ? $loadingItem.animate({ opacity: 1 }, opt.speed / 2) : '';

                        // 预加载下一张图片
                        loadingItemIndex++;
                        imgPreLoader(loadingItemIndex);
                    };

                if (imgSrc) {
                    if (!loadingItemIndex) {
                        // 不对第1张图片设置loading.gif的背景图片
                        $loadingItem.css('background', 'url(' + imgSrc + ') no-repeat center top');
                        $loadingItem.removeAttr('background-image')
                    } else {
                        $loadingItem.addClass('loading');
                    }

                    img.src = imgSrc;

                    // 当前图片加载完成之后预加载下一张图片
                    img.complete ? loadNextImg() : img.onload = loadNextImg;
                } else {
                    // 已经加载过当前图片则直接加载下一张
                    loadingItemIndex++;
                    imgPreLoader(loadingItemIndex);
                }
            }

            function addArrowBtn() {
                $this.append('<div class="btn-arrow">');
                var $arrowBtnWrap = $('.btn-arrow', $this);
                $arrowBtnWrap.append(
                    '<a class="prev" style="float: left;"></a>',
                    '<a class="next" style="float: right;"></a>'
                );
                $arrowBtn = $('a', $arrowBtnWrap);


                if ($arrowBtnWrap.width() === $this.width()) {
                    $arrowBtnWrap.css('width', '96%')
                }

                // 设置arrowBtnWrap的默认位置
                if ($arrowBtnWrap.cssDetecter('top', 'auto') && $arrowBtnWrap.cssDetecter('bottom', 'auto')) {
                    $arrowBtnWrap.css({
                        top: '50%',
                        'margin-top': -$arrowBtn.height() / 2
                    });
                }

                if ($arrowBtnWrap.cssDetecter('left', 'auto') && $arrowBtnWrap.cssDetecter('right', 'auto')) {
                    $arrowBtnWrap.css({
                        left: '50%',
                        'margin-left': -$arrowBtnWrap.width() / 2
                    });
                }


                if ($arrowBtn.cssDetecter('background-image', 'none')) {
                    $('.prev', $arrowBtnWrap).html('&lt;');
                    $('.next', $arrowBtnWrap).html('&gt;');

                    $arrowBtn.css({
                        font: $this.height() * 0.133 + 'px/' + $arrowBtn.height() + 'px SimHei',
                        color: '#fff',
                        'text-align': 'center'
                    });
                }

                // 阻止连续点击箭头按钮时选中
                $arrowBtn.on('selectstart', function(e) {
                    e.preventDefault();
                });

                $arrowBtnWrap.appendTo($this).css({
                    position :'absolute',
                    height: 0,
                    'z-index': 2
                });

                arrowBtnHandler();
            }

            function addSerialBtn() {
                $this.append('<ol class="btn-serial">');
                var $serialBtnList = $('.btn-serial', $this);
                for (var i = 0; i < len; i++) {
                    $serialBtnList.append('<li>');
                }
                $serialBtn = $('li', $serialBtnList);
                

                $serialBtn.css('float', 'left');
                if ($serialBtn.cssDetecter('width', '0px') && $serialBtn.cssDetecter('height', '0px')) {
                    $serialBtn.css({width: '10px', height: '10px'});
                }

                if ($serialBtn.cssDetecter('margin', ['0px', ''])) {
                    $serialBtn.css('margin', '0 5px');
                }

                if ($serialBtn.cssDetecter('background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
                    $serialBtn.cssDetecter('background-image', 'none')) {
                    embedCss += '.btn-serial > *{background-color: #fff;border-radius: 50%;}\n';
                }

                $serialBtn.first().addClass('active');

                if ($('.active', $serialBtnList).cssDetecter('background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
                    $('.active', $serialBtnList).cssDetecter('background-image', 'none')) {
                    embedCss += '.btn-serial > .active{background-color: #ff8000;}\n';
                }

                if ($serialBtnList.cssDetecter('top', 'auto') && $serialBtnList.cssDetecter('bottom', 'auto')) {
                    $serialBtnList.css('bottom', $this.height() / 25);
                }

                if ($serialBtnList.cssDetecter('left', 'auto') && $serialBtnList.cssDetecter('right', 'auto')) {
                    $serialBtnList.css({
                        left: '50%',
                        'margin-left': -$serialBtn.outerWidth(true) * len / 2
                    });
                }

                $serialBtnList.appendTo($this).css({
                    position :'absolute',
                    'z-index': 2
                });
                
                serailBtnHandler();
            }

            function arrowBtnHandler() {
                $arrowBtn.on('click', function() {
                    if ($list.animated) {
                        return;
                    }
                    $(this).hasClass('prev') ? currentIndex-- : currentIndex++;   
                    play();
                });
            }

            function serailBtnHandler() {
                if (opt.trigger === 'click') {
                    $serialBtn.on('click', function() {
                        if ($list.animated) {
                            return;
                        }
                        currentIndex = $(this).index();
                        play();
                    });
                }

                if (opt.trigger === 'hover') {
                    $serialBtn.on({
                        mouseenter: function() {
                            if ($list.animated) {
                                return;
                            }
                            var $self = $(this);

                            // 防止指针快速地经过序列按钮导致动画序列添加过多
                            timer = setTimeout(function(){
                                currentIndex = $self.index();
                                play();
                            }, 100);
                        },

                        mouseleave: function() {
                            clearTimeout(timer);
                        }
                    });
                }
            }

            function fadeAnimation() {
                $list.animated = true;
                currentIndex = currentIndex === len ?  0 : (currentIndex === -1 ? len - 1 : currentIndex);
                $item.removeClass('top-item').eq(currentIndex)
                     .addClass('top-item')
                     .css({display: 'block', opacity: 0})
                     .animate({opacity: 1}, opt.speed, function() {
                         $list.animated = false;
                     });

                setTimeout(function() {
                    $item.eq(currentIndex).siblings().hide();
                }, opt.speed);
                $serialBtn.eq(currentIndex).addClass('active').siblings().removeClass('active');
                imgPreLoader(currentIndex);
            }

            function slideAnimation() {
                var listWidth  = $item.width()* len,
                    listHeight = $item.height() * len,
                    listLeft   = Math.abs(parseInt($list.css('left'))),
                    listTop    = Math.abs(parseInt($list.css('top')));

                if (listWidth === listLeft || listHeight === listTop || currentIndex < 0 || currentIndex > len) {
                    isSupportCss3Transition ? $list.removeClass('transition-' + opt.speed) : '';
                }

                // mirror item show -> trigger first serialBtn
                if (!currentIndex && (listWidth === listLeft || listHeight === listTop)) {
                    horizonal ? $list.css('left', 0) : $list.css('top', 0);
                }

                // first item -> last item
                if (currentIndex < 0) {
                    horizonal ? $list.css('left', -len * 100 + '%') : $list.css('top', -len * 100 + '%');
                    currentIndex = len - 1;
                }

                // last item -> first item
                if (currentIndex > len) {
                    horizonal ? $list.css('left', 0) : $list.css('top', 0);
                    currentIndex = 1;
                }

                // 动画进行时需要清除定时器，防止实际的自动播放间隔与设置的有误差
                clearInterval(self.autoTimer);

                if (isSupportCss3Transition) {
                    setTimeout(function() {
                        $list.animated = true;
                        isSupportCss3Transition ? $list.addClass('transition-' + opt.speed) : '';
                        horizonal ? $list.css('left', -currentIndex * 100 + '%') : $list.css('top', -currentIndex * 100 + '%');

                        setTimeout(function() {
                            $list.animated = false;
                            opt.auto && !self.hovered ? addAutoTimer() : '';
                        }, opt.speed);
                    }, 10);
                } else {
                    $list.animated = true;
                    if (horizonal) {
                        $list.stop(true, false).animate({ left: -currentIndex * 100 + '%' }, opt.speed, function() {
                            $list.animated = false;
                            opt.auto && !self.hovered ? addAutoTimer() : '';
                        })
                    } else {
                        $list.stop(true, false).animate({ top: -currentIndex * 100 + '%' }, opt.speed, function() {
                            $list.animated = false;
                            opt.auto && !self.hovered ? addAutoTimer() : '';
                        });
                    }
                }

                if (opt.serialBtn) {
                    var activeIndex = currentIndex === len ? 0 : (currentIndex === -1 ? len - 1 : currentIndex);
                    $serialBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');
                }

                imgPreLoader(currentIndex);
            }

            function play() {
                opt.animation === 'fade' ? fadeAnimation() : slideAnimation();
            };

            function auto() {
                addAutoTimer();
                $this.hover(function() {
                    self.hovered = true;
                    clearInterval(self.autoTimer);
                }, function() {
                    self.hovered = false;
                    !$list.animated ? addAutoTimer() : '';
                });
            }

            function addAutoTimer() {
                clearInterval(self.autoTimer);
                self.autoTimer = setInterval(function() {
                    currentIndex++;
                    play();
                }, opt.interval);    
            }

            function run() {
                init();
                imgToBackground();
                resizeHandler();

                if (len <= 1) {
                    return;
                }
                if (opt.animation === 'slide') {
                    $item.first().clone().appendTo($list);
                }
                if (opt.serialBtn) {
                    addSerialBtn();
                }
                if (opt.arrowBtn) {
                    addArrowBtn();
                }
                $('head').append('<style type="text/css">' + embedCss + '</style>');
                if (opt.auto) {
                    auto();
                }

            }

            run();
        });
    };
})(jQuery, window, document);
