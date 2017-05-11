// all javascript should end up here
var url = "http://localhost:3000/"
var username = "";
var email = "";
var pass = "";
var signup = {
	username: "",
	password: "",
	email: "",
	phoneInput:""
};
var login={
	username: "",
	password: ""
}
var a; 
console.log("hey")
$( "#name" ).hover(
function() {
$( this ).append( $( "<span> The Anemoi are the Greek Gods of the winds. Each is ascribed a cardinal direction. Allow the Anemoi to help guide you through your day. When the errands pile up and life gets hectic Anemoi will blow you in the right direction. </span>" ) ).attr("id","hidden");
}, function() {
$( this ).find( "span:last" ).remove();
}
);
$(document).on("click", "#mod", function (){
  event.preventDefault();
	console.log($(this).val())
	a= $(this).val();
	// $("#submitBtn2").hide();
	// $("#myform").show();
	// $("#submitBtn2").hide();
	// $("#submitBtn").show();
// $("#mod").on("click",function(){
	$("#boom").show();
	$("#boom-1").hide();
	//$("#push").show();
	$("#userNameInput").text("Create Username");
	$("#passwordInput").text("Create Password");
})


$(document).on("click", "#mod-1", function (){
	$("#boom-1").show();
	$("#boom").hide();
	// $("#push").hide();
	// $("#myform").show();
	// $("#submitBtn").hide();
	// $("#submitBtn2").show();
	// $("#submitBtn2").show();
	
	console.log($(this).val())
	$("#userNameInput").text("Username");
	$("#passwordInput").text("Password");
	


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
			signup.username = $('#userNameInput').val().trim();
			signup.email = $('#emailInput').val().trim();
			signup.password = $('#passwordInput').val().trim();
			signup.phoneInput = $('#phoneInput').val().trim();

			console.log(JSON.stringify(signup));
			$('#userNameInput').val("");
			$('#emailInput').val("");
			$('#passwordInput').val("");
			$("#phoneInput").val("");
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
// $("#submitBtn2").on("clicK",function (){
$(document).on("click", "#submitBtn2", function (){
  event.preventDefault();
	login.username = $('#userNameInput').val().trim();
	login.password = $('#passwordInput').val().trim();
	console.log(JSON.stringify(Authorize));

			$('#userNameInput').val("");
			$('#emailInput').val("");
			$('#passwordInput').val("");
			$('#phoneInput').val("");

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
    console.log("hey authorize me: " + data);
    var urlTemp = url + "authenticate/";
    console.log(urlTemp);
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