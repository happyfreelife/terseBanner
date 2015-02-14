// 延迟加载，预加载
// fade样式也可以使用css3 transition效果
// 在banner的容器上指定一个class自动进行调用
// 样式漏加保护
// 动画进行过程中需要清除定时器
// 列表外层需要套上容器
// live方法改为on方法


;(function ($, window, document, undefined) {
    $.fn.easyBanner = function(newOption) {
        var option = $.extend({
            animation     : 'slide',  // 轮播动画          : 'slide', 'fade'
            triggerEvent  : 'click',  // 触发切换的事件类型: 'click', 'hover'
            direction     : 'left',   // 滑动方向         : 'left', 'right', 'top', 'bottom'
            showNavArrow  : true,     // 显示手动切换按钮  : true, false
            showControlBtn: true,     // 显示控制按钮      :true, false
            speed         : 500,      // 动画的速度
            lazyLoad      : true,     // 图片延迟加载:true, false
            autoPlay      : true,     // 自动轮播          :true, false
            interval      : 4000      // 自动切换间隔
        }, newOption);

        return this.each(function() {
            var $this        = $(this),
                $list        = $this.children(),
                $item        = $list.children(),
                len          = $item.length,
                $controlBtn,
                currentIndex = 0,
                horizonal = option.direction === 'left' || option.direction === 'right' ? true : false,
                vertical  = option.direction === 'up' || option.direction === 'down' ? true : false;

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

                // $this.css('position') === 'static' ? $this.css('position', 'relative') : '';
                $list.css({
                    position: 'relative',
                    height: '100%'
                });

                $item.css({
                    width: $this.width(),
                    height: $this.height()
                });

                if (option.animation === 'slide' && horizonal) {
                    $list.css({
                        left: 0,
                        width: (len + 1) * 100 + '%'
                    });

                    $item.css({
                        float: 'left',
                        width: 1 / (len + 1) * 100 + '%'
                    });
                }
            };

            // 图片转换为背景图片
            var imgToBackground = function() {
                $item.each(function() {
                    var $img = $(this).find('img');
                    var bg = 'url(' + $img.attr('src') + ') no-repeat center top';
                    $(this).css('background', bg);
                    $img.remove();
                });   
            };

            var windowResizeHandler = function() {
                $(window).resize(function() {
                    if($(window).width() <= $this.width()) {
                        $list.removeClass('list-transition').css('left', - currentIndex * $(window).width());
                        setTimeout(function() {
                            $list.addClass('list-transition');
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

            var fade = {
                hideItem: function() {
                    $item.css({
                        position: 'absolute',
                        left    : 0,
                        top     : 0
                    });
                    $item.first().show().siblings().hide();
                },

                play: function () {
                    currentIndex = currentIndex === len ?  0 :
                                        currentIndex === -1 ? len - 1 : currentIndex;
                    $item.stop(true, true).eq(currentIndex).fadeIn(option.speed).siblings().fadeOut(option.speed);
                    $controlBtn.eq(currentIndex).addClass('active').siblings().removeClass('active');
                }
            };

            var slide = {
                horizonalPlay: function() {

                    var itemWidth = $item.width();
                    
                    if (
                        - itemWidth * len === parseInt($list.css('left')) ||
                        currentIndex < 0 ||
                        currentIndex > len
                    ) {
                        supportTransition ? $list.removeClass('list-transition') : '';
                    }

                    // current show first item -> trigger first controlBtn
                    if (- itemWidth * len === parseInt($list.css('left'))) {
                        $list.css('left', 0);
                    }

                    // last item -> first item
                    if (currentIndex > len) {
                        $list.css('left', 0);
                        currentIndex = 1;
                    }

                    // first item -> last item
                    if (currentIndex < 0) {
                        $list.css('left', - itemWidth * len);
                        currentIndex = len - 1;
                    }

                    if (supportTransition) {
                        setTimeout(function() {
                            $list.addClass('list-transition').css('left', - currentIndex * itemWidth);
                        }, 10);
                    } else {
                        $list.stop(true, false).animate({left: - currentIndex * itemWidth}, option.speed);
                    }
                },

                verticalPlay: function() {
                    var itemHeight = $item.height();
                    // -> first item
                    if (- itemHeight * len === parseInt($list.css('top'))) {
                        $list.css('top', 0);
                    }

                    // last item -> first item
                    if (currentIndex > len) {
                        $list.css('top', 0);
                        currentIndex = 1;
                    }

                    // first item -> last item
                    if (currentIndex < 0) {
                        $list.css('top', - itemHeight * len);
                        currentIndex = len - 1;
                    }
                    $list.stop(true, false).animate({ top: - currentIndex * itemHeight }, option.speed);
                },

                activeControlBtn: function() {
                    var activeIndex = currentIndex === len ? 0 :
                        currentIndex === -1 ? len - 1 : currentIndex;
                    $controlBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');
                }
            };

            var bannerPlay = function() {
                option.animation === 'fade' ? fade.play() :
                    function() {
                        horizonal ? slide.horizonalPlay() : slide.verticalPlay();
                        slide.activeControlBtn();
                    }();
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
                var self = this;
                autoTimer = setInterval(function () {
                    currentIndex++;
                    bannerPlay();
                }, option.interval);

                $this.hover(function() {
                    clearInterval(autoTimer);
                },function() {
                    autoTimer ? clearInterval(autoTimer) : '';
                    autoTimer = setInterval(function () {
                        currentIndex++;
                        bannerPlay();
                    }, option.interval);
                });
            };

            var run = function() {
                init();
                // 图片转换为背景图片
                imgToBackground();
                windowResizeHandler();

                if (len <= 1) {
                    return false;
                }

                if (supportTransition) {
                    $('head').append(
                        '<style type="text/css">' +
                            '.list-transition{' +
                                'transition: all ' + option.speed + 'ms ease;' +
                                '-webkit-transition: all ' + option.speed + 'ms ease' +
                            '};' +
                        '</style>'
                    );
                    setTimeout(function() {
                        $list.addClass('list-transition');
                    }, 10);
                }

                option.animation === 'slide' ? mirrorItem() : fade.hideItem();
                option.showNavArrow ? addNavArrow() : '';
                option.showControlBtn ? addControlBtn() : '';
                option.autoPlay ? autoPlay() : '';
            };

            run();
        });
    };
})(jQuery, window, document);
