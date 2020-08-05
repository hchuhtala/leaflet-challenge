
// // Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// });

// Initialize LayerGroups
var layers = {
    fault_lines_layer: new L.LayerGroup(),
    earthquakes_layer: new L.LayerGroup()
  };

// Creating map object
var map = L.map("map", {
  center: [40.7128, -98.0059],
  zoom: 3,
  layers: [layers.fault_lines_layer, layers.earthquakes_layer]
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(map);

legendTitle = "Magnitude"

//API Call
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
d3.json(url, function (response) {
    // console.log(response.features[0].properties.mag);

    // Create Bubbles
    bubbles = L.bubbleLayer(response, { 
    property: "mag", 
    legend: false,
    scale: chroma.brewer.Set1,
    max_radius : 40,
    tooltip : false })
    bubbles.addTo(layers.earthquakes_layer);
})


// //Make Legend
// function showLegend(scale, max){

//   var legend = L.control({position: 'bottomright'});
//   var max_radius = this.options.max_radius;
//   var fill = this.options.style.fillColor;
//   var fill_scale = false;
//   var opacity = this.options.style.opacity;

//   var normal = d3_scale.scaleLinear()
//    .domain([0,max])
//    .range([0, 1]);

//   if (this.options.scale) {
//     fill_scale = chroma.scale(this.options.scale);
//   }

//   legend.onAdd = function(map) {
//     var div = L.DomUtil.create('div', 'info legend');
//     div.innerHTML += '<strong>' + bubbles.options.property + '</strong><br/>';
//     div.style = 'background-color: #FFF; padding: 8px; font-size: 14px; text-transform: capitalize'

//     for (var i = 3; i > 0; i--) {

//       var area = scale(max / i / 2);
//       var radius = Math.sqrt(area / Math.PI)
//       var item = L.DomUtil.create('div', 'bubble');

//       // If theres a color scale, use it
//       if (fill_scale) { fill = fill_scale(normal(max / i)) }

//       item.innerHTML = '<svg height="' + (max_radius * 2)  +'" width="' + (max_radius * 2 - (max_radius / 2)) + '">' +
//         '<circle cx="' + (radius + 1) + '" cy="' + max_radius + '" r="' + radius + '" stroke="' + chroma(fill).darken().hex() + '" stroke-width="1" opacity="' + opacity +'" fill="' + fill +'" />' +
//          '<text font-size="11" text-anchor="middle" x="' + (radius) + '" y="' + (max_radius * 2) + '" fill="#AAA">' + numeral( max / i ).format('0 a');  + '</text>' +
//       '</svg>';

//       item.style = 'float:left; width: ' + radius + ';'
//       div.appendChild(item)
//     }

//     return div;


//   };

//   // Add this one (only) for now, as the Population layer is on by default
//   legend.addTo(map);
// }

// showLegend();


// Grab boundary GeoJSON data

// Load in geojson data
var Geodata = "static/js/PB2002_boundaries.json";

console.log(Geodata);

d3.json(Geodata, function(data) {
  console.log(data);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chroma('red'),
        fillOpacity: 0.5,
        weight: 1.5
      };
    }
  }).addTo(layers.fault_lines_layer);
});

// Create an overlays object to add to the layer control
var overlays = {
  "Fault Lines": layers.fault_lines_layer,
  "Earthquakes": layers.earthquakes_layer
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

//Still working on how the legend appears without duplicating

d3.selectAll(".leaflet-control-layers-selector").on('click',function () {
  // get the selected option in the control layers :
makeLegend(scale, max)
console.log("legend delete") 
  //function calls
});

// d3.selectAll(".leaflet-control-layers-selector").on('click',function () {
//   // get the selected option in the control layers :
// d3.select(".legend").html("")
// console.log("legend delete") 
//   //function calls
// });

// document.getElementsByClassName(".leaflet-control-layers-selector").on('click',function () {
//   // get the selected option in the control layers :
// d3.select(".legend").html("")
// console.log("legend delete") 
//   //function calls
// });

// // Create the map with our layers
// var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [
//     layers.COMING_SOON,
//     layers.EMPTY,
//     layers.LOW,
//     layers.NORMAL,
//     layers.OUT_OF_ORDER
//   ]
// });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "Coming Soon": layers.COMING_SOON,
//   "Empty Stations": layers.EMPTY,
//   "Low Stations": layers.LOW,
//   "Healthy Stations": layers.NORMAL,
//   "Out of Order": layers.OUT_OF_ORDER
// };

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//   COMING_SOON: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   EMPTY: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   OUT_OF_ORDER: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   LOW: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   NORMAL: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };
