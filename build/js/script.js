(function () {
    "use strict";

    function burger() {
        var $burger = $('.js-burger');

        $burger.on('click', function() {
            $(this).toggleClass('open');
        });

    }

    $(function(){

        burger();

    });


}());