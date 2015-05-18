/**
 * jquery.easyBanner.js
 * @author    HappyFreeLife
 * @version   1.1.2
 * @url       https://github.com/happyfreelife/easyBanner/
 */

;(function ($, window, document, undefined) {
    var autoCallMain = true;

    $.fn.easyBanner = function(newOpt) {
        autoCallMain = false;

        var opt = $.extend({
            animation: 'slide',    // 轮播动画: 'slide', 'fade'
            trigger  : 'click',    // 触发切换的事件类型: 'click', 'hover'
            direction: 'x',        // 滑动方向: 'x', 'y'
            arrowBtn : true,       // 手动切换按钮
            serialBtn: true,       // 控制按钮
            lazyLoad : false,      // 图片延迟加载
            auto     : true,       // 自动轮播
            speed    : 500,        // 动画的速度
            interval : 5000        // 自动播放间隔
        }, newOpt || {});

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
                vertical = opt.direction.toLowerCase() === 'y' ? true : false;

            // 判断浏览器是否支持CSS3的transition属性
            var isSupportCss3Transition = 'transition' in document.documentElement.style;

            function init() {
                self.hovered = false;

                $list.wrap('<div class="wrap-list"></div>');
                $this.css('position') === 'static' ? $this.css('position', 'relative') : '';

                $('.wrap-list', $this).css({
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                });

                $list.css({
                    position: 'relative',
                    height: '100%'
                });

                $item.css({
                    width: $this.width(),
                    height: $this.height()
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
                        $('head').append(
                            '<style type="text/css">' +
                                '.transition-' + opt.speed + '{' +
                                    'transition: all ' + opt.speed + 'ms ease;' +
                                    '-webkit-transition: all ' + opt.speed + 'ms ease;' +
                                '};' +
                            '</style>'
                        );

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
            function imgToBackgroundImage() {
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

                opt.lazyLoad ? imgLazyLoader(currentIndex) : '';
            }

            function resizeHandler() {
                $(window).resize(function() {
                    $list.children().css('width', $this.css('width'));
                });
            }

            // 背景图片延迟加载器
            function imgLazyLoader(loadingItemIndex) {
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
                        imgLazyLoader(loadingItemIndex);
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
                    imgLazyLoader(loadingItemIndex);
                }
            }

            function addArrowBtn() {
                $this.append('<div class="btn-arrow">');
                var $arrowBtnWrap = $('.btn-arrow', $this);
                if ($arrowBtnWrap.width() === $this.width()) {
                    $arrowBtnWrap.css('width', '100%')
                }

                $arrowBtnWrap.append(
                    $('<a class="prev" style="display: block;float: left;">'),
                    $('<a class="next" style="display: block;float: right;">')
                );
                $arrowBtn = $('a', $arrowBtnWrap);

                // 设置navArrowList的默认位置
                if ($arrowBtnWrap.css('left') === 'auto' && $arrowBtnWrap.css('right') === 'auto') {
                    $arrowBtnWrap.css({
                        left: '50%',
                        'margin-left': -($arrowBtnWrap.width() / $this.width() / 2).toFixed(2) * 100 + '%'
                    });
                }

                if ($arrowBtnWrap.css('top') === 'auto' && $arrowBtnWrap.css('bottom') === 'auto') {
                    $arrowBtnWrap.css({
                        top: '50%',
                        'margin-top': -$arrowBtn.height() / 2
                    });
                }

                $arrowBtnWrap.appendTo($this).css({
                    position :'absolute',
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

                // 设置serialBtnList的默认位置
                if ($serialBtnList.css('left') === 'auto' && $serialBtnList.css('right') === 'auto') {
                    $serialBtnList.css({
                        left: '50%',
                        'margin-left': -$serialBtn.outerWidth(true) * len / 2
                    });
                }

                if ($serialBtnList.css('top') === 'auto' && $serialBtnList.css('bottom') === 'auto') {
                    $serialBtnList.css('bottom', $this.height() / 25);
                }

                $serialBtnList.appendTo($this).css({
                    position :'absolute',
                    'z-index': 2
                }).children(':first').addClass('active');

                $serialBtn.css('float', 'left');

                if (opt.trigger === 'click') {
                    serialBtnClickHandler();
                } else if (opt.trigger === 'hover') {
                    serialBtnHoverHandler();
                }
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

            function serialBtnClickHandler() {
                $serialBtn.on('click', function() {
                    currentIndex = $(this).index();
                    play();
                });
            }

            function serialBtnHoverHandler() {
                $serialBtn.on({
                    mouseenter: function() {
                        var $self = $(this);
                        // 防止指针快速地移入移出控制按钮导致动画序列错乱
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

            function fadeAnimation() {
                currentIndex = currentIndex === len ?  0 : (currentIndex === -1 ? len - 1 : currentIndex);
                $item.removeClass('top-item').eq(currentIndex).addClass('top-item').fadeIn(opt.speed);
                setTimeout(function() {
                    $item.eq(currentIndex).siblings().hide();
                }, opt.speed);
                $serialBtn.eq(currentIndex).addClass('active').siblings().removeClass('active');
                imgLazyLoader(currentIndex);
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

                imgLazyLoader(currentIndex);
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
                imgToBackgroundImage();
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
                if (opt.auto) {
                	auto();
                }
            }

            run();
        });
    };

    $(function () {
        if ($('.easy-banner').length && autoCallMain) {
            $('.easy-banner').easyBanner();
        }
    });
})(jQuery, window, document);
