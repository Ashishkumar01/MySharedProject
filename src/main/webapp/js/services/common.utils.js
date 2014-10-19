'use strict';

IndexModule.service('CommonUtilService', function() {
        this.convertExpandedTimeToInteger= function(expandedTime) {
        	expandedTime=expandedTime.replace(/ /g,'');
            var timeArray=expandedTime.split(':');
            return timeArray[0]*60*60+timeArray[1]*60+timeArray[2]
        };
});