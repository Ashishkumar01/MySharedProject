'use strict';

var app=angular.module('myProjectApp', ['ngSanitize','ngRoute','ui.index.controllers'])

app.run(function($window){

    $window.alert = function(alertText) {

        var message = $('<p />', { text: alertText }),
            ok = $('<button />', { text: 'Ok', 'class': 'full' });

        //dialogue( message.add(ok), 'Alert!' );
        dialogue( alertText );
    }

    /*$window.confirm = function(confirmText,callback) {
        var message = $('<p />', { text: confirmText }),
            ok = $('<button />', {
                text: 'Ok',
                click: function() { callback(true)}
            }),
            cancel = $('<button />', {
                text: 'Cancel',
                click: function() { callback(false)}
            });

        dialogue( message.add(ok).add(cancel), 'Do you agree?' );
    }*/

    function dialogue(content) {
       /* $('<div />').qtip({
            content: {
                text: content,
                title: title
            },
            position: {
                my: 'center', at: 'center',
                target: $(window)
            },
            show: {
                ready: true,
                modal: {
                    on: true,
                    blur: false
                }
            },
            hide: false,
            style: 'dialogue',
            events: {
                render: function(event, api) {
                    $('button', api.elements.content).click(function(e) {
                        api.hide(e);
                    });
                },
                hide: function(event, api) { api.destroy(); }
            }
        });*/
        centerDiv(".popupInstruction");
        $("#alertMsg").html("")


        if(content.indexOf(":confirmMsg") !== -1){
            $(".popupInstruction .btn-default").show()
        }else{
            $(".popupInstruction .btn-default").hide()
        };
        $("#alertMsg").html(content.replace(":confirmMsg",""))
    }
});

app.config(['$routeProvider','$locationProvider',function( $routeProvider,$locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider.when('/examHome', {
        templateUrl: 'partials/login/partial_login.html',
        controller: 'loginController'
    });

    $routeProvider.when('/showInstruction/:id', {
            templateUrl: 'partials/exam/partial_instruction.html',
            controller: 'instructionController'
        });

    $routeProvider.when('/beginExam', {
            templateUrl: 'partials/exam/partial_startExam.html',
            controller:  'startExamController'
        });

    $routeProvider.when('/submitExam', {
        templateUrl: 'partials/exam/partial_teststatus.html',
        controller:  'instructionController'
    });

    $routeProvider.when('/reviewQuestions', {
        templateUrl: 'partials/exam/partial_examReview.html',
        controller:  'instructionController'
    });
    
    $routeProvider.when('/upload', {
        templateUrl: 'partials/upload.html',
        controller: 'UploadController'
    });
    
    $routeProvider.when('/examset', {
        templateUrl: 'partials/exam/partial_examset.html',
        controller: 'ExamsetController'
    });
    
    $routeProvider.when('/viewReports', {
        templateUrl: 'partials/reports/partial_examReports.html',
        controller: 'reportsController'
    });
    /*$routeProvider.otherwise({ redirectTo: '/home' });*/
}]);