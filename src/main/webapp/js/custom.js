// Activates the Carousel
$('.carousel').carousel({
  interval: 5000
})

// Activates Tooltips for Social Links
$('.tooltip-social').tooltip({
  selector: "a[data-toggle=tooltip]"
})
var openState= false;
var isHomePage = false;
if(checkAuthenticationStatus().length != 0){
    $("#signUp")
        .off("click")
        .html("Logout")
        .attr("id","logout")
        .on("click", function(e){
            e.preventDefault();
            openState=false;
            logOut();
        })
    if(openState){
          $("#socialLink").trigger("click").hide()
    }else{
        $("#socialLink").hide()
    }
    $("#overlay, .popup").hide();
    //$("#courseList .closeWrapper span").trigger("click")
}else{
    $("#logout")
        .off("click")
        .html("Sign in")
        .attr("id","signUp")
        .on("click", function(e){
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
    $("#socialLink").show()


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
$(".popupInstruction .btn").on('click', function(){
	$(this).parent().parent().hide();
	$("#overlay").hide()
	if($(this).hasClass("btn-primary")){
		return true;
	}else{
		return false;
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
$(".testLogin").on("click", function(e){
    e.preventDefault();
    $(".testLogin").removeClass("testLoginActive");
    $("#courseList .closeWrapper span").trigger("click")
    $(this).addClass("testLoginActive")
    if(checkAuthenticationStatus().length != 0){
        showCourseListing(this)
    }else{
        e.preventDefault();
        $("#signUp").trigger("click")

    }
})
function showCourseListing(obj){
    var htmlContainer = '<div id="courseList">' +
        '<div class="closeWrapper"><h3> Click to browse the test exams</h3><span>x</span></div>'
        +'<div id="courseListItemWrapper"><ul id="courseListItem"></ul></div>'
        +'</div>';

    $(obj).parent().prepend(htmlContainer);
    $("#courseList .closeWrapper span").bind('click', function(){
        $("#courseList").remove();
    })
    $.ajax({
        url: "data/courses/courses.json"})
        .done(function( data ) {
            var liString ="";
            for( var i =0; i<data.length; i++){
                liString+="<li><a href="+"'exam.html#/showInstruction/"+data[i].id+"'>"+data[i].name+"<\/a><\/li>";
            }
            $("#courseListItem").html(liString);
            $("#courseList").animate({top:"0px"}, "fast",function(){

                var offset =$("#courseList").offset().top;
                var baseTop = 75;
                var scrollTop =$(window).scrollTop();
                var diff =offset-baseTop;

                if (diff>0){
                    var body = $("body,html");
                    body.animate({scrollTop:diff+"px"}, '500');
                }

            }).addClass("noBg");


        });

}