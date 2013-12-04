'use strict'


var vizApp = angular.module('vizApp', []);

var url = "http://osono.hci.utah.edu:3000/" ;

vizApp.controller('MeasurementCtrl', ['$scope' , '$http', function($scope, $http){
    $http.get( url + "measurements").success(function(data){
        $scope.measurements = data;
    });

    $scope.selection = [];

    $scope.get_samples = function(){
        $scope.selection = [];
        console.log("get Samples!!!");
        $http.get(url + 'measurements/' + encodeURIComponent($scope.measurement) + "/samps").success(function(data){
            console.log(data);
            $scope.allsamples = data ;
        })
    }


    $scope.toggleSelection = function toggleSelection(sample){

        var idx = $scope.selection.indexOf(sample);
        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.selection.push(sample);
        }

        console.log("Toggle selection!!")
        console.log($scope.selection)
    }
    $scope.get_data = function(){
        console.log("get data!!!");
        var params = "";
         $scope.selection.forEach(function(sample){
            params += "samp="+sample+"&"
        });
        params = params.substring(0, params.length - 1)
        console.log(params)
        $http.get(url + 'measurements/' + encodeURIComponent($scope.measurement) + '/bysamp?' + params)
            .success(function(data){
               $scope.data = data
                console.log("data="+$scope.data)
            })
    }


}]);

