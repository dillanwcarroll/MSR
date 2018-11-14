    // my default access token, switch later pk.eyJ1IjoiZGlsbGFuY2Fycm9sbCIsImEiOiJjam5qa3VmbGYxMGt5M3JxcnlkcHV5cWd2In0.5wFSKLV2-KEUH1-l0YqnXA
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g';
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/trigenpanini/cjl5yll0308l82qqktmirrjcy',
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
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

  // <---- button script ---->           button(onclick='something()') Click
  // var something = function() {
  //   console.log('something')
  // }

  