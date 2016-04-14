'use strict';

angular.module('Authentication').controller('index', index);
index.$inject = ['$state', '$scope', 'AuthenticationService'];

function index($state, $scope, AuthenticationService) {

    var vm = {
        model: {},
        logOut:logOut

    };

    return vm;
   
    function logOut() {
        AuthenticationService.LogOut();
        $state.go('login');
    }

    }


   


