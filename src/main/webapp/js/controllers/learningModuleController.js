'use strict';

IndexModule.controller("learningModuleController", function($rootScope,$scope,$http) {

    $scope.learningModule=function(){
        return "partials/partial_learningModules.html";
    };

    $scope.close=function(){
        $("#learningModule").modal('hide');
    }


});


