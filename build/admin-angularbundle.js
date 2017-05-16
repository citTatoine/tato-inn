/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

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
            controller: "accounts_controller"
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
}]);

/***/ })
/******/ ]);