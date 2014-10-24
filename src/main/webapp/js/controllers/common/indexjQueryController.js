'use strict';

IndexModule
    .controller("commonjQueryController", function($rootScope,$scope, $window) {
    jQuery("body").attr("id","home");

    bindjQueryFunctions();

})