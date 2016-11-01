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
        hoverAnimate('.js-elem-work');
        hoverAnimate('.js-elem-home');

        addedItem('js-elem-work', 'js-added-work');
        addedItem('js-elem-home', 'js-added-home');
        deleteItem('js-delete');

        App.win.on('resize', function(){
            burger();
        });

        // карусель фото
        $('.js-gallery').slick({
            infinite: true,
            slidesToShow: 6.1,
            slidesToScroll: 3,
           // autoplay: true,
            arrows: false
        });

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
    });

    // открываем меню
    function burger() {
        var $burger = $('.js-burger'),
            $menu = $('.js-menu');
        var clientHeight = document.documentElement.clientHeight,
            menu = document.getElementsByClassName('js-menu')[0];
        menu.style.height = clientHeight + 'px';

        $burger.on('click', function() {
            $(this).toggleClass('open');
            $menu.toggleClass('open--menu');
        });

    }

    function hoverAnimate(el) {

        var el  = $(el);

        el.on('mouseout', function(e) {
           // console.log(e);
        });
    }

    function addedItem(el, el_add) {
        var item = document.getElementsByClassName(el),
            add = document.getElementsByClassName(el_add);

        var i,
            j,
            k;

        for(i = 0; i < item.length; i++) {

            item[i].onclick = function(e){
                var src = e.target.getAttribute('src');
                var list = [];

                var typeImg = src.slice(-4),
                    url = src.slice(0, -4);

                for (j = 0; j < add.length; j++) {
                    list[j] = add[j].classList.contains('free--item');
                }
                var index = list.indexOf(false);

                for (k = 0; k < add.length; k++) {
                    if([k] == index) {
                        var img = add[k].querySelector('img');
                            img.setAttribute('src', url + '-hover' + typeImg);
                            add[k].classList.add('free--item');
                    }
                }
            };
        }
    }

    function deleteItem(el) {
        var delItem = document.getElementsByClassName(el);

        var i;

        for (i = 0; i < delItem.length; i++) {

            delItem[i].onclick = function(e){
                var _self = this,
                    parent = _self.parentNode,
                    image = parent.querySelector('img');
                setTimeout(function(){
                    image.setAttribute('src','');
                }, 300);
                parent.classList.remove('free--item');
            }
        }

    }

}(App));