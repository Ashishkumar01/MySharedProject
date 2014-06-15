'use strict';

IndexModule.controller("ExamsetController", function($rootScope,$scope,$http,$location) {
	$scope.subject='';
	$scope.subjectCriteria='';
	$scope.subjectArray=[
		                     {key:'QUANTITATIVE_APTITUDE', value:'Quantitative Aptitude'},
		                     {key:'GENERAL_AWARENESS', value:'GA'},
		                     {key:'ENGLISH_LANGUAGE', value:'English'},
		                     {key:'REASONING', value:'Reasoning'}
	                    ];
	$scope.subjectCriteriaArray=[
		    	                     {key:'TIME_WORK', value:'Time and work'},
		    	                     {key:'MENSURATION', value:'Mensuration'},
		    	                     {key:'DATA_ANALYSSIS', value:'Data Analyssis'},
		    	                     {key:'HISTORY', value:'History'}
	    	                    ];
    
	$scope.searchQuestions=function(){
		var url='';
		if($scope.subject!=''){
			url='/'+$scope.subject;
		}
		if($scope.subjectCriteria!=''){
			url+='/'+$scope.subjectCriteria;
		}
		
		$http({method: 'GET', url: 'rest/set/questions'+url})
	    .success(function(data, status, headers, config) {
	      console.log('question data fetched:'+data);
	      $scope.questions=data;      
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('question data fetch failed. Status:'+status);
	    });
	}
	
});


