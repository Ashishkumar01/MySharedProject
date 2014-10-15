'use strict';

IndexModule.filter('arrayFilter', function(){
	  return function(valueToSearch, targetArray) {
	    for (var index in targetArray) {
	      if (targetArray[index].id == valueToSearch.id) {
	        return index;
	      }
	    }
	    return -1;
	  }
});
