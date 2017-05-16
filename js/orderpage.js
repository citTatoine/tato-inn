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


tatooine.controller("orders", ['$scope', '$http', function($scope, $http){

    $scope.items = ({});
    $scope.typeset = ({});
    $scope.suggestion = 0;
    $scope.suggestionName = "";
    $scope.tempPrice = ({});
    $scope.foodtype = "";

    $scope.save = function(index){

        var tempIndex = index.currentTarget.getAttribute("data-id");
        var menuItem = document.getElementById("item-" + tempIndex).innerHTML;

        if (menuItem in $scope.items ){
            $scope.items[menuItem]++;
        }else{
            $scope.items[menuItem] = 1;
        }

    };

    $scope.extendMeal = function(){

        var x = document.getElementById("combo-head").getAttribute("data-id");

        var y = $scope.suggestionName + " " + x;

        if (y in $scope.items ){
            $scope.items[y]++;
        }else{
            $scope.items[y] = 1;
        }

        console.log($scope.items)
    };

    $scope.remove = function(index){

        var tempIndex = index.currentTarget.getAttribute("data-id");

        delete $scope.items[tempIndex];

        // $scope.items.splice($scope.items.indexOf(index), 1);

    };

    $scope.update = function (index) {
        $scope.suggestion = index.currentTarget.getAttribute("data-id");

        var x =  $scope.suggestion + "";

        var y = document.getElementById("item-" + x).innerHTML;

        $scope.suggestionName = y;


        $http({method: 'GET', url: '/db/getItemPrice?itemName='+y}).then(function successCallback (response){

            $scope.tempPrice = response.data;

            console.log(response.data)

        });



    };


    $scope.getType = function(item){


        var type = item.currentTarget.getAttribute("data-id");

        $scope.foodtype = type;


        $http({method: 'GET', url: '/db/getCategory?itemType='+type}).then(function successCallback (response){

            $scope.typeset = response.data;

            console.log(response.data)

        });




    };

    $scope.getCombo = function(item){


        var type = item.currentTarget.getAttribute("data-id");

        $scope.foodtype = type;


        $http({method: 'GET', url: '/db/getCombo?itemType='+type}).then(function successCallback (response){

            $scope.typeset = response.data;

            console.log(response.data)

        });


    };






    // $scope.addCombo = function(index){
    //
    //     const tempIndex = index.currentTarget.getAttribute("data-id");
    //     const menuItem = document.getElementById("item-" + tempIndex);
    //
    //
    //     $scope.items.push(menuItem.innerHTML);
    //
    // };




}]);


