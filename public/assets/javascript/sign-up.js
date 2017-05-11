// all javascript should end up here
var url = "http://localhost:3000/"
var username = "";
var email = "";
var pass = "";
var signup = {
	name: "",
	password: "",
	email: ""
};
var login={
	name: "",
	password: ""
}
var a; 
console.log("hey")
$("#submitBtn").hide();
$(".submitBtn2").hide();
$("#myform").hide();
$(".submitBtn2").hide();


$( "#name" ).hover(
function() {
$( this ).append( $( "<span> The Anemoi are the Greek Gods of the winds. Each is ascribed a cardinal direction. Allow the Anemoi to help guide you through your day. When the errands pile up and life gets hectic Anemoi will blow you in the right direction. </span>" ) ).attr("id","hidden");
}, function() {
$( this ).find( "span:last" ).remove();
}
);


$(document).on("click", "#mod", function (){
	console.log($(this).val())
	a= $(this).val();
// $("#mod").on("click",function(){
	console.log("hey")
	$("#push").show();
	$("#userNameInput").text("Create Username");
	$("#passwordInput").text("Create Password");
	//$("#submitBtn").show();
	$(".submitBtn2").show();
	$("#myform").hide();
    $("#form-1").hide();


})
$(document).on("click", "#mod-1", function (){
//$("#mod-1").on("click",function(){
	$("#push").hide();
	console.log($(this).val())
	$("#userNameInput").text("Username");
	$("#passwordInput").text("Password");
	$("#submitBtn2").show();
	$("#submitBtn").hide();
	$("#form").hide();
    $("#form-1").show();


})



$(document).on("click", ".submitBtn", function (){
	console.log(a);
	event.preventDefault();
	console.log("submit create user");
	$('#error1').css("display", "none");
	$('#error2').css("display", "none");
	$('#error3').css("display", "none");
	$('#error4').css("display", "none");

	// if(a=1)
	if ($('#userNameInput').val().trim().length > 2 && $('#passwordInput').val().trim().length > 6 &&  $('#emailInput').val().trim().includes('@') && $('#emailInput').val().trim().length > 8) {
			signup.name = $('#userNameInput').val().trim();
			signup.email = $('#emailInput').val().trim();
			signup.password = $('#passwordInput').val().trim();
			console.log(JSON.stringify(signup));
			$('#userNameInput').val("");
			$('#emailInput').val("");
			$('#passwordInput').val("");
			signUp (signup);
	} else if ($('#userNameInput').val().trim().length < 3){ 
			$('#error1').css("display", "inline");
			$('#error1').html("Username must be longer than 3 characters.");
	} else if ($('#passwordInput').val().trim().length < 7) {
			$('#error2').css("display", "inline");
			$('#error2').html("Password must be longer than 6 characters.");
	} else {
		$('#error3').css("display", "inline");
		$('#error3').html("Invalid email, please check and resubmit.");
	}
	
});



$(document).on("click", "#submitBtn2", function (){
	login.name = $('#userNameInput').val().trim();
	login.email = $('#emailInput').val().trim();
	login.password = $('#passwordInput').val().trim();
	console.log(JSON.stringify(Authorize));

			$('#userNameInput').val("");
			$('#emailInput').val("");
			$('#passwordInput').val("");
			Authorize(login);
});



function signUp (data) {
	var urlTemp = url + "register/";
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: data,
            success: function(data) {
            	console.log(data)
                //show content to console for testing
                console.log(JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err);
                if (err === "timeout") {
                $("#error").html("Username or password is incorrect")
                	console.log("waiting for server...");
                	//postItem(myJson);
                } 
                $('#error4').css("display", "inline");
                $('#error4').html("error: " + err);
                
            }
        });

}


function Authorize(data){
	console.log("hello")
	var urlTemp = url + "authenticate/";
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: data,
            success: function(data) {
                	if(data.username==="")
                console.log(JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err);
                if (err === "timeout") {
                	console.log("waiting for server...");
                	//postItem(myJson);
                } 
                $('#error4').css("display", "inline");
                $('#error4').html("error: " + err);
                
            }
       })
}