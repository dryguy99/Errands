 
firebase.initializeApp(config);


var database = firebase.database();


// adds a User
$("#submitBtn").on("click", function(){

	// holds user input
	var userName = $("#userNameInput").val().trim();
	var userPassword = $("#passwordInput").val().trim();
	var userEmail = $("#emailInput").val().trim();

	//new User data
	var newUser = {
		name:  userName,
		password: userPassword,
		email: userEmail,
		
	}

	// Uploads user data to the database
	database.ref().push(newUser);

	
	// Clears all of the text-boxes
	$("#userNameInput").val("");
	$("#passwordInput").val("");
	$("#emailInput").val("");
	

	// Prevents moving to new page
	return false;
});


// event to add user to firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	
	var userName = childSnapshot.val().name;
	var userPassword = childSnapshot.val().password;
	var userEmail = childSnapshot.val().email;