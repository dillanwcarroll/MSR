var slider = document.getElementById("slider");
var yearText = document.getElementById("textBox");
var mapFootnoteText = document.getElementById("mapFootnote");
var years = ['1910','1914', '1915', '1918', '1925']
var mapFootnotes = ['Something happened','War were declared', 'call of duty: shoot a man', 'Went home', 'A humble farmer']
var mapCoords = [[1,1],[129,46],[192.2314, -73.93754323], [243, 17], [40, 20]]

slider.max = mapCoords.length;
yearText.innerHTML = years[0];
mapFootnoteText.innerHTML = mapFootnotes[0];


// Update the current slider value (each time you drag the slider handle)
function updateTextInput(val, max) {
    yearText.innerHTML = years[val];
    mapFootnoteText.innerHTML = mapFootnotes[val];
    yearText.style.marginLeft = 7.6 + ((76.8/(max -1)) * val) + "%";
    
    if(val+1 <= mapCoords.length){
        map.flyTo({
            center: mapCoords[val]
        });
        geojson.features[0].geometry.coordinates = mapCoords[val]
        map.getSource('point').setData(geojson)
    }
    else{
        map.flyTo({
            center: [0,0]
        });
        geojson.features[0].geometry.coordinates = mapCoords[0,0]
        map.getSource('point').setData(geojson)
    }
    
}