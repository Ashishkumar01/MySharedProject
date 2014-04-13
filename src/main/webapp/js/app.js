'use strict';

var app=angular.module('myProjectApp', ['ui.index.controllers','ngSanitize','ngRoute']);
app.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    /*$routeProvider
        .when('/', {
            templateUrl: '/partials/template1.html',
            controller: 'ctrl1'
        })
        .when('/tags/:tagId', {
            templateUrl: '/partials/template2.html',
            controller:  'ctrl2'
        })
        .when('/another', {
            templateUrl: '/partials/template1.html',
            controller:  'ctrl1'
        })
        .otherwise({ redirectTo: '/' });*/
});