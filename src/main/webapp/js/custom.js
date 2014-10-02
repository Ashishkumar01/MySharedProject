// Activates the Carousel
function runCarousel(){
    $('.carousel').carousel({
        interval: 5000
    })
}

// Activates Tooltips for Social Links
$('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
})
var openState= false;
var isHomePage = false;

if(checkAuthenticationStatus().length != 0){
//console.log($.cookie("providerJSON"))
    $(".instruct").hide()
    if(!$.cookie("providerJSON")){
        console.log("reached provider on load")
        getUserDetails("me")
    }
    $("#signUp")
        .off("click")
        .html("Logout")
        .attr("id","logout")
        .on("click", function(e){
            e.preventDefault();
            openState=false;
            logOut();
            logOutRoutine();
        })
    if($("#home").length){
        isHomePage = true;
    }else{
        isHomePage = false;
    }
    if(openState){
        $("#socialLink").trigger("click").hide()
    }else{
        $("#socialLink").hide()
    }
    $("#overlay, .popup").hide();
    //$("#courseList .closeWrapper span").trigger("click")
}else{
    $(".navbar-nav:first").prepend('<li class="instruct">You are not signed in, sign in now!</li>')
    $("#logout")
        .off("click")
        .html("Sign in")
        .attr("id","signUp")
        .on("click", function(e){
            logOutRoutine();
            e.preventDefault();
            if($("#home").length){
                isHomePage = true;
            }else{
                isHomePage = false;
            }
            openState= true;
            if($(".popup").is(":hidden")){
                if($(this).hasClass("testLogin")){
                    isHomePage = false;
                }
                centerDiv(".popup");

            }
        })
    $("#socialLink").show()
    logOutRoutine();

}
function logOutRoutine(){
    if($("#exam").length){
        window.location= "index.html"
    }
}
$("#socialLink img").bind("click", function(){
    if(openState== false){
        isHomePage = true;
        $(this).parent().animate({right:"0px"},'fast',function(){openState = true});
    }else{
        isHomePage = false;
        $(this).parent().animate({right:"-300px"},'fast',function(){openState = false});
    }

})
var openStateExam = false;
$("#examNavi").bind("click", function(){
    if(openStateExam== false){
        $(this).animate({right:"0"},'fast');
        $(this).next().animate({right:"-20%"},'fast',function(){openStateExam = true});
    }else{
        $(this).animate({right:"20%"},'fast');
        $(this).next().animate({right:"0"},'fast',function(){openStateExam = false});
    }

})

$("#signUp").on("click", function(e){
    e.preventDefault();
    isHomePage = true;
    openState= true;

    if($(".popup").is(":hidden")){
        if($(this).hasClass("testLogin")){
            isHomePage = false;
        }
        centerDiv(".popup");

    }
})

function centerDiv(obj){
    var scrollTop= $(window).scrollTop();
    var scrollLeft= $(window).scrollLeft();
    var windowWidth=$(window).width()/2;
    var windowHeight = $(window).height()/2;
    $(obj).show();
    $("#overlay").show()
    var divWidth = $(obj).width()/2;
    var divHeight = $(obj).height()/2;
    var divLeft= windowWidth - divWidth;
    var divTop= windowHeight - divHeight;
    $(obj).css({"top":divTop+scrollTop+'px',"left":divLeft+scrollLeft+'px'});
}
$(".close").bind("click", function(){
    isHomePage = false;
    $(this).parent().parent().hide();
    $("#overlay").hide()
})
/*$(".socialIcon li").bind('click', function(){
 if(isHomePage){
 window.location= "courses.html"
 }else{
 window.location= "exam.html#/showInstruction/test1"
 }
 })*/
$(".socialIcon li").bind('click', function(){
    var socialId= $(this).prop("title");

    if(isHomePage){
        //window.location= "courses.html"
        login(socialId)
    }else{
        login(socialId)
        //	window.location= "exam.html#/showInstruction/1"
    }
})
$(".submit").bind("click", function(){
    var scrollTop= $(window).scrollTop()
    if($(".popupInstruction").is(":hidden")){

        centerDiv(".popupInstruction");
        $("#overlay").show()
    }

})
var isOk = false;
btnClicked = false;
$(".popupInstruction .btn").on('click', function(){
    btnClicked= true;
    $(".languageSelection").hide();
    $(this).parent().parent().hide();
    $("#overlay").hide()
    if($(this).hasClass("btn-primary")){
        isOk = true;
        setTimeout(function(){
            isOk=false;
            btnClicked=false;
        },1000)
    }else{
        isOk =false;
        setTimeout(function(){
            btnClicked=false;
        },1000)
    }

})
$("#redirectCallToAction .btn").on("click", function(){
    $(".popup").hide();
    $("#overlay").hide()
    if($(this).hasClass("btn-primary")){
        if($("#redirectCallToAction input:checked").length && !$.cookie("doNotAskMeAgain")){
            $.cookie("doNotAskMeAgain",true)
        }
        window.location="courses.html";

    }else{

    }
})

$(window).resize(function(){
    if($(".popupInstruction").is(":visible")){
        centerDiv(".popupInstruction");}
    else if($(".popup").is(":visible")){
        centerDiv(".popup");
    }
})


var isAuthenticated = true;
//Multiple test exam on single course
$("#courseContainerWrapper").on("click",".testLogin", function(e){
    e.preventDefault();
    $.cookie("validAdminClick","ok")
    $(".testLogin").removeClass("testLoginActive");
    $("#courseList .closeWrapper span").trigger("click")
    $(this).addClass("testLoginActive")
    if(checkAuthenticationStatus().length != 0){

        var email = (JSON.parse($.cookie("providerJSON"))).email;
        showCourseListing(this,email)
    }else{
        e.preventDefault();
        $("#signUp").trigger("click")

    }
})
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

if($("#course").length){
    $("#courseContainerWrapper").html("")
    var htmlTemp =""
    $.ajax({type:"GET",
        url: "data/courses/courses.json",
        contentType: "application/json"
    }).done(function( data ) {
            console.log(data)
            $("#courseContainerWrapper").html("")
            var liString ="";
            for( var i =0; i<data.length; i++){
                htmlTemp += '<div class="col-md-4">';
                htmlTemp +='<img src="img/'+data[i].imgSrc+'">';
                htmlTemp +='<h3>'+data[i].name+'</h3>';
                htmlTemp +='<p>'+data[i].courseDescription+'</p>'
                htmlTemp +='<p><a class="btn btn-primary testLogin" href="#" role="button">Perform Exam &raquo;</a></p></div>';
            }
            $("#courseContainerWrapper").html(htmlTemp)


        }).error(function(){
            alert("Error !! Reload page once again.")
        });

}
$(".dropdown-menu a").on("click", function(e){
    e.preventDefault()
    //validAdminClick = true;
    $.cookie("validAdminClick","ok")
    window.location= $(this).attr("href")
})
$(document).on('keydown', null, 'f12',
    function(e){
        if(e.keyCode==123 || e.keyCode=="123")
        {
            //  e.preventDefault()
        }
    }
);


var slideAnimRow = $(".slideAnimTableWrapper").not(".secondaryCaousel .slideAnimTableWrapper");
var slideAnim =$("#myCarousel")
var slideAnimWidth = slideAnim.width();
var slideAnimHeight = slideAnim.height();
var slideAnimRowWidth=slideAnimRow.width();
function animateSlide(){
    slideAnimRow.fadeIn(3000).delay(6000).fadeOut(3000,
        function(){
            slideAnimRow.find(".slideAnimIcon").html("∆").css({marginTop:"22%", width:"30%"});
            slideAnimRow.find(".slideAnimMsg").html("Razor sharp cognition engine to deliver an unparalleled adaptive learning infrastructure.")
            slideAnimRow.fadeIn(3000).delay(6000).fadeOut(3000,
                function(){
                    slideAnimRow.find(".msgAnim").addClass("reduceFont");
                    slideAnimRow.find(".slideAnimIcon").html("ॐ").css({marginTop:"18%", width:"30%"});
                    slideAnimRow.find(".slideAnimMsg").html("We practically define the science of ontology. <p>Welcome to the new world of learning.</p>")
                    slideAnimRow.fadeIn(3000).delay(6000).fadeOut(3000,
                        function(){
                            reset();
                            animateSlide()
                        }

                    )
                }
            )
        }
    )


    /*
     slideAnimTransition.animate({top:slideAnimHeight+"px"},
     1500,
     function(){
     slideAnimRow.animate({marginLeft:0+"px"}, 1000, function(){$(this).fadeOut(6000,
     function(){
     reset();
     slideAnimRow.find(".slideAnimIcon").html("∆");
     slideAnimRow.find(".slideAnimMsg").html("Razor sharp cognition engine to deliver an unparalleled adaptive learning infrastructure.")
     slideAnimTransition.animate({top:slideAnimHeight+"px"},1500,
     function(){
     slideAnimRow.animate({marginLeft:0+"px"}, 1000, function(){$(this).fadeOut(6000,
     function(){
     reset();
     slideAnimRow.find(".msgAnim").addClass("reduceFont");
     slideAnimRow.find(".slideAnimIcon").html("ॐ");
     slideAnimRow.find(".slideAnimMsg").html("We practically define the science of ontology. <p>Welcome to the new world of learning.</p>")
     slideAnimTransition.animate({top:slideAnimHeight+"px"},1500,
     function(){
     slideAnimRow.animate({marginLeft:0+"px"}, 1000, function(){$(this).fadeOut(6000,function(){
     reset();
     animateSlide()

     }

     )}
     )
     }
     )})
     })
     }
     )})
     })

     })*/
}

function reset(){
    //slideAnimTransition.css({top:"-"+slideAnimHeight+"px",width:slideAnimRowWidth+"px"})
    slideAnimRow.css({display:"none",width:slideAnimRowWidth+"px"})
    slideAnimRow.find(".slideAnimIcon").html("π").css({marginTop:"10%", width:"25%"});
    slideAnimRow.find(".msgAnim").removeClass("reduceFont");
    slideAnimRow.find(".slideAnimMsg").html("Infinitely scalable knowledge engineering infrastructure.");

}
reset();
animateSlide();
$(".secondaryNavHome .col-md-4").on("click", function(){
    if($(this).hasClass("student")){
        formCarousel("student")
    }else if($(this).hasClass("educator")){
        formCarousel("educator")
    }else if($(this).hasClass("institute")){
        formCarousel("institute")
    }

})

function formCarousel(classParam){
    $(".carousel").eq(2).remove();
    var myCarousel =$(".carousel").eq(1)
    var myCarouselClone =myCarousel.clone();
    if(!$(".carousel").eq(2).length){
        myCarousel.after(myCarouselClone)
        var indicatorLis = $(".carousel:last .carousel-indicators li").not("." + classParam).remove()
        $(".carousel:last .carousel-indicators" +" "+ "." + classParam).each( function(i, value){
            $(this).removeClass("active").attr("data-slide-to",i)
        })
        $(".carousel:last .item").not("." + classParam).remove();
        $(".carousel:last .item").removeClass(".next, .left, .right, .active")
        $(".carousel:last .carousel-inner .item:first").addClass("active")
        $(".carousel:last .carousel-indicators li:first").addClass("active")

        $(".carousel:last").attr("id", "lastCarousel").show()
    }

    $(".carousel").eq(1).attr("id", "firstCarousel").hide();
    setTimeout(function(){
        runCarousel()
    },1600)
}
runCarousel();
var imageSrc="";
$(".secondaryNavHome img").on("mouseover", function(){
    imageSrc = $(this).attr("src");
    if(imageSrc.indexOf("_active") == -1){
        var imageName = imageSrc.substring(imageSrc.indexOf("/"), imageSrc.length).replace(".png", "_active");
        $(this).attr("src", "img"+imageName+".png")
    }
}).on("mouseout", function(){
        $(this).attr("src",imageSrc);
    })