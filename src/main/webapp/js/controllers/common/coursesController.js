'use strict';

IndexModule
    .controller("coursesController", function($rootScope,$scope, $http, $window) {
        $("body").attr("id", "courses");
        $scope.showIndex = false;
        //bindjQueryFunctions();


        $http.get('data/courses/courses.json', {
            withCredentials: true
             }).then(function success(result){
                $scope.courseList = result;
                console.log(result)
            },function failure(data){
                alert('Upload failed.');
            });
        bindjQueryFunctions();
        $scope.activateCourse = function(){
           // e.preventDefault();
            $.cookie("validAdminClick","ok")
            $(".testLogin").removeClass("testLoginActive");
            $("#courseList .closeWrapper span").trigger("click")
            $(this).addClass("testLoginActive")
            if($.cookie("providerJSON")){

                var email = (JSON.parse($.cookie("providerJSON"))).email;
                showCourseListing(this,email)
            }else{
               // e.preventDefault();
                $("#signUp").trigger("click")

            }
        }
        function showCourseListing(obj, email){
            var htmlContainer = '<div id="courseList">' +
                '<div class="closeWrapper"><h3> Select exam of your choice</h3><span>x</span></div>'
                +'<div id="courseListItemWrapper"><ul id="courseListItem"></ul></div>'
                +'</div>';

            $(obj).parent().prepend(htmlContainer);
            $("#courseList").animate({top:"0px"}, "fast",function(){

                var offset =$("#courseList").offset().top;
                var baseTop = 75;
                var scrollTop =$(window).scrollTop();
                var diff =offset-baseTop;

                if (diff>0){
                    var body = $("body,html");
                    body.animate({scrollTop:diff+"px"}, '500');
                }

            })
            $("#courseList .closeWrapper span").bind('click', function(){
                $("#courseList").remove();
            })
            $("#courseListItem").css({width:"325px",height:"250px"})
            $.ajax({type:"POST",
                url: "rest/user/examsets",
                data :email,
                contentType: "application/json"
            })
                .done(function( data ) {
                    console.log(data)
                    var liString ="";
                    if(data.length >0){
                        for( var i =0; i<data.length; i++){
                            liString+="<li><a href="+"'exam.html#/showInstruction/"+data[i].id+"'>"+data[i].name+"<\/a><\/li>";
                        }
                        $("#courseListItem").html(liString).css({width:"auto",height:"auto",marginTop:"auto",textAlign:"left"}).addClass("noBg");
                    }else{
                        $("#courseListItem").css({width:"325px",height:"150px",marginTop:"100px",textAlign:"center"}).html("You do not have any courses!!!").addClass("noBg");
                    }

                }).error(function(){
                    alert("error refresh and check once again")
                });

        }



    })