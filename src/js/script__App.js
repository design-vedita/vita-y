var App = {
    doc: $(document),
    win: $(window),
    body: $('body'),
    htmlTag: $('html'),
    is_touch: $('html').hasClass('touch'),
    container: $(window),
    scroll_container: $('html').add($('body')),
    is_touch_device: Modernizr.touch && (typeof(window.orientation) !== 'undefined'),
    modules: {},
    is_ie: window.navigator.userAgent.indexOf("MSIE") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./),
    is_ff: navigator.userAgent.indexOf("Firefox") !== -1,
    is_safari: navigator.userAgent.indexOf("Safari") !== -1,
    is_chr: navigator.userAgent.indexOf("Chrome") !== -1,
    is_op: navigator.userAgent.indexOf("Opera") !== -1,
    is_android: navigator.userAgent.indexOf("Android") !== -1,
    is_mac: navigator.userAgent.indexOf("Mac") !== -1,
    is_ios: navigator.userAgent.match(/iPhone|iPad|iPod/i),
    update_delay: 400,
    debug: false
};

(function (App) {
    "use strict";

    App.doc.ready(function(){

        App.modules.Games = new App.Games();

        // Добавляем браузерные классы
        if (App.is_ff) {
            App.htmlTag.addClass('ff');
        }
        if (App.is_chr) {
            App.htmlTag.addClass('chrome');
        }
        if (App.is_ie) {
            App.htmlTag.addClass('ie');
        }
        if (App.is_android) {
            App.htmlTag.addClass('android');
        }
        if (App.is_mac) {
            App.htmlTag.addClass('mac');
        }
        if (App.is_safari) {
            App.htmlTag.addClass('safari');
        }
        if (App.is_ios) {
            App.htmlTag.addClass('ios');
        }

        burger();

        animate.hover();

        height.menu();

        // Слайдер верхний
        $('.js-top-slider').slick({
            'prevArrow': '<button type="button" class="slick-prev"></button>',
            'nextArrow': '<button type="button" class="slick-next"></button>'
        })
            .on('beforeChange', function(){
                var $slides = $('.slide');

                $slides.each(function(){

                    var $clouds = $(this).find('.js-cloud');
                    $clouds.removeClass('animated fadeInLeft fadeInRight');
                });
            })
            .on('afterChange', function(){
                var currentSlide = $('.js-top-slider').slick('slickCurrentSlide');

                var $slides = $('.slide');

                $slides.each(function(){
                    var attr = $(this).attr('data-slick-index');

                    if(attr == currentSlide) {
                        var $clouds = $(this).find('.js-cloud');

                        $clouds.each(function(){
                            if( $(this).hasClass('left') ) {
                                $(this).addClass('animated fadeInLeft');
                            } else if ( $(this).hasClass('right') ) {
                                $(this).addClass('animated fadeInRight');
                            }
                        });
                    }
                });
            });

        // Слайдер с мужиком
        $('.js-man-slider').slick({
            'prevArrow': '<button type="button" class="slick-prev"></button>',
            'nextArrow': '<button type="button" class="slick-next"></button>'
        })
            .on('afterChange', function(){
                var slide = $('.js-man-slider').slick('slickCurrentSlide');

                var $activeMan = $('.js-man-slider').find('.slick-active'),
                    $animateBlock = $activeMan.find('.js-animate');

                if(slide == 1) {
                    $animateBlock.addClass('animated fadeInRight');
                }

                if(slide == 2) {
                    var $hand = $('.js-hand'),
                        $big = $('.js-big'),
                        $plant = $('.js-plant'),
                        $science = $('.js-science');

                    $hand.addClass('no--visible');
                    $big.addClass('no--visible');

                    setTimeout(function(){
                            $plant.addClass('plant--move');
                            $science.addClass('science--move');
                        },
                        1000
                    )
                }

            });

        //waypoint
        var waypoint = new Waypoint({
            element: document.getElementById('vigdorovich'),
            handler: function(direction) {
                var $block = $('.js-animate');

                $block.each(function(){

                    if($(this).hasClass('one')) {
                        $(this).addClass('animated fadeInLeft');
                    }
                });
            },
            offset: '30%'
        });

        var waypoint2 = new Waypoint({
            element: document.getElementById('header-slider'),
            handler: function(direction) {
                var $block = $('.js-cloud');

                $block.each(function(){

                    if($(this).hasClass('left')) {
                        $(this).addClass('animated fadeInLeft');
                    } else if ($(this).hasClass('right')) {
                        $(this).addClass('animated fadeInRight');
                    }
                });
            },
            offset: '30%'
        });

        window.onresize = function() {
            height.menu();
        }

    });

    function burger() {
        var $burger = $('.js-burger'),
            $menu = $('.js-menu');

        $burger.on('click', function() {
            $(this).toggleClass('open');
            $menu.toggleClass('open--menu');
        });

    }



    var height = {

        menu: function() {
            var clientHeight = document.documentElement.clientHeight,
                menu = document.getElementsByClassName('js-menu')[0];
                menu.style.height = clientHeight + 'px';
        }

    };

    var animate = {

        hover: function() {

            var el  = $('.js-elem');

            el.on('mouseout', function(e) {
               //console.log(e);
            });
        }
    };


}(App));

App.Games = (function(App){
    "use strict";

    var module = function(){
        this.options = {
            self: '.js-elem'
        };
        this.$root = $(this.options.self);
        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function(){
            this.added = $('.js-added', this.$root);
            this.$root.on('click',this.on_click_element);
        },

        on_click_element: function(e) {
            console.log(this.added);
            var __self = $(e.currentTarget),
            src = __self.attr('data-src');
        }
    };

    return module;
}(App));