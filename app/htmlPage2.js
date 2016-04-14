'use strict';

angular.module('Authentication').controller('htmlPage2', htmlPage2);
htmlPage2.$inject = ['$state', '$scope','$http'];

function htmlPage2($state, $scope, $http) {


    var vm = {
        model: {},
        displayJsonData: displayJsonData
       
    };
    return vm;


   
    function displayJsonData() {

        var httpRequest = $http({
            method: 'POST',
            url: 'http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&country=AT&username=demo'
            //data: mockDataForThisTest

        }).success(function (data, status) {
            vm.model.cityData = data;
            vm.model.cityData.postalcodes.sort(dynamicSort("placeName"));
        });
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
}





