'use strict';

IndexModule.controller("ExamsetController", function($rootScope,$scope,$http,$location) {
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
		$scope.totalQuestionsMarked=0;
		$scope.examSetQuestions=[];
		$scope.examSetSubjects=[];
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
			    	                     {key:'HCF', value:'HCF'},
			    	                     {key:'MENSURATION', value:'Mensuration'},
			    	                     {key:'DATA_ANALYSSIS', value:'Data Analyssis'},
			    	                     {key:'HISTORY', value:'History'}
		    	                    ];
	
		$scope.examSet = angular.copy($scope.initial);
		
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
	      
	      $scope.examSet  = data;
	      $scope.questions = data.questionDetails; 
	      var selectedQuestionIds = data.examSetDetails[0].linkedQuestions.split(',');
	      
	      for(var j=0; j < selectedQuestionIds.length;j++)
	      {
	    	  $scope.questionsSelected[selectedQuestionIds[j]] = true;
	      }
	      $scope.examSetQuestions = data.examSetDetails[0].linkedQuestions.split(',').map(Number);
	      console.log('Question Details for exam data:\n'+JSON.stringify($scope.questions));
	      console.log('Selected Question for exam data:\n'+JSON.stringify($scope.questionsSelected));
	   
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
	$scope.addQuestion=function(question)
	{
		var elementPosition = $.inArray(question.id,$scope.examSetQuestions);
		console.log('elementPosition:'+$.inArray(question.id,$scope.examSetQuestions));
		if($scope.questionsSelected[question.id])
		{
			if(($scope.totalQuestionsMarked+parseInt(question.passageQuestionCount)) > $scope.totalQuestions)
			{
				$scope.questionsSelected[question.id]=false;
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


