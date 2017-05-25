/**
 * Created by renzo on 2017-05-11.
 */

import angular from 'angular';
import ngRoute from 'angular-route';

angular.module('fileModelDirective', [])

    .directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var parsedFile = $parse(attrs.fileModel);
                var parsedFileSetter = parsedFile.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        parsedFileSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

angular.module('uploadFileService', [])

    .service('uploadFile', function($http) {
        this.upload = function(file) {
            var fd = new FormData();
            fd.append('myfile', file.upload);
            return $http.post('/upload/', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        };

    });

var adminapp = angular.module("admin", [ngRoute ,'uploadFileService', 'fileModelDirective']);

adminapp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/staff/dashboard", {
            templateUrl : "/admin-partials/dashboard.html"
        })
        .when("/staff/accounts", {
            templateUrl : "/admin-partials/accountdetails.html",
            controller: "accounts_controller"
        })
        .when("/staff/transactions", {
            templateUrl : "/admin-partials/transactions.html",
            controller: "transaction_controller"
        })
        .when("/staff/menu", {
            templateUrl : "/admin-partials/menu.html",
            controller: "menu_controller"
        })
        .otherwise({redirectTo: '/staff'});

});

adminapp.controller('logout_controller', ['$scope', '$http', '$window', function($scope,$http,$window){
    $scope.logout = function(){
        console.log("its working kinda");
        $http({method: 'GET', url: '/logout'}).then(function successCallback (response) {
            console.log(response);
            console.log("query successful");
            $window.location.href = '/staff';
        }, function errCallback() {
            console.log("query unsuccessful");
        });
    }
}]);

adminapp.controller('shop_controller', ['$scope', '$http', function($scope,$http){
    $scope.openShop = function(){
        $http({method: 'GET', url: '/openShop'}).then(function successCallback () {
            console.log("query successful");
        }, function errCallback() {
            console.log("query unsuccessful");
        });
    }
    $scope.closeShop = function(){
        $http({method: 'GET', url: '/closeShop'}).then(function successCallback () {
            console.log("query successful");
        }, function errCallback() {
            console.log("query unsuccessful");
        });
    }

}]);
adminapp.controller('accounts_controller', ['$scope' ,'$http',  function($scope,$http) {
    //MODIFY USER
    $scope.old_password = '';
    $scope.new_created_password = '';
    $scope.con_new_created_password = '';

    //ADD USER
    $scope.created_username = '';
    $scope.user_option = '';
    $scope.created_password = '';
    $scope.con_created_password = '';

    //DELETE USER
    $scope.own_password;
    $scope.deleted_user;


    $scope.modify = function(){
        $http({method: 'GET', url: '/db/modify?old_password='+$scope.old_password+'&new_created_password='+$scope.new_created_password+'&con_new_created_password='+$scope.con_new_created_password}).then(function successCallback (response){
            console.log("query successful");
        }, function errCallback(response){
            console.log("query unsuccessful");
        });
    }


    $scope.registers = function(){
        $http({method: 'GET', url: '/db/register?created_username='+$scope.created_username+'&user_option='+$scope.user_option+'&created_password='+$scope.created_password+'&con_created_password='+$scope.con_created_password}).then(function successCallback (response){
            console.log("query successful");
        }, function errCallback(){
            console.log("query unsuccessful");
        });
    }

    $scope.deleteUser = function(){
        $http({method: 'GET', url: '/db/deleteUser?own_password='+$scope.own_password+'&deleted_user='+$scope.deleted_user}).then(function successCallback (response){
            console.log("query successful");
        }, function errCallback(response){
            console.log("query unsuccessful");
        });
    }
}]);


adminapp.controller('menu_controller', ['$scope' ,'$http', '$timeout', 'uploadFile', function($scope,$http,$timeout,uploadFile) {
    //MODIFYING PAGE
    $scope.selected_item_name = '';
    $scope.edited_item_name = '';
    $scope.edited_item_type = '';
    $scope.edited_item_price = '';
    $scope.edited_item_combo_price = '';
    $scope.edited_item_img = '';

    $scope.edited_item_img_name = $scope.edited_item_img.name;

    $scope.file = {};
    $scope.message = false;
    $scope.alert = '';
    $scope.default = 'http://www.engraversnetwork.com/files/placeholder.jpg';

    //ADDING PAGE
    $scope.added_item_name = '';
    $scope.added_item_type = '';
    $scope.added_item_price = '';
    $scope.added_item_combo_price = '';
    $scope.added_item_img = '';

    //DELETING PAGE
    $scope.deleted_item_name = '';

    $scope.item_type = '';

    $scope.save_item_type = function () {

        $http({method: 'GET', url: '/db/saveItemType?selected_item_name='+$scope.selected_item_name}).then(function successCallback (response){
            console.log("query successful");
            $scope.item_type = response.data.rows[0].item_type;
            $scope.alterItem();

        }, function errCallback(response) {
            console.log(response);
            console.log("query unsuccessful");
        });
    };


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
        if($scope.edited_item_img == ''){
            $scope.edited_item_img = 'default';
        }

        console.log($scope.edited_item_type);
        $http({method: 'GET', url: '/db/alterItem?selected_item_name='+$scope.selected_item_name+'&edited_item_name='+$scope.edited_item_name+'&edited_item_type='+$scope.edited_item_type+'&edited_item_price='+$scope.edited_item_price+'&edited_item_combo_price='+$scope.edited_item_combo_price+'&edited_item_img='+$scope.edited_item_img.name+"&item_type="+$scope.item_type}).then(function successCallback (response){
            console.log("query successful");
            $scope.uploadPhoto();
        }, function errCallback(){
            console.log("query unsuccessful");
        });

        $scope.selected_item_name = '';
        $scope.edited_item_name = '';
        $scope.edited_item_type = '';
        $scope.edited_item_price = '';
        $scope.edited_item_combo_price = '';
        $scope.edited_item_img = '';

    };

    $scope.addItem = function(){
        $http({method: 'GET', url: '/db/addItem?added_item_name='+$scope.added_item_name+'&added_item_type='+$scope.added_item_type+'&added_item_price='+$scope.added_item_price+'&added_item_combo_price='+$scope.added_item_combo_price+'&added_item_img='+$scope.added_item_img.name}).then(function successCallback (response){
            console.log("query successful");
            $scope.uploadPhoto();
        }, function errCallback(response){
            console.log("query unsuccessful");
        });
    };

    $scope.deleteItem = function(){
        $http({method: 'GET', url: '/db/deleteItem?deleted_item_name='+$scope.deleted_item_name}).then(function successCallback (){
            console.log("query successful");
        }, function errCallback(){
            console.log("query unsuccessful");
        });
    };
    $scope.uploadPhoto = function () {
        $scope.uploading = true;
        uploadFile.upload($scope.file).then(function(data) {
            if (data.data.success) {
                $scope.uploading = false;
                $scope.alert = 'alert alert-success';
                $scope.message = data.data.message;
                $scope.file = {};
            } else {
                $scope.uploading = false;
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
            }
        });
    };

    $scope.photoChanged1 = function(files) {
        if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
            $scope.uploading = true;
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function() {
                    $scope.thumbnail1 = {};
                    $scope.thumbnail1.dataUrl = e.target.result;
                    $scope.uploading = false;
                    $scope.message = false;
                });
            };
        } else {
            $scope.thumbnail1 = {};
            $scope.message = false;
        }

    };
    // $scope.photoChanged2 = function(files) {
    //     if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
    //         $scope.uploading = true;
    //         var file = files[0];
    //         var fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = function(e) {
    //             $timeout(function() {
    //                 $scope.thumbnail2 = {};
    //                 $scope.thumbnail2.dataUrl = e.target.result;
    //                 $scope.uploading = false;
    //                 $scope.message = false;
    //             });
    //         };
    //     } else {
    //         $scope.thumbnail2 = {};
    //         $scope.message = false;
    //     }
    //
    // };

}]);

adminapp.controller('transaction_controller', ['$scope' ,'$http', function($scope,$http) {
    $scope.getTransactions = function(){
        $http({method: 'GET', url: '/db/transaction'}).then(function successCallback (response){
            $scope.dataset = response.data.rows;
        }, function errCallback(response){
            $scope.dataset = response || "Request failed ";
        });
    }

    $scope.getOrderDetails = function(item){
        $http({method: 'GET', url: '/db/orderDetails?order_id='+item.order_id}).then(function successCallback (response){
            $scope.orderset = response.data.rows;
        }, function errCallback(response){
            $scope.orderset = response || "Request failed ";
        });
    }

    $scope.getMenuItems = function(){
        $http({method: 'GET', url: '/db/menuItems'}).then(function successCallback (response){
            $scope.menuset = response.data.rows;
            // console.log($scope.dataset);
        }, function errCallback(response){
            $scope.menuset = response || "Request failed ";
        });
    }

    $scope.getMenuItemDetails = function(item){
        $http({method: 'GET', url: '/db/menuItemDetails?item_id='+item.item_id}).then(function successCallback (response){
            console.log(response.data);
            $scope.productset = response.data.rows;
            // console.log($scope.dataset);
        }, function errCallback(response){
            $scope.productset = response || "Request failed ";
        });
    }

    $scope.getTransactions();
    $scope.getMenuItems();
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
}]);
