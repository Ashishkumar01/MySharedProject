'use strict';

IndexModule.filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
