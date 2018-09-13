var cords = [145.03411259518066, -37.82879306920354];

mapboxgl.accessToken = 'pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/trigenpanini/cjl5yll0308l82qqktmirrjcy',
    center: JSON.parse(slides[0].LocationCords),
    zoom: 3.0
});

var canvas = map.getCanvasContainer();

var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": JSON.parse(slides[0].LocationCords)
            }
        }
    ]
};


geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '15px';
    el.style.height = '15px';

    el.addEventListener('click', function () {
        window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});

map.on('load', function () {
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

});