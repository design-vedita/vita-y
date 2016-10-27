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

        slider: function(){
            var clientHeight = document.documentElement.clientHeight,
                slider = document.getElementsByClassName('js-top-slider')[0];

                slider.style.height = clientHeight - 69 + 'px';
        },

        menu: function() {
            var clientHeight = document.documentElement.clientHeight,
                menu = document.getElementsByClassName('js-menu')[0];

                menu.style.height = clientHeight + 'px';
        }

    };


    $(function(){

        burger();

       // height.slider();
        height.menu();

        $('.js-top-slider').slick({
            'prevArrow': '<button type="button" class="slick-prev"></button>',
            'nextArrow': '<button type="button" class="slick-next"></button>'
        });

        window.onresize = function() {
            height.slider();
            height.menu();
        }
    });


}());