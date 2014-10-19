'use strict';

IndexModule
    .controller("commonjQueryController", function($rootScope,$scope, $window) {
    $("body").attr("id","home")
    bindjQueryFunctions();

})