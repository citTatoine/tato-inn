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

    $(document).ready(function () {
        mainApp.main_fun();

        document.getElementById("reg_but").addEventListener("click", function () {
            $.ajax({
                url: "/register",
                type: "post",
                data: {
                    username: document.getElementById("created_username").value,
                    user: document.getElementById("user_option").value,
                    pass: document.getElementById("created_password").value,
                    con_pass: document.getElementById("con_created_password").value
                },
                success: function (resp) {
                    console.log(resp);
                }
            });
        });
    });

}(jQuery));


 // var register = document.getElementById("reg_but");
 // $(document).ready(function() {
 //
 //     if (register) {
 //         console.log("checkpoint1");
 //         register.addEventListener("click", function () {
 //             $.ajax({
 //                 url: "/register",
 //                 type: "post",
 //                 data: {
 //                     un: document.getElementById("created_username").value,
 //                     user: document.getElementById("user_option").value,
 //                     pass: document.getElementById("created_password").value,
 //                     con_pass: document.getElementById("con_created_password").value
 //                 },
 //                 success: function (resp) {
 //                     console.log(resp);
 //                 }
 //             });
 //         });
 //
 //     }
 //     else {
 //         console.log("fail");
 //         console.log("checkpoint1");
 //         register.addEventListener("click", function () {
 //             $.ajax({
 //                 url: "/register",
 //                 type: "post",
 //                 data: {
 //                     un: document.getElementById("created_username").value,
 //                     user: document.getElementById("user_option").value,
 //                     pass: document.getElementById("created_password").value,
 //                     con_pass: document.getElementById("con_created_password").value
 //                 },
 //                 success: function (resp) {
 //                     console.log(resp);
 //                 }
 //             });
 //         });
 //     }
 // });