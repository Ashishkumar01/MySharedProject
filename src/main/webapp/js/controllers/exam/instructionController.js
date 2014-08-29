'use strict';

IndexModule.controller("instructionController", function($rootScope,$scope,$location,$http,$routeParams,examsService) {

    if($.cookie("validAdminClick")=="ok" || $scope.beginExamClicked == true){
    $rootScope.template.url='partials/exam/partial_thumbnail.html';
    $scope.agreementDone=false;

        console.log("$routeParams.id::"+ $routeParams.id)
        $(".languageSelection").show()
        alert("")
    //gets current exam set
    if($routeParams.id){
        //load questions of selected exam
        var worker = new Worker('js/controllers/exam/loadQuestions.js');
        worker.addEventListener('message', function(e) {
            console.log(e.data);
            $rootScope.currentExam.questions.push(e.data);
            console.log('Question loaded .... '+$rootScope.currentExam.questions.length);
        }, false);

        $http({method: 'GET', url: 'rest/set/examset/'+$routeParams.id})
	    .success(function(data, status, headers, config) {
	      console.log('current exam data fetched:'+JSON.stringify(data));
	      for(var i=0; i<data.examSetDetails.length;i++){
	    	  data.examSetDetails[i].linkedQuestions=data.examSetDetails[i].linkedQuestions.split(',');
	      }
	      
	      $rootScope.currentExam  = data;
	      console.log('Final current exam data:\n'+JSON.stringify($rootScope.currentExam));
	      
	      $rootScope.currentExam.questions=[];
          for(var i=0; i<$rootScope.currentExam.examSetDetails.length; i++){
              for(var j=0; j<$rootScope.currentExam.examSetDetails[i].linkedQuestions.length; j++){
                  console.log('calling to '+'data/questiondir/'+$rootScope.currentExam.examSetDetails[i].linkedQuestions[j]+'.json');
                  worker.postMessage({'questionId': $rootScope.currentExam.examSetDetails[i].linkedQuestions[j]});
              }
          }
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('current exam data fetch failed. Status:'+status);
	    });

    }else{
        if($scope.beginExamClicked ==false){

            alert("Either you have used the browser back button or you have submitted your test. You will be redirecting to home page!!!");
            var checkCookie= setInterval(function(){
                if(btnClicked && isOk){
                    logOut();
                    clearInterval(checkCookie)
                    window.location="index.html"
                    //$(".ounterLink:first").trigger("click")
                }

            })

        }
    }

    $scope.close=function(){
        $rootScope.template.url='partials/exam/partial_examlist.html';
        $location.path('/examHome');
    }

    $scope.reviewQuestions=function(){
        $scope.beginExamClicked = true
        $location.path('/reviewQuestions');
    }
    
    $scope.viewReports=function(){
        $scope.beginExamClicked = true
        $location.path('/viewReports');
    }
        $.cookie("validAdminClick", false)
        $scope.beginExamClicked = false
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


