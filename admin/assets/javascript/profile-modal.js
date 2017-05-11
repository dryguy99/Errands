
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
                        var dropDown=("<div>");
                        dropDown.attr("id","down");
                        dropDown.html("");
                for(i=0;i<data.length;i++){
                        console.log(data[i].task);
                        drop.append(data[i].task)
                        $("#task-input").append(drop+ "<br>")


                        //task = $(this).val();
                    }
                     task = $('#task-input').val().trim();
                     SubmitForm();
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
}
})
}

else{
    //task = $(this).val();
     task =$('#task-input').val().trim();
     SubmitForm();
}

})
}



function SubmitForm(){

$(document).on("click", "#submit", function (){
     event.preventDefault();
     Todo.task = $('#task-input').val().trim();
     Todo.location= $('#location-input').val().trim();
     Todo.time= $('#time-input').val().trim();
     Todo.duration= $('#duration-input').val().trim();
     Todo.textArea= $("#textArea").val().trim();
     console.log(Todo)

///MODAL SUBMITION
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
            error: function(jqXHR, textStatus, err){
                
          }
      })

   });
    
};

keyUp();

