/**
 * jquery.easyBanner.js
 * @author    HappyFreeLife
 * @version   1.0.9
 * @url       https://github.com/happyfreelife/easyBanner/
 */

;(function ($, window, document, undefined) {
    var autoCallMain = true;

    $.fn.easyBanner = function(newOption) {
        autoCallMain = false;

        var option = $.extend({
            animation    : 'slide',     // 轮播动画: 'slide', 'fade'
            triggerEvent : 'click',     // 触发切换的事件类型: 'click', 'hover'
            direction    : 'horizonal', // 滑动方向: 'horizonal', 'vertical'
            navArrow     : true,        // 手动切换按钮
            controlBtn   : true,        // 控制按钮
            controlBtnNum: true,        // 控制按钮数字
            lazyLoad     : false,       // 图片延迟加载
            autoPlay     : true,        // 自动轮播
            speed        : 500,         // 动画的速度
            interval     : 4000         // 自动播放间隔
        }, newOption);

        return this.each(function() {
            var self  = this,
                $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
                $navArrow,
                $controlBtn,
                currentIndex = 0,
                horizonal = option.direction === 'horizonal' ? true : false,
                vertical = option.direction === 'vertical' ? true : false;

            // 判断浏览器是否支持CSS3的transition属性
            var supportTransition = function() {  
                var i,
                    prefix = ['webkit', 'Moz', 'ms', 'o'],  
                    htmlStyle = document.documentElement.style,
                    humpStyleArr = [],  
                    toHumpStyle = function (string) {  
                        return string.replace(/-(\w)/g, function ($0, $1) {  
                            return $1.toUpperCase();  
                        });  
                    };  
                   
                for (i in prefix) {
                    humpStyleArr.push(toHumpStyle(prefix[i] + '-transition'));
                }
                humpStyleArr.push(toHumpStyle('transition'));  
                   
                for (i in humpStyleArr) {
                    if (humpStyleArr[i] in htmlStyle) {
                        return true
                    }; 
                }
                return false;  
            }();

            var init = function() {
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

                if (option.animation === 'fade') {
                    $('head').append('<style type="text/css">.top-item{z-index: 1;}</style>');
                    $item.css({
                        position: 'absolute',
                        left    : 0,
                        top     : 0
                    });
                    $item.first().show().siblings().hide();
                }

                if (option.animation === 'slide') {
                    if (supportTransition) {
                        $('head').append(
                            '<style type="text/css">' +
                                '.transition-' + option.speed + '{' +
                                    'transition: all ' + option.speed + 'ms ease;' +
                                    '-webkit-transition: all ' + option.speed + 'ms ease' +
                                    '-moz-transition: all ' + option.speed + 'ms ease' +
                                    '-o-transition: all ' + option.speed + 'ms ease' +
                                '};' +
                            '</style>'
                        );

                        setTimeout(function() {
                            $list.addClass('transition-' + option.speed);
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
            };

            // 图片转换为背景图片
            var imgToBackgroundImage = function() {
                $item.each(function() {
                    var $img = $(this).find('img');
                    if (option.lazyLoad && $img.attr('data-src')) {
                        $(this).attr('background-image', $img.attr('data-src'));
                    } else {
                        var imgUrl = $img.attr('src') || $img.attr('data-src'),
                            bgStr = 'url(' + imgUrl + ') no-repeat center top';
                        $(this).css('background', bgStr);
                    }
                    $img.remove();
                });

                option.lazyLoad ? imgLazyLoader(currentIndex) : '';
            };

            var resizeHandler = function() {
                $(window).resize(function() {
                    $list.children().css('width', $this.css('width'));
                });
            };
            // 背景图片延迟加载器
            var imgLazyLoader = function(loadingItemIndex) {
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
                        loadingItemIndex ? $loadingItem.animate({ opacity: 1 }, option.speed / 2) : '';

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
            };

            var addNavArrow = function() {
                $this.append($('<dl class="nav-arrow"></dl>'));
                var $navArrowList = $('.nav-arrow', $this);
                $navArrowList.width() === $this.width() ? $navArrowList.css('width', '100%') : '';

                $navArrowList.append(
                    $('<dd class="prev" style="float: left;"></dd>'),
                    $('<dd class="next" style="float: right;"></dd>')
                );
                $navArrow = $('dd', $navArrowList);

                // 设置navArrowList的默认位置
                if ($navArrowList.css('left') === 'auto' && $navArrowList.css('right') === 'auto') {
                    $navArrowList.css({
                        left: '50%',
                        'margin-left': -($navArrowList.width() / $this.width() / 2).toFixed(2) * 100 + '%'
                    });
                }

                if ($navArrowList.css('top') === 'auto' && $navArrowList.css('bottom') === 'auto') {
                    $navArrowList.css({
                        top: '50%',
                        'margin-top': -$navArrow.height() / 2
                    });
                }

                $navArrowList.appendTo($this).css({
                    position :'absolute',
                    'z-index': 2
                });

                navArrowHandler();
            };

            var addControlBtn = function() {
                $this.append($('<ol class="btn-control"></ol>'));
                var $controlBtnList = $('.btn-control', $this);
                for (var i = 0; i < len; i++) {
                    $controlBtnList.append($('<li></li>'));
                }
                $controlBtn = $('li', $controlBtnList);

                // 设置controlBtnList的默认位置
                if ($controlBtnList.css('left') === 'auto' && $controlBtnList.css('right') === 'auto') {
                    $controlBtnList.css({
                        left: '50%',
                        'margin-left': -$controlBtn.outerWidth(true) * len / 2
                    });
                }

                if ($controlBtnList.css('top') === 'auto' && $controlBtnList.css('bottom') === 'auto') {
                    $controlBtnList.css('bottom', $this.height() / 25);
                }

                $controlBtnList.appendTo($this).css({
                    position :'absolute',
                    'z-index': 2
                }).children(':first').addClass('active');

                $controlBtn.css('float', 'left');

                if (option.triggerEvent === 'click') {
                    controlBtnClickHandler();
                } else if (option.triggerEvent === 'hover') {
                    controlBtnHoverHandler();
                }
            };

            var navArrowHandler = function() {
                $navArrow.on('click', function() {
                    if (option.animation === 'fade' && $item.is(':animated')) {
                        return false;
                    }
                    $(this).hasClass('prev') ? currentIndex-- : currentIndex++;   
                    play();
                });
            };

            var controlBtnClickHandler = function() {
                $controlBtn.on('click', function() {
                    currentIndex = $(this).index();
                    play();
                });
            };

            var controlBtnHoverHandler = function() {
                $controlBtn.on({
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
            };

            var fadeAnimation = function() {
                currentIndex = currentIndex === len ?  0 : (currentIndex === -1 ? len - 1 : currentIndex);
                $item.removeClass('top-item').eq(currentIndex).addClass('top-item').fadeIn(option.speed);
                setTimeout(function() {
                    $item.eq(currentIndex).siblings().hide();
                }, option.speed);
                $controlBtn.eq(currentIndex).addClass('active').siblings().removeClass('active');
                imgLazyLoader(currentIndex);
            };

            var slideAnimation = function() {
                var listWidth  = $item.width()* len,
                    listHeight = $item.height() * len,
                    listLeft   = Math.abs(parseInt($list.css('left'))),
                    listTop    = Math.abs(parseInt($list.css('top')));

                if (listWidth === listLeft || listHeight === listTop || currentIndex < 0 || currentIndex > len) {
                    supportTransition ? $list.removeClass('transition-' + option.speed) : '';
                }

                // mirror item show -> trigger first controlBtn
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

                if (supportTransition) {
                    setTimeout(function() {
                        self.animated = true;
                        supportTransition ? $list.addClass('transition-' + option.speed) : '';
                        horizonal ? $list.css('left', -currentIndex * 100 + '%') : $list.css('top', -currentIndex * 100 + '%');

                        setTimeout(function() {
                            self.animated = false;
                            !self.hovered ? addAutoTimer() : '';
                        }, option.speed);
                    }, 10);
                } else {
                    self.animated = true;
                    if (horizonal) {
                        $list.stop(true, false).animate({ left: -currentIndex * 100 + '%' }, option.speed, function() {
                            self.animated = false;
                            !self.hovered ? addAutoTimer() : '';
                        })
                    } else {
                        $list.stop(true, false).animate({ top: -currentIndex * 100 + '%' }, option.speed, function() {
                            self.animated = false;
                            !self.hovered ? addAutoTimer() : '';
                        });
                    }
                }

                var activeIndex = currentIndex === len ? 0 : (currentIndex === -1 ? len - 1 : currentIndex);
                $controlBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');

                imgLazyLoader(currentIndex);
            };

            var play = function() {
                option.animation === 'fade' ? fadeAnimation() : slideAnimation();
            };

            var autoPlay = function() {
                addAutoTimer();
                $this.hover(function() {
                    self.hovered = true;
                    clearInterval(self.autoTimer);
                }, function() {
                    self.hovered = false;
                    !self.animated ? addAutoTimer() : '';
                });
            };

            var addAutoTimer = function() {
                clearInterval(self.autoTimer);
                self.autoTimer = setInterval(function() {
                    currentIndex++;
                    play();
                }, option.interval);    
            };

            var run = function() {
                init();
                imgToBackgroundImage();
                resizeHandler();
                if (len <= 1) {
                    return false;
                }
                if (option.animation === 'slide') {
                    $item.first().clone().appendTo($list);
                }
                option.navArrow ? addNavArrow() : '';
                option.controlBtn ? addControlBtn() : '';
                option.autoPlay ? autoPlay() : '';
            };

            run();
        });
    };

    $(function () {
        if ($('.easy-banner').length && autoCallMain) {
            $('.easy-banner').easyBanner();
        }
    });
})(jQuery, window, document);
