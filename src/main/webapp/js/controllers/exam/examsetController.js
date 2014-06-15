'use strict';

IndexModule.controller("ExamsetController", function($rootScope,$scope,$http,$location) {
    
	$scope.searchQuestions=function(){
		$http({method: 'GET', url: 'rest/exam/questions'})
	    .success(function(data, status, headers, config) {
	      console.log('question data fetched:'+data);
	      $scope.questions=data;      
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('question data fetch failed. Status:'+status);
	    });
	}
	
});


