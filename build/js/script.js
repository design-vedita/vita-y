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

        var burger = burgerActions();

        burger.openMenu();
        burger.heightMenu();
        burger.positionHeader();

        addedItem('js-elem-work', 'js-added-work');
        addedItem('js-elem-home', 'js-added-home');
        deleteItem('js-delete');
        heightGray();
        preloader();

        App.win.on('resize', function(){
            burger.heightMenu();
            heightGray();
        });

        App.win.on('scroll', function(){
            burger.positionHeader();
        });

        /***/
        //Подключение плагинов

        // карусель фото
        $('.js-gallery').slick({
            infinite: true,
            slidesToShow: 6.1,
            slidesToScroll: 3,
           // autoplay: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1550,
                    settings: {
                        slidesToShow: 5.1
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4.1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3.1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 460,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        // Слайдер верхний
        $('.js-top-slider').slick({
            'prevArrow': '<button type="button" class="slick-prev"></button>',
            'nextArrow': '<button type="button" class="slick-next"></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
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
                        $(this).addClass('animated bounceInDown');
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
        /*var waypoint = new Waypoint({
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
        */

        var waypoint2 = new Waypoint({
            element: document.getElementById('header-slider'),
            handler: function(direction) {
                var $block = $('.js-cloud');

                $block.each(function(){
                    $(this).addClass('animated bounceInDown');
                });
            }
        });
    });

    /***********/

    /***********************/
    // Функции, объекты, вся логика

    function preloader() {
        var $preloader = $('.preloader'),
            $spinner   = $preloader.find('.spinner');
        $preloader.addClass('slow');
        $spinner.addClass('slow');
    }

    function heightGray() {
        var $line = $('.js-gray'),
            $title = $('.js-title-games'),
            clientWidth = document.documentElement.clientWidth;

        if(clientWidth <= 1199) {

            var $titleHeight = $title.outerHeight();
            $line.css({'height':$titleHeight});
        }
    }

    // верхнее меню и шапка

    function burgerActions() {
        var $burger = $('.js-burger'),
            $menu = $('.js-menu'),
            $header = $('.js-header'),
            $content = $('.js-content'),
            menu = document.getElementsByClassName('js-menu')[0];

       return {
           openMenu: function(){
               // открываем меню
               $burger.on('click', function() {
                   $(this).toggleClass('open');
                   $menu.toggleClass('open--menu');
                   $header.toggleClass('open--menu');
               });
           },

           heightMenu: function() {
               //задаём высоту меню
                var clientHeight = document.documentElement.clientHeight,
                    clientWidth = document.documentElement.clientWidth;

               if (clientWidth >= 768) {
                   menu.style.height = clientHeight + 'px';
               } else {
                   menu.style.height = '';
               }
           },

           positionHeader: function(){
               // плавающая шапка
               var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

               if (scrollTop >= $header.outerHeight()) {
                   $header.addClass('scroll--header');
                   $content.css({'margin-top': $header.outerHeight() + 'px'});
               } else {
                   $header.removeClass('scroll--header');
                   $content.css({'margin-top': ''});
               }
           }

       }
    }

    function HintConstructor() {

        return {

            hintGallery: function() {
                //подсказка в галерее в подвале
                var $link = $('.js-hint-gallery'),
                    $hint = $('.js-gallery-hint');

                    $link.on('click', function(){
                        var $text = $(this).attr('data-hint'),
                            $offset = $(this).offset(),
                            $hintHeight = $hint.outerHeight();
                        $hint.toggleClass('visible');

                            $hint.html($text);
                            var $top = $offset.top - ($hintHeight / 1.5);

                            if($hint.hasClass('visible')) {

                                $hint.offset({
                                    left: $offset.left,
                                    top: $top
                                });

                            } else {
                                $hint.offset({
                                    left: 0,
                                    top: 0
                                });
                            }
                    });
            },

            hintGames: function(el){
                // подсказка у элементов игры
                var el  = $(el),
                    $hint = $('.js-hint-block');
                el.on('mouseenter', function(e) {

                    var $offset = $(this).offset(),
                        $text = $(this).attr('data-hint');
                    $hint.text($text);

                    var $height = $(this).outerHeight(),
                        $width  = $(this).outerWidth();

                    $hint.addClass('visible--hint');

                    var $top = $height + $offset.top,
                        $left = $offset.left - ($width / 3);

                    $hint.offset({
                        top: $top,
                        left: $left
                    });
                    $hint.addClass('hint--games');


                });

                el.on('mouseleave', function(e) {

                    $hint.css({'left':'', 'top':''});
                    $hint.removeClass('visible--hint');
                    $hint.html('');
                });
            }

        }
    }

    var hint = HintConstructor();
    hint.hintGallery();
    hint.hintGames('.js-hint');

    // добавление элемента для расчёта
    function addedItem(el, el_add) {
        var item = document.getElementsByClassName(el),
            add = document.getElementsByClassName(el_add);

        var i,
            j,
            k;

        for(i = 0; i < item.length; i++) {

            item[i].onclick = function(e){
                var image = this.querySelector('img');
                var src = image.getAttribute('src');
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

    // удаление элемента для расчёта
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