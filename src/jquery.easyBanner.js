// 延迟加载，预加载----基本完成,需要在加载图片时清除定时器
// animate, transition动画进行过程中需要清除定时器
// fade样式也可以使用css3 transition效果
// fade测试
// 滑动方向改为4种,多方向测试
// 在banner的容器上指定一个class自动进行调用
// 样式漏加保护
// 列表外层需要套上容器
// live方法改为on方法



;(function ($, window, document, undefined) {
    $.fn.easyBanner = function(newOption) {
        var option = $.extend({
            animation     : 'slide',  // 轮播动画: 'slide', 'fade'
            triggerEvent  : 'click',  // 触发切换的事件类型: 'click', 'hover'
            direction     : 'left',   // 滑动方向: 'left', 'right', 'top', 'bottom'
            showNavArrow  : true,     // 显示手动切换按钮: true, false
            showControlBtn: true,     // 显示控制按钮:true, false
            speed         : 500,      // 动画的速度
            lazyLoad      : false,    // 图片延迟加载:true, false
            autoPlay      : true,     // 自动轮播:true, false
            interval      : 4000      // 自动轮播间隔
        }, newOption);

        return this.each(function() {
            var self  = this,
                $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
                $controlBtn,
                currentIndex = 0,
                horizonal = option.direction === 'left' || option.direction === 'right' ? true : false,
                vertical  = option.direction === 'top' || option.direction === 'bottom' ? true : false;

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
                $list.css('position', 'relative');
                $item.css('height', $this.height());

                if (option.animation === 'slide') {
                    if (horizonal) {
                        $list.css({
                            left: 0,
                            width : (len + 1) * 100 + '%',
                            height: '100%'
                        });

                        $item.css({
                            float : 'left',
                            width : 1 / (len + 1) * 100 + '%',
                            height: '100%'
                        });
                    } else {
                        $list.css('top', 0);
                    }
                }

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
            };

            // 图片转换为背景图片
            var imgToBackgroundImage = function() {
                $item.each(function() {
                    var $img = $(this).find('img');
                    if (option.lazyLoad) {
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
                        // console.log('loaded');
                        
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

            var windowResizeHandler = function() {
                $(window).resize(function() {
                    if($(window).width() <= $this.width()) {
                        $list.removeClass('transition-animation').css('left', - currentIndex * $(window).width());
                        setTimeout(function() {
                            $list.addClass('transition-animation');
                        }, 10);
                    }
                });  
            };

            var addControlBtn = function() {
                var $controlBtnList = $('<dl class="btn-control"></dl>');
                for (var i = 0; i < len; i++) {
                    $controlBtnList.append($('<dd></dd>'));
                }
                $this.append($controlBtnList);
                $controlBtnList.children(':first').addClass('active');

                // 控制按钮没有添加样式，则设置为居中
                if ( 
                    ($controlBtnList.css('left') === 'auto' && $controlBtnList.css('right') === 'auto')
                    ||
                    !(parseInt($controlBtnList.css('left')) && parseInt($controlBtnList.css('right')))
                ) {
                    $controlBtnList.css({
                        left: '50%',
                        'margin-left': - $controlBtnList.width() / 2
                    });
                }
                $controlBtn = $('.btn-control dd', $this);
                option.triggerEvent === 'click'? controlBtnClickHandler() : controlBtnHoverHandler();
            };

            var addNavArrow = function() {
                var $prev = $('<a href="javascript:" class="nav-arrow prev"></a>');
                var $next = $('<a href="javascript:" class="nav-arrow next"></a>');
                $this.append($prev, $next);
                $('.nav-arrow').css({
                    top: '50%',
                    'margin-top': - $('.nav-arrow').height() / 2
                });
                $prevNavArrow = $('.nav-arrow.prev', $this);
                $nextNavArrow = $('.nav-arrow.next', $this);
                navArrowHandler();
            };

            var mirrorItem = function() {
                $item.first().clone().appendTo($list);
            };

            var showFirstItem = function() {
                $item.css({
                    position: 'absolute',
                    left    : 0,
                    top     : 0
                });
                $item.first().show().siblings().hide();
            };

            var fadeAnimation = function() {
                currentIndex = currentIndex === len ?  0 :
                                    currentIndex === -1 ? len - 1 : currentIndex;
                $item.stop(true, true).eq(currentIndex).fadeIn(option.speed).siblings().fadeOut(option.speed);
                $controlBtn.eq(currentIndex).addClass('active').siblings().removeClass('active');
                imgLazyLoader(currentIndex);
            };

            var slideAnimation = function() {
                var itemWidth = $item.width(),
                    itemHeight = $item.height();
                console.log(currentIndex);
                if (
                    - itemWidth * len === parseInt($list.css('left')) ||
                    - itemHeight * len === parseInt($list.css('top')) ||
                    currentIndex < 0 ||
                    currentIndex > len
                ) {
                    supportTransition ? $list.removeClass('transition-animation') : '';
                }

                // mirror item show -> trigger first controlBtn
                if (
                    !currentIndex && 
                    (- itemWidth * len === parseInt($list.css('left')) || - itemHeight * len === parseInt($list.css('top')))
                ) {
                    horizonal ? $list.css('left', 0) : $list.css('top', 0);
                }

                // first item -> last item
                if (currentIndex < 0) {
                    horizonal ? $list.css('left', - itemWidth * len) : $list.css('top', - itemHeight * len);
                    currentIndex = len - 1;
                }

                // last item -> first item
                if (currentIndex > len) {
                    horizonal ? $list.css('left', 0) : $list.css('top', 0);
                    currentIndex = 1;
                }

                if (supportTransition) {
                    setTimeout(function() {
                        $list.addClass('transition-animation').css(
                            horizonal ? 'left' : 'top',
                            - currentIndex * (horizonal ? itemWidth : itemHeight)
                        );
                    }, 10);
                } else {
                    horizonal ?
                        $list.stop(true, false).animate({ left: - currentIndex * itemWidth }, option.speed)
                    :
                        $list.stop(true, false).animate({ top: - currentIndex * itemHeight }, option.speed);

                }
                imgLazyLoader(currentIndex);
            };

            var activeControlBtn = function() {
                var activeIndex = currentIndex === len ? 0 :
                    currentIndex === -1 ? len - 1 : currentIndex;
                $controlBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');
            };

            var bannerPlay = function() {
                if (option.animation === 'fade') {
                    showFirstItem();
                    fadeAnimation();
                } else {
                    slideAnimation();
                    activeControlBtn();
                }
            };

            var navArrowHandler = function() {
                $prevNavArrow.live('click', function() {
                    currentIndex--;
                    bannerPlay();
                });

                $nextNavArrow.live('click', function() {
                    currentIndex++;
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
                horizonal ? windowResizeHandler() : '';
                if (len <= 1) {
                    return false;
                }
                option.animation === 'slide' ? mirrorItem() : '';
                option.showNavArrow ? addNavArrow() : '';
                option.showControlBtn ? addControlBtn() : '';
                option.autoPlay ? autoPlay() : '';
            };

            run();
        });
    };
})(jQuery, window, document);
