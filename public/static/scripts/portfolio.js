var slider = document.getElementById("slider");
var yearText = document.getElementById("textBox");
var mapFootnoteText = document.getElementById("mapFootnote");

slider.max = slides.length;
yearText.innerHTML = slides[0].Year;
mapFootnoteText.innerHTML = slides[0].LocationName;

//react to slideshow index
indexTracker = document.getElementsByClassName('indexTracker')[0]
indexTracker.addEventListener('change', (event)=>{
    var tracker = event.srcElement
    if (tracker.value >= 0 && tracker.value < slides.length) {
        slider.value = parseInt(tracker.value)+1
        updateTextInput(parseInt(tracker.value),slides.length)
        
    }
})

// Update the current slider value (each time you drag the slider handle)
function updateTextInput(val, max) {
    yearText.innerHTML = slides[val].Year;
    mapFootnoteText.innerHTML = slides[val].LocationName;
    yearText.style.marginLeft = 7.6 + ((76.8/(max -1)) * val) + "%";
    
        map.flyTo({
            center: JSON.parse(slides[val].LocationCords)
        });
        geojson.features[0].geometry.coordinates = JSON.parse(slides[val].LocationCords)
        map.getSource('point').setData(geojson)
    
    if (parseInt(indexTracker.value) != val) {
        slideshow.indexTracker.setAttribute('value', val)
        var event = new Event('change');
        indexTracker.dispatchEvent(event);
    }
    
    /*
        map.flyTo({
            center: [0,0]
        });
        geojson.features[0].geometry.coordinates = mapCoords[0,0]
        map.getSource('point').setData(geojson)
    }*/
    
}