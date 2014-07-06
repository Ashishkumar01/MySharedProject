'use strict';

IndexModule.controller("reportsController", function($rootScope,$scope,$location,$routeParams,$http) {
    $rootScope.template.url='partials/exam/partial_thumbnail.html';
    $scope.examStats={};
    $scope.currentActiveTab='#scoreCard';

    $http({method: 'GET', url: 'rest/exam/report/1/1'})
    .success(function(data, status, headers, config) {
      console.log('exam data fetched:'+data);
      $scope.examStats=data;
      
      $scope.moduleDetails=[];
      var moduleIndex=-1;
      var moduleData={moduleName:'',questionCount:0,score:0,attempted:0,correct:0,timeTaken:0};
      //group questions per module
      for(var i=0; i<$scope.examStats.examStatList.length; i++){
    	  var moduleIndex=checkModuleExist($scope.examStats.examStatList[i].moduleName);
    	  if(moduleIndex!=-1){
    		  moduleData=$scope.moduleDetails[moduleIndex];
    		  moduleData.questionCount+=1;
    		  moduleData.score+=$scope.examStats.examStatList[i].score;
    		  if($scope.examStats.examStatList[i].userAnswer!=-1){
    			  moduleData.attempted+=1;
    		  }
    		  if($scope.examStats.examStatList[i].userAnswer==$scope.examStats.examStatList[i].correctAnswer){
    			  moduleData.correct+=1;
    		  }    		 
    		  //moduleData.timeTaken+=$scope.examStats.examStatList[i].timeTaken;
    	  }else{
    		  moduleData={moduleName:'',questionCount:0,score:0,attempted:0,correct:0,timeTaken:0};
    		  moduleData.moduleName=$scope.examStats.examStatList[i].moduleName;
    		  moduleData.questionCount=1;
    		  moduleData.score=$scope.examStats.examStatList[i].score;
    		  if($scope.examStats.examStatList[i].userAnswer!=-1){
    			  moduleData.attempted=1;
    		  }
    		  if($scope.examStats.examStatList[i].userAnswer==$scope.examStats.examStatList[i].correctAnswer){
    			  moduleData.correct=1;
    		  } 
    		  //moduleData.timeTaken=$scope.examStats.examStatList[i].timeTaken;
    		  
    		  $scope.moduleDetails.push(moduleData);
    	  }
    	  
      }
      console.log($scope.moduleDetails);
    })
    .error(function(data, status, headers, config) {
    	console.log('report data fetch failed. Status:'+status);
    });
    
    function checkModuleExist(tempModuleName){
    	for(var j=0; j<$scope.moduleDetails.length; j++){
    		if($scope.moduleDetails[j].moduleName==tempModuleName){
    			return j;
    		}
    	}
    	
    	return -1;
    }

    $scope.close=function(){
        $rootScope.template.url='partials/exam/partial_examlist.html';
        $location.path('/examHome');
    };
    
    $('#reportTab a').click(function (e) {
    	  e.preventDefault()
    	  $(this).tab('show');    	  
    	  $(".tab-pane").each(function(){
    		  $(this).removeClass('active');
    	  });
    	  $('#'+this.className).addClass('active');    	  
    })

});


