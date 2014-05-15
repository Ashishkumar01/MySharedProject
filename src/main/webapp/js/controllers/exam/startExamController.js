'use strict';

IndexModule.controller("startExamController", function($rootScope,$scope,$http,$sce,$routeParams,$location,$window,examsService) {
    $scope.currentExam={ };
    $scope.currentQuestionNumber=0;
    $scope.currentQuestion={};
    $rootScope.questions=[];
    var countDownInterval=null;
    $rootScope.questionCount=0;
    $rootScope.template={'url':'partials/exam/partial_questionstatus.html'};
    $scope.tabsData = [];
    $scope.currentActiveTab=0;
    $scope.questionToReview=[];
    var testStartTime=new Date();

    //gets questions of current exam
    examsService.getThisExam($routeParams.id).then(function(exam){
        console.log('modules received:'+exam);
        $scope.currentExam  = exam;
        $rootScope.questions  = exam.questions;
        $scope.currentQuestion=$rootScope.questions[0];
        $scope.tabsData = $scope.currentExam.modules;
        //$rootScope.questionCount=$scope.questions.length;

        initialize_timer(0,40,0);
        countDownInterval = setInterval(countDown, 1000 );
    });

    $scope.nextQuestion=function(){
        markIfQuestionAttempted();
        $scope.currentQuestionNumber++;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();
    }

    $scope.previousQuestion=function(){
        markIfQuestionAttempted();
        $scope.currentQuestionNumber--;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();
    }

    $scope.setThisQuestion=function(index){
        $scope.currentQuestionNumber=index;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
    }

    //show the question as selected from buttons in question list
    $scope.$on('questionChange',function(event,data){
        $scope.currentQuestionNumber=data;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();
    });

    function broadcastQuestionSubmitEvents(eventName){
        var data={};
        data.eventName=eventName;
        data.questionNo=$scope.currentQuestionNumber;
        $rootScope.$broadcast('questionMarkedNext',data);
    }

    /*$scope.reviewAndNextQuestion=function(){
        $scope.questionToReview.push($scope.currentQuestionNumber);
        if($scope.currentQuestion.user_selected_option!='-1'){
                broadcastQuestionSubmitEvents('ATTEMPTED_REVIEW');
        }else{
                broadcastQuestionSubmitEvents('UNATTEMPTED_REVIEW');
        }
        $scope.nextQuestion();
    }*/
    $scope.reviewAndNextQuestion=function(){
        if($scope.currentQuestion.user_selected_option!='-1'){
            $scope.currentQuestion.reviewState='ATTEMPTED_REVIEW';
        }else{
            $scope.currentQuestion.reviewState='UNATTEMPTED_REVIEW';
        }

        $scope.currentQuestionNumber++;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();
    }

    /**
     * Checks if user answered the question
     * If yes, store that answer and mark question as attempted.
     */
    function markIfQuestionAttempted(){
        if($scope.currentQuestion.user_selected_option!='-1'){
            $scope.currentQuestion.reviewState=undefined;
        }
    }

    /**
     * Activates the respective question set tab as we navigate the question.
     */
    function activateRespectiveTab(){
        for(var i=0; i<$scope.tabsData.length; i++){
            if($scope.currentQuestionNumber>=$scope.tabsData[i].start_number
                && $scope.currentQuestionNumber<=$scope.tabsData[i].end_number){
                if(i!=$scope.currentActiveTab){
                    $scope.toggleActive(i,false);
                }
                break;
            }
        }
    }

    /**
     * submit the test
     */
    $scope.submitTest=function(submitType){
        if(submitType){
            submitPage();
        } else {
            if($window.confirm('Do you want to submit the test?')){
                submitPage();
            }
        }
    }

    /**
     * Actually submits the page
     */
    function submitPage(){
        var testFinishTime=new Date();
        var totalAttempted= 0,totalCorrect=0;
        for(var j=0; j<$rootScope.questions.length;j++){
            if($rootScope.questions[j].user_selected_option!='-1'){
                totalAttempted++;
                if($rootScope.questions[j].user_selected_option==$rootScope.questions[j].correct_option){
                    totalCorrect++;
                }
            }
        }
        $rootScope.selectedExam.total_questions_attempted=totalAttempted;
        $rootScope.selectedExam.total_questions_correct=totalCorrect;
        $rootScope.selectedExam.score_obtained=totalCorrect;
        $rootScope.selectedExam.total_time_taken=findTimeDifference(testStartTime,testFinishTime);

        //update modal & save in DB
        $location.path("/submitExam");
    }



    //TODO flush out this timer code to separate js
    var timerElement=$("#timer"),hourElem = '',
        minuteElem = '',secondElem = '';
    var startTime = new Date(),
        expiryTime = new Date();
    function initialize_timer(hrs,mins,seconds){
        // Set up expiry time
        expiryTime.setHours( expiryTime.getHours() + hrs );
        expiryTime.setMinutes( expiryTime.getMinutes() + mins );
        expiryTime.setSeconds( expiryTime.getSeconds() + seconds );

        timerElement.html(findTimeDifference(startTime,expiryTime));
        //console.log('timerElement.innerHTML:'+timerElement.innerHTML);
    }

    function findTimeDifference(inTime, outTime){
        var diffInMs = outTime - inTime,
            diffInSecs = Math.round( diffInMs / 1000 ),
            amountOfHours = Math.floor( diffInSecs / 3600 ),
            amountOfSeconds = diffInSecs - (amountOfHours * 3600),
            amountOfMinutes = Math.floor( amountOfSeconds / 60 ),
            amountOfSeconds = amountOfSeconds - ( amountOfMinutes * 60 );

        // Set up the countdown timer for display
        // Set up the hours
        if( amountOfHours > 0 ) {
            hourElem = (amountOfHours < 10)
                ? '0' + amountOfHours + ' : '
                : amountOfHours + ' : ';
        } else {
            hourElem = '00 : ';
        }

        // Set up the minutes
        if( amountOfMinutes > 0 ) {
            minuteElem = ( amountOfMinutes < 10 )
                ? '0' + amountOfMinutes + ' : '
                : amountOfMinutes + ' : ';
        } else {
            minuteElem = '00 : ';
        }

        // Set up the seconds
        if( amountOfSeconds > 0 ) {
            secondElem = (amountOfSeconds < 10)
                ? '0' + amountOfSeconds
                : amountOfSeconds;
        } else {
            secondElem = '00';
        }

        return hourElem+minuteElem+secondElem+"";
    }

    function countDown() {
        var dateNow = new Date();

        // If we're not at the end of the timer, continue the countdown
        if( expiryTime > dateNow ) {

            // References to current countdown values
            var currentTime=timerElement.html();
            var currentTimeArray=currentTime.split(':');
            var hours = parseInt(currentTimeArray[0]);
            var minutes = parseInt(currentTimeArray[1]);
            var seconds = parseInt(currentTimeArray[2]);

            // Update the hour if necessary
            if( minutes == 0 && seconds == 0) {
                --hours;

                hourElem = ( hours < 10 ) ? '0' + (hours) + ' : ' : (hours) + ' : ';
                minuteElem = '59 : ';
                secondElem = '59';

                timerElement.html(hourElem+minuteElem+secondElem);
                //console.log('timerElement.innerHTML:'+timerElement.innerHTML);
                return;
            }

            // Update the minute if necessary
            if( seconds == 0 ) {

                if( minutes > 0 ) {
                    --minutes;
                    minuteElem = ( minutes > 10 ) ? minutes + ' : ' : '0' + minutes + ' : ';
                } else {
                    minuteElem = '59' + ' : ';
                }
                secondElem = '59';
            } else {
                --seconds;
                secondElem = ( seconds < 10 ) ? '0' + seconds : seconds;
            }
        } else {
            // Reset the seconds
            secondElem = '00';
            // Clear interval and fire countDownOnComplete()
            clearInterval(countDownInterval);
            countDownOnComplete();
        }

        timerElement.html(hourElem+minuteElem+secondElem);
        //console.log('timerElement.innerHTML:'+timerElement.innerHTML);
        return ;
    }

    function countDownOnComplete() {
        console.log('Countdown timer has completed!');
        $window.alert('Time allowed has expired. Test will be submitted now.');
        $scope.submitTest(autoSubmit);
    }



});


