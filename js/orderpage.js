/**
 * Created by Kenneth on 2017-05-11.
 */

// ----------------------------------//
// Page routes to orderpage.html View
// ----------------------------------//

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
        .when("/orderpage/allmenu", {
            templateUrl : "/order-partials/allchoices.html"
        })
        .otherwise({redirectTo: '/'});

});


// ----------------------------------//
// Swipe carousel on orderpage
// ----------------------------------//

tatooine.directive('wrapOwlcarousel', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var options = scope.$eval($(element).attr('data-options'));
            $(element).owlCarousel(options);
        }
    };
});


// ----------------------------------//
// Orderpage Controller
// ----------------------------------//


tatooine.controller("orders", ['$scope', '$http', '$window', function($scope, $http, $window){



    $scope.cart = ({});
    $scope.typeset = ({});
    $scope.tempPrice = ({});
    $scope.foodtype = "";
    $scope.tempitem = ({});
    $scope.ammount = 0;
    $scope.ordernumber = 0;




    // -------------------------------------------------------//
    // Adds single items from suggestive tab content to orders
    // ------------------------------------------------------//

    $scope.save = function(){

        var x = ({});

        x["item_id"] = $scope.tempitem.item_id;
        x["item_price"] = $scope.tempitem.item_price;
        x["qty"] = $scope.tempitem.qty;
        x["combo"] = false;

        if($scope.tempitem.item_name in $scope.cart ){
            $scope.cart[$scope.tempitem.item_name].qty++
        }else {
            $scope.cart[$scope.tempitem.item_name] = x;
        }


        $scope.ammount += $scope.tempitem.item_price;

    };

    // -------------------------------------------------------//
    // Adds single items from menu content to orders
    // ------------------------------------------------------//

    $scope.saveIndividual = function(index){
        $scope.tempitem = index;

        $scope.tempitem["qty"] = 1;

        var x = ({});

        x["item_id"] = $scope.tempitem.item_id;
        x["item_price"] = $scope.tempitem.item_price;
        x["qty"] = $scope.tempitem.qty;
        x["combo"] = false;

        if($scope.tempitem.item_name in $scope.cart ){
            $scope.cart[$scope.tempitem.item_name].qty++
        }else {
            $scope.cart[$scope.tempitem.item_name] = x;
        }

        $scope.ammount += $scope.tempitem.item_price;

    };

    // -------------------------------------------------------//
    // Adds combo items from menu content to orders
    // ------------------------------------------------------//

    $scope.saveCombo = function(index){
        $scope.tempitem = index;

        $scope.tempitem["qty"] = 1;

        var x = ({});

        x["item_id"] = $scope.tempitem.item_id;
        x["item_price"] = $scope.tempitem.item_combo_price;
        x["qty"] = $scope.tempitem.qty;
        x["combo"] = true;

        var y = $scope.tempitem.item_name + " Combo";

        if(y in $scope.cart ){
            $scope.cart[y].qty++
        }else {
            $scope.cart[y] = x;
        }

        $scope.ammount += $scope.tempitem.item_combo_price;

    };

    // -------------------------------------------------------//
    // Adds combo from suggestive content to orders
    // ------------------------------------------------------//


    $scope.extendMeal = function(){

        var x = ({});

        x["item_id"] = $scope.tempitem.item_id;
        x["item_price"] = $scope.tempitem.item_combo_price;
        x["qty"] = $scope.tempitem.qty;
        x["combo"] = true;

        var y = $scope.tempitem.item_name + " Combo";

        if(y in $scope.cart ){
            $scope.cart[y].qty++
        }else {
            $scope.cart[y] = x;
        }

        $scope.ammount += $scope.tempitem.item_combo_price;




    };

    // -------------------------------------------------------//
    // Remove items from orders
    // ------------------------------------------------------//

    $scope.remove = function(x, y){

        $scope.ammount -= y.qty*y.item_price;

        delete $scope.cart[x];

    };

    // -------------------------------------------------------//
    // Updates Scope items within controller
    // ------------------------------------------------------//

    $scope.updateChoice = function (index) {


        $scope.tempitem = index;

        $scope.tempitem["qty"] = 1;




    };

    // -------------------------------------------------------//
    // Query to grab items from item table
    // ------------------------------------------------------//


    $scope.getType = function(item){


        var type = item.currentTarget.getAttribute("data-id");

        $scope.foodtype = type;


        $http({method: 'GET', url: '/db/getCategory?itemType='+type}).then(function successCallback (response){

            $scope.typeset = response.data;


        });




    };


    $scope.getAll = function(){

        $http({method: 'GET', url: '/db/getAll'}).then(function successCallback (response){

            $scope.typeset = response.data;


        });

    };


    // -------------------------------------------------------//
    // Query to grab Combo from item table
    // ------------------------------------------------------//

    $scope.getCombo = function(item){


        var type = item.currentTarget.getAttribute("data-id");

        $scope.foodtype = type;


        $http({method: 'GET', url: '/db/getCombo?itemType='+type}).then(function successCallback (response){

            $scope.typeset = response.data;


        });


    };

    // -------------------------------------------------------//
    // Insert into order returns order ID and pick up number
    // ------------------------------------------------------//

    $scope.checkout = function(){


        var total =  $scope.ammount;

        var status = "onhold";


        $http({method: 'GET', url: '/db/addOrderItems?total='+total+'&orderStatus='+status}).then(function successCallback (response){



            $scope.ordernumber = response.data.order_pickup_id;

            $scope.addTransaction(response.data.order_id)


            });



    };


    // -------------------------------------------------------//
    // Insert into item_order
    // ------------------------------------------------------//


    $scope.addTransaction = function (value) {

        for (var key in $scope.cart) {


            console.log($scope.cart[key]);

            $http({
                method: 'GET',
                url: '/db/addOrder?item_ID='+$scope.cart[key].item_id+'&comboBoolean='+$scope.cart[key].combo+'&order_ID='+value+'&quantity='+$scope.cart[key].qty}).then(function successCallback(response) {

                console.log(response);

                $scope.saveOrderNo($scope.ordernumber);


            });
        }



    };


    // -------------------------------------------------------//
    // Saves ordernumber session
    // ------------------------------------------------------//


    $scope.saveOrderNo = function (value) {


        $http({
            method: 'GET',
            url: '/save/CusPickupNo?pickup='+value

        })
            .then(function successCallback(response) {

            if(response.data === "Success"){
                $window.location.href ="/pickup"
            }


        });


    };







}]);

