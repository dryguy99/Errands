$( "#name" ).hover(
 function() {
   $( this ).append( $( "<span> The Anemoi are the Greek Gods of the winds. Each is ascribed a cardinal direction. Allow the Anemoi to help guide you through your day. When the errands pile up and life gets hectic Anemoi will blow you in the right direction. </span>" ) ).attr("id","hidden");
 }, function() {
   $( this ).find( "span:last" ).remove();
 }
);

// $(document).on("click", "#signin", function() {
//         window.open("https://.....");
//         });


// $(document).on("click", "#login", function() {
//         window.open("https://.....");
//         });
