'use strict';

IndexModule.controller("examController", function($rootScope,$scope,$http,$location,examsService) {
    $(function(){
        $('body').layout({
            closable:					true
            ,	resizable:					true
            ,	slidable:					true	// when closed, pane can 'slide' open over other panes - closes on mouse-out
            ,	livePaneResizing:			true

            //	some resizing/toggling settings
            ,	north__size:				55
            ,	north__slidable:			false	// OVERRIDE the pane-default of 'slidable=true'
            ,	north__resizable:			false
            ,	north__closable:			false
            ,	north__showOverflowOnHover:	true

            //	some pane-size settings
            ,	west__size:					.2   //20%
            ,	west__spacing_closed:		20
            ,	west__togglerLength_closed: '100%'

            ,	east__size:					.2   //20%
            ,	east__spacing_closed:		20
            ,	east__togglerLength_closed: '100%'
            ,	east__initClosed:			false

            ,	stateManagement__enabled:	false // automatic cookie load & save enabled by default
            ,	showDebugMessages:			true // log and/or display messages from debugging & testing code
        });

    });

    $rootScope.template={'url':'partials/exam/partial_examlist.html'};

    $rootScope.headerData={
        'testName':'Online Mock Tests',
        'timer':null,
        'user':'Singh Hoshiar'
    };

    //gets list of exams applicable
   examsService.getExams().then(function(exams){
        console.log('modules received:'+exams);
        $scope.exams  = exams;
    });

    $scope.selectExam=function(exam,path){
        //$rootScope.selectedExam=exam;
        $location.path(path);
    };





});


