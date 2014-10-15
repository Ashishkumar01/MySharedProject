'use strict';

IndexModule.controller("MapUserController", function($rootScope,$scope,$http,$location,$filter) {
if($.cookie("validAdminClick")=="ok"){
    $("#examNavi, .ui-layout-east").hide()
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
            console.log('Available Examsets fetched:'+JSON.stringify(data));
            $scope.availableExamsets=data;
        })
        .error(function(data, status, headers, config) {
            console.log('examset fetch failed. Status:'+status);
        });

    $scope.searchExamMapping=function(){
    	if(!$scope.userEmail || $scope.userEmail==''){
    		alert('User Email should be provided.');
    		$("#searchUser").focus();
    		return;
    	}
        $http({method: 'POST', url: 'rest/user/examsets', data:$scope.userEmail})
            .success(function(data, status, headers, config) {
                console.log('Matched Examsets fetched:'+JSON.stringify(data));
                $scope.mappedExamsets=data;
                //remove the mapped elements from avaialble list
                var index = 0;
                for(var i=0;i<$scope.mappedExamsets.length;i++){
                	index = $filter('arrayFilter')($scope.mappedExamsets[i], $scope.availableExamsets);
                	$scope.availableExamsets.splice(index,1);
                }
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
        var index = $filter('arrayFilter')($scope.selectedExamSets[0], $scope.availableExamsets);
        $scope.availableExamsets.splice(index,1);
    };

    /**
     * move selected examsets from selected list to available list
     */
    $scope.removeThisExam=function(){
        $scope.availableExamsets.push($scope.mappedExamsetsKeys[0]);
        var index = $filter('arrayFilter')($scope.mappedExamsetsKeys[0], $scope.mappedExamsets);
        $scope.mappedExamsets.splice(index,1);
    };

    /**
     * move selected examsets from selected list to available list
     */
    $scope.saveExamMapping=function(){
    	if(!$scope.userEmail || $scope.userEmail==''){
    		alert('User Email should be provided.');
    		$("#searchUser").focus();
    		return;
    	}
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

    $.cookie("validAdminClick", "ok")
}
else{
    $(".languageSelection").hide();
    alert("Either you have used the back button or refreshed the page !!!")
    logOut();
    var informUser = setInterval(function(){
        if(btnClicked && isOk){
            logOut()
            clearInterval(informUser)
            window.location="index.html"
        }

    },100)


}
});


