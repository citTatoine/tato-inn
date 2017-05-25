// -------------------------------------------------------//
// Authors by: Kenneth and Kaliban
// ------------------------------------------------------//

var tatooine = angular.module("tatooine-kitchen", []);

tatooine.controller("kitchen", ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

    // -------------------------------------------------------//
    // Scope Variables
    // ------------------------------------------------------//

    $scope.orderId = [];
    $scope.orders = [];
    $scope.prices = ({});
    $scope.finished = [];
    $scope.button={};
    $scope.work = ({});
    $scope.selected = {};
    $scope.hotPotato = [];
    $scope.countdown = 300;

    // -------------------------------------------------------//
    // Loads all orders pending
    // ------------------------------------------------------//



    angular.element(document).ready(function () {


        $http({method: 'GET', url: '/db/getorders'}).then(function successCallback (response){

            for (var i = 0; i < response.data.length; i++) {
                $scope.orderId.push(response.data[i].order_id)
            }

            console.log($scope.orderId);

            $scope.populate($scope.orderId);

            $timeout(function () {

                $scope.test($scope.orders);

            }, 1000);


        });



        $http({method: 'GET', url: '/db/getPrice'}).then(function successCallback (response){

            $scope.prices = response.data;

            console.log($scope.prices)

        });


    });


    // -------------------------------------------------------//
    // Refreshes Orders
    // ------------------------------------------------------//


    $scope.reload = function () {

        $http({method: 'GET', url: '/db/getorders'}).then(function successCallback (response){

            $scope.orderId = [];

            for (var i = 0; i < response.data.length; i++) {
                $scope.orderId.push(response.data[i].order_id)
            }

            console.log($scope.orderId);

            $scope.populate($scope.orderId);

            $timeout(function () {

                $scope.test($scope.orders);

            }, 1000);


        });

        $http({method: 'GET', url: '/db/getPrice'}).then(function successCallback (response){

            $scope.prices = ({});

            $scope.prices = response.data;

            console.log($scope.prices)

        });

    };


    // -------------------------------------------------------//
    // Populates the Order Screen
    // ------------------------------------------------------//

    $scope.populate = function (orderid) {

        $scope.orders = [];

        for(var i = 0; i < orderid.length; i++){

            $http({method: 'GET', url: '/db/getitems?orderId='+orderid[i]}).then(function successCallback (response){

                for(var x = 0; x < response.data.length; x++){
                    if(response.data[x].combo == true){
                        response.data[x].item_name = response.data[x].item_name+" combo";
                    }

                }

                $scope.orders.push(response.data);

                $scope.orders.sort(function(a, b){
                    return a[0].order_id > b[0].order_id;
                });


            });
        }


    };


    // -------------------------------------------------------//
    // Populates the total amount of work needed to complete
    // ------------------------------------------------------//


    $scope.test = function (temp) {

        $scope.work = ({});

        for(var x = 0; x < temp.length; x++){

            var temp1 = temp[x];
            for(var z = 0; z < temp1.length; z++){

                if(temp1[z].item_name in $scope.work){
                    $scope.work[temp1[z].item_name] += temp1[z].quantity;
                }else{
                    $scope.work[temp1[z].item_name] = temp1[z].quantity;
                }

            }
        }

    };

    // -------------------------------------------------------//
    //      Cooking Button
    // ------------------------------------------------------//


    $scope.selectCookAmt = function (quantity) {

        $scope.button.disabled=true;


        $timeout(function () {

            $scope.hotPotato.push([$scope.selected.item_name, quantity]);

            $timeout(function () {

                $timeout(function () {

                    $scope.test($scope.orders);

                    $scope.button.disabled=false;
                }, 2000);

                $scope.fillOrders();

            }, 2000);

        }, 2000);


    };


    // -------------------------------------------------------//
    // Removes cooked items from hotbox after 5min
    // ------------------------------------------------------//


    $scope.remove = function(index, name, qty) {

        var price = 0;

        for(var i = 0; i<$scope.prices.length; i++){

            if($scope.prices[i].item_comboprice !== null){
                var x = $scope.prices[i].item_name + " combo";

                if(x == name){
                    price = $scope.prices[i].item_comboprice;

                }else if($scope.prices[i].item_name == name){
                        price = $scope.prices[i].item_price;
                }
            }else if($scope.prices[i].item_name == name){
                    price = $scope.prices[i].item_price;
            }
        }


        $http({method: 'GET', url: '/db/addSpoil?item_name='+name+'&quantity='+qty+'&price='+price}).then(function successCallback (response){


        });

        $scope.hotPotato.splice(index, 1);

    };


    // -------------------------------------------------------//
    // Loads up order tray to complete order
    // ------------------------------------------------------//


    $scope.fillOrders = function () {


        for(var x = 0; x < $scope.orders.length; x++){
            for(var y = 0; y < $scope.orders[x].length; y++) {
                for (var i = 0; i < $scope.hotPotato.length; i++) {
                    if ($scope.hotPotato[i][0] == $scope.orders[x][y].item_name) {
                        if ($scope.hotPotato[i][1] >= $scope.orders[x][y].quantity) {
                            $scope.hotPotato[i][1] -= $scope.orders[x][y].quantity;
                            $scope.orders[x][y].quantity = 0;
                            if($scope.hotPotato[i][1] == 0){
                                $scope.removeHot();
                            }
                            $scope.removeOrders();
                        } else {
                            $scope.orders[x][y].quantity -= $scope.hotPotato[i][1];
                            $scope.hotPotato[i][1] = 0;
                            $scope.removeHot();
                        }
                    }
                }
            }
        }


    };


    // -------------------------------------------------------//
    //        Remove after all items are used to load tray
    // ------------------------------------------------------//



    $scope.removeHot = function() {

        for(var x = 0; x < $scope.hotPotato.length; x++){
            if($scope.hotPotato[x][1] == 0){
                $scope.hotPotato.splice(x, 1);
            }
        }

    };



    // -------------------------------------------------------//
    //  Completes orders, update and reloads
    // ------------------------------------------------------//


    $scope.removeOrders = function() {

        for(var i = 0; i < $scope.orders.length; i++){
            var counter = 0;
            for(var x = 0; x < $scope.orders[i].length; x++){
                if($scope.orders[i][x].quantity == 0){
                    counter += 1;
                    if(counter == $scope.orders[i].length){
                        $scope.finished.push($scope.orders[i]);
                        $scope.updateStatus($scope.orderId[i]);
                        $scope.orders.splice(i, 1);
                        $timeout(function(){
                            $scope.reload();
                        }, 2000);
                    }
                }
            }
        }

    };


    // -------------------------------------------------------//
    //      Update order DB to finish
    // ------------------------------------------------------//


    $scope.updateStatus = function (index) {

        $http({method: 'GET', url: '/db/updateStatus?order='+index}).then(function successCallback (response){

            console.log(response)

        });

    };

}]);





// -------------------------------------------------------//
//      destroy directive on hotbox
// ------------------------------------------------------//


tatooine.directive('destroy', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope:{data: '@',delete: '&',itemname: '@', quantity: '@'},

        link: function (scope, element, attrs) {

            $timeout(function () {

                scope.delete({index: scope.data, name: scope.itemname, qty: scope.quantity})

            }, 300000);

        }
    };
}]);


// -------------------------------------------------------//
//      hotbox timer directive
// ------------------------------------------------------//

tatooine.directive('countdown', ['Util', '$interval', function (Util, $interval) {
            return {
                restrict: 'A',
                scope: { date: '@' },
                link: function (scope, element) {
                    $interval(function () {

                        scope.date--;

                        return element.text(Util.dhms(scope.date));

                    }, 1000, [300]);
                }
            };
        }
    ]);
tatooine.factory('Util', [function () {
        return {
            dhms: function (t) {
                var minutes, seconds;
                minutes = Math.floor(t / 60) % 60;
                t -= minutes * 60;
                seconds = t % 60;
                return [
                    minutes + 'm',
                    seconds + 's'
                ].join(' ');
            }
        };
    }]);