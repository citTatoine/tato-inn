/**
 * Created by renzo on 2017-05-09.
 */
import angular from 'angular';

var myApp = angular.module('login',[]);
myApp.controller('login_controller', ['$scope' ,'$http', '$window',  function($scope,$http,$window) {
    $scope.uName = '';
    $scope.pWord = '';

    $scope.login = function(){
        $http({method: 'GET', url: '/db/login?uName='+$scope.uName+'&pWord='+$scope.pWord}).then(function successCallback (response){

            $window.location.reload();
            console.log(response);
        }, function errCallback(response){
            $scope.dataset = response || "Request failed ";
        });
    }
}]);
