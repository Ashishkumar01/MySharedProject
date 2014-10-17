'use strict';

IndexModule.controller("ExamsetController", function($rootScope, $scope, $http, $location, $timeout, $interval, $q) {
console.log($.cookie("validAdminClick"))

if($.cookie("validAdminClick")=="ok"){
        $("#examNavi, .ui-layout-east").hide()
    
        $scope.initial =
		{
				name:'',
				code:'',
				packageName:'',
				packageSnippet:'',
				totalQuestions:0,
				maxMarks:0,
				totalTimeAllowed:'',
				correctMarks:1,
				isNegativeMarks:'',
				negativeMarks:'',
				examSetDetails:[]
		};
		$scope.questionsSelected=[];
		$scope.packageData=[];
		$scope.totalQuestionsMarked=0;
		$scope.examSetQuestions=[];
		$scope.examSetSubjects=[];
		$scope.questionData = [];
		$scope.subject='';
		$scope.subjectCriteria='';
		$scope.subjectArray=[
			                     {key:'QUANTITATIVE_APTITUDE', value:'Quantitative Aptitude'},
			                     {key:'NUMERICAL ABILITY', value:'NUMERICAL ABILITY'},
			                     {key:'ALGEBRA', value:'ALGEBRA'},
			                     {key:'GENERAL_AWARENESS', value:'GA'},
			                     {key:'ENGLISH_LANGUAGE', value:'English'},
			                     {key:'REASONING', value:'Reasoning'}
		                    ];
		$scope.subjectCriteriaArray=[
			    	                     {key:'TIME_WORK', value:'Time and work'},
			    	                     {key:'HCF', value:'HCF'},
			    	                     {key:'MENSURATION', value:'Mensuration'},
			    	                     {key:'DATA_ANALYSSIS', value:'Data Analyssis'},
			    	                     {key:'HISTORY', value:'History'}
		    	                    ];
	
		var fakeI18n = function( title )
		{
		    var deferred = $q.defer();
		    $interval( function() {
		      deferred.resolve( 'col: ' + title );
		    }, 1000, 1);
		    return deferred.promise;
		};
		
		$scope.gridOptions = 
		{
			enableRowHeaderSelection : true,
			enableColumnResizing: true,
			enableRowSelection: true,
			enableSelectAll: true,
			exporterMenuCsv: true,
		    enableGridMenu: true,
		    gridMenuTitleFilter: fakeI18n,
		    gridMenuCustomItems: [
		      {
		        title: 'Rotate Grid',
		        action: function ($event) {
		          this.grid.element.toggleClass('rotated');
		        }
		      }
		    ],
		    onRegisterApi: function( gridApi ){
		      $scope.gridApi = gridApi;
		      
		      // interval of zero just to allow the directive to have initialized
		      $interval( function() {
		        gridApi.core.addToGridMenu( gridApi.grid, [{ title: 'Dynamic item'}]);
		      }, 0, 1);
		      
		      gridApi.selection.on.rowSelectionChanged($scope,function(row)
	  	      {
	  	        	$scope.addQuestion(row);
	  	      });
		    }
		};
		 
		$scope.gridOptions.columnDefs = [
		    { name:'id', field: 'id', displayName:'ID', width:50, enableHiding : true },
		    { name:'subject', field: 'subject', displayName:'Subject', width:150 },
		    { name:'subjectCategory', field: 'subjectCategory', displayName:'Subject Category', width:130 },
		    { name:'quesrionType', field: 'questionType', displayName:'Question Type', width:130  },
		    { name:'passage', field: 'passage', displayName:'Question/Passage', width:630 },
		    { name:'passageQuestionCount', field: 'passageQuestionCount', displayName:'No. of Questions', width:130 },
		  ];
		
		$scope.gridOptions.multiSelect = true;
		
		$scope.examSet = angular.copy($scope.initial);
		
		$.ajax({type:"GET",
	        url: "data/courses/courses.json",
	        contentType: "application/json"
	    }).done(function( data ) {
	            for( var i =0; i<data.length; i++)
	            {
	            	if (data[i].active == "true")
	            		$scope.packageData.push({key:data[i].id,value:data[i].name});
	            }
	            console.log('packageData: '+$scope.packageData);
	        }).error(function()
	        {
	            alert("Error !! Reload page once again.")
	        });
		
    $scope.resetExamSet=function()
	{    
         $scope.examSet = angular.copy($scope.initial);
	};
        
	$scope.searchQuestions=function()
	{
		var searchParams={};
		if($scope.subject!=''){
			searchParams.subject=$scope.subject;
		}
		if($scope.subjectCriteria!=''){
			searchParams.subjectCriteria=$scope.subjectCriteria;
		}
		
		$http({method: 'POST', url: 'rest/set/questions', data:searchParams})
	    .success(function(data, status, headers, config) {
	      console.log('question data fetched:'+data);
	       
	      if(data && data.length==0)
	      {
	    	  alert('No question selected for entered search criteria. Please query again.');
	      }	
	      else
    	  {
	    	  if(typeof $scope.questions == 'undefined')
		      {
	    		  $scope.questions=data; 
		      }
	    	  else
    		  {
	    		  //Create an array of existing question iDs
	    		  var existingQuestions = [];
	    		  for(var i=0; i< $scope.questions.length;i++)
	    		  {
	    			  existingQuestions.push($scope.questions[i].id);
	    		  }
	    		  //Append the new Questions with existing Question iDs
    			  for(var j=0; j< data.length;j++)
	    		  {
	    			  if ($.inArray(data[j].id, existingQuestions) == -1)
	    				  $scope.questions.push(data[j]);
	    		  }
    		  }
	    	  $scope.gridOptions.data = $scope.questions;
    	  }
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('question data fetch failed. Status:'+status);
	    });
	};
	
	$scope.searchExamSet=function()
	{
		$http({method: 'GET', url: 'rest/set/examsetbycode/'+$scope.examSet.code})
	    .success(function(data, status, headers, config) 
	    {
	      console.log('exam data fetched:'+JSON.stringify(data));
	      $scope.examSetSubjects = [];
	      $scope.examSet  = data;
	      $scope.questions = data.questionDetails; 
    	  $scope.gridOptions.data = $scope.questions;
    	  
    	  $timeout(function() {
    		  $scope.gridApi.selection.selectAllRows();
    	    }, 500);
    	  
    	  $scope.examSetQuestions = data.examSetDetails[0].linkedQuestions.split(',').map(Number);
    	  $scope.totalQuestionsMarked = $scope.questions.length;
    	  
    	  for(var j=0; j < $scope.questions.length;j++)
	      {
    		  $scope.examSetSubjects.push($scope.questions[j].subject);
	      }
    	  
	      console.log('Question Details for exam data:\n'+JSON.stringify($scope.questions));
	   
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('No Exam set found. Status:'+status);
	    	alert('No Exam set found');
	    });;
	};
	
	/*
	 * 
	 */
	$scope.saveSet=function()
	{
		console.log('Question Array length: '+$scope.examSetQuestions.length+' Subject Array length: '+$scope.examSetSubjects.length );
		$scope.examSet.examSetDetails = [];
		if($scope.examSetQuestions.length == 0)
		{
			alert('Please select some questions in grid to save examset.');
            return;
		}
		console.log('Question Array length: '+$scope.examSetQuestions.length+' Subject Array length: '+$scope.examSetSubjects.length );
		
		for(var j=0; j<$scope.examSetQuestions.length;j++){
			$scope.examSet.examSetDetails.push({'linkedQuestions':$scope.examSetQuestions[j],'subject':$scope.examSetSubjects[j]});
		}
		
		$http({method: 'POST', url: 'rest/set/save', data:$scope.examSet})
	    .success(function(data, status, headers, config) {
	      console.log('Set saved successfully:'+data);
	      alert('Exam Set saved successfully.');
          $location.path('/examset');

	    })
	    .error(function(data, status, headers, config) {
	    	console.log('set save failed. Status:'+status);
	    	alert('Exam Set save failed.');
	    });
	};
	
	/**
	 * add selected question in set
	 */
	$scope.addQuestion=function(row)
	{
		var question = row.entity;
		var elementPosition = $.inArray(question.id,$scope.examSetQuestions);
		console.log('elementPosition:'+$.inArray(question.id,$scope.examSetQuestions));
		if(row.isSelected)
		{
			if(($scope.totalQuestionsMarked+parseInt(question.passageQuestionCount)) > $scope.totalQuestions)
			{
				alert('Can not select more questions as set is complete.');
                return;
			}
			
			$scope.totalQuestionsMarked=$scope.totalQuestionsMarked + parseInt(question.passageQuestionCount);
			if(elementPosition == -1)
			{
				$scope.examSetQuestions.push(question.id);
				$scope.examSetSubjects.push(question.subject);
			}
		}
		else
		{
			$scope.totalQuestionsMarked=$scope.totalQuestionsMarked - parseInt(question.passageQuestionCount);
			if(elementPosition != -1)
			{
				$scope.examSetQuestions.splice(elementPosition,1);
				$scope.examSetSubjects.splice(elementPosition,1);
			}
		}		
		
		console.log('examSetDetails:'+$scope.examSetQuestions);
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


