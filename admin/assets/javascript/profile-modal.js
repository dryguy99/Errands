var url = "http://localhost:3000/"
var Todo={};
var task;
console.log("hheyyyy  starting profile-modal")
// why is this a function?
//function keyUp(){

    $(document).on("keyup", "#task-input", function (){
        console.log($(this).val());
        
        if($(this).val().length<8){
            console.log('running ajax request for task list');
            var data = $(this).val();
            var urlTemp = url + "mytask/" + data;
            console.log(urlTemp);
            console.log(data);
            $.ajax({
                type: "GET",
                url: urlTemp,
                timeout: 2000,
                success: function(data) {
                    console.log("successful task list query");
                    console.log(JSON.stringify(data));
                    task = "";
                            var dropDown=("<div>");
                            dropDown.attr("id","down");
                            dropDown.html("");
                    for(i=0;i<data.length;i++){
                            console.log(data[i].task);
                            dropDown.append(data[i].task)
                            $("#task-input").append(drop+ "<br>");
                            //task = $(this).val();
                        }
                         task = $('#task-input').val().trim();
                         SubmitForm();
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
         Todo.task = $('#task-input').val().trim();
         Todo.location= $('#location-input').val().trim();
         Todo.time= $('#time-input').val().trim();
         Todo.duration= $('#duration-input').value.trim();//.val()?
         Todo.textArea= $("#textArea").val().trim();//.val()?
         console.log(JSON.stringify(Todo));

        ///MODAL SUBMITION
        var urlTemp = url + "/api/todo";
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
            } //end error
        }); // end ajax call
    }); // end on click event     
//} // end SubmitForm function

// keyUp();
// SubmitForm();
