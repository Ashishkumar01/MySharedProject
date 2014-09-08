IndexModule.directive('ckeditor', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope,element,attr,ngModel){
            	ngModel.$render = function() {
        	        element.html(ngModel.$modelValue);
        	        element.change();                
            	 };
            	 $(element).click(function(){
            		 $(element).ckeditor().on('blur', function(){
            			 scope.$apply(function() {
                             ngModel.$setViewValue(element.html());
                           });
            		 });	 
            	 });
            }
        };
});