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
$("#socialLink img").bind("click", function(){
	if(openState== false){
	isHomePage = true;
		$(this).parent().animate({right:"0px"},'fast',function(){openState = true});
	}else{
	isHomePage = false;
		$(this).parent().animate({right:"-300px"},'fast',function(){openState = false});
	}

})
$("#signUp,.testLogin").bind("click", function(e){
	e.preventDefault();
	isHomePage = true;
	
	if($(".popup").is(":hidden")){
		if($(this).hasClass("testLogin")){
			isHomePage = false;
		}
		centerDiv(".popup");
		$("#overlay").show()
	}
})
function centerDiv(obj){
	var scrollTop= $(window).scrollTop();
	var scrollLeft= $(window).scrollLeft();
	var windowWidth=$(window).width()/2;
	var windowHeight = $(window).height()/2;
	$(obj).show();
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
$(".socialIcon li").bind('click', function(){
        var socialId= $(this).prop("title");

		if(isHomePage){
		//window.location= "courses.html"
        initiateAuthentication(socialId)
		}else{
            initiateAuthentication(socialId)
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

$(window).resize(function(){
	if($(".popupInstruction").is(":visible")){
		centerDiv(".popupInstruction");}
	else if($(".popup").is(":visible")){
			centerDiv(".popup");
		}
})