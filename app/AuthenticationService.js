

'use strict'

angular.module('Authentication').factory('AuthenticationService', AuthenticationService);
AuthenticationService.$inject = ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout'];

function AuthenticationService(Base64,$http,$cookieStore,$rootScope,$timeout) {

    var service = {

        Login: Login,
        SetCredentials: SetCredentials,
        ClearCredentials: ClearCredentials,
        LogOut:LogOut
    };

    return service;


    function Login(username, password, callback) {

        /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
        $timeout(function () {
            var response = { success: username === 'test' && password === 'test' };
            if (!response.success) {
                response.message = 'Username or password is incorrect';
            }
            callback(response);
        }, 1000);


        /* Use this for real authentication
             ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

    };

    function SetCredentials(username, password) {
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    };

    function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

    function LogOut() {
        ClearCredentials();
    }

}