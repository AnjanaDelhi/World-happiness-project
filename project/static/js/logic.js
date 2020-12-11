// Create map object and set default layers
var myMap = L.map("map", {
    center: [46.2276, 2.2137],
    zoom: 1,
  });

d3.json("/api/happy_map").then(function(wh_data, err) {
    if (err) throw err;
  
    // parse data
    wh_data.forEach(function(data) {
      data.latitude = +data.latitude;
      data.longitude = +data.longitude;
      data.happy = +data.happy;
      
    });

// Define a markerSize function that will give each city a different radius based on its population
//function markerSize(happy) {
 // return happy;
//}
  
// An array which will be used to store created cityMarkers
var countryMarkers = [];

for (var i = 0; i < wh_data.length; i++) {
  L.circle([wh_data[i].latitude, wh_data[i].longitude], {
    fillOpacity: 0.75,
    color: "red",
    fillColor: "purple",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to happiness
    radius: wh_data[i].happy})
  
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    //countryMarkers.push(
      L.marker([wh_data[i].latitude, wh_data[i].longitude]).bindPopup("<h1>" + wh_data[i].country_name + "<br>" + Math.round(wh_data[i].happy) +  "</h1>").addTo(myMap)
    
      };

//var countryLayer = L.layerGroup(countryMarkers);

//countryLayer.addTo(myMap)
});



d3.json("./static/custom.geo.json").then(function(geo_data) {
    // Once we get a response, send the data.features object to the createFeatures function
    var geo = L.geoJSON(geo_data.features);
    geo.addTo(myMap)
  });
  