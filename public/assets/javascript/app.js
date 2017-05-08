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

$(document).on("click", "#submitBtn", function (){
	event.preventDefault();
	console.log("submit create user");
	$('#error1').css("display", "none");
	$('#error2').css("display", "none");
	$('#error3').css("display", "none");
	$('#error4').css("display", "none");
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


function signUp (data) {
	var urlTemp = url + "register/";
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data: data,
            success: function(data) {
                //show content to console for testing
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
        });

}