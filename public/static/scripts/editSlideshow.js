  // my default access token, switch later 
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGlsbGFuY2Fycm9sbCIsImEiOiJjam9wYjRuem0wNDcwM3BvMmdtaDY3YzFrIn0.onGoqBFswgttQMptrz17Uw';
  var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/dillancarroll/cjopb6fzga2072sohtvc3tpur',
  center: [-74.50, 40], // starting position
  zoom: 9 // starting zoom
});

map.on("load", function () { /* currently redundant, need this to add marker upon selecting coordinates
  /* Image: An image is loaded and added to the map. */
  map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);
      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: "markers",
        type: "symbol",
        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features:[{"type":"Feature","geometry":{"type":"Point","coordinates":[6.126151745849057,49.67678221202621]}}]}
        },
        layout: {
          "icon-image": "custom-marker",
        }
      });
    });
});

map.on('mousemove', function (e) {
  document.getElementById('info').innerHTML =
  // e.point is the x, y coordinates of the mousemove event relative
  // to the top-left corner of the map
  JSON.stringify(e.point) + '<br />' +
  // e.lngLat is the longitude, latitude geographical position of the event
  JSON.stringify(e.lngLat);
});

map.on('click', function (e) { 
  document.getElementById('setCoordinates').innerHTML =
  JSON.stringify(e.point) +
  JSON.stringify(e.lngLat);
  
});

// define a lookup for what text should be displayed for each value in your range
var $range = $(".js-range-slider"),
$inputMin = $(".js-input-min"),
$inputMax = $(".js-input-max"),
instance,
min = 1850,
max = 2010,
$result = $(".js-result");

$range.ionRangeSlider({
  type: "single",
  min: min,
  max: max,
  from: 500,
  onStart: function(data) {
  $result.text(data.from);
  },
  onChange: function(data) {
  $result.text(data.from);
  }
});

instance = $range.data("ionRangeSlider");

$inputMin.on("change keyup", function () {
  var val = $(this).prop("value");
  
  // validate
  if (val > max) {
      val = max;
  }
  
  min = val;
  instance.update({
      min: val
  });
});

$inputMax.on("change keyup", function () {
  var val = $(this).prop("value");
  
  // validate
  if (val < min) {
      val = min;
  }
  
  max = val;
  instance.update({
      max: val
  });
});

//Test, recieve coordinates for slide
const dataAccess = require(__dirname + '/data_access')

dataAccess.getCoordinates(req.body,() =>{
  $result

  })

// dataAccess.multerInsert(req.body, req.file() =>{
//   $upload
// }


// <---- button script ---->           button(onclick='something()') Click
// var something = function() {
//   console.log('something')
// }

  