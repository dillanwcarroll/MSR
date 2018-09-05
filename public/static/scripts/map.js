var cords = [145.03411259518066, -37.82879306920354];
var coordinates = document.getElementById('coordinates');

var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Hawthorn",
                "iconSize": [20, 20]
            },
            "geometry": {
                "type": "Point",
                "coordinates": cords
            }
        },
    ]
};

mapboxgl.accessToken = 'pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/trigenpanini/cjl5yll0308l82qqktmirrjcy',
    center: cords,
    zoom: 3.0
});
map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));
function thingy() {
    document.getElementById("text").innerHTML = map.getCenter();
}

// add markers to map
geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function () {
        window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});

var canvas = map.getCanvasContainer();

map.on('load', function () {

    // Add a single point to the map
    map.addSource('point', {
        "type": "geojson",
        "data": geojson
    });

    map.addLayer({
        "id": "point",
        "type": "circle",
        "source": "point",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#e24422"
        }
    });

    // When the cursor enters a feature in the point layer, prepare for dragging.
    map.on('mouseenter', 'point', function () {
        map.setPaintProperty('point', 'circle-color', '#d85136');
        canvas.style.cursor = 'move';
    });

    map.on('mouseleave', 'point', function () {
        map.setPaintProperty('point', 'circle-color', '#e24422');
        canvas.style.cursor = '';
    });

    map.on('mousedown', 'point', function (e) {
        // Prevent the default map drag behavior.
        e.preventDefault();

        canvas.style.cursor = 'grab';

        map.on('mousemove', onMove);
        map.once('mouseup', onUp);
    });

    map.on('touchstart', 'point', function (e) {
        if (e.points.length !== 1) return;

        // Prevent the default map drag behavior.
        e.preventDefault();

        map.on('touchmove', onMove);
        map.once('touchend', onUp);
    });
});

function onMove(e) {
    var coords = e.lngLat;

    // Set a UI indicator for dragging.
    canvas.style.cursor = 'grabbing';

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
    map.getSource('point').setData(geojson);
}

function onUp(e) {
    var coords = e.lngLat;

    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + coords.lng + '<br />Latitude: ' + coords.lat;
    canvas.style.cursor = '';

    // Unbind mouse/touch events
    map.off('mousemove', onMove);
    map.off('touchmove', onMove);
}