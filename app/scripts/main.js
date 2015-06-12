var PageTransitions = (function() {

    var $main = $('#pt-main'),
        $pages = $main.children('div.pt-page'),
        $iterate = $('#iterateEffects'),
        animcursor = 1,
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        // support css animations
        support = Modernizr.cssanimations,
        animations = {
            max: 67
        },
        keys = {
            BACKSPACE: 8,
            DOWN: 40,
            ENTER: 13,
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32,
            PAGE_DOWN: 34,
            PAGE_UP: 33
        };

    function init() {

        $pages.each(function() {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(current).addClass('pt-page-current');

        var animcursorCheck = function() {
            if (isAnimating) {
                return false;
            }
            if (animcursor > animations.max) {
                animcursor = 1;
            } else if (animcursor < 1) {
                animcursor = animations.max
            }
            return animcursor;
        };

        $iterate.on('click', function() {
            nextPage(animcursorCheck());
            ++animcursor;
        });

    }

    function nextPage(options) {
        var animation = (options.animation) ? options.animation : options;

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(current);

        if (options.showPage !== undefined) {
            if (options.showPage < pagesCount - 1) {
                current = options.showPage;
            } else {
                current = 0;
            }
        } else {
            if (current < pagesCount - 1) {
                ++current;
            } else {
                current = 0;
            }
        }

        var $nextPage = $pages.eq(current).addClass('pt-page-current'),
            outClass = '',
            inClass = '';

        switch (animation) {

            case 1:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 2:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 3:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 4:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case 5:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 6:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 7:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 8:
                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 9:
                outClass = 'pt-page-moveToLeftFade';
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 10:
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 11:
                outClass = 'pt-page-moveToTopFade';
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 12:
                outClass = 'pt-page-moveToBottomFade';
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 13:
                outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
                inClass = 'pt-page-moveFromRight';
                break;
            case 14:
                outClass = 'pt-page-moveToRightEasing pt-page-ontop';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 15:
                outClass = 'pt-page-moveToTopEasing pt-page-ontop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 16:
                outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
                inClass = 'pt-page-moveFromTop';
                break;
            case 17:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 18:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 19:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 20:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 21:
                outClass = 'pt-page-scaleDown';
                inClass = 'pt-page-scaleUpDown pt-page-delay300';
                break;
            case 22:
                outClass = 'pt-page-scaleDownUp';
                inClass = 'pt-page-scaleUp pt-page-delay300';
                break;
            case 23:
                outClass = 'pt-page-moveToLeft pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 24:
                outClass = 'pt-page-moveToRight pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 25:
                outClass = 'pt-page-moveToTop pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 26:
                outClass = 'pt-page-moveToBottom pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 27:
                outClass = 'pt-page-scaleDownCenter';
                inClass = 'pt-page-scaleUpCenter pt-page-delay400';
                break;
            case 28:
                outClass = 'pt-page-rotateRightSideFirst';
                inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
                break;
            case 29:
                outClass = 'pt-page-rotateLeftSideFirst';
                inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
                break;
            case 30:
                outClass = 'pt-page-rotateTopSideFirst';
                inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
                break;
            case 31:
                outClass = 'pt-page-rotateBottomSideFirst';
                inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
                break;
            case 32:
                outClass = 'pt-page-flipOutRight';
                inClass = 'pt-page-flipInLeft pt-page-delay500';
                break;
            case 33:
                outClass = 'pt-page-flipOutLeft';
                inClass = 'pt-page-flipInRight pt-page-delay500';
                break;
            case 34:
                outClass = 'pt-page-flipOutTop';
                inClass = 'pt-page-flipInBottom pt-page-delay500';
                break;
            case 35:
                outClass = 'pt-page-flipOutBottom';
                inClass = 'pt-page-flipInTop pt-page-delay500';
                break;
            case 36:
                outClass = 'pt-page-rotateFall pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case 37:
                outClass = 'pt-page-rotateOutNewspaper';
                inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
                break;
            case 38:
                outClass = 'pt-page-rotatePushLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 39:
                outClass = 'pt-page-rotatePushRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case 40:
                outClass = 'pt-page-rotatePushTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case 41:
                outClass = 'pt-page-rotatePushBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case 42:
                outClass = 'pt-page-rotatePushLeft';
                inClass = 'pt-page-rotatePullRight pt-page-delay180';
                break;
            case 43:
                outClass = 'pt-page-rotatePushRight';
                inClass = 'pt-page-rotatePullLeft pt-page-delay180';
                break;
            case 44:
                outClass = 'pt-page-rotatePushTop';
                inClass = 'pt-page-rotatePullBottom pt-page-delay180';
                break;
            case 45:
                outClass = 'pt-page-rotatePushBottom';
                inClass = 'pt-page-rotatePullTop pt-page-delay180';
                break;
            case 46:
                outClass = 'pt-page-rotateFoldLeft';
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 47:
                outClass = 'pt-page-rotateFoldRight';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 48:
                outClass = 'pt-page-rotateFoldTop';
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 49:
                outClass = 'pt-page-rotateFoldBottom';
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 50:
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-rotateUnfoldLeft';
                break;
            case 51:
                outClass = 'pt-page-moveToLeftFade';
                inClass = 'pt-page-rotateUnfoldRight';
                break;
            case 52:
                outClass = 'pt-page-moveToBottomFade';
                inClass = 'pt-page-rotateUnfoldTop';
                break;
            case 53:
                outClass = 'pt-page-moveToTopFade';
                inClass = 'pt-page-rotateUnfoldBottom';
                break;
            case 54:
                outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomLeftIn';
                break;
            case 55:
                outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomRightIn';
                break;
            case 56:
                outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomTopIn';
                break;
            case 57:
                outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateRoomBottomIn';
                break;
            case 58:
                outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeLeftIn';
                break;
            case 59:
                outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeRightIn';
                break;
            case 60:
                outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeTopIn';
                break;
            case 61:
                outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCubeBottomIn';
                break;
            case 62:
                outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselLeftIn';
                break;
            case 63:
                outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselRightIn';
                break;
            case 64:
                outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselTopIn';
                break;
            case 65:
                outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
                inClass = 'pt-page-rotateCarouselBottomIn';
                break;
            case 66:
                outClass = 'pt-page-rotateSidesOut';
                inClass = 'pt-page-rotateSidesIn pt-page-delay200';
                break;
            case 67:
                outClass = 'pt-page-rotateSlideOut';
                inClass = 'pt-page-rotateSlideIn';
                break;

        }

        $currPage.addClass(outClass).on(animEndEventName, function() {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function() {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
    }

    function getCurrentPage() {
    	return current;
    }

    init();

    return {
        init: init,
        nextPage: nextPage,
        getCurrentPage: getCurrentPage
    };

})();

$(document).ready(function() {
	$(window).on('touchmove', function(e){
		e.preventDefault();
	});

    $('#audio_btn').on('click', function(){
        var audio = $(this).find('#media')[0];
        if(audio.paused) {
            $(this).addClass('play_yinfu');
            $(this).find('#yinfu').addClass('rotate');
            $(this).toggleClass('off');
            audio.play();
        } else {
            $(this).removeClass('play_yinfu');
            $(this).find('#yinfu').removeClass('rotate');
            $(this).toggleClass('off');
            audio.pause();
        }
    });

    var hongbaoCount = 0;

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'guize': 'guize',
            'qianghongbao': 'qianghongbao',
            'hongbaojieguo': 　 'hongbaojieguo',
            'maishumiao': 'maishumiao',
            'zhongshu': 'zhongshu',
            'xunzhang': 'xunzhang',
            'guanzhu': 'guanzhu',
            '*error': 'renderError'
        },
        home: function() {
        	if(PageTransitions.getCurrentPage() !== 0) {
        		PageTransitions.nextPage({showPage: 0, animation: 10});
        	}
        },
        guize: function() {
    		var animation = PageTransitions.getCurrentPage() < 1 ? 9 : 10;
        	PageTransitions.nextPage({showPage: 1, animation: animation});
        },
        qianghongbao: function() {
            var router = this;
            var animation = PageTransitions.getCurrentPage() < 2 ? 9 : 10;
            PageTransitions.nextPage({showPage: 2, animation: animation});

            hongbaoCount = 0;

            var winHeight = $(window).height();
            var winWidth = $(window).width();

            _.times(30, function(i){
                var img = $('<img src="images/pic05.jpg" alt="" class="hongbao">');
                
                img.on('touchstart', function(e){
                    hongbaoCount ++;
                    img.off('click');
                    img.velocity('stop');
                    img.velocity({
                        opacity: 0,
                        scale: '+=0.2'
                    },{
                        duration: 200,
                        complete: function(){
                            img.remove();
                        }
                    });
                });

                var translateX =  _.random(100, winWidth-100) + 'px',
                    translateY = _.random(-50, 20) + 'px',
                    rotate = _.random(-30, 30) + 'deg';

                img.velocity({
                    // rotateZ: rotateZ,
                    left: translateX,
                    translateY: translateY,
                    translateZ: 0,
                    opacity: 1,
                    rotateZ: rotate,
                    scale: _.random(1.1, 1.2)
                },{
                    duration: 0,
                    delay: 300 * i
                });
                img.velocity({
                    // rotateZ: _.random(-60, 60) + 'deg',
                    left: translateX,
                    rotateZ: rotate,
                    translateY: winHeight - 100 + 'px',
                    translateZ: 0
                },{
                    duration: 2000,
                    easing: "linear",
                    complete: function(){
                        img.remove();
                    }
                });

                $('.pt-page-3 .hongbao-wrap').append(img);
            }) ;

            var time = 11;
            var countHandler;
            function countDown() {
                $('.pt-page-3 .count-down strong').text(--time)
                if(time == 0) {

                    router.navigate("#hongbaojieguo", {trigger: true});
                    window.clearTimeout(countHandler);
                    return;
                }
                countHandler = setTimeout(countDown, 1000);
            }
            countDown();
        },
        hongbaojieguo: function() {
            var animation = PageTransitions.getCurrentPage() < 3 ? 9 : 10;
            PageTransitions.nextPage({showPage: 3, animation: animation});
            var router = this;


            $('#jiangjin').text(hongbaoCount);
            $('#jinbi').text(hongbaoCount * 100);

            if(hongbaoCount == 0) {
                $('body').append('<div class="mask"></div>');
                $('.alert').velocity('stop');
                $('.alert').velocity({
                    scale: [1, 0]
                }, {
                    duration: 500
                });

                $('.alert').on('click', function(){
                    $('.alert').velocity('stop');
                    $('.alert').velocity({
                        scale: [0, 1]
                    }, {
                        duration: 500,
                        complete: function() {
                            router.navigate("#qianghongbao", {trigger: true, replace: true});
                            $('.mask').remove();
                        }
                    });
                    
                });
            }
        },
        maishumiao: function() {
            var animation = PageTransitions.getCurrentPage() < 4 ? 9 : 10;
            PageTransitions.nextPage({showPage: 4, animation: animation});
            var router = this;

            $('.buy-shumiao').on('click', function(e){
                e.preventDefault();

                var treeName = $(this).find('.tree-name').text();
                var treeAmount = $(this).find('.tree-amount').text();

                $('.buy-success').find('.tree-name').text(treeName);
                $('.buy-success').find('.tree-amount').text(hongbaoCount * 100 / 50);

                $('body').append('<div class="mask"></div>');
                $('.buy-success').velocity({
                    scale: [1, 0]
                }, {
                    duration: 500
                });

                $('.zhongshu').on('click', function(e){
                    e.preventDefault();
                    $('.buy-success').remove();
                    $('.mask').remove();
                    router.navigate("#zhongshu", {trigger: true});
                });
            });
        },
        zhongshu: function() {
            var animation = PageTransitions.getCurrentPage() < 5 ? 9 : 10;
            PageTransitions.nextPage({showPage: 5, animation: animation});
            var router = this;

            $('.tool-jiaoshui').on('touchstart', function(){
                if(!$(this).hasClass('current')) {
                    return;
                }

                $('.tip').velocity('transition.fadeOut');
                $(this).removeClass('current');

                $('.jiaoshui').velocity('transition.fadeIn', {
                    duration: 1000
                });
                $('.jiaoshui').velocity({
                    rotateZ: '-45deg'
                }, {
                    complete: function(){
                        $('.water-wrap').velocity({
                            height: 78
                        }, {
                            loop: 3,
                            complete: function() {
                                $('.tree.tree-1').velocity({
                                    opacity: 0,
                                    scaleY: 1.3
                                }, {
                                    duration: 2000
                                });
                                $('.jiaoshui').velocity('transition.fadeOut', {
                                    duration: 1000
                                });
                                $('.tree.tree-2').velocity({
                                    opacity: 1
                                }, {
                                    duration: 2000,
                                    complete: function() {
                                        $('.tip').html('请为小树<strong>施肥</strong>').css('top', '46%').velocity('transition.fadeIn', {
                                            duration: 1000
                                        });
                                        $('.tool-shifei').addClass('current');
                                    }
                                });
                            }
                        });
                    }
                })
            });
            $('.tool-shifei').on('touchstart', function(){
                if(!$(this).hasClass('current')) {
                    return;
                }

                $('.tip').velocity('transition.fadeOut');
                $(this).removeClass('current');

                $('.shifei').velocity('transition.fadeIn', {
                    duration: 1000
                });
                $('.shifei').velocity({
                    rotateZ: '-115deg'
                }, {
                    complete: function(){
                        $('.feiliao-wrap').velocity({
                            height: 78
                        }, {
                            loop: 3,
                            complete: function() {
                                $('.tree.tree-2').velocity({
                                    opacity: 0,
                                    scaleY: 1.3
                                }, {
                                    duration: 2000
                                });
                                $('.shifei').velocity('transition.fadeOut', {
                                    duration: 1000
                                });
                                $('.tree.tree-3').velocity({
                                    opacity: 1
                                }, {
                                    duration: 2000,
                                    complete: function() {
                                        $('.tip').html('请为小树<strong>松土</strong>').css('top', '34%').velocity('transition.fadeIn', {
                                            duration: 1000
                                        });
                                        $('.tool-songtu').addClass('current');
                                    }
                                });
                            }
                        });
                    }
                })
            });
            $('.tool-songtu').on('touchstart', function(){
                if(!$(this).hasClass('current')) {
                    return;
                }

                $('.tip').velocity('transition.fadeOut');
                $(this).removeClass('current');

                $('.songtu').velocity('transition.fadeIn', {
                    duration: 1000
                });
                $('.songtu').velocity({
                    translateX: -20,
                    translateY: 20,
                    rotateZ: '10deg'
                }, {
                    loop: 2,
                    complete: function(){
                        $('.tree.tree-3').velocity({
                            opacity: 0,
                            scaleY: 1.3
                        }, {
                            duration: 2000
                        });
                        $('.songtu').velocity('transition.fadeOut', {
                            duration: 1000
                        });
                        $('.tree.tree-4.tree-4-0').velocity({
                            opacity: 1
                        }, {
                            duration: 2000,
                            complete: function() {
                                $('.tools').velocity('fadeOut', {
                                    duration: 2000,
                                    mobileHA: false
                                });
                                $('.tree-4-1, .tree-4-2').velocity('fadeIn', {
                                    stagger: 1000,
                                    duration: 2000,
                                    mobileHA: false
                                });
                                $('.tree-5').velocity('transition.fadeIn', {
                                    stagger: 1000,
                                    delay: 1400,
                                    duration: 2000
                                });
                                $('.tree-6').velocity('transition.fadeIn', {
                                    stagger: 1000,
                                    delay: 600,
                                    duration: 2800
                                });
                                $('.tree-7').velocity('transition.fadeIn', {
                                    stagger: 1000,
                                    delay: 2200,
                                    duration: 2000
                                });

                                window.setTimeout(function(){
                                    $('.xiwang p').velocity('transition.slideUpIn', {
                                        stagger: 500,
                                        duration: 2000,
                                        complete: function(){
                                            window.setTimeout(function(){
                                                router.navigate("#xunzhang", {trigger: true});
                                            }, 5000);
                                        }
                                    });
                                }, 2000);
                            }
                        });
                    }
                })
            });
        },
        xunzhang: function() {
            var animation = PageTransitions.getCurrentPage() < 6 ? 9 : 10;
            PageTransitions.nextPage({showPage: 6, animation: animation});
            $('#tree-amount-2').text(hongbaoCount * 2);

            $('#btn-share').on('click', function(e){
                e.preventDefault();
                $('body').append('<div class="mask mask-a"></div>');
                $('.share-tip').show();
            });
        },
        guanzhu: function() {
            var animation = PageTransitions.getCurrentPage() < 7 ? 9 : 10;
            PageTransitions.nextPage({showPage: 7, animation: animation});
        },
        renderError: function() {}
    });

    router = new AppRouter();
    Backbone.history.start();
});
