/**
 * jquery.easyBanner.js
 * @author    HappyFreeLife
 * @version   1.3.1
 * @url       https://github.com/happyfreelife/easyBanner/
 */

 // 判断浏览器是否支持CSS3动画
 window.isSupportTransition = 'transition' in document.documentElement.style;



/****************************************
 ***** module - automatic *****
 ****************************************/
;(function ($, window, document) {
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

    /**
     * 主容器定位
     */
    $.fn.containerPosition = function() {
        if ($(this).cssDetector('position', 'static')) {
            $(this).css('position', 'relative');
        }
    };

    /**
     * 箭头按钮盒模型
     */
    $.fn.arrowBtnWrapperBox = function ($container) {
        if ($(this).width() === $container.width()) {
            $(this).css('width', '96%');
        }
    };

    /**
     * 箭头按钮定位
     */
    $.fn.arrowBtnWrapperPosition = function($container) {
        if ($(this).cssDetector('top', 'auto') && $(this).cssDetector('bottom', 'auto')) {
            $(this).css({
                top : '50%',
                'margin-top': -$(this).height() / 2
            });
        }

        if ($(this).cssDetector('left', 'auto') && $(this).cssDetector('right', 'auto')) {
            $(this).css('margin-left', ($container.width() - $(this).width()) / $container.width() / 2 * 100 + '%');
        }
    };

    /**
     * 箭头按钮背景
     */
    $.fn.arrowBtnBackground = function($container, $arrowBtnWrapper) {
        if ($(this).cssDetector('background-image', 'none')) {
            $('.prev', $arrowBtnWrapper).html('&lt;');
            $('.next', $arrowBtnWrapper).html('&gt;');

            $(this).css({
                'line-height': $(this).height() + 'px',
                'font-size'  : $container.height() * 0.133 + 'px',
                'font-family': 'SimHei',
                'text-align' : 'center',
                'user-select': 'none',
                cursor       : 'pointer',
                color        : '#fff'
            });
        }
    };

    /**
     * 序列按钮盒模型
     */
    $.fn.serialBtnBox = function(param) {
        if (param === 'equal') {
            var len = $(this).length;

            if ($(this).cssDetector('border-right-width', ['0px', 'medium'])) {
                $(this).css('border-right-width', '1px');
            }

            if ($(this).cssDetector('border-right-color', ['#666', 'rgb(102, 102, 102)'])) {
                $(this).css('border-right-color', '#fff');
            }

            if ($(this).cssDetector('border-right-style', 'none')) {
                $(this).css('border-right-style', 'solid');
            }

            if ($(this).cssDetector('height', '0px')) {
                $(this).css('height', '10px');
            }

            $(this).css({
                width: $(this).parent().width() / len - parseInt($(this).css('border-right-width')),
                'border-left': 'none',
                'border-radius': '0'
            });

            $(this).eq(len- 1).css({
                width: $(this).width() + parseInt($(this).css('border-right-width')),
                'border-right-width': '0'
            });

        } else {
            if ($(this).cssDetector('width', '0px') && $(this).cssDetector('height', '0px')) {
                $(this).css({
                    width: '10px',
                    height: '10px'
                });
            }

            if ($(this).cssDetector('margin', ['0px', ''])) {
                $(this).css('margin', '0 5px');
            }
        }
    };
    
    /**
     * 序列按钮背景
     * return [String]    内嵌样式-序列按钮
     */
    $.fn.serialBtnBackground = function() {
        if ($(this).cssDetector('background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
            $(this).cssDetector('background-image', 'none')
        ) {
            return '.btn-serial > *{background-color: #fff;border-radius: 50%;}\n' +
            '.btn-serial > .active{background-color: #ffa500;}\n';
        }
    };
    
    /**
     * 序列按钮列表定位
     */
    $.fn.serialBtnListPosition = function($serialBtn, $container, param) {
        if (param === 'equal') {

        } else {
            if ($(this).cssDetector('top', 'auto') && $(this).cssDetector('bottom', 'auto')) {
                $(this).css('bottom', $container.height() * 0.04);
            }
    
            if ($(this).cssDetector('left', 'auto') && $(this).cssDetector('right', 'auto')) {
                $(this).css({
                    left: '50%',
                    'margin-left': -$serialBtn.outerWidth(true) * $serialBtn.length / 2
                });
            }
        }
    };

    /**
     * 缩略图图片盒模型
     */
    $.fn.thumbImgBox = function($thumb, $container) {
        if (!$thumb.cssDetector('height', '0px')) {
            $(this).height($thumb.height());
        } else {
            var h = $container.height() * 0.125;
            $(this).height(h);
            $thumb.height(h);
        }

        if (!$thumb.cssDetector('width', '0px')) {
            $(this).css({
                position     : 'relative',
                left         : '50%',
                'margin-left': -$(this).outerWidth() / 2
            });
        }
    };

    /**
     * 缩略图外部容器定位
     */
    $.fn.thumbWrapperPosition = function($container, $thumb) {
        if ($(this).cssDetector('top', 'auto') && $(this).cssDetector('bottom', 'auto')) {
            $(this).css('bottom', $container.height() / 25);
        }

        var w = $(this).children().width() < $(this).width() ? $(this).children().width() : $(this).width();

        if (w <= $container.width()) {
            $(this).css('left', (1 - w / $container.width()) / 2 * 100 + '%');
        } else {
            $(this).width('100%');
        }
    };

    /**
     * 添加缩略图列表滚动按钮
     */
    $.fn.addThumbBtn = function() {
        if ($(this).children().width() > $(this).width()) {
            $(this).prepend('<a class="prev disabled"></a>')
            $(this).append('<a class="next"></a>')
            var $thumbBtn = $('a', $(this)),
                $thumbList = $(this).children('ul');
            $thumbBtn.thumbBtnBox($thumbList);
            $thumbBtn.thumbBtnBackground();

            return $thumbBtn;
        }
    };

    /**
     * 缩略图列表滚动按钮盒模型
     */
    $.fn.thumbBtnBox = function($thumbList) {
        $(this).css({
            position: 'relative',
            float: 'left',
            cursor: 'pointer'
        });

        if ($(this).cssDetector('width', '0px')) {
            $(this).css('width', $(this).parent().width() * 0.025);
        }
        if ($(this).cssDetector('height', '0px')) {
            $(this).css('height', $(this).parent().height());
        }

        $(this).first().css('margin', '0 ' + $thumbList.children().css('margin-right') + ' 0 0');
        $(this).last().css('margin', '0 0 0 ' + $thumbList.children().css('margin-right'));

        // 滚动按钮内部箭头
        $(this).append('<i>');
        var $thumbBtnArrow = $('i', $(this));

        $thumbBtnArrow.css({
            position: 'absolute',
            border: '5px solid transparent',
        }).css({
            top: ($(this).outerHeight() - $thumbBtnArrow.outerHeight()) / 2
        });

        $(this).first().children('i').css({
            left: $(this).outerWidth() / 2 - $thumbBtnArrow.outerHeight() * 3 / 4,
            'border-right-color': '#fff'
        });

        $(this).last().children('i').css({
            right: $(this).outerWidth() / 2 - $thumbBtnArrow.outerHeight() * 3 / 4,
            'border-left-color': '#fff'
        });

        var $thumbList = $(this).siblings('ul');
        $thumbList.thumbListWrapperBox();
    };

    /**
     * 缩略图列表滚动按钮背景
     */
    $.fn.thumbBtnBackground = function() {
        if ($(this).cssDetector('background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
            $(this).cssDetector('background-image', 'none')
        ) {
            $(this).css('background', '#666');
            $(this).first().css('border-radius', '3px 0 0 3px')
            $(this).last().css('border-radius', '0 3px 3px 0')
        }
    };

    /**
     * 缩略图列表内部容器盒模型
     */
    $.fn.thumbListWrapperBox = function() {
        var w = $(this).parent().width() - $(this).siblings('a').outerWidth(true) * 2;

        $(this).wrap('<div>').parent().css({
            float: 'left',
            width: w,
            height: $(this).height(),
            overflow: 'hidden',
            'user-select': 'none'
        });
    }
})(jQuery, window, document);



/****************************************
 ***** module - animation *****
 ****************************************/
;(function ($, window, document) {
    $.fn.bindAnimation = function($this) {
        var T = $this;

        T.animation = {
            /**
             * 判定当前显示项的索引是否溢出
             */
            determineIndex: function() {
                T.activeIndex =
                T.currentIndex =
                T.currentIndex === T.len ? 0 : T.currentIndex === -1 ? T.len - 1 : T.currentIndex;
            },

            /**
             * 序列元素当前项高亮
             */
            serialActive: function() {
                this.determineIndex();

                if (T.options.serialBtn === true || T.options.serialBtn === 'equal') {
                    T.$serialBtn.eq(T.activeIndex).addClass('active').siblings().removeClass('active');
                }

                if (T.options.serialBtn === 'thumb') {
                    T.$thumb.eq(T.activeIndex).addClass('active').siblings().removeClass('active');

                    // 判定当前图片对应的缩略图是否在缩略图列表的可见范围内
                    var currentItemThumbLeft = T.currentIndex * T.$thumb.outerWidth(true),
                        currentThumbListLeft = Math.abs(parseInt(T.$thumbList.css('left'))),
                        thumbListWrapperWidth = T.$thumbList.parent().width();

                    // 如果不在列表的可见范围内，滑动到当前图片对应的缩略图的位置
                    if (
                        currentItemThumbLeft < currentThumbListLeft ||
                        currentItemThumbLeft > (currentThumbListLeft + thumbListWrapperWidth)
                    ) {
                        var left = -parseInt(currentItemThumbLeft / thumbListWrapperWidth) * thumbListWrapperWidth;
                        this.thumbSlide(left);
                    }
                }
            },

            /**
             * 缩略图列表滑动
             */
            thumbSlide: function(left) {
                if (T.$thumbList.animating) { return false; }

                if (window.isSupportTransition) {
                    T.$thumbList.animating = true;
                    T.$thumbList.css('left', left).addClass('transition-left-' + T.options.speed);

                    setTimeout(T.animation.thumbSlideComplete, T.options.speed + 20);
                } else {
                    T.$thumbList.animating = true;
                    T.$thumbList.animate({ left: left }, {
                        duration: T.options.speed,
                        complete: T.animation.thumbSlideComplete
                    });
                }
            },

            /**
             * 动画效果 - 无
             */
            none: function() {
                this.determineIndex();
                T.$item.eq(T.currentIndex).show().siblings().hide();
                this.serialActive();
                T.$item.preload(T.currentIndex, T.currentIndex);
            },

            /**
             * 动画效果 - 淡入淡出
             */
            fade: function() {
                this.determineIndex();

                T.$list.animating = true;
                T.$item.removeClass().eq(T.currentIndex).addClass('top-item');

                if (window.isSupportTransition) {
                    T.$item.eq(T.currentIndex).addClass('transition-fade-' + T.options.speed).css('opacity', 1);

                    setTimeout(T.animation.fadeComplete, T.options.speed);
                } else {
                    T.$item.eq(T.currentIndex).animate({
                        opacity: 1
                    }, {
                        duration: T.options.speed,
                        complete: T.animation.fadeComplete
                    });
                }

                this.serialActive();

                T.$item.preload(T.currentIndex, T.currentIndex);
            },

            /**
             * 动画效果 - 滑动
             */
            slide: function() {
                T.$item = T.$list.children();

                var lastIndex = T.$list.data('lastIndex'),
                    slideDirection = 'left';

                if (T.currentIndex === lastIndex) {
                    return;
                }

                clearInterval(T.playTimer);

                // 滑动动画在执行之前需要将第1个item克隆一份,
                // 还需要判定此次动画的方向，所以不能使用普通的索引判定方法
                if (T.currentIndex < lastIndex) {
                    slideDirection = 'right';
                }

                // first item >> last item
                if (T.currentIndex < 0) {
                    T.currentIndex = T.len - 1;
                    T.$item.eq(T.len).show().siblings().hide();
                    slideDirection = 'right';
                }

                // first item >> last item
                if (T.currentIndex > T.len) {
                    T.currentIndex = 1;
                    slideDirection = 'left';
                }

                if (slideDirection === 'right') {
                    T.$list.css('left', '-100%');
                }

                T.$item.eq(T.currentIndex).show();

                // 使用CSS3 Transition进行动画过渡
                // 相对于jQuery的animate执行的动画，可以大幅度提升流畅度
                if (window.isSupportTransition) {
                    setTimeout(function() {
                        T.$list.animating = true;
                        T.$list.css('left', slideDirection === 'left' ? '-100%' : 0)
                            .addClass('transition-left-' + T.options.speed);

                        setTimeout(T.animation.slideComplete, T.options.speed - 20);
                    }, 20);
                } else {
                    T.$list.animating = true;
                    T.$list.animate({
                        left: slideDirection === 'left' ? '-100%' : 0
                    }, {
                        duration: T.options.speed,
                        complete: T.animation.slideComplete
                    });
                }

                this.serialActive();

                T.$item.preload(T.currentIndex, T.currentIndex);
            },

            /**
             * fade动画的回调函数
             */
            fadeComplete: function() {
                T.$list.animating = false;
                T.$item.eq(T.currentIndex).siblings().css('opacity', 0);
                if (T.options.autoPlay && !T.$list.hovered) {
                    T.setPlayTimer();
                }
            },

            /**
             * slide动画的回调函数 
             */
            slideComplete: function() {
                if (T.currentIndex === T.len) {
                    T.$item.first().show().siblings().hide();
                    T.currentIndex = 0;
                }

                T.$list.animating = false;
                T.$list.css('left', 0).removeClass();
                T.$list.data('lastIndex', T.currentIndex);

                T.$item.eq(T.currentIndex).show().siblings().hide();

                if (T.options.autoPlay && !T.$list.hovered) {
                    T.setPlayTimer();
                }
            },

            /*
             * thumbSlide动画的回调函数
             * 设置滚动按钮的禁用样式
             */
            thumbSlideComplete: function() {
                T.$thumbList.animating = false;

                var left = parseInt(T.$thumbList.css('left')),
                    $prev = T.$thumbList.parent().prev(),
                    $next = T.$thumbList.parent().next();

                left ? $prev.removeClass('disabled') : $prev.addClass('disabled');

                if (T.$thumbList.parent().width() - T.$thumbList.width() !== left) {
                    $next.removeClass('disabled');
                } else {
                    $next.addClass('disabled');
                }
            }
        };
    };
})(jQuery, window, document);



/****************************************
 ***** module - preload *****
 ****************************************/
;(function ($, window, document) {
    /**
     * 图片预加载
     * @param  {Number} loadingIndex 当前加载项的索引
     * @param  {Number} currentIndex 当前显示项的索引
     */
    $.fn.preload = function(loadingIndex, currentIndex) {
        console.log(loadingIndex);

        var $item = $(this);

        // 只能预加载一张图片
        if (loadingIndex - currentIndex > 1) { return; }

        var img = new Image(),
            $loadingItem = $item.eq(loadingIndex),
            loadingItemSrc = $loadingItem.data('src');

        if ($loadingItem.attr('data-src')) {
            $loadingItem.removeAttr('data-src');

            // 不对第1张图片设置loading动画
            if (!loadingIndex) {
                $loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');
            } else {
                $loadingItem.addClass('loading');
            }

            img.src = loadingItemSrc;

            img.complete ? showLoadingItem() : img.onload = showLoadingItem;
        } else {
            // 当前项没有data-src属性说明已加载过，直接加载下一张
            $item.preload(++loadingIndex, currentIndex);
        }

        function showLoadingItem() {
            if (loadingIndex) {
                $loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');

                if (loadingIndex === currentIndex) {
                    if ($loadingItem.hasClass('loading')) {
                        // 当前显示图片正在加载
                        $loadingItem.hide().fadeIn();
                    } else {
                        // 当前显示图片加载完成
                        $loadingItem.show();
                    }
                }

                // 当前显示图片加载完成并且下一图片也加载完成
                if (loadingIndex !== currentIndex) {
                    // 动画模式不是fade，就预加载完成的item隐藏
                    if ($loadingItem.cssDetector('z-index', 'auto')) {
                        $loadingItem.hide();
                    }
                }

                $loadingItem.removeClass('loading');
            }

            // 预加载下一张图片
            $item.preload(++loadingIndex, currentIndex);
        }
    };
})(jQuery, window, document);



/****************************************
 ***** main method *****
 ****************************************/
;(function ($, window, document) {
    /**
     * 插件主方法
     * @param  {Object} option    自定义参数
     * @return {HTMLElement}      调用该方法的元素集合中的每个元素
     */
    $.fn.easyBanner = function(option) {
        var defaults = {
            animation: 'slide',    // 动画模式: ['slide', 'fade']
            trigger  : 'click',    // 触发动画的事件类型: ['click', 'hover']
            arrowBtn : true,       // 左右箭头按钮
            serialBtn: true,       // 序列按钮[true, false, 'equal', 'thumb']
            autoPlay : true,       // 自动轮播
            speed    : 800,        // 动画速度
            interval : 5000        // 自动轮播间隔
        },
        options = $.extend(defaults, option);

        return this.each(function() {
            var self  = this,
                $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
                $arrowBtnWrapper,
                $arrowBtn,
                $serialBtnList,
                $serialBtn,
                $thumbWrapper,
                $thumbList,
                $thumb,
                $thumbImg,
                $thumbBtn,
                currentIndex = 0,
                activeIndex = 0,
                embeddedStyle = '';

            /**
             * 图片转换为背景图片
             */
            function imageConvert() {
                // 获取手动设置的缩略图的地址
                var thumbUrlArr = [],
                    regExp = new RegExp('\\?thumb=(.*\\.(jpg|jpeg|gif|png))$');

                $item.find('img').each(function() {
                    var url = $(this).attr('src') || $(this).attr('data-src');
                    if (url.match(regExp)) {
                        thumbUrlArr.push(url.match(regExp)[1]);
                    }
                    $this.thumbUrlArr = thumbUrlArr;
                });

                // 根据data-src自动开启Preload
                if ($item.find('img[data-src]').length === len) {
                    $item.each(function() {
                        var url = $(this).find('img').data('src');
                        $(this).attr('data-src', url).data('url', url).children('img').remove();
                    });
                    $item.preload(currentIndex, currentIndex);
                } else {
                    $item.each(function() {
                        var url = $(this).find('img').attr('src');
                        $(this).css('background-image', 'url(' + url + ')').data('url', url).children('img').remove();
                    });
                }
            }

            /**
             * 轮播列表初始化
             */
            function init() {
                $list.hovered = false;

                $list.wrap('<div class="wrapper-list">').parent().css({
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
                    height : $this.height(),
                    'background-repeat': 'no-repeat',
                    'background-position': 'center top'
                });
                
                $this.containerPosition();

                switch(options.animation) {
                    case 'fade':
                        if (window.isSupportTransition) {
                            embeddedStyle +=
                                '.transition-fade-' + options.speed + '{'
                            +        'transition: opacity ' + options.speed + 'ms ease;'
                            +        '-webkit-transition: opacity ' + options.speed + 'ms ease;'
                            +    '}\n';
                        }
                        embeddedStyle += '.top-item{z-index: 0 !important;}\n';

                        $item.css({
                            position: 'absolute',
                            left    : 0,
                            top     : 0,
                            'z-index': -10
                        });
                        $item.first().addClass('top-item').siblings().css('opacity', 0);
                        break;

                    case 'slide':
                        if (window.isSupportTransition) {
                            embeddedStyle +=
                                '.transition-left-' + options.speed + '{'
                            +        'transition: left ' + options.speed + 'ms ease;'
                            +        '-webkit-transition: left ' + options.speed + 'ms ease;'
                            +    '}\n';
                        }

                        $list.css({
                            left : 0,
                            width: (len + 1) * 100 + '%'
                        });

                        $item.css({
                            float: 'left',
                            width: $this.css('width')
                        });
                        $item.first().clone().appendTo($list);
                        $item.first().show().siblings().hide();
                        break;
                }

                // 改变浏览器视口大小时自动调整背景图片的位置
                $(window).resize(function() {
                    $list.children().css('width', $this.width() + 'px');
                });
            }

            /**
             * 给容器附加属性
             */
            function attachProp() {
                var prop = [
                        'options', 'len', 'currentIndex',
                        '$this', '$list', '$item',
                        '$arrowBtnWrapper', '$arrowBtn',
                        '$serialBtn', '$thumbList', '$thumb',
                        'setPlayTimer'
                    ];
                var val = [
                        options, len, currentIndex,
                        $this, $list, $item,
                        $arrowBtnWrapper, $arrowBtn,
                        $serialBtn, $thumbList, $thumb,
                         setPlayTimer
                    ];

                for (var i = 0, l = prop.length; i < l; i++) {
                    $this[prop[i]] = val[i];
                }
            }

            /**
             * 添加箭头按钮
             */
            function addArrowBtn() {
                $this.append(
                    '<div class="btn-arrow">'
                +       '<a class="prev" style="float: left;"></a>'
                +       '<a class="next" style="float: right;"></a>'
                +   '</div>'
                );

                $arrowBtnWrapper = $('.btn-arrow', $this);
                $arrowBtn = $arrowBtnWrapper.children();

                // 自动化样式
                $arrowBtnWrapper.arrowBtnWrapperBox($this);
                $arrowBtnWrapper.arrowBtnWrapperPosition($this);
                $arrowBtn.arrowBtnBackground($this, $arrowBtnWrapper);

                $arrowBtnWrapper.appendTo($this).css({
                    position :'absolute',
                    'z-index': 20,
                    height   : 0
                });
                
                arrowBtnHandler();
            }

            /**
             * 添加序列按钮
             */
            function addSerialBtn() {
                for (var i = 0, item = ''; i < len; i++) {
                    item += '<li></li>';
                }
                $this.append('<ul class="btn-serial">' + item + '</ul>');
                $serialBtnList = $('.btn-serial', $this);
                $serialBtn = $serialBtnList.children();

                $serialBtn.css('float', 'left');
                
                // 自动化样式
                var equal = options.serialBtn === 'equal' ? 'equal' : null;

                $serialBtn.serialBtnBox(equal);
                embeddedStyle += $serialBtn.serialBtnBackground();
                $serialBtnList.serialBtnListPosition($serialBtn, $this, equal);

                $serialBtnList.appendTo($this).css({
                    position :'absolute',
                    'z-index': 20
                }).children(':first').addClass('active');

                serialHandler.call($serialBtn);
            }

            /**
             * 添加缩略图
             */
            function addThumb() {
                for (var i = 0, item = '', src = ''; i < len; i++) {
                    src = $this.thumbUrlArr[i] || $item.eq(i).data('url');
                    item += '<li><img src="' + src + '"></li>';
                }
                $this.append('<div class="wrapper-thumb"><ul>' + item + '</ul></div>');

                $thumbWrapper = $('.wrapper-thumb', $this);
                $thumbList = $thumbWrapper.children();
                $thumb = $thumbList.children();
                $thumbImg = $thumb.children();

                $thumb.css({
                    float: 'left',
                    overflow: 'hidden',
                    cursor: 'pointer'
                });
                $thumb.first().addClass('active');
                $thumb.last().css('margin', '0px');

                // 自动化样式
                $thumbImg.hide();
                $thumbImg.thumbImgBox($thumb, $this);
                $thumbImg.show();

                // 必须在缩略图加载完成之后才能对它进行自动化处理和事件绑定
                $thumbImg[0].complete ? automatic() : $thumbImg[0].onload = automatic;

                function automatic() {
                    $thumbList.css({
                        position: 'relative',
                        left: '0px',
                        width: $thumb.outerWidth(true) * $thumb.length - parseInt($thumb.css('margin-right')),
                        height: $thumb.outerHeight(true)
                    });

                    // if ($thumbList.cssDetector('left', ['0px', 'auto'])) {

                    // }

                    $thumbWrapper.thumbWrapperPosition($this, $thumb);
                    $thumbWrapper.css({
                        position :'absolute',
                        'z-index': 20,
                        overflow: 'hidden',
                        height: $thumb.outerHeight(true)
                    });
                    
                    $thumbBtn = $thumbWrapper.addThumbBtn();

                    thumbBtnHandler.call($thumbBtn);
                    serialHandler.call($thumb);
                }
            }

            /**
             * banner容器hover事件处理器
             */
            function bannerHandler() {
                $this.hover(function() {
                    $list.hovered = true;
                    clearInterval($this.playTimer);
                }, function() {
                    $list.hovered = false;
                    if (!$list.animating) { setPlayTimer(); }
                });
            }

            /**
             * 箭头的事件处理器
             */
            function arrowBtnHandler() {
                $arrowBtn.on({
                    click: function() {
                        if ($list.animating) { return; }
                        $(this).hasClass('prev') ? currentIndex-- : currentIndex++;
                        play();
                    },

                    // 阻止连续点击箭头按钮时选中按钮
                    selectstart: function() { return false; }
                });
            }

            /**
             * 序列按钮和缩略图的事件处理器
             */
            function serialHandler() {
                $(this).on(
                    options.trigger === 'click' ? 'click' : 'mouseenter',
                    function() {
                        if ($list.animating) { return; }
                        currentIndex = $(this).index();
                        play();
                    }
                );
            }

            /**
             * 缩略图列表滚动按钮的事件处理器
             */
            function thumbBtnHandler() {
                $(this).click(function() {
                    var $thumbList = $this.$thumbList,           // 缩略图列表
                        $thumbListWrapper = $thumbList.parent(), // 缩略图列表容器
                        left = parseInt($thumbList.css('left')), // 缩略图列表
                    
                        thumbListLeftOverWidth = Math.abs(parseInt($thumbList.css('left'))),        // 缩略图列表溢出容器的左侧宽度
                        thumbListRightOverWidth = $thumbList.width() - $thumbListWrapper.width() -  // 缩略图列表溢出容器的右侧宽度
                        Math.abs(parseInt($thumbList.css('left')));

                    if ($(this).hasClass('prev')) {
                        // 比较列表溢出的宽度和容器的宽度来设置列表滑动的距离
                        if (!thumbListLeftOverWidth) { return; }

                        left = thumbListLeftOverWidth < $thumbListWrapper.width() ? 0 : left + $thumbListWrapper.width();
                    }

                    if ($(this).hasClass('next')) {
                        if (!thumbListRightOverWidth) { return; }

                        left = thumbListRightOverWidth < $thumbListWrapper.width() ? left - thumbListRightOverWidth :
                        left - $thumbListWrapper.width();
                    }

                    $this.animation.thumbSlide(left);
                });
            }

            /**
             * 轮播切换
             */
            function play() {
                $this.currentIndex = currentIndex;
                $this.activeIndex = activeIndex;

                $this.animation[$this.options.animation]();

                // 防止当前上下文中的currentIndex溢出导致animation组件中的T.currentIndex溢出
                if (currentIndex >= len || currentIndex <= 0) {
                    currentIndex = $this.activeIndex;
                }
            }

            /**
             * 设置自动播放的定时器
             */
            function setPlayTimer() {
                clearInterval($this.playTimer);
                $this.playTimer = setInterval(function() {
                    currentIndex++;
                    play();
                }, options.interval);
            }

            /**
             * 根据配置参数启动对应的方法
             */
            (function() {
                imageConvert();
                init();
                bannerHandler();

                if (len <= 1) { return; }
                if (options.arrowBtn) { addArrowBtn(); }
                if (options.serialBtn === true || options.serialBtn === 'equal') { addSerialBtn(); }
                if (options.serialBtn === 'thumb') { addThumb(); }
                if (options.autoPlay) { setPlayTimer(); }

                // 附加属性
                attachProp();

                // 绑定动画
                $this.bindAnimation($this);

                $('head').append('<style type="text/css">' + embeddedStyle + '</style>');
            }());
        });
    };
})(jQuery, window, document);
