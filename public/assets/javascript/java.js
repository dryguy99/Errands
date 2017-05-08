
var start;
var end;
var lat;
var long;
var map;
var service;
var mapOptions;
var e = moment().format('MM/DD/YYYY');
var d = new Date(moment().format('MM/DD/YYYY'))
var time = moment().format('hh:mm');
console.log(d)

function initMap() {
  lat = long = 0.0;
  navigator.geolocation.getCurrentPosition(function(location) {
    $('#name').text("Hello Tom")
    $('#date').html(e)
    $('#time').html(time)
$("#submit-dest").slideUp(3000).slideDown(3000);
  
    console.log(location)
    lat= location.coords.latitude;
    long=location.coords.longitude;
    console.log(location.timestamp)
   
    var d = new Date(location.timestamp);
    console.log(d.toLocaleTimeString())
    console.log(d)
    mapOptions={
           center:new google.maps.LatLng(lat,long), 
           zoom: 12,
           color:"blue",
           mapTypeId:google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map"),mapOptions);

    var marker = new google.maps.Marker({
    position:new google.maps.LatLng(lat,long),
    map:map
   });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);


  document.getElementById('submit-dest').addEventListener('click', function() {
    //$("#directions-panel").empty();
    $("#directions-panel-2").empty();
    calculateAndDisplayRoute(directionsService, directionsDisplay);

        
    });
  })
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  $("#directions-panel-2").empty();
 $("#directions-panel").toggle();

//$("#directions-panel").toggle();

//$("#directions-panel").toggle();
//AJAX to retrieve locations
// var currentURL = window.location.origin;
//     $.ajax({
//      url: currentURL + "/api/------",
//        method: "GET",
//      //context: userData
//      }).done(function(data){
//       console.log(data)
//      })

var waypointArray=["Ocean County Mall","300 Pompton Rd.","Jackson,NJ", "10 Westfield Ave"];


var index= waypointArray.length;
end = waypointArray[index-1];
console.log(end)
var waypts = [];

  for (var i = 0; i < waypointArray.length-1; i++) {
      waypts.push({
        location: waypointArray[i],
        stopover: true
      });
     console.log(waypts)
  }
  directionsService.route({
    origin: new google.maps.LatLng(lat,long),
    destination: end,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      console.log(route)
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b><center>Destination: ' + routeSegment +
            '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';

}


         } else {
      window.alert('Directions request failed due to ' + status);
    }
  });


$("#dir").on("click",function(){
$("#directions-panel-1").hide();
$("#directions-panel-2").empty();
$("#directions-panel").show();
$('#submit-dest').css("background-color","red");
$('#submit-dest').text("clear");
$("#directions-panel").css("background-color"," #156C9B");
$("#directions-panel").css("color","white");
})

$('#submit-dest').text("Update");
$('#submit-dest').css("background-color","#337ab7");


$("#list").on("click",function(){ 
$("#directions-panel").hide();
$("#directions-panel-2").empty();
$("#directions-panel-1").show();
$("#directions-panel-1").html("Monday jhakjASJ");
$("#directions-panel-1").css("background-color"," #156C9B");
$("#directions-panel-1").css("color","white");
$('#submit-dest').css("background-color","red");
$('#submit-dest').text("clear");
})



$("#add-a-friend").on("click",function(){ 
  console.log('HELLO')
$("#directions-panel").hide();
$("#directions-panel-1").hide();
$("#directions-panel-2").show();

$('#directions-panel-2').append("<form action='sharer.php' method='POST'>");
$('#directions-panel-2 form').append("<div class='appm'>Add a Friend<div/>");
$('#directions-panel-2 form').append("<input type='text' placeholder='Name' style='color:black' name='routename' id='rname'/>");
$('#directions-panel-2 form').append("<br><br><input type='submit' id='savebutton' style='color:black' value='Save' />");


$("#directions-panel-2").css("background-color"," #156C9B");
$("#directions-panel-2").css("color","white");
$('#submit-dest').css("background-color","red");
$('#submit-dest').text("clear");

})
}
