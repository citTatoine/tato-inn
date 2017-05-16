 // Created by Kenneth on 2017-05-09

(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {

            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

          
     
        },

        initialization: function () {
            mainApp.main_fun();

        }

    };

}(jQuery));


