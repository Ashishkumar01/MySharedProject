'use strict';

IndexModule.controller("userRegisterController", function($rootScope,$scope,$http) {

    $scope.user={
        userId:'',
        password:'',
        confirmPwd:'',
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        address:'',
        zipCode:'',
        gender:'',
        sendNews:'',
        agreement:''
    }

    $scope.registerUser=function(){
        return "partials/partial_userRegister.html";
    };

    $scope.reset=function(){
        $("#registerForm")[0].reset();
        $("#registerUser").modal('hide');
    }

    $scope.saveRegistration=function(){
        console.log('User:'+JSON.stringify($scope.user));
        $http({ method: 'POST',
                data: $scope.user,
                url: 'rest/user/register'}).
            success(function(data, status, headers, config) {
                console.log('User registration successful. '+data);
                alert('Registration successful.');
                $scope.reset();
                            }).
            error(function(data, status, headers, config) {
                console.log('User registration failed. '+data);
                alert('Registration failed.');

            });

    }

});


