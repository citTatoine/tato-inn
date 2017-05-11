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
            templateUrl : "/admin-partials/accountdetails.html"
        })
        .when("/admin/transactions", {
            templateUrl : "/admin-partials/transactions.html"
        })
        .when("/admin/menu", {
            templateUrl : "/admin-partials/menu.html"
        })
        .otherwise({redirectTo: '/'});

});