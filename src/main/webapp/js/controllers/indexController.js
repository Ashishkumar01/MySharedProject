'use strict';

IndexModule.controller("indexController", function($rootScope,$scope, $window) {
    /*var childWindow=null;*/
    $(function(){
        $('body').layout({
                closable:					true
            ,	resizable:					true
            ,	slidable:					true	// when closed, pane can 'slide' open over other panes - closes on mouse-out
            ,	livePaneResizing:			true

            //	some resizing/toggling settings
            ,	north__size:				55
            ,	north__slidable:			false	// OVERRIDE the pane-default of 'slidable=true'
            ,	north__resizable:			false
            ,	north__closable:			false
            ,	north__showOverflowOnHover:	true

            //	some pane-size settings
            ,	west__size:					.2   //20%
            ,	west__spacing_closed:		20
            ,	west__togglerLength_closed: '100%'

            ,	east__size:					.2   //20%
            ,	east__spacing_closed:		10
            ,	east__togglerLength_closed: '100%'
            ,	east__initClosed:				true

            ,	stateManagement__enabled:	false // automatic cookie load & save enabled by default
            ,	showDebugMessages:			true // log and/or display messages from debugging & testing code
        });

    });

    $scope.navigatorBar=function(){
        return "partials/navigationbar.html";
    };

    $scope.sidebar=function(){
        return 'partials/storysnippet.html';
    };

    $scope.contentBar=function(){
        return 'partials/story.html';
    };

    /*$(document).ready(function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh')
        })
    });*/

   $(window).bind("load", function() {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh')
        });
    });

    /*$rootScope.storySnippet=[
        {'id':'motorola-xoom-with-wi-fi'},{'id':'motorola-xoom'},{'id':'motorola-atrix-4g'},{'id':'dell-streak-7'},{'id':'samsung-gem'}
    ];*/

/*    $scope.openModel = function () {
        var modalInstance = $modal.open({
            templateUrl: 'partials/partial_learningModules.html',
            controller: 'modalInstanceCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    };*/

});

/*IndexModule.controller("modalInstanceCtrl", function ($scope, $modalInstance, items) {

    $scope.items = items;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});*/


