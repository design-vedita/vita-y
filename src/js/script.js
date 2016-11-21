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
    is_edge: navigator.userAgent.indexOf("Edge") !== -1,
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

        if (App.is_edge) {
            App.htmlTag.addClass('edge');
        }

        $(".fancybox").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
        });

        var burger = new burgerActions();

        burger.openMenu();
        burger.heightMenu();
        burger.positionHeader();

        var questions = new question();
        questions.open();

        addedItem('js-elem-work', 'js-added-work');
        addedItem('js-elem-home', 'js-added-home');
        deleteItem('js-delete');
        heightGray();
        preloader();
        heightSlide();
        activeStep();
        beforeSelected();
        heightTopSlider();

        App.win.on('resize', function(){
            burger.heightMenu();
            heightGray();
            heightSlide();
            heightTopSlider();
            resizes($topSlider);
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
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 460,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });


        var $topSlider = $('.js-top-slider');


        // Слайдер верхний
        $topSlider.slick({
            'prevArrow': '<button type="button" class="slick-prev"></button>',
            'nextArrow': '<button type="button" class="slick-next"></button>',
            fade: true,
            speed: 1500,
            //autoplay: true,
            //autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]

        });

        resizes($topSlider);
        // размер кнопок влево-вправо подгоняем так, чтобы не было белого заднего
        // фона под размер картинки
        function resizes(slider) {

            var $prev = $(slider).find('button.slick-prev'),
                $next = $(slider).find('button.slick-next'),
                $current = $(slider).find('.slick-current'),
                $image = $current.find('img');



            var $imageWidth = $image.outerWidth(),
                clientWidth = document.documentElement.clientWidth;

            var $width = clientWidth - $imageWidth,
                $sizeButtton = $width / 2;


            $($prev).css({'max-width': $sizeButtton + 'px'});
            $($next).css({'max-width': $sizeButtton + 'px'});
        }

        /*.on('beforeChange', function(){
            var $slides = $('.slide');

            $slides.each(function(){

                var $clouds = $(this).find('.js-cloud');
                $clouds.removeClass('animated fadeIn');
            });
        })*/
        /*.on('afterChange', function(){
            var currentSlide = $('.js-top-slider').slick('slickCurrentSlide');

            var $slides = $('.slide');

            $slides.each(function(){
                var attr = $(this).attr('data-slick-index');

                if(attr == currentSlide) {
                    var $clouds = $(this).find('.js-cloud');

                    $clouds.each(function(){
                        $(this).addClass('animated fadeIn');
                    });
                }
            });
        });*/

        // Слайдер с мужиком
        $('.js-man-slider').slick({
            'prevArrow': '<button type="button" class="slick-prev-man"></button>',
            'nextArrow': '<button type="button" class="slick-next-man"></button>',
            fade: true,
            speed: 1000,
            infinite: true
        })
        .on('beforeChange', function(event, slick, currentSlide, nextSlide){

            // В этом блоке очищаем классы у предыдущего слайда, чтобы по возрату на него
            // анимация проигрывалась с начала
            var slide = '',
                $animateBlock = '';

            if (currentSlide == 1 || currentSlide == 0) {
                slide =   $('.js-man-slider').find('div[data-slick-index='+ currentSlide +']');
                $animateBlock = slide.find('.js-animate');
                $animateBlock.removeClass('animated fadeInRight fadeInLeft delay-300');
            } else if(currentSlide == 2){
                slide =   $('.js-man-slider').find('div[data-slick-index='+ currentSlide +']');
                $animateBlock = slide.find('.js-animate');

                // очищаем классы у второго блока, с задержкой, чтобы не было мерцания элементов
                // задержка равна скорости перемотки слайдов
                setTimeout(function(){
                    $animateBlock.removeClass('animated fadeOutLeft fadeOutRight');
                }, 1000);
            }
        })
        .on('afterChange', function(){
            // Первый слайд
            var slide = $('.js-man-slider').slick('slickCurrentSlide');

            // Второй слайд
            var $hand = $('.js-hand'),
                $big = $('.js-big'),
                $plant = $('.js-plant'),
                $science = $('.js-science'),
                $steps = $('.js-step');

            //Третий слайд
            var $zoomEl = $('.js-zoom'),
                $capsule = $('.js-capsule'),
                $bottle = $('.js-bottle'),
                $yellowCapsule = $('.js-yellow'),
                $blueCapsule = $('.js-blue'),
                $wrapperCounter = $('.js-animate-capsule');
            //счётчики
            var $counterOrange = $('.js-count-yellow'),
                $counterBlue = $('.js-count-blue');

            var $activeMan = $('.js-man-slider').find('.slick-active'), // получаем активный слайд
                $animateBlock = $activeMan.find('.js-animate');

            if (slide == 0) {
                $animateBlock
                    .addClass('animated fadeInLeft');
            }

            if(slide == 1) {
                $animateBlock.addClass('animated fadeInRight delay-300');
            }

            if(slide == 2) {
                $hand.addClass('no--visible');
                $big.addClass('no--visible');

                // Ищем в текущем слайде блоки с текстом и анимируем их
                setTimeout(function(){
                    $animateBlock.each(function(){

                        if($(this).hasClass('left')) {
                            $(this).addClass('fadeOutLeft animated');
                        } else if($(this).hasClass('right')) {
                            $(this).addClass('fadeOutRight animated');
                        }
                    });
                },   500);

                // Добавляем классы анимации сферам
                setTimeout(function(){
                        $plant.addClass('plant--move');
                        $science.addClass('science--move');
                    },  1000);

                // Добавляем классы анимации шагам
                $steps.each(function(i){
                    var $self = $(this);

                    // Добавляем отдельно, чтобы через step перекрыть время задержки
                    if (i == 4) {
                        setTimeout(function(){
                            $self.addClass('animated fadeIn step-' + i);
                        }, 2200)
                    }

                    // Добавляем классы анимации каждому шагу со своей задержкой
                    setTimeout(function(){
                        if(i != 4) {
                            $self.addClass('step-' + i);
                        }
                    }, 1200);

                });

            } else {
                // Удаляем классы для повтора анимации при возврате к слайду
                $hand.removeClass('no--visible');
                $big.removeClass('no--visible');
                $plant.removeClass('plant--move');
                $science.removeClass('science--move');

                // всем шагам раздаём классы анимации и задержки
                $steps.each(function(i){
                    $(this).removeClass('step-' + i + ' animated fadeIn');
                });
            }

            if (slide == 3) {
                $zoomEl.addClass('animated zoomOut');

                //большие капсулы даём им анимацию
                $capsule.each(function(){
                    var self = $(this);

                    if(self.hasClass('left')) {
                        self.addClass('animated fadeInLeft');
                    } else if (self.hasClass('right')) {
                        self.addClass('animated fadeInRight');
                    }

                    setTimeout(function(){
                       self.addClass('top-capsule');
                    }, 400);
                });

                // коробки в которые падают таблетки им тоже даём анимацию
                $bottle.each(function(){
                    var self = $(this);

                    setTimeout(function(){

                        if(self.hasClass('left')) {
                            self.addClass('animated fadeInUp');
                        } else if (self.hasClass('right')) {
                            self.addClass('animated fadeInUp');
                        }
                    },
                    800)
                });

                // анимированное появление счётчиков после старта
                setTimeout(function(){
                    $wrapperCounter.addClass('animated fadeInUp');
                }, 900);


                // Анимация падения жёлтых капсул
                $yellowCapsule.each(function(i){
                    var $self = $(this);

                    setTimeout(function(){
                        $self.addClass('delay-' + i + ' animate');
                    }, 1200);
                });

                // Анимация падения голубых капсул
                $blueCapsule.each(function(i){
                    var $self = $(this);

                    setTimeout(function(){
                        $self.addClass('delay-' + i + ' animate');
                    }, 1200);
                });


                // счётчик голубых капсул
                setTimeout(function(){
                    $($counterBlue).animate({ num: 63 }, {
                        duration: 3200,
                        step: function (num){
                            this.innerHTML = num.toFixed(0)
                        }
                    });
                }, 1200 , function(){

                });

                // счётчик оранжевых капсул
                setTimeout(function(){
                    $($counterOrange).animate({ num: 63 }, {
                        duration: 2500,
                        step: function (num){

                            this.innerHTML = num.toFixed(0)
                        }
                    });
                }, 1200);
            } else {

                // При перелистывании очищаем классы и счётчики, для повторного воспроизведения анимации
                // у данного слайда
                $capsule.removeClass('animated fadeInLeft fadeInRight top-capsule');
                $bottle.removeClass('fadeInUp animated');
                $wrapperCounter.removeClass('animated fadeInUp');
                $yellowCapsule.each(function(i){
                    $(this).removeClass('delay-' + i+ ' animate');
                });
                $blueCapsule.each(function(i){
                    $(this).removeClass('delay-' + i+ ' animate');
                });

                $($counterBlue).animate({ num: 0 }, {
                    step: function (num){
                        this.innerHTML = num.toFixed(0)
                    }
                });

                $($counterOrange).animate({ num: 0 }, {
                    step: function (num){
                        this.innerHTML = num.toFixed(0)
                    }
                });
            }

        });

        var popups = new closePopup;

        popups.addCart();
        popups.openComposition();
        popups.close();

        if(document.getElementById('vigdorovich')) {
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
                        $(this).addClass('animated bounceInDown');
                    });
                },
                offset: '30%'
            });
        }


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

    // Высота серой подложки в заголовке игры на мелких устройствах
    function heightGray() {
        var $line = $('.js-gray'),
            $title = $('.js-title-games'),
            clientWidth = document.documentElement.clientWidth;

        if(clientWidth <= 1199) {

            var $titleHeight = $title.outerHeight();
            $line.css({'height':$titleHeight});
        }
    }

    // Высота последнего слайдера с анимацией под высоту остальных
    function heightSlide() {
        var $slide = $('.js-slide'),
            $slideRecipient = $('.js-height-slide');

        var $slideHeight = $slide.outerHeight();

        $slideRecipient.css({'height': $slideHeight + 'px'});
    }


    // высота верхнего слайдера
    function heightTopSlider() {
        var $slider = $('.js-top-slider'),
            clientHeight = document.documentElement.clientHeight;

        if (clientHeight > 285) {
            $slider.css({'height': clientHeight - 69 + 'px'});
        }  else {
            $slider.css({'height': '258px'});
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
                //подсказки к фото в галерее в подвале
                var $link = $('.js-hint-gallery'),
                    $hint = $('.js-gallery-hint');

                    $link.on('mouseover', function(){
                        var $number = $(this).attr('data-hint'),
                            $offset = $(this).offset();


                        $hint.each(function(){
                            var $attr = $(this).attr('data-hint');

                                if ($number == $attr) {
                                    var $hintHeight = $(this).outerHeight();
                                    $(this).addClass('visible');

                                    var $top = $offset.top - ($hintHeight / 1.5);

                                    $(this).offset({
                                        left: $offset.left,
                                        top: $top
                                    });
                                } else {
                                    $(this).removeClass('visible');
                                }
                        });
                    });

                    $link.on('mouseout', function(){
                            $hint.each(function(){
                                $(this).removeClass('visible');
                            });
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

    // удаление элемента из расчёта
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

    // Подсказка при добалении в корзину

    function closePopup() {
        var $close = $('.js-close-cart'),
            $cart = $('.js-popup-cart'),
            $compositionLink = $('.js-composition-link'),
            $composition = $('.js-composition'),
            $overlay = $('.js-overlay'),
            $add = $('.js-add-good');


        return {
            // Закрытие
            close: function(){

                $close.on('click', function(){

                    var $parent = $(this).parents('.popup');

                    $parent.removeClass('visible');
                    $overlay.removeClass('visible');
                });
            },
            // Открытие
            addCart: function(){

                $add.on('click', function(){

                    var $cartHeight = $cart.outerHeight(),
                        $cartWidth = $cart.outerWidth();

                    $cart.css({'left':'calc(50% - '+ ($cartWidth / 2) +'px)','top': 'calc(50% - ' + ($cartHeight / 2) +'px)'});
                    $cart.addClass('visible');
                    $overlay.addClass('visible');

                    return false;
                });
            },
            // Всплывающее окно состав
            openComposition: function(){
                $compositionLink.on('click', function(){

                    var $composition_this = $(this).closest('.catalog__list__item').children('.js-composition');

                    var    $composHeight = $composition_this.outerHeight();
                    var    $composWidth = $composition_this.outerWidth();

                    $composition_this.css({'left':'calc(50% - '+ ($composWidth / 2) +'px)','top': 'calc(50% - ' + ($composHeight / 2) +'px)'});
                    $composition_this.addClass('visible');
                    $overlay.addClass('visible');

                });
            }
        }

    }

    // Вопрос-ответ открываем вкладки

    function question() {
        var $links = $('.js-view-this');

        return {

            open: function(){
                var i = 0;

                $links.on('click', function(){
                    i++;
                    $(this).toggleClass('opened');

                    (i % 2 == 0) ? $(this).html('Показать ответ') : $(this).html('Скрыть ответ');

                    var $parent  = $(this).parent(),
                        $block = $parent.find('.js-inner');

                    $block.slideToggle();

                });
            }

        }
    }

    // Активный шаг в корзине показываем элементы
    function activeStep() {
        var $steps = $('.js-step');

            $steps.each(function(i){

                if ($(this).hasClass('active--step') && i != 0) {

                    var $prev = $(this).prev();

                    var $foot = $prev.find('.foot');
                        $foot.addClass('visible');
                }
            });
    }

    function beforeSelected() {
        var titles = document.querySelectorAll('.js-title-good');

            if(titles) {

                for (var i = 0; i < titles.length; i++) {
                    var text = titles[i].innerHTML;
                        text = text.replace('before', '<span>before</span>');
                        text = text.replace('after', '<span>after</span>');
                        titles[i].innerHTML = text;
                }
            }

    }

    (function(){
        $('.js-cart-select, .js-date, .js-month, .js-year, .js-country').styler();
    })();

}(App));
