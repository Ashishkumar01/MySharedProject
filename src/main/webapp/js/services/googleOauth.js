
var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
//var SCOPE       ='https://www.googleapis.com/auth/userinfo.profile';
var CLIENTID    =   '554103276018-sc8i6m4161gv9ambbna7q0g55sn3rdqi.apps.googleusercontent.com';
var REDIRECT    =   'http://localhost:8080/omoknow/index.html'
var LOGOUT      =   'http://accounts.google.com/Logout';
var TYPE        =   'token';
var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
var acToken;
var tokenType;
var expiresIn;
var user;
var loggedIn    =   false;


function login() {

    var win         =   window.open(_url, "windowname1", 'width=800, height=600');

    var pollTimer   =   window.setInterval(function() {
        try {
            console.log(win.document.URL);
            if (win.document.URL.indexOf(REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                var url =   win.document.URL;
                acToken =   gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');
                win.close();

                validateToken(acToken);
            }
        } catch(e) {
        }
    }, 500);
}

function validateToken(token) {
    $.ajax({
        url: VALIDURL + token,
        data: null,
        success: function(responseText){
            getUserInfo();
            loggedIn = true;
            //$('#loginText').hide();
            //$('#logoutText').show();
        },
        dataType: "jsonp"
    });
}

function getUserInfo() {
    $.ajax({
       url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        //url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        data: null,
        success: function(resp) {
            user    =   resp;
            console.log(user);
            //$('#uName').text('Welcome ' + user.name);
            //$('#imgHolder').attr('src', user.picture);
            console.log(user)
            $.cookie("providerJSON", JSON.stringify(resp))
            if(loggedIn){
                $(".instruct").hide()
                if(openState){
                    console.log("inside open state")
                    $("#socialLink").trigger("click").hide()
                }

                $(".testLoginActive").trigger("click")
                $("#overlay, .popup").hide();
                if(!$("#course").length){
                    if($.cookie("doNotAskMeAgain")){
                        window.location= "courses.html"
                    }else{
                        if(!loggedIn){
                            centerDiv(".popup");
                            $("#redirectCallToAction").show()
                            $(".popup .socialIcon,.socialLinkToggle p:first").hide();
                        }
                    }
                }
                $("#signUp")
                    .off("click")
                    .html("Logout")
                    .attr("id","logout")
                    .on("click", function(e){
                        e.preventDefault();
                        openState= false;
                        logOut();

                    })

            }
        },
        dataType: "jsonp"
    });
}

//credits: http://www.netlobo.com/url_query_string_javascript.html
function gup(url, name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\#&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
        return "";
    else
        return results[1];
}

function logOut() {
   // $('#loginText').show();
    //$('#logoutText').hide()
    loggedIn = false;
    $.cookie("providerJSON", "");
    if(!$(".instruct").length){
        // $(".navbar-nav:first").prepend('<li class="instruct">You are not signed in, sign in now!</li>')
    }else{
        $(".instruct").show()
    }
    $("#logout")
        .off("click")
        .html("Sign in")
        .attr("id","signUp")
        .on("click", function(e){
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
                $("#redirectCallToAction").hide()
                $(".popup .socialIcon,.socialLinkToggle p:first").show();
                $("#overlay").show()
            }

        })
    $("#socialLink").show();
    $("#courseList .closeWrapper span").trigger("click")
    //$('#uName').text('Welcome ');
    //$('#imgHolder').attr('src', 'none.jpg');
}

