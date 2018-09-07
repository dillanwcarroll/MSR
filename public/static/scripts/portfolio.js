var slider = document.getElementById("slider");
var yearText = document.getElementById("textBox");
var years = ['1910','1914', '1915', '1918', '1925']

yearText.innerHTML = years[0];

// Update the current slider value (each time you drag the slider handle)
function updateTextInput(val, max) {
    yearText.innerHTML = years[val];
    yearText.style.marginLeft = 7.6 + ((76.8/(max -1)) * val) + "%";
}