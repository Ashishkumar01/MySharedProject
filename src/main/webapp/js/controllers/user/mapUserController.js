'use strict';

IndexModule.controller("MapUserController", function($rootScope,$scope,$http,$location) {
    $scope.userEmail='';
    $scope.mappedExamsets=[];
    $scope.mappedExamsetsKeys=[];
    $scope.availableExamsets=[];
    $scope.selectedExamSets=[];

    /**
     * gets all available examsets
     */
    $http({method: 'GET', url: 'rest/set/examsets'})
        .success(function(data, status, headers, config) {
            console.log('Examsets fetched:'+JSON.stringify(data));
            $scope.availableExamsets=data;
        })
        .error(function(data, status, headers, config) {
            console.log('examset fetch failed. Status:'+status);
        });

    $scope.searchExamMapping=function(){
        $http({method: 'POST', url: 'rest/user/examsets', data:$scope.userEmail})
            .success(function(data, status, headers, config) {
                console.log('Examsets fetched:'+JSON.stringify(data));
                $scope.mappedExamsets=data;
            })
            .error(function(data, status, headers, config) {
                console.log('examset fetch failed. Status:'+status);
            });
    };

    /**
     * move selected examsets from avaialble list to selected list
     */
    $scope.selectThisExam=function(){
        $scope.mappedExamsets.push($scope.selectedExamSets[0]);
        $scope.availableExamsets.splice($.inArray($scope.selectedExamSets[0], $scope.availableExamsets),1);
    };

    /**
     * move selected examsets from selected list to available list
     */
    $scope.removeThisExam=function(){
        $scope.availableExamsets.push($scope.mappedExamsetsKeys[0]);
        $scope.mappedExamsets.splice($.inArray($scope.mappedExamsetsKeys[0], $scope.mappedExamsets),1);
    };

    /**
     * move selected examsets from selected list to available list
     */
    $scope.saveExamMapping=function(){
        var dataToSave={
            email:$scope.userEmail,
            examMappingList:$scope.mappedExamsets
        }
        $http({method: 'POST', url: 'rest/user/mapExam', data: JSON.stringify(dataToSave)})
            .success(function(data, status, headers, config) {
                alert('Mapping done successfully.');
                console.log('Examsets mapping saved:'+data);
            })
            .error(function(data, status, headers, config) {
                alert('Mapping failed');
                console.log('examset fetch failed. Status:'+status);
            });
    };
	
	
});


