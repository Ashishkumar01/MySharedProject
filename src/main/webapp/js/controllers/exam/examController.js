'use strict';

IndexModule
		.controller(
				"examController",
				function($rootScope, $scope, $http, $location, examsService) {
					$("#examNavi, .ui-layout-east").show()
                    bindjQueryFunctions();
					$scope.beginExamClickedFunc = function() {
						$scope.beginExamClicked = true;
						//var tempQuestion = {};

						// load question data for all linked ones.
						$http(
								{
									method : 'POST',
									url : 'rest/set/loadQuestion/'+ $scope.languageSelection,
									data : $rootScope.currentExam.examSetDetails
								})
								.success(
										function(data, status, headers, config) {
											console.log('questions loaded successfully. data:' + JSON.stringify(data));
											for (var i = 0; i < data.length; i++) {
												//$rootScope.currentExam.questions.push($scope.loadQuestions(data[i]));
												$scope.loadQuestions(data[i]);
												//console.log('questionResponse.....:' + data[i]);

											}
											console.log('Total question loaded: '+ $rootScope.currentExam.questions.length);
											$location.path("/beginExam");
										})
								.error(
										function(data, status, headers, config) {
											console.log('questions loaded failed. Status:'+ status);
											alert("Question Loading Failed.");
										});
					}
					$(function() {
						/*
						 * $('body').layout({ closable: true , resizable: true ,
						 * slidable: true // when closed, pane can 'slide' open
						 * over other panes - closes on mouse-out ,
						 * livePaneResizing: true
						 *  // some resizing/toggling settings , north__size: 55 ,
						 * north__slidable: false // OVERRIDE the pane-default
						 * of 'slidable=true' , north__resizable: false ,
						 * north__closable: false , north__showOverflowOnHover:
						 * true
						 *  // some pane-size settings , west__size: .2 //20% ,
						 * west__spacing_closed: 20 ,
						 * west__togglerLength_closed: '100%'
						 *  , east__size: .2 //20% , east__spacing_closed: 20 ,
						 * east__togglerLength_closed: '100%' ,
						 * east__initClosed: false
						 *  , stateManagement__enabled: false // automatic
						 * cookie load & save enabled by default ,
						 * showDebugMessages: true // log and/or display
						 * messages from debugging & testing code });
						 */

					});
					// added by PK
					$scope.beginExamClicked = false;
					$(".outerLink").on('click', function(e) {
						e.preventDefault();
						var currentLink = $(this).attr("href");
						informUserAboutLogout(currentLink)
					})
					function informUserAboutLogout(redirectionLink) {

						alert("Are you sure you wish to move out from this section, To revisit you need to login once again!!! :confirmMsg");
						var informUser = setInterval(function() {
							if (btnClicked && isOk) {
								logOut()
								clearInterval(informUser)
								window.location = redirectionLink;
							}

						}, 100)
					}

					$rootScope.template = {
						'url' : 'partials/exam/partial_examlist.html'
					};

					$rootScope.headerData = {
						'testName' : 'Online Mock Tests',
						'timer' : null,
						'user' : 'Singh Hoshiar'
					};

					// gets list of exams applicable
					examsService.getExams().then(function(exams) {
						console.log('modules received:' + exams);
						$scope.exams = exams;
					});

					$scope.selectExam = function(exam, path) {
						// $rootScope.selectedExam=exam;
						$location.path(path);
					};

					// Added by PK
					$scope.isAdminLinks = true;
					if ($.cookie("providerJSON")) {
						var userProfileObject = JSON.parse($
								.cookie("providerJSON"))
						console.log(userProfileObject)
						$scope.thumbnail = userProfileObject.picture
						$scope.userName = userProfileObject.name;
					}
					$scope.languageSelection = 'english';
					$scope.instructionTemp = "partials/exam/"
							+ $scope.languageSelection + "Instruction.html";
					$scope.$watch('languageSelection',
							function() {
								$scope.instructionTemp = "partials/exam/"
										+ $scope.languageSelection
										+ "Instruction.html";
							})

					$scope.loadQuestions = function(thisQuestion) {
						console.log('thisQuestion.....:' + thisQuestion);
						var tempQuestion = {};
						tempQuestion.id = thisQuestion.id;
						tempQuestion.direction = "";
						tempQuestion.option_type = thisQuestion.option_type;
						tempQuestion.question_type = thisQuestion.question_type;
						tempQuestion.status = "unattempted";
						tempQuestion.user_selected_option = "-1";
						tempQuestion.subject = thisQuestion.subject;

						// should be last addition in question object as passage includes cloning of above setups
						console.log('isPassage: '+ thisQuestion.isPassage);
						console.log('data.questionId: '+ thisQuestion.id);
						if (thisQuestion.isPassage == 'Y') {
							tempQuestion.direction = thisQuestion.passage;
							
							for (var j = 0; j < thisQuestion.questions.length; j++) {
								console.log('Creating question from Passage : ' + j);
								// copy all above fields
								var passageQuestion = {};
								passageQuestion = JSON.parse(JSON.stringify(tempQuestion));
								passageQuestion.statement = thisQuestion.questions[j].questionStatement;
								console.log('passageQuestion.statement: ' + thisQuestion.questions[j].questionStatement);

								passageQuestion.options = [];
								for (var k = 0; k < thisQuestion.questions[j].options.length; k++) {
									passageQuestion.options.push(thisQuestion.questions[j].options[k].optionValue);
									if (thisQuestion.questions[j].options[k].correct) {
										if (passageQuestion.correct_option) {
											passageQuestion.correct_option = "," + k;
										} else {
											passageQuestion.correct_option = k;
										}
									}
								}
								// add this question
								$rootScope.currentExam.questions.push(passageQuestion);
							}
						} else {
							tempQuestion.statement = thisQuestion.questions[0].questionStatement;
							console.log('tempQuestion.statement: '+ tempQuestion.statement);

							tempQuestion.options = [];
							console.log('thisQuestion.options: ' + thisQuestion.questions[0].options);
							console.log('thisQuestion.options.length: ' + thisQuestion.questions[0].options.length);
							for (var j = 0; j < thisQuestion.questions[0].options.length; j++) {
								tempQuestion.options.push(thisQuestion.questions[0].options[j].optionValue);
								if (thisQuestion.questions[0].options[j].correct) {
									if (tempQuestion.correct_option) {
										tempQuestion.correct_option = ","+ j;
									} else {
										tempQuestion.correct_option = j;
									}
								}
							}

							$rootScope.currentExam.questions.push(tempQuestion);
						}

					}

				});
