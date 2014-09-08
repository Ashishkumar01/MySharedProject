'use strict';

IndexModule.controller("learningModuleController", function($rootScope,$scope,$http, $window,moduleSnippetService) {
    var childWindow=null;
    $scope.learningModule=function(){
        return "partials/partial_learningModules.html";
    };


    moduleSnippetService.getModules().then(function(modules){
        console.log('modules received:'+modules);
        $scope.modules  = modules;
    });

    $scope.openModel=function(moduleId){
        if(childWindow==null || !childWindow._isOpen){
            if(moduleId.indexOf('exam')!=-1){
                var ht=$(window).height();
                var wd=$(window).width();
                childWindow=$window.open('exam.html#/examHome', 'Online Examination','width='+wd+', height='+ht);
            }
        }
    };


});


