//globals
var url = "http://localhost:3000/"
var start;
var end;
var lat;
var long;
var map;
var service;
var mapOptions;
var locaton;
var e = moment().format('MM/DD/YYYY');
var d = new Date(moment().format('MM/DD/YYYY'))
var time = moment().format('hh:mm');
var waypointArray=["Rutgers University"];
console.log(d)
var Items={};

List();
//map and geolocation
function initMap() {
  lat = long = 0.0;
  navigator.geolocation.getCurrentPosition(function(location) {
    $('#name').text("Hello Tom")
    $('#date').html(e)
    $('#time').html(time)
    // $("#clear").hide();
    //$("#submit-dest").slideUp(3000).slideDown(3000);
  
    console.log(location)
    lat= location.coords.latitude;
    long=location.coords.longitude;
    console.log(location.timestamp)
   
    var d = new Date(location.timestamp);
    console.log(d.toLocaleTimeString())
    console.log(d)
    mapOptions={
           center:new google.maps.LatLng(lat,long), 
           zoom: 11,
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
    $('#submit-dest').hide();
    $("#clear").show();
    $('#clear').css("background-color","red");
    $('#clear').text("clear");
    $("#post").hide();
    calculateAndDisplayRoute(directionsService, directionsDisplay); 
    });
  })
}

///markers waypoint
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

 //waypointArray=["Ocean County Mall","300 Pompton Rd.","Jackson,NJ", "10 Westfield Ave"];
console.log(waypointArray);

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

//direction onclick function
$("#dir").on("click",function(){


$("#post").hide();
$("#directions-panel-1").hide();
$("#directions-panel-2").empty();
$("#directions-panel").show();
$('#submit-dest').css("background-color","red");
$('#submit-dest').text("clear");
$("#directions-panel").css("background-color"," #156C9B");
$("#directions-panel").css("color","white");
})

//list onclick function
$(document).on("click", "#list", function(){

  console.log(Items);
   //var my location = List();
$("#post").hide(); 
$("#directions-panel").hide();
$("#directions-panel-2").empty();
$("#directions-panel-1").show();
//$("#directions-panel-1").append("<ul id='list'> My List<li id='list'>" + Items.weekDay+ "</li> <li id='list'>" + Items.startTime+ "</li><li id='list'>" + Items.location + "</li></ul>");
$("#directions-panel-1").css("background-color"," #156C9B");
$("#directions-panel-1").css("color","white");
$('#submit-dest').css("background-color","red");
$('#submit-dest').text("clear");
})

//add-a-friend onclick function
$("#add-a-friend").on("click",function(){ 
$("#post").hide();
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

//clear onclick function
$("#clear").on("click",function(){ 
$("#directions-panel-2").empty();
$("#directions-panel").hide();
$("#directions-panel-1").hide();
$("#directions-panel-2").hide();
$("#post").show();
})
}

function List(){
 var urlTemp = url + "todo";
        $.ajax({
            type: "GET",
            url: urlTemp,
            timeout: 2000,
            success: function(data) {
              var location= data[0].location
                //show content to console for testing
                console.log('success!!');
                //console.log(data);
                // if (data.length > 1) {
                  for (var i = 0; i < data.length; i++) {
                    console.log("todo data: " + data[i]);
                      $("#directions-panel-1").append("<ul id='list'> My List<li id='list'>" + data[i].week_day+ "</li> <li id='list'>" + data[i].start_time+ "</li><li id='list'>" + data[i].location + "</li></ul>");
$("#directions-panel-1").css("background-color"," #156C9B");
$("#directions-panel-1").hide();
                     //data[i].location.push(waypointArray)
                    waypointArray.push(data[i].location)
                  }
                // } else {
                    console.log("todo data: " + data[0].location);
                     Items.location= data[0].location;
                     Items.weekDay= data[0].week_day;
                     Items.startTime= data[0].start_time;

                // }
            
                //console.log(JSON.stringify(data));
                //window.open(url+"profile-page.html");
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err);
                if (err === "timeout") {
               
                    console.log("waiting for server...");
                    //postItem(myJson);
                } 

                
            }
        });
          return Items;
  }