/**
 * Created by Kenneth on 2017-05-21.
 */


var tatooine = angular.module("tatooine", ["ngRoute"]);


tatooine.controller("pickup", ['$scope', '$http', function($scope, $http){



    $scope.ordernumber = 0;




    $scope.getOrderNo = function () {


        $http({
            method: 'GET',
            url: '/get/CusPickupNo'

        })
            .then(function successCallback(response) {

                console.log(response);

                $scope.ordernumber = response.data;


            });


    };



}]);
