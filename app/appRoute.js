
'use strict';
angular.module('Authentication').config(appRoute).run(run);
appRoute.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$state'];

function appRoute($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.when("", "/page");
    $stateProvider
           .state("page", {
               url: "/page",
               templateUrl: "htmlPage.html",
               controller: "index",
               controllerAs: "vm"
           })
           .state("page1", {
               url: "/page1",
               templateUrl: "app/login.html",
               controller: "login",
               controllerAs: "vm"
           })
           .state("page2", {
               url: "/page2",
               templateUrl: "app/htmlPage2.html",
               controller: "htmlPage2",
               controllerAs: "vm"
           });
}

function run($rootScope, $location, $cookieStore, $http, $state) {

    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ( !$rootScope.globals.currentUser) {
            $state.go('page1');
        }
    });
}