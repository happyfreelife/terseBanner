// 一行代码调用
// 也可以在banner的容器上指定一个class自动进行调用
// 接入easing效果
// 加入是否循环的判定功能

// 样式漏加保护
// 定时器优化
// 延迟加载，预加载
// 动画进行过程中需要清除定时器
// 无过渡效果
// 添加滑动时淡入淡出的效果  slideFade
// 尝试使用css3 transition效果来切换-----------参考flexSlider

;(function ($, window, document, undefined) {
    $.fn.easyBanner = function(newOption) {
        var option = $.extend({
            animation     : 'slide',  // 轮播动画          : 'slide', 'fade'
            triggerEvent  : 'click',  // 触发切换的事件类型: 'click', 'hover'
            showNavArrow  : true,     // 显示手动切换按钮  : true, false
            showControlBtn: true,     // 显示控制按钮      :true, false
            direction     : 'left',    // 滑动方向         : 'left', 'right', 'top', 'bottom'
            fadeSpeed     : 400,      // 淡入淡出的速度
            slideSpeed    : 300,      // 左右滑动的速度
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

            var init = function() {
                $this.css('overflow', 'hidden');
                $this.css('position') === 'static' ? $this.css('position', 'relative') : '';
                $list.css({
                    position: 'relative',
                    height: '100%'
                });

                $item.css({
                    width: $this.width(),
                    height: $this.height()
                });

                if (option.animation === 'slide' && horizonal) {
                    $list.css('width', 100 * (len + 1) + '%');
                    $item.css('float', 'left');
                }
            };

            var setBackground = function() {
                $item.each(function() {
                    var $img = $(this).find('img');
                    var bg = 'url(' + $img.attr('src') + ') no-repeat center top';
                    $(this).css('background', bg);
                    $img.remove();
                });   
            };

            var resetItemWidth = function() {
                $(window).resize(function() {
                    var viewportWidth = $(window).width();
                    if(viewportWidth <= $this.width()) {
                        $list.children().width(viewportWidth);
                        $list.css('left', - currentIndex * viewportWidth);
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
                if ($controlBtnList.css('left') === 'auto' && $controlBtnList.css('right') === 'auto') {
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
                play: function () {
                    $item.css({
                        position: 'absolute',
                        left    : 0,
                        top     : 0
                    });
                    $item.first().show().siblings().hide();

                    currentIndex = currentIndex === len ?  0 :
                        currentIndex === -1 ? len - 1 : currentIndex;
                    $item.stop(true, false).eq(currentIndex).fadeIn(option.fadeSpeed).siblings().fadeOut(option.fadeSpeed);
                    $controlBtn.eq(currentIndex).addClass('active').siblings().removeClass('active');

                    this.clickHandler();
                    this.hoverHandler();
                }
            };

            var slide = {
                horizonalPlay: function() {
                    var itemWidth = $item.width();
                    // -> first item
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
                    $list.stop(true, false).animate({left: - currentIndex * itemWidth}, option.slideSpeed);
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
                    $list.stop(true, false).animate({top: - currentIndex * itemHeight}, option.slideSpeed);
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
                        var $this = $(this);
                        // 防止指针快速地移入移出控制按钮而导致动画序列错乱
                        timer = setTimeout(function(){
                            currentIndex = $this.index();
                            bannerPlay();
                        }, 200);
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
                setBackground();
                resetItemWidth();
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
