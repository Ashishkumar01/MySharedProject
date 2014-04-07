'use strict';

IndexModule.factory('storySnippetService', function($http) {
    var storySnippetService = {
        getSnippet: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var snippetPromise = $http.get('stories/stories.json').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return snippetPromise;
        }
    };
    return storySnippetService;
});


IndexModule.factory('storyDetailsService', function($http) {
    var storyDetailsService = {
        getStory: function(storyId) {
            // $http returns a promise, which has a then function, which also returns a promise
            var storyPromise = $http.get('stories/'+storyId+'.json').then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return storyPromise;
        }
    };
    return storyDetailsService;
});







