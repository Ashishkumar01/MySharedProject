'use strict';

/* storySnippetController gets all the snippets.*/
IndexModule.controller("storySnippetController", function($scope, $rootScope, storySnippetService) {

    storySnippetService.getSnippet().then(function(snippets){
             console.log('Snippets received:'+snippets);
             $rootScope.storySnippet  = snippets;
             $rootScope.storyDetails  = [];

            //Notify the StoryController that Snippets have been loaded and hence Stories can be loaded now.
            // This will allow the flow of stories on the site by controlling the listings on the SnippetFile
            $rootScope.$broadcast('SnippetsLoaded',snippets);
            $rootScope.activeId = snippets[0].id;

     })

    $scope.snippetclickHandler  = function(id){

        $rootScope.$broadcast('snippetClicked', id );
        $rootScope.activeId = id;
        $rootScope.snippetClicked = true;

    }




});




