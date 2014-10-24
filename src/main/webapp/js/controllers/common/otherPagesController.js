'use strict';

IndexModule
    .controller("otherPagesController", function($rootScope,$scope, $window) {
        jQuery("body").attr("id","other");

        bindjQueryFunctions();

    })