/* UploadController.*/
IndexModule.controller("UploadController", function($scope,$http) {
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
			alert("Sheet saved.");
		},
		function(){
			alert("Sheet Save failed..");
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
			$scope.uploadQuestions = result.data.questionDocList;
		},function failure(data){
			alert('fail');
		});
		
	};
});
