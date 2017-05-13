/**
 * Created by renzo on 2017-05-11.
 */
var adminapp = angular.module("admin", ["ngRoute"]);

adminapp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/admin", {
            templateUrl : "/admin-partials/dashboard.html"
        })
        .when("/admin/accounts", {
            templateUrl : "/admin-partials/accountdetails.html",
            controller: "postgreSQLCtrl"
        })
        .when("/admin/transactions", {
            templateUrl : "/admin-partials/transactions.html"
        })
        .when("/admin/menu", {
            templateUrl : "/admin-partials/menu.html"
        })
        .otherwise({redirectTo: '/'});

});

adminapp.controller('postgreSQLCtrl', ['$scope' ,'$http',  function($scope,$http) {
    $scope.created_username = '';
    $scope.user_option = '';
    $scope.created_password = '';
    $scope.con_created_password = '';

    $scope.register = function(){
        $http({method: 'GET', url: '/db/register?created_username='+$scope.created_username+'&user_option='+$scope.user_option+'&created_password='+$scope.created_password+'&con_created_password='+$scope.con_created_password}).then(function successCallback (response){
            $scope.dataset = response;
        }, function errCallback(response){
            $scope.dataset = response || "Request failed ";
        });
    }
}]);