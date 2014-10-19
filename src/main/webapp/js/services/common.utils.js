'use strict';

IndexModule.service('CommonUtilService', function() {
        this.convertExpandedTimeToInteger= function(expandedTime) {
        	if(expandedTime){
        		expandedTime=expandedTime.replace(/ /g,'');
        		var timeArray=expandedTime.split(':');
                return parseInt(timeArray[0])*60*60+parseInt(timeArray[1])*60+parseInt(timeArray[2]);
        	}else{
        		return 0;
        	}
        };
        
        this.convertSecondsToExpandedForm= function(timeInSeconds) {
        	 var hourElem,minuteElem,secondElem;
        	 var amountOfHours = Math.floor(timeInSeconds/3600);
             var amountOfMinutes = Math.floor((timeInSeconds%3600)/60);
             var amountOfSeconds = timeInSeconds - (amountOfHours*3600 + amountOfMinutes * 60);

	         if( amountOfHours > 0 ) {
	             hourElem = (amountOfHours < 10)
	                 ? '0' + amountOfHours + ' : '
	                 : amountOfHours + ' : ';
	         } else {
	             hourElem = '00 : ';
	         }
	
	         // Set up the minutes
	         if( amountOfMinutes > 0 ) {
	             minuteElem = ( amountOfMinutes < 10 )
	                 ? '0' + amountOfMinutes + ' : '
	                 : amountOfMinutes + ' : ';
	         } else {
	             minuteElem = '00 : ';
	         }
	
	         // Set up the seconds
	         if( amountOfSeconds > 0 ) {
	             secondElem = (amountOfSeconds < 10)
	                 ? '0' + amountOfSeconds
	                 : amountOfSeconds;
	         } else {
	             secondElem = '00';
	         }
	
	         return hourElem+minuteElem+secondElem+"";
        };
});