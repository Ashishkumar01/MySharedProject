'use strict';

IndexModule.controller("instructionController", function($rootScope,$scope,$location) {
    $rootScope.template.url='partials/exam/partial_thumbnail.html';
    $scope.agreementDone=false;

    $scope.close=function(){
        $rootScope.template.url='partials/exam/partial_examlist.html';
        $location.path('/examHome');
    }

    $scope.reviewQuestions=function(){
        $location.path('/reviewQuestions');
    }

});


