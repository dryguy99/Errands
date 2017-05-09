////create logic
var Todo={};
var task;

function keyUp(){

$(document).on("keyup", "#task-input", function (){
task += $(this).val();
if(task.length<4){
var urlTemp = url + "/";
        $.ajax({
            type: "GET",
            url: urlTemp,
            timeout: 2000,
            data: data,
            success: function(data) {
                console.log(JSON.stringify(data));
                		
                		var drop=("<div>");
	                	drop.attr("id";"down");
	                	drop.html("");
                for(i=0;i<data.length;i++){
	                	drop.append(data[i].task)
	                	$("#").append(drop+ "<br>")
                	}
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
}
})
}

else{
	task = $(this).val();
}

$(document).on("click", "#submit", function (){

	event.preventDefault();


	 Todo.task =  = $('#task-input').val().trim();
	 Todo.location= $('#location-input').val().trim();
	 Todo.time= $('#time-input').val().trim();
	 Todo.duration= $('#duration-input').val().trim();
     Todo.textArea= $("#textArea").val().trim();


var urlTemp = url + "/";
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data:Todo,
            success: function(data) {
            		Todo.task = data.task
               
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
	
});