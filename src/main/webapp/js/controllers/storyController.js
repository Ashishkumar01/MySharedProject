'use strict';

/* StoryController gets all the snippets.*/
IndexModule.controller("storyController", function($rootScope,$location,$anchorScroll, $scope, $timeout, $sce, storyDetailsService) {
         $scope.loading=false;
         //Load one story when called
         $scope.loadAStory = function() {
             if($rootScope.storyDetails){
                 try{
                     var fetchStoryId=$rootScope.storySnippet[$rootScope.storyDetails.length].id;
                     $scope.loading=true;
                     storyDetailsService.getStory(fetchStoryId).then(function(story){
                         $rootScope.storyDetails.push(story);
                         $scope.loading=false;
                     });
                 }catch(err){}
             }
         };


         //Load a specific story when called
         $scope.loadThisStory = function(storyId) {
             $scope.loading=true;
             storyDetailsService.getStory(storyId).then(function(story){
                 $rootScope.storyDetails.push(story);
                 $scope.loading=false;
                 //Scroll to anchor after 500ms after story load
                 $timeout(function(){
                     $location.hash(storyId);
                     $anchorScroll();
                 },500);
             });
         };

        //On Load of all the Snippets, load the first story as listed in the SnippetFile
        $rootScope.$on('SnippetsLoaded', function(event, snippets){
            $scope.loadAStory();
        }); //End of the SnippetLoaded function

        //Watch the $rootScope for SnippetClickEvent
        $rootScope.$on('snippetClicked', function(event, id){
            var storyLoaded = false;
            //If a snippet is clicked, check if the corresponding story is already fetched OR not.
            for(var i=0; i<$rootScope.storyDetails.length; i++){
                if($rootScope.storyDetails[i].id===id) {
                    //This means the story is already loaded and hence call the story page
                    storyLoaded = true;
                    break;
                }
            };


            if(!storyLoaded){
                $scope.loadThisStory(id);
            }else{
                $location.hash(id);
                $anchorScroll();
            }
        });

        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
});

