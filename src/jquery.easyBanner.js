// 动画的px改为百分比***********
// live方法改为on方法*************
// fade测试,最后一个切换到第一个有问题*************

// 延迟加载，预加载----基本完成,需要在加载图片时清除定时器
// animate, transition动画进行过程中需要清除定时器
// addNavArrow需要增加位置判断,外层加dl
// controlBtn中写入数字
// 列表外层需要套上容器
// 在banner的容器上指定一个class自动进行调用

;(function ($, window, document, undefined) {
    $.fn.easyBanner = function(newOption) {
        var option = $.extend({
            animation    : 'slide',     // 轮播动画: 'slide', 'fade'
            triggerEvent : 'click',     // 触发切换的事件类型: 'click', 'hover'
            direction    : 'horizonal', // 滑动方向: 'horizonal', 'vertical'
            navArrow     : true,        // 手动切换按钮: true, false
            controlBtn   : true,        // 控制按钮:true, false
            controlBtnNum: true,        // 控制按钮数字:true, false
            lazyLoad     : false,       // 图片延迟加载:true, false
            autoPlay     : true,        // 自动轮播:true, false
            speed        : 500,         // 动画的速度
            interval     : 4000         // 自动轮播间隔
        }, newOption);

        return this.each(function() {
            var self  = this,
                $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
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
                $this.css({
                    position: $this.css('position') === 'static' ? 'relative' : $this.css('position'),
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
                                '.transition-animation{' +
                                    'transition: all ' + option.speed + 'ms ease;' +
                                    '-webkit-transition: all ' + option.speed + 'ms ease' +
                                '};' +
                            '</style>'
                        );

                        setTimeout(function() {
                            $list.addClass('transition-animation');
                        }, 10);
                    }

                    if (horizonal) {
                        $list.css({
                            left: 0,
                            width : (len + 1) * 100 + '%'
                        });

                        $item.css({
                            float : 'left',
                            width : 1 / (len + 1) * 100 + '%'
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
                var $prev = $('<a href="javascript:" class="nav-arrow prev"></a>');
                var $next = $('<a href="javascript:" class="nav-arrow next"></a>');
                $this.append($prev, $next);
                $navArrow = $('.nav-arrow', $this);
                $navArrow.css({
                    top: '50%',
                    'z-index': 2,
                    'margin-top': -$('.nav-arrow').height() / 2
                });
                navArrowHandler();
            };

            var addControlBtn = function() {
                var $controlBtnList = $('<ol class="btn-control"></ol>');
                for (var i = 0; i < len; i++) {
                    $controlBtnList.append($('<li></li>'));
                }
                $controlBtnList.appendTo($this).children(':first').addClass('active');

                $controlBtn = $('.btn-control li', $this);

                $controlBtnList.css({
                    width: $controlBtn.outerWidth(true) * len,
                    'z-index': 2
                });
                
                // 控制按钮的样式没有添加left和right，则默认居中
                var listLeft = $controlBtnList.css('left'),
                    listRight = $controlBtnList.css('right');

                if ((listLeft === 'auto' && listRight === 'auto') || (listLeft === '0px' && listRight === '0px')) {
                    $controlBtnList.css('margin', '0 auto');
                }

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
                    bannerPlay();
                });
            };

            var controlBtnClickHandler = function() {
                $controlBtn.live('click', function() {
                    currentIndex = $(this).index();
                    bannerPlay();
                });
            };

            var controlBtnHoverHandler = function() {
                $controlBtn.live({
                    mouseenter: function() {
                        var $self = $(this);
                        // 防止指针快速地移入移出控制按钮导致动画序列错乱
                        timer = setTimeout(function(){
                            currentIndex = $self.index();
                            bannerPlay();
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
                    supportTransition ? $list.removeClass('transition-animation') : '';
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

                if (supportTransition) {
                    setTimeout(function() {
                        $list.addClass('transition-animation');
                        horizonal ? $list.css('left', -currentIndex * 100 + '%') : $list.css('top', -currentIndex * 100 + '%');
                    }, 10);
                } else {
                    horizonal ?
                        $list.stop(true, false).animate({ left: -currentIndex * 100 + '%' }, option.speed)
                    :
                        $list.stop(true, false).animate({ top: -currentIndex * 100 + '%' }, option.speed);
                }

                var activeIndex = currentIndex === len ? 0 : (currentIndex === -1 ? len - 1 : currentIndex);
                $controlBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');

                imgLazyLoader(currentIndex);
            };


            var bannerPlay = function() {
                option.animation === 'fade' ? fadeAnimation() : slideAnimation();
            };

            var autoPlay = function() {
                autoPlayTimer();
                $this.hover(function() {
                    clearInterval(self.autoTimer);
                }, function() {
                    autoPlayTimer();
                });
            };

            var autoPlayTimer = function() {
                clearInterval(self.autoTimer);
                self.autoTimer = setInterval(function() {
                    currentIndex++;
                    bannerPlay();
                }, option.interval);    
            };

            var run = function() {
                init();
                imgToBackgroundImage();
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
})(jQuery, window, document);
