// Google Map
var map;
var marker;
var lat;
var lng;

function myMap() {
  // Map starter lat and long
  let latitude = 50.375456;
  let longitude = -4.142656;

  let myLatLng = { lat: latitude, lng: longitude };

  // Map properties
  var mapProp = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 13,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false
  };
  // Creating the map
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  // Creating the search box and link to UI
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Change viewpoint based on the search results
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  // On click carry out addMarker function
  map.addListener("click", function(event) {
    addMarker(event.latLng);
    logCords();
  });

  // If marker is not defined create a new marker
  function addMarker(location) {
    if (marker == undefined) {
      marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP
      });
    } else {
      // Set new position for marker
      marker.setPosition(location);
    }
  }
}
// Gets the cordinates of the marker and puts them into variables
function logCords() {
  lat = marker.getPosition().lat();
  lng = marker.getPosition().lng();

  // giving the getApi function paramaters of lat and lng so the variables can be used in the function to change API url when marker is placed
  getApi(lat, lng);

  console.log("latitude: " + lat + ", " + "longitude: " + lng);
}

//  API DATA        //

document.getElementById("getApi").addEventListener("click", getApi);

// Loop getApi function so when marker changes the url updates and the data on the page changes
for (var i; i > 0; i--) {
  getApi(i);
}

function getApi() {
  // API url with the lat and lng variables so the data changes when the marker is changed
  var url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=" +
    lat +
    "&lng=" +
    lng +
    "&date=2017-01";

  // Fetching the url then receiving the data and put it into a list to be shown on the page
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let output = "<h2 id='crimeTitle'>Crimes</h2>";
      // Creating an array for the data
      data.forEach(function(crime) {
        output += `

        <ul class="crimeList">
        <li class="data">Crime Catergory: ${crime.category} </li>
        <li class="data">Location: ${crime.location.street.name} </li>
        <li class="data">Date: ${crime.month} </li>
        </ul>
      `;
      });
      document.getElementById("output").innerHTML = output;
    });
}
