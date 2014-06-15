'use strict';

IndexModule.controller("instructionController", function($rootScope,$scope,$location,$routeParams,examsService) {
    $rootScope.template.url='partials/exam/partial_thumbnail.html';
    $scope.agreementDone=false;

    //gets current exam set
    if($routeParams.id){
        //load questions of selected exam
        var worker = new Worker('js/controllers/exam/loadQuestions.js');
        worker.addEventListener('message', function(e) {
            console.log(e.data);
            $rootScope.currentExam.questions.push(e.data);
            console.log('Question loaded .... '+$rootScope.currentExam.questions.length);
        }, false);

        examsService.getThisExam($routeParams.id).then(function(exam){
            console.log('Exam Set received:'+exam);
            $rootScope.currentExam  = exam;
            //populate all questions of the set
            $rootScope.currentExam.questions=[];
            for(var i=0; i<$rootScope.currentExam.modules.length; i++){
                for(var j=0; j<$rootScope.currentExam.modules[i].linked_questions.length; j++){
                    console.log('calling to '+'data/questiondir/'+$rootScope.currentExam.modules[i].linked_questions[j]+'.json');
                    worker.postMessage({'questionId': $rootScope.currentExam.modules[i].linked_questions[j]});
                }
            }

        });
    }

    $scope.close=function(){
        $rootScope.template.url='partials/exam/partial_examlist.html';
        $location.path('/examHome');
    }

    $scope.reviewQuestions=function(){
        $location.path('/reviewQuestions');
    }
    
    $scope.viewReports=function(){
    	$location.path('/viewReports');
    }

});


