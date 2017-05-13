/**
 * Created by Kenneth on 2017-05-11.
 */
var tatooine = angular.module("tatooine", ["ngRoute"]);

tatooine.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/orderpage/menu1", {
            templateUrl : "/order-partials/menuchoices.html"
        })
        .when("/orderpage/menu2", {
            templateUrl : "/order-partials/menuchoices2.html"
        })
        .when("/orderpage/menu3", {
            templateUrl : "/order-partials/menuchoices3.html"
        })
        .when("/orderpage/menu4", {
            templateUrl : "/order-partials/menuchoices4.html"
        })
        .when("/orderpage/menu5", {
            templateUrl : "/order-partials/menuchoices5.html"
        })
        .when("/orderpage/menu6", {
            templateUrl : "/order-partials/menuchoices6.html"
        })
        .when("/orderpage/menu7", {
            templateUrl : "/order-partials/menuchoices7.html"
        })
        .otherwise({redirectTo: '/'});

});

tatooine.directive('wrapOwlcarousel', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var options = scope.$eval($(element).attr('data-options'));
            $(element).owlCarousel(options);
        }
    };
});

tatooine.controller("orders", function($scope){

    $scope.items= ["Mc double", "cheese burger"];

    $scope.save = function(){

        $scope.items.push($scope.newItem)

    };

    $scope.remove = function(index){
        $scope.items.splice(index,1)
    }

});


