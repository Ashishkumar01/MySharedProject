/* UploadController.*/
IndexModule.controller("UploadController", function($scope,$http,$location) {

if($.cookie("validAdminClick")=="ok"){
	$scope.setFiles = function(element){
		$scope.questionfile = element.files[0];
	};
	
	$scope.setPage = function(page){
		$scope.currentPage = page;
	};
	
	$scope.save = function(index){
		var dataToSave=new Array();
		if(index==undefined){
			dataToSave = $scope.uploadQuestions;
		}else{
			
			dataToSave.push($scope.uploadQuestions[index]);
		}
		
		$http.post('rest/upload/saveQuestions.do',dataToSave).then(function (){
			alert("Questions uploaded successfully.");
                $location.path('/examHome');

		},
		function(){
			alert("Question Upload failed.");
		});
	};
	
	
	$scope.upload = function(){
		var data = new FormData();
		data.append('file', $scope.questionfile, $scope.questionfile.name);
		$http.post('rest/upload/uploadFile.do',data, {
	        withCredentials: true,
	        headers: {'Content-Type': undefined },
	        transformRequest: angular.identity
	    }).then(function success(result){
	    	$scope.setPage(0);
			$scope.uploadQuestions = result.data;
		},function failure(data){
			alert('Upload failed.');
		});
		
	};
    $.cookie("validAdminClick", false)
}
else{
    alert("Either you have used the back button or refreshed the page !!!")
    logOut();
    var informUser = setInterval(function(){
        if(btnClicked && isOk){
            logOut()
            clearInterval(informUser)
            window.location="index.html"
        }

    },100)


}
});
