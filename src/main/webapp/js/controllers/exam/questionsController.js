'use strict';

IndexModule.controller("questionsController", function($rootScope,$scope) {
    $scope.questionsArray=new Array($rootScope.questionCount);
    //$scope.questionsArray=new Array(2);

    $scope.thisQuestion=function(questionNo){
        $rootScope.$broadcast('questionChange',questionNo);
    };

/*    $scope.$on('questionsLoaded',function(event,data){
        console.log('questionsLoaded Event received');
        $scope.questionsArray=new Array(data);
    });*/

/*    $scope.$on('questionMarkedNext',function(event,data){
        console.log('questions for review: '+data.eventName);
        var styleClass='btn-default';
        if(data.eventName=='ATTEMPTED_REVIEW'){
            styleClass='btn-primary';
        }else if(data.eventName=='UNATTEMPTED_REVIEW'){
            styleClass='btn-warning';
        }else if(data.eventName=='ATTEMPTED'){
            styleClass='btn-success';
        }
        $("#questionBtn"+data.questionNo).addClass(styleClass);
    });*/
});


