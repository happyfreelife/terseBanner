/**
 * jquery.easyBanner.js
 * @author    HappyFreeLife
 * @version   1.1.6
 * @url       https://github.com/happyfreelife/easyBanner/
 */

;(function ($, window, document, undefined) {
    // easyBanner对象的简写变量
    var E = $.easyBanner = {};

    // easyBanner文件的路径
    E.selfPath = (function (scripts, i, self) {
        // 使用脚本加载器加载本文件，则调用下面的方法查找文件自身
        for (var i in scripts) {
            if (scripts[i].src && scripts[i].src.indexOf('jquery.easyBanner') > -1) {
                self = scripts[i];
                break;
            }
        }

        self = self || scripts[scripts.length - 1];
        return self.src.substring(0, self.src.lastIndexOf('/') + 1);
    }(document.scripts));

    /**
     * 脚本加载器
     * @param  {String}   src      外部脚本路径
     * @param  {Function} callback 脚本加载完成后执行的函数
     */
    E.loadScript = function(src, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = E.selfPath + src;

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
     * 插件主方法
     * @param  {Object} option    自定义参数
     * @return {HTMLElement}      调用该方法的元素集合中的每个元素
     */
    $.fn.easyBanner = function(option) {
        var defaults = {
            animation: 'slide',    // 动画模式: ['slide', 'fade']
            trigger  : 'click',    // 触发动画的事件类型: ['click', 'hover']
            direction: 'x',        // 滑动方向: ['x', 'y'](只适用于'slide'动画模式)
            arrowBtn : true,       // 左右箭头按钮
            serialBtn: true,       // 序列按钮
            auto     : true,       // 自动轮播
            speed    : 800,        // 动画速度
            interval : 5000        // 自动轮播间隔
        },
        options = $.extend(defaults, option || {});

        return this.each(function() {
            var self  = this,
                $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
                $arrowBtnWrap,
                $arrowBtn,
                $serialBtnWrap,
                $serialBtn,
                $thumbWrap,
                $thumb,
                $thumbImg,
                currentIndex = 0,
                horizonal = options.direction.toLowerCase() === 'x' ? true : false,
                vertical = options.direction.toLowerCase() === 'y' ? true : false,
                embedCss = '';

            // 判断浏览器是否支持CSS3动画
            var isSupportTransition = 'transition' in document.documentElement.style;

             // 图片转换为背景图片
            function imageConvert() {
                // 根据data-src自动开启Preload
                if ($item.find('img[data-src]').length === len) {
                    $item.each(function() {
                        var url = $(this).find('img').data('src');
                        $(this).attr('data-src', url).data('url', url).children('img').remove();
                    });
                    imgPreLoader(currentIndex);
                } else {
                    $item.each(function() {
                        var url = $(this).find('img').attr('src');
                        $(this).css({
                            'background-image': 'url(' + url + ')',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center top'
                        }).data('url', url).children('img').remove();
                    });
                }
            }

            function init() {
                self.hovered = false;

                $list.wrap('<div class="wrap-list">').parent().css({
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

                E.loadScript('module-automatic.js', function() {
                    
                });

                if ($this.cssDetector('position', 'static')) {
                    $this.css('position', 'relative')
                }

                if (options.animation === 'fade') {
                    embedCss += '.top-item{z-index: 10;}\n'

                    $item.css({
                        position: 'absolute',
                            left: 0,
                             top: 0
                    });
                    $item.first().show().siblings().hide();
                }

                if (options.animation === 'slide') {
                    if (isSupportTransition) {
                        embedCss += '.transition-' + options.speed + '{'
                        +                'transition: all ' + options.speed + 'ms ease;'
                        +                '-webkit-transition: all ' + options.speed + 'ms ease;'
                        +            '}\n';

                        setTimeout(function() {
                            $list.addClass('transition-' + options.speed);
                        }, 10);
                    }

                    if (horizonal) {
                        $list.css({
                            left : 0,
                            width: (len + 1) * 100 + '%'
                        });

                        $item.css({
                            float: 'left',
                            width: $this.css('width')
                        });
                    }

                    if (vertical) {
                        $list.css({
                            top   : 0,
                            height: 'auto'
                        });
                    }
                }

                $(window).resize(function() {
                    $list.children().css('width', $this.width() + 'px');
                });
            }


            // 图片预加载器(延迟加载)
            function imgPreLoader(loadingIndex) {
                // 只能预加载一张图片
                if (loadingIndex - currentIndex > 1) {
                    return;
                }

                function preload() {
                    $loadingItem.removeClass();

                    if (loadingIndex) {
                        $loadingItem.css({
                            display: 'none',
                            'background-image': 'url(' + loadingItemSrc + ')'
                        }).fadeIn(300);
                    }

                    imgPreLoader(loadingIndex++);
                }

                var img = new Image(),
                    $loadingItem = $item.eq(loadingIndex),
                    loadingItemSrc = $loadingItem.attr('data-src');

                if (loadingItemSrc) {
                    $loadingItem.removeAttr('data-src');

                    // 不对第1张图片设置loading动画
                    if (!loadingIndex) {
                        $loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');
                    } else {
                        $loadingItem.addClass('loading');
                    }

                    img.src = loadingItemSrc;
                    img.complete ? preload() : img.onload = preload;
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

                $arrowBtnWrap = $('.btn-arrow', $this);
                $arrowBtn = $arrowBtnWrap.children();

                if ($arrowBtnWrap.width() === $this.width()) {
                    $arrowBtnWrap.css('width', '96%')
                }

                if ($arrowBtnWrap.cssDetector('top', 'auto') && $arrowBtnWrap.cssDetector('bottom', 'auto')) {
                    $arrowBtnWrap.css({
                                top : '50%',
                        'margin-top': -$arrowBtn.height() / 2
                    });
                }
                if ($arrowBtnWrap.cssDetector('left', 'auto') && $arrowBtnWrap.cssDetector('right', 'auto')) {
                    $arrowBtnWrap.css('margin-left', ($this.width() - $arrowBtnWrap.width()) / $this.width() / 2 * 100 + '%');
                }

                if ($arrowBtn.cssDetector('background-image', 'none')) {
                    $('.prev', $arrowBtnWrap).html('&lt;');
                    $('.next', $arrowBtnWrap).html('&gt;');

                    $arrowBtn.css({
                        'line-height': $arrowBtn.height() + 'px',
                        'font-size'  : $this.height() * 0.133 + 'px',
                        'font-family': 'SimHei',
                        'text-align' : 'center',
                        'user-select': 'none',
                               cursor: 'pointer',
                                color: '#fff'
                    });
                }

                $arrowBtnWrap.appendTo($this).css({
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
                $serialBtnWrap = $('.btn-serial', $this);
                $serialBtn = $serialBtnWrap.children();

                $serialBtn.css('float', 'left');
                if ($serialBtn.cssDetector('width', '0px') && $serialBtn.cssDetector('height', '0px')) {
                    $serialBtn.css({width: '10px', height: '10px'});
                }

                if ($serialBtn.cssDetector('margin', ['0px', ''])) {
                    $serialBtn.css('margin', '0 5px');
                }

                if ($serialBtn.cssDetector('background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
                    $serialBtn.cssDetector('background-image', 'none')) {
                    embedCss += '.btn-serial > *{background-color: #fff;border-radius: 50%;}\n' +
                                '.btn-serial > .active{background-color: #ff8000;}\n';
                }

                if ($serialBtnWrap.cssDetector('top', 'auto') && $serialBtnWrap.cssDetector('bottom', 'auto')) {
                    $serialBtnWrap.css('bottom', $this.height() * 0.04);
                }

                if ($serialBtnWrap.cssDetector('left', 'auto') && $serialBtnWrap.cssDetector('right', 'auto')) {
                    $serialBtnWrap.css({
                        left: '50%',
                        'margin-left': -$serialBtn.outerWidth(true) * len / 2
                    });
                }

                $serialBtnWrap.appendTo($this).css({
                    position :'absolute',
                    'z-index': 20
                }).children(':first').addClass('active');

                serailBtnHandler();
            }

            /**
             * 添加缩略图
             */
            function addThumbnail() {
                for (var i = 0, str = ''; i < len; i++) {
                    str += '<li>' + '<img src="' + $item.eq(i).data('url') + '">' + '</li>';
                }
                $this.append('<ul class="list-thumb">' + str + '</ul>');

                $thumbWrap = $('.list-thumb', $this);
                $thumb = $thumbWrap.children();
                $thumbImg = $thumb.children();
                
                $thumb.css({
                    float : 'left',
                    overflow: 'hidden',
                    cursor: 'pointer'
                });

                $thumbImg.hide();
                if (!$thumb.cssDetector('height', '0px')) {
                    $thumbImg.height($thumb.height());
                } else {
                    $thumbImg.height($this.height() * 0.125);
                }

                if (!$thumb.cssDetector('width', '0px')) {
                    $thumbImg.css({
                        position     : 'relative',
                        left         : '50%',
                        'margin-left': -$thumbImg.outerWidth() / 2
                    });
                }
                $thumbImg.show();

                if ($thumbWrap.cssDetector('top', 'auto') && $thumbWrap.cssDetector('bottom', 'auto')) {
                    $thumbWrap.css('bottom', $this.height() / 25);
                }

                if ($thumbWrap.cssDetector('left', 'auto') && $thumbWrap.cssDetector('right', 'auto')) {
                    $thumbWrap.css({
                        left: '50%',
                        'margin-left': -$thumb.outerWidth(true) * len / 2
                    });
                }

                $thumbWrap.appendTo($this).css({
                    position :'absolute',
                    'z-index': 20
                }).children(':first').addClass('active');

                thumbnailHandler();
            }

            /**
             * 箭头按钮事件处理器
             */
            function arrowBtnHandler() {
                $arrowBtn.on({
                    click: function() {
                        if ($list.animated) {
                            return;
                        }
                        $(this).hasClass('prev') ? currentIndex-- : currentIndex++;   
                        play();
                    },

                    // 阻止连续点击箭头按钮时选中按钮
                    selectstart: function() {
                        return false;
                    }
                });
            }

            /**
             * 序列按钮事件处理器
             */
            function serailBtnHandler() {
                if (options.trigger === 'click') {
                    $serialBtn.on('click', function() {
                        if ($list.animated) {
                            return;
                        }
                        currentIndex = $(this).index();
                        play();
                    });
                }

                if (options.trigger === 'hover') {
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

            /*
             * 缩略图副件处理器
             */
            function thumbnailHandler() {
                $thumb.on('click', function() {
                    if ($list.animated) {
                        return;
                    }
                    currentIndex = $(this).index();   
                    play();
                }); 
            }

            /**
             * 序列按钮和缩略图当前项高亮
             */
            function elemHighlight() {
                var activeIndex = currentIndex === len ? 0 :
                    currentIndex === -1 ? len - 1 : currentIndex;
                if (options.serialBtn) {
                    $serialBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');
                }

                if (options.thumb) {
                    $thumb.eq(activeIndex).addClass('active').siblings().removeClass('active');
                }
            }
            
            function fadeAnimation() {
                $list.animated = true;
                currentIndex = currentIndex === len ?  0 : (currentIndex === -1 ? len - 1 : currentIndex);
                $item.removeClass('top-item').eq(currentIndex)
                     .addClass('top-item')
                     .css({display: 'block', opacity: 0})
                     .animate({opacity: 1}, options.speed, function() {
                         $list.animated = false;
                     });

                setTimeout(function() {
                    $item.eq(currentIndex).siblings().hide();
                }, options.speed);

                elemHighlight();
                imgPreLoader(currentIndex);
            }

            function slideAnimation() {
                var listWidth  = $item.width()* len,
                    listHeight = $item.height() * len,
                    listLeft   = Math.abs(parseInt($list.css('left'))),
                    listTop    = Math.abs(parseInt($list.css('top')));

                if (listWidth === listLeft || listHeight === listTop || currentIndex < 0 || currentIndex > len) {
                    isSupportTransition ? $list.removeClass('transition-' + options.speed) : '';
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

                if (isSupportTransition) {
                    setTimeout(function() {
                        $list.animated = true;
                        isSupportTransition ? $list.addClass('transition-' + options.speed) : '';
                        horizonal ? $list.css('left', -currentIndex * 100 + '%') : $list.css('top', -currentIndex * 100 + '%');

                        setTimeout(function() {
                            $list.animated = false;
                            options.auto && !self.hovered ? addAutoTimer() : '';
                        }, options.speed);
                    }, 15);
                } else {
                    $list.animated = true;
                    if (horizonal) {
                        $list.animate({ left: -currentIndex * 100 + '%' }, options.speed, function() {
                            $list.animated = false;
                            options.auto && !self.hovered ? addAutoTimer() : '';
                        })
                    } else {
                        $list.animate({ top: -currentIndex * 100 + '%' }, options.speed, function() {
                            $list.animated = false;
                            options.auto && !self.hovered ? addAutoTimer() : '';
                        });
                    }
                }

                if (options.serialBtn) {
                    var activeIndex = currentIndex === len ? 0 : (currentIndex === -1 ? len - 1 : currentIndex);
                    $serialBtn.eq(activeIndex).addClass('active').siblings().removeClass('active');
                }

                elemHighlight();
                imgPreLoader(currentIndex);
            }

            function play() {
                options.animation === 'fade' ? fadeAnimation() : slideAnimation();
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
                }, options.interval);
            }

            function run() {
                imageConvert();
                init();

                if (len <= 1) {
                    return;
                }
                if (options.animation === 'slide') {
                    $item.first().clone().appendTo($list);
                }
                if (options.thumb || typeof options.thumb === 'object') {
                    addThumbnail();
                    options.serialBtn = false;
                }
                if (options.serialBtn) {
                    addSerialBtn();
                }
                if (options.arrowBtn) {
                    addArrowBtn();
                }
                $('head').append('<style type="text/css">' + embedCss + '</style>');
                if (options.auto) {
                    auto();
                }
            }

            run();
        });
    };


})(jQuery, window, document);
