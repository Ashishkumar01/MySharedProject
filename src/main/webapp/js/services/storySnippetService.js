'use strict';

IndexModule.factory('storySnippetService', function($http) {
    var storySnippetService = {
        getSnippet: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var snippetPromise = $http.get('data/stories/stories.json').then(function (response) {
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
            var storyPromise = $http.get('data/stories/'+storyId+'.json').then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return storyPromise;
        }
    };
    return storyDetailsService;
});

IndexModule.factory('moduleSnippetService', function($http) {
    var moduleSnippetService = {
        getModules: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var snippetPromise = $http.get('data/modules/modules.json').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return snippetPromise;
        }
    };
    return moduleSnippetService;
});

IndexModule.factory('examsService', function($http, $q) {
    var examsService = {
        getExams: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var examPromise = $http.get('data/exam/tests.json').then(function (response) {
                // The then function here is an opportunity to modify the response
                //console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return examPromise;
        },

        getThisExam: function(examId) {
            var examPromise = $http.get('data/exam/'+examId+'.json').then(function (response) {
                return response.data;
            });
            // Return the promise to the controller
            return examPromise;
        },

        getThisQuestion: function(questionId) {
            var examPromise = $http.get('data/questiondir/'+questionId+'.json').then(function (response) {
                return response.data;
            });
            // Return the promise to the controller
            return examPromise;
        }

    };
    return examsService;
});







