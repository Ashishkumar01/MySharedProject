'use strict';

IndexModule.controller("userReportsController", function($rootScope,$scope,$location,$http) {
	$scope.userId='test';
	if ($.cookie("providerJSON")) {
		var userProfileObject = JSON.parse($.cookie("providerJSON"));
		$scope.userId = userProfileObject.email;
		console.log('userId for reports: '+$scope.userId);
	}
	
	 /**
     * Data setup for Score Line Chart
     */
    $scope.chartScoreData = {};
    $scope.chartScoreData.type = "LineChart";
    $scope.chartScoreData.displayed = false;
    $scope.chartScoreData.data=[
      ['Test', 'Score'],
      ['Test 1', 26],
      ['Test 2',	117],
      ['Test 3',	137],
      ['Test 4',	17],
      ['Test 5',	194],
      ['Test 6',	135],
      ['Test 7',	93],
      ['Test 8',	11],
      ['Test 9',	49],
      ['Test 10',	90],
      ['Test 11',	41],
      ['Test 12',	95],
      ['Test 13',	183],
      ['Test 14',	118],
      ['Test 15',	65],
      ['Test 16',	110]
    ]

    $scope.chartScoreData.options = {
        "title": "Total Score",
        "displayExactValues": true,
        "vAxis": {
            "title": "Score", "gridlines": {"count": 10}
        },
        "hAxis": {
            "title": "Test"
        },
        //"legend": { "position": "top" },
        "pointShape": 'diamond',
        "pointSize": 7
    };
    
    $scope.chartScore = $scope.chartScoreData;
    $scope.cssStyle = "height:300px; width:100%;";
    
    $scope.chartReady = function () {
        fixGoogleChartsBarsBootstrap();
    }
    
    /**
     * Data setup for Score Line Chart
     */
    $scope.chartTimeData = {};
    $scope.chartTimeData.type = "LineChart";
    $scope.chartTimeData.displayed = false;
    $scope.chartTimeData.data=[
      ['Test', 'Time'],
      ['Test 1', 44],
      ['Test 2',	49],
      ['Test 3',	48],
      ['Test 4',	60],
      ['Test 5',	35],
      ['Test 6',	55],
      ['Test 7',	60],
      ['Test 8',	11],
      ['Test 9',	49],
      ['Test 10',	50],
      ['Test 11',	41],
      ['Test 12',	55],
      ['Test 13',	35],
      ['Test 14',	25],
      ['Test 15',	60],
      ['Test 16',	50]
    ]

    $scope.chartTimeData.options = {
        "title": "Total Time",
        "displayExactValues": true,
        "vAxis": {
            "title": "Time"
        },
        "hAxis": {
            "title": "Test"
        },
        //"legend": { "position": "top" },
        "pointShape": 'diamond',
        "pointSize": 7
    };
    
    $scope.chartTime = $scope.chartTimeData;

	
	$scope.testScoreArray=[['Test', 'Score']];
	$scope.testTimeArray=[['Test', 'Time']];
	
    $http({method: 'POST', url: 'rest/reports/exams', data:$scope.userId})
    .success(function(data, status, headers, config) {
      console.log('exam data fetched:'+JSON.stringify(data));
      	  $scope.examStats=data;
      	  var graphScoreData=[],graphTimeData=[];
    	  for(var j=0; j<$scope.examStats.length; j++){
    		  graphScoreData=[];
    		  graphTimeData=[];
    		  graphScoreData.push('Test'+$scope.examStats[j].examScore['examId']+'_'+$scope.examStats[j].examScore['attemptNo']);
    		  graphScoreData.push($scope.examStats[j].examScore['scoreObtained']);
    		  
    		  graphTimeData.push('Test'+$scope.examStats[j].examScore['examId']+'_'+$scope.examStats[j].examScore['attemptNo']);
    		  graphTimeData.push($scope.examStats[j].examScore['totalTimeTaken']);
    		  
    		  //$scope.testTimeArray.push(graphTimeData);
    	  }
    	  console.log('$scope.testScoreArray '+$scope.testScoreArray);
    	  $scope.chartScoreData.data=$scope.testScoreArray;
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
       // $location.path('../index.html');
        window.location= "index.html"
    };
    
    $('#reportTab a').click(function (e) {
    	  e.preventDefault()
        if($(this).attr("id")!== "myTabDrop1"){
              $(this).tab('show');
              $(".tab-pane").each(function(){
                  $(this).removeClass('active');
              });
              $('#'+this.className).addClass('active');
        }
    })
    
   

    function fixGoogleChartsBarsBootstrap() {
        // Google charts uses <img height="12px">, which is incompatible with Twitter
        // * bootstrap in responsive mode, which inserts a css rule for: img { height: auto; }.
        // *
        // * The fix is to use inline style width attributes, ie <img style="height: 12px;">.
        // * BUT we can't change the way Google Charts renders its bars. Nor can we change
        // * the Twitter bootstrap CSS and remain future proof.
        // *
        // * Instead, this function can be called after a Google charts render to "fix" the
        // * issue by setting the style attributes dynamically.

        $(".google-visualization-table-table img[width]").each(function (index, img) {
            $(img).css("width", $(img).attr("width")).css("height", $(img).attr("height"));
        });
    };
    
    /**
     * 
     */
    
});

/*$scope.examStats=data;

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
	  }*/
