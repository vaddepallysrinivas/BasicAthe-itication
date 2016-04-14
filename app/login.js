'use strict';

angular.module('Authentication').controller('login', login);
login.$inject = ['$state','$scope', '$rootScope', '$location', 'AuthenticationService'];


function login($state, $scope, $rootScope, $location, AuthenticationService) {

    var vm = {
        model: {},
        inIt: inIt,
        login1: login1,
        logOut:logOut

    };
    inIt();
    return vm;



    function inIt() {
        AuthenticationService.ClearCredentials();
    }

   function login1 () {
        $scope.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                //$location.path('/');
                $state.go('page2')
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });
    }

   function logOut() {

       AuthenticationService.LogOut();

   }

}





