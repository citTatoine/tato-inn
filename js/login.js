/**
 * Created by renzo on 2017-05-09.
 */
import angular from 'angular';

var myApp = angular.module('login',[]);
myApp.controller('login_controller', ['$scope' ,'$http', '$window',  function($scope,$http,$window) {
    $scope.val1 = 'This is temp Val' ;
    $scope.uName = '';
    $scope.pWord = '';

    $scope.login = function(){
        $http({method: 'GET', url: '/db/login?uName='+$scope.uName+'&pWord='+$scope.pWord}).then(function successCallback (response){
            $scope.dataset = response;
            if(response.data.type == "admin"){
                $window.location.href = "/admin";
            }
            else if (response.user.type == "chef"){
                $window.location.href = "/kitchen";
            }
        }, function errCallback(response){
            $scope.dataset = response || "Request failed ";
        });
    }
}]);
