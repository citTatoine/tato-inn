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
<<<<<<< HEAD
            controller: "accounts_controller"
=======
            controller: "postgreSQLCtrl"
>>>>>>> develop
        })
        .when("/admin/transactions", {
            templateUrl : "/admin-partials/transactions.html"
        })
        .when("/admin/menu", {
            templateUrl : "/admin-partials/menu.html",
            controller: "menu_controller"
        })
        .otherwise({redirectTo: '/'});

});

<<<<<<< HEAD
adminapp.controller('accounts_controller', ['$scope' ,'$http',  function($scope,$http) {
    //MODIFY USER
    $scope.old_password = '';
    $scope.new_created_password = '';
    $scope.con_new_created_password = '';

    //ADD USER
=======
adminapp.controller('postgreSQLCtrl', ['$scope' ,'$http',  function($scope,$http) {
>>>>>>> develop
    $scope.created_username = '';
    $scope.user_option = '';
    $scope.created_password = '';
    $scope.con_created_password = '';

<<<<<<< HEAD

    $scope.modify = function(){
        $http({method: 'GET', url: '/db/modify?old_password='+$scope.old_password+'&new_created_password='+$scope.new_created_password+'&con_new_created_password='+$scope.con_new_created_password}).then(function successCallback (){
            console.log("query successful")
        }, function errCallback(){
            console.log("query unsuccessful")
        });
    }


    $scope.register = function(){
        $http({method: 'GET', url: '/db/register?created_username='+$scope.created_username+'&user_option='+$scope.user_option+'&created_password='+$scope.created_password+'&con_created_password='+$scope.con_created_password}).then(function successCallback (){
            console.log("query successful")
        }, function errCallback(){
            console.log("query unsuccessful")
        });
    }
}]);

adminapp.controller('menu_controller', ['$scope' ,'$http',  function($scope,$http) {
    //MODIFYING PAGE
    $scope.selected_item_name = '';
    $scope.edited_item_name = '';
    $scope.edited_item_type = '';
    $scope.edited_item_price = '';
    $scope.edited_item_combo_price = '';
    $scope.edited_item_img = '';

    //ADDING PAGE
    $scope.added_item_name = '';
    $scope.added_item_type = '';
    $scope.added_item_price = '';
    $scope.added_item_combo_price = '';
    $scope.added_item_img = '';

    $scope.alterItem = function(){

        if($scope.selected_item_name == ''){
            $scope.selected_item_name = 'default';
        }
        if($scope.edited_item_name == ''){
            $scope.edited_item_name = 'default';
        }
        if($scope.edited_item_type == ''){
            $scope.edited_item_type = 'default';
        }
        if($scope.edited_item_price == ''){
            $scope.edited_item_price = 'default';
        }
        if($scope.edited_item_combo_price == ''){
            $scope.edited_item_combo_price = 'default';
        }
        if($scope.edited_item_img.name == ''){
            $scope.edited_item_img.name = 'default';
        }

        $http({method: 'GET', url: '/db/alterItem?selected_item_name='+$scope.selected_item_name+'&edited_item_name='+$scope.edited_item_name+'&edited_item_type='+$scope.edited_item_type+'&edited_item_price='+$scope.edited_item_price+'&edited_item_combo_price='+$scope.edited_item_combo_price+'&edited_item_img='+$scope.edited_item_img.name}).then(function successCallback (){
            console.log("query successful")
            // $scope.getCategory();
        }, function errCallback(){
            console.log("query unsuccessful")
        });

        $scope.selected_item_name = '';
        $scope.edited_item_name = '';
        $scope.edited_item_type = '';
        $scope.edited_item_price = '';
        $scope.edited_item_combo_price = '';
        $scope.edited_item_img = '';
    }

    $scope.addItem = function(){
        $http({method: 'GET', url: '/db/addItem?added_item_name='+$scope.added_item_name+'&added_item_type='+$scope.added_item_type+'&added_item_price='+$scope.added_item_price+'&added_item_combo_price='+$scope.added_item_combo_price+'&added_item_img='+$scope.added_item_img.name}).then(function successCallback (){
            console.log("query successful")
            // $scope.getCategory();
        }, function errCallback(){
            console.log("query unsuccessful")
        });
    }
}]);


adminapp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
=======
    $scope.register = function(){
        $http({method: 'GET', url: '/db/register?created_username='+$scope.created_username+'&user_option='+$scope.user_option+'&created_password='+$scope.created_password+'&con_created_password='+$scope.con_created_password}).then(function successCallback (response){
            $scope.dataset = response;
        }, function errCallback(response){
            $scope.dataset = response || "Request failed ";
        });
    }
>>>>>>> develop
}]);