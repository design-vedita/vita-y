(function () {
    "use strict";

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
               console.log(e);
            });
        }
    };


    $(function(){

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


}());