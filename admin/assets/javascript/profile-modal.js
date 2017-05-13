var url = "http://localhost:3000/"
var Todo={};
var task = "";
var id = -1;

console.log("hheyyyy  starting profile-modal")
// why is this a function?
//function keyUp(){

    $(document).on("keyup", "#task-input", function (){
        console.log($(this).val());
        
        if($(this).val().length<8){
            console.log('running ajax request for task list');
            var data = $(this).val();
            data.toLowerCase();
            var urlTemp = url + "mytask/" + data;
            console.log(urlTemp);
            console.log(data);
            $.ajax({
                type: "GET",
                url: urlTemp,
                timeout: 2000,
                success: function(data) {
                    // need to get task id from data column title is id so find correct data.id
                    console.log("successful task list query");
                    task = "";
                    //dropDown.html("");
                    $("#taskselect").html("");
                    $("#taskselect").css("display", "block");
                    if (data.length < 7) {
                        for(i=0;i<data.length;i++){
                            console.log(data[i].task);
                            var dropDown = "<div class='down btn' data-id='" + data[i].id+"' value='" + data[i].task+"'>"+data[i].task+"</div><br>";
                        
                            $("#taskselect").append(dropDown);
                            //task = $(this).val();
                        }
                    } else {
                        for(i=0;i < 7;i++){
                            console.log(data[i].task);
                            var dropDown = "<div class='down btn' data-value='" + data[i].id+"' value='" + data[i].task+"'>"+data[i].task+"</div><br>";
                            $("#taskselect").append(dropDown);
                            //task = $(this).val();
                        }
                    }
                         task = $('#task-input').val().trim();
                         //SubmitForm();
                },
                error: function(jqXHR, textStatus, err) {
                    console.log("error on task query: " + err + "Text Status; " + textStatus + " jqXHR: " + JSON.stringify(jqXHR));
                    //show error message
                }// end error
            }); // end ajax call
        }// end if clause
        else{
            //task = $(this).val();
            task =$('#task-input').val().trim();
            //SubmitForm();
        } // end else clause
    }); // end on click event
//} //end key up function



//function SubmitForm(){

    $(document).on("click", "#submit", function (){
         event.preventDefault();

         console.log("hello - onclick #submit inside SubmitForm");
         Todo.week_day = $('#day-input').val().trim();
         Todo.task_id = $('#task-input').attr("data-value");
         Todo.start_time = $('#time-input').val().trim();
         Todo.duration = $('#duration-input').val();//.val()?
         Todo.location = $('#location-input').val().trim();
         Todo.note = $("#textArea").val().trim();//.val()?
         console.log(JSON.stringify(Todo));
         $('#myModal').modal('hide');
        ///MODAL SUBMITION
        var urlTemp = url + "maketodo/";
        console.log(urlTemp);
        $.ajax({
            type: "POST",
            url: urlTemp,
            timeout: 2000,
            data:Todo,
            success: function(data) {
                    Todo.task = data.task 
                    console.log(JSON.stringify(data));
            }, //end success
            error: function(jqXHR, textStatus, err){ 
            console.log("error: " + err);    
            } //end error
        }); // end ajax call
          $('#day-input').val(" ")
         $('#task-input').val(" ")
          $('#time-input').val("")
          $('#duration-input').val(" ");//.val()?
          $('#location-input').val(" ");
          $("#textArea").val(" ");//.val()
          window.location.reload();
    }); // end on click event     
//} // end SubmitForm function
$(document).on("click", ".down", function() {
    console.log(this);
    task = $(this).attr('value');
    id = $(this).attr("data-value");
    console.log ("task: " + task + " id: " + id);
    $("#task-input").val(task).attr("data-value", id).attr("value", task);
    $("#taskselect").css("display", "none");
    $("#taskselect").html("");
});
// keyUp();
// SubmitForm();
