/**
 * Created with JetBrains WebStorm.
 * User: Ashish
 * Date: 19/07/14
 * Time: 17:39
 * To change this template use File | Settings | File Templates.

 Use cases that this Script covers -

 1.  Allow a user to login using a social authentication provider. Google, Facebook etc
 2.  On successful authentication, disable the login button and enable to logout button
 3.  On successful logout, disable the logout button and enable the login buttons
 4.  Provide the user details like email etc
 5.  Provide the authentication provider name

 **/

var listOfProviders     =   ["google", "facebook", "linkedin"];     //Add new providers in this array
var loginDetais = null;
var GOOGLE_CLIENT_ID    =  "554103276018-sc8i6m4161gv9ambbna7q0g55sn3rdqi.apps.googleusercontent.com";
var FACEBOOK_CLIENT_ID  =  '';
var LINKEDIN_CLIENT_ID  = "e354e0ff-5388-4221-bd51-683f02cc7999";

var OAUTH_PROXY_URL = {
    'local.knarly.com' : 'http://local.knarly.com:5500/proxy'
}[window.location.hostname] || 'https://auth-server.herokuapp.com/proxy';

//Initialize the helloJS library
function initializeHello(){
    hello.init({
        facebook : FACEBOOK_CLIENT_ID,
        google   : GOOGLE_CLIENT_ID,
        linkedin : LINKEDIN_CLIENT_ID
    },{redirect_uri:'http://localhost:8080/omoknow/index.html',oauth_proxy:OAUTH_PROXY_URL});}

//        {redirect_uri:'http://localhost:63342/MySharedProject/src/main/webapp/index.html',oauth_proxy:OAUTH_PROXY_URL});}

//Allow the authentication process to kick-in
function login(provider){
    var providerName = provider.toString().toLowerCase();   //Convert to lower case as the helloJS API requires lower case name
    initializeHello();
    hello(providerName).login({force: false},getUserDetails);
}

function getLoginStatus(){
    if(checkAuthenticationStatus().length != 0){

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
                if(!$("#logout").length){
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
}


//If you wish to check whether the user is logged in and to which network? Returns an array of string with each element representing a provider OR null array if user is not logged in
function checkAuthenticationStatus(){
    var currentProviders    = [];
    var current_time = (new Date()).getTime() / 1000;
    for(var i=0; i<listOfProviders.length; i++){
        var session = hello.getAuthResponse(listOfProviders[i]);
        if(session && session.access_token && session.expires > current_time){
            currentProviders[i] = listOfProviders[i];
        }
    }
    return currentProviders;
}

//Call this method to initiate logout from the portal
function logOut(){
//Find the authentication provider and logout from all provider network
    var currentProviders    = checkAuthenticationStatus();
    $.cookie("providerJSON","");
    for(var i =0; i<currentProviders.length; i ++){
        hello.logout(currentProviders[i], {force:false}, function(){
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
        });
    }
}


//This method returns the user details
/**
 * parameter  optional ["me", "me/friends", "me/contacts", "me/followers", "me/following", "me/share"]
 * Returns a JSON containing the details asked for
 */
function getUserDetails(parameter){

    var validQuery = ["me", "me/friends", "me/contacts", "me/followers", "me/following", "me/share"];
    if(parameter== undefined){
        parameter= validQuery[0];
    }
    var correctParameter = false;
    for(var i = 0; i<validQuery.length; i++){
        if(parameter === validQuery[i]){
            correctParameter = true;
        }
        if(!correctParameter){
            parameter = "me";
        }
    }
//Find the Authentication Provider and get the user details
    var currentProviders    = checkAuthenticationStatus();
//validate the parameters
    if(currentProviders != null){

        for(var i =0; i<currentProviders.length; i ++){
            hello(currentProviders[i]).api(parameter).success(function (json){
                loginDetais=json;
                console.log('Logged in User Details: '+JSON.stringify(loginDetais));
                saveUser(loginDetais);
                getLoginStatus();
                if(!$.cookie("providerJSON")){

                $.cookie("providerJSON", JSON.stringify(loginDetais))
                    console.log("inauthentication::" +$.cookie("providerJSON") )
                }
                return  loginDetais;
            }).error(function(){

                    return null;
                });
        }

    }
    else{
        return null;
    }
}

/**
 * saves the user in local DB for use
 * @param user
 */
function saveUser(user){
    console.log('User:'+JSON.stringify(user));
    var userToSend={
                        email:user.email,
                        first_name:user.first_name,
                        last_name:user.last_name,
                        gender:user.gender,
                        locale:user.locale,
                        isActive:true
                    };

    $.ajax({
        url: 'rest/user/register',
        type: 'post',
        data: JSON.stringify(userToSend),
        contentType: "application/json",
        success: function (data) {
            alert('Registration successful.');
        },
        error:function(jqXHR, textStatus, errorThrown) {
            alert("Registration failed.");
        }
    });
}
