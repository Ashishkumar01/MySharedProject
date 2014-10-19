'use strict';

IndexModule.controller("startExamController", function($rootScope,$scope,$http,$sce,$location,$window,$timeout,examsService) {

    //added by PK;

    if(!$.cookie("providerJSON") || $scope.beginExamClicked ==false){
        $(".languageSelection").hide();
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
    $scope.beginExamClicked = false;
    $scope.currentQuestionNumber=0;
    var countDownInterval=null;
    $rootScope.questionCount=0;
    $rootScope.template={'url':'partials/exam/partial_questionstatus.html'};
    $scope.tabsData = [];
    $scope.currentActiveTab=0;
    $scope.questionToReview=[];
    var testStartTime=new Date();
    $scope.currentQuestionStartTime=new Date();

    $rootScope.questions  = $rootScope.currentExam.questions;
    $scope.currentQuestion=$rootScope.questions[0];
    $scope.currentQuestion.timeTaken="00:00:00";
    $scope.tabsData = $rootScope.currentExam.examSetDetails;
    //$rootScope.questionCount=$scope.questions.length;
    $scope.userId='test';
	if ($.cookie("providerJSON")) {
		var userProfileObject = JSON.parse($.cookie("providerJSON"));
		$scope.userId = userProfileObject.email;
		console.log('userId for Examinee: '+$scope.userId);
	}

    //timer code
    var timerElement=$("#timer"),hourElem = '',
        minuteElem = '',secondElem = '';
    var startTime = new Date(),
        expiryTime = new Date();
    initialize_timer($rootScope.currentExam.totalTimeAllowed);
    countDownInterval = setInterval(countDown, 1000 );

    $scope.nextQuestion=function(){
        markIfQuestionAttempted();
        $scope.currentQuestionNumber++;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();

        $scope.currentQuestionStartTime=new Date();
    }

    $scope.previousQuestion=function(){
        markIfQuestionAttempted();
        $scope.currentQuestionNumber--;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();

        $scope.currentQuestionStartTime=new Date();
    }

    /**
     * called when user directly clicks on the tab
     */
    $scope.setThisQuestion=function(index){
        $scope.currentQuestionNumber=index;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];

        $scope.currentQuestionStartTime=new Date();
    }

    //show the question as selected from buttons in question list
    $scope.$on('questionChange',function(event,data){
        $scope.currentQuestionNumber=data;
        $scope.currentQuestion=$rootScope.questions[$scope.currentQuestionNumber];
        activateRespectiveTab();

        $scope.currentQuestionStartTime=new Date();
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
        $scope.currentQuestionStartTime=new Date();
    }

    /**
     * Checks if user answered the question
     * If yes, store that answer and mark question as attempted.
     */
    function markIfQuestionAttempted(){
        if($scope.currentQuestion.user_selected_option!='-1'){
            $scope.currentQuestion.reviewState=undefined;
            //get how much time is taken for this
            $scope.currentQuestion.timeTaken=findQuestionAttemptTimeDifference($scope.currentQuestionStartTime,new Date());
        }
    }

    /**
     * Activates the respective question set tab as we navigate the question.
     */
    function activateRespectiveTab(){
        for(var i=0; i<$scope.tabsData.length; i++){
            if($scope.currentQuestionNumber>=$scope.tabsData[i].startIndex
                && $scope.currentQuestionNumber<=$scope.tabsData[i].endIndex){
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
            alert('Do you want to submit the test? :confirmMsg')

            var submitTest =setInterval(function(){
            if(btnClicked && isOk){

            	clearInterval(countDownInterval);
                submitPage();
                $.cookie("providerJSON","")
                clearInterval(submitTest)

            }
            },100)


        }
    }


    /**
     * Actually submits the page
     */
    function submitPage(){
        $scope.beginExamClicked = true;
        var testFinishTime=new Date();
        var totalAttempted= 0,totalCorrect=0;
        var questionStatsList=[];
        var questionStats={};
        for(var j=0; j<$rootScope.questions.length;j++){
        	questionStats={};
        	questionStats.examId=$rootScope.currentExam.examSetId;
        	questionStats.userId=$scope.userId;
        	questionStats.examDate=getDateTime();
        	questionStats.attemptNo=$rootScope.currentExam.currentAttempt;

        	//questionStats.moduleName=getModuleName(j);
        	questionStats.moduleName=$rootScope.questions[j].subject;
        	questionStats.questionId="question_"+(j+1);
        	questionStats.isCorrect='N';
        	questionStats.userAnswer=$rootScope.questions[j].user_selected_option;
        	questionStats.correctAnswer=$rootScope.questions[j].correct_option;
        	questionStats.score=0;
        	questionStats.timeTaken="00:00:00";

            if($rootScope.questions[j].user_selected_option!='-1'){
                totalAttempted++;
                if($rootScope.questions[j].user_selected_option==$rootScope.questions[j].correct_option){
                    totalCorrect++;
                    questionStats.isCorrect='Y';
                    questionStats.score=$rootScope.currentExam.correctMarks;
                }else{
                	if($rootScope.currentExam.isNegativeMarks){
                		questionStats.score=0-$rootScope.currentExam.negativeMarks;
                	}
                }
                questionStats.timeTaken=$rootScope.questions[j].timeTaken;
            }

            questionStatsList.push(questionStats);
        }
        $rootScope.currentExam.total_questions_attempted=totalAttempted;
        $rootScope.currentExam.total_questions_correct=totalCorrect;

        if($rootScope.currentExam.isNegativeMarks){
        	$rootScope.currentExam.score_obtained=totalCorrect*$rootScope.currentExam.correctMarks-((totalAttempted-totalCorrect)*$rootScope.currentExam.negativeMarks);
    	}else{
    		$rootScope.currentExam.score_obtained=totalCorrect*$rootScope.currentExam.correctMarks;
    	}
        $rootScope.currentExam.total_time_taken=findTimeDifference(testStartTime,testFinishTime);

        //update modal & save in DB
        saveExamStats(questionStatsList);
    }

    /**
     * persist the exam report in DB
     */
    function saveExamStats(questionStatsList){
    	var examStats={};
    	examStats.examId=$rootScope.currentExam.examSetId;
    	examStats.attemptNo=$rootScope.currentExam.currentAttempt;
    	examStats.examStatus='COMPLETE';

    	examStats.userId=$scope.userId;
    	examStats.examDate=getDateTime();
    	examStats.totalQuestions=$rootScope.currentExam.totalQuestions;
    	examStats.totalAttempted=$rootScope.currentExam.total_questions_attempted;
    	examStats.maximumMarks=$rootScope.currentExam.maxMarks;
    	examStats.scoreObtained=$rootScope.currentExam.score_obtained;
    	examStats.totalCorrect=$rootScope.currentExam.total_questions_correct;
    	examStats.totalTimeAllowed=$rootScope.currentExam.totalTimeAllowed;
    	examStats.totalTimeTaken=$rootScope.currentExam.total_time_taken;
    	if($rootScope.currentExam.credit_required && $rootScope.currentExam.credit_required!=""){
    		examStats.credits=$rootScope.currentExam.credit_required;
    	}
    	//Total Negative Marks
    	examStats.negativeMarks=$rootScope.currentExam.total_questions_correct*$rootScope.currentExam.correctMarks - $rootScope.currentExam.score_obtained;

    	var examReport={};
    	examReport.examScore=examStats;
    	examReport.examStatList=questionStatsList;

    	$http({method: 'POST', url: 'rest/exam/save', data:examReport}).
        success(function(data, status, headers, config) {
          console.log('exam save successfully. Status:'+status);
          $scope.beginExamClicked =true
          $location.path("/submitExam/"+$scope.userId);
        }).
        error(function(data, status, headers, config) {
        	console.log('exam save failed. Status:'+status);
        	$location.path("/submitExam/"+$scope.userId);
        });

    }

    function getDateTime(){
    	// For todays date;
    	Date.prototype.today = function () {
    	    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    	}
    	// For the time now
    	Date.prototype.timeNow = function () {
    	     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    	}

    	return new Date().today() + " " + new Date().timeNow();
    }

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    /**
     * finds module name for the selected question
     */
    function getModuleName(questionNo){
    	var actualQNo=questionNo+1;
        for(var i=0; i<$scope.tabsData.length; i++){
            if(actualQNo>=$scope.tabsData[i].startIndex
                && actualQNo<=$scope.tabsData[i].endIndex){
                return $scope.tabsData[i].subject;
            }
        }
    };

    function findQuestionAttemptTimeDifference(inTime, outTime){
        var diffInMs = outTime - inTime,hrElement='',mintElement='',scndElement='',
            diffInSecs = Math.round( diffInMs / 1000 ),
            amountOfHours = Math.floor( diffInSecs / 3600 ),
            amountOfSeconds = diffInSecs - (amountOfHours * 3600),
            amountOfMinutes = Math.floor( amountOfSeconds / 60 ),
            amountOfSeconds = amountOfSeconds - ( amountOfMinutes * 60 );

        // Set up the countdown timer for display
        // Set up the hours
        if( amountOfHours > 0 ) {
        	hrElement = (amountOfHours < 10)
                ? '0' + amountOfHours + ' : '
                : amountOfHours + ' : ';
        } else {
        	hrElement = '00 : ';
        }

        // Set up the minutes
        if( amountOfMinutes > 0 ) {
        	mintElement = ( amountOfMinutes < 10 )
                ? '0' + amountOfMinutes + ' : '
                : amountOfMinutes + ' : ';
        } else {
        	mintElement = '00 : ';
        }

        // Set up the seconds
        if( amountOfSeconds > 0 ) {
            scndElement = (amountOfSeconds < 10)
                ? '0' + amountOfSeconds
                : amountOfSeconds;
        } else {
        	scndElement = '00';
        }

        return hrElement+mintElement+scndElement+"";
    }



    //TODO flush out this timer code to separate js
/*    var timerElement=$("#timer"),hourElem = '',
        minuteElem = '',secondElem = '';
    var startTime = new Date(),
        expiryTime = new Date();*/
    function initialize_timer(totalTimeAllowed){
    	var timeAllowed=parseInt(totalTimeAllowed);
    	var hrs=Math.floor(timeAllowed/60);
    	var mins=timeAllowed%60;
    	var seconds=0;
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
                 $scope.submitTest(true);
        }

    var myScroll;
    myScroll = new IScroll('#exam .ui-layout-east', { mouseWheel: true });


    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    
    //Activate the first tab by default
    $timeout(function(){
    	$scope.toggleActive(0,true);
    },100);    
    

});


