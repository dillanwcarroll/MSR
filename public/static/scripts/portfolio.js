var slider = document.getElementById("slider");
var output = document.getElementById("timeValue");
var yearDiv = document.getElementById("years");
var years = ['1910','1914', '1915', '1918', '1925']
output.innerHTML = years[this.value - 1]; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = years[this.value - 1];
}

slider.onload = function(){
    for (let index = 0; index < years.length; index++) {
        
        var newYear = document.createElement("h5");
        var yearText = document.createTextNode(years[slider.value - 1])

        newYear.appendChild(yearText)
        yearDiv.appendChild(newYear)
    }
}