// Create map object and set default layers
var myMap = L.map("map", {
    center: [46.2276, 2.2137],
    zoom: 1,
  });

d3.csv("./static/WHR20_columns_fixed.csv").then(function(wh_data, err) {
    if (err) throw err;
  
    // parse data
    wh_data.forEach(function(data) {
      data.latitude = +data.latitude;
      data.longitude = +data.longitude;
      data.ladder_score = +data.ladder_score;
      
    });
  
// An array which will be used to store created cityMarkers
var countryMarkers = [];

for (var i = 0; i < wh_data.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    countryMarkers.push(
      L.marker([wh_data[i].latitude, wh_data[i].longitude]).bindPopup("<h1>" + wh_data[i].country_name + "</h1>")
    );
  }

var countryLayer = L.layerGroup(countryMarkers);

countryLayer.addTo(myMap)
});



d3.json("./static/custom.geo.json").then(function(geo_data) {
    // Once we get a response, send the data.features object to the createFeatures function
    var geo = L.geoJSON(geo_data.features);
    geo.addTo(myMap)
  });
  