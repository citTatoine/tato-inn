$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    })
});


var tatooine = angular.module("tatooine", ["ngRoute"]);

tatooine.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "/partial/view1.html"
        })
        .when("/viewpage2", {
            templateUrl : "/partial/view2.html"
        })
        .otherwise({redirectTo: '/'});

});/**
 * Created by Kenneth on 2017-05-08.
 */
