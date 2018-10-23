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