let setSlideToIndex = function(slideshow) {
    for (let i = 0; i < slideshow.slides.length; i++) {
        slideshow.slides[i].style.display = 'none';
    }
    slideshow.slides[slideshow.index].style.display = 'block'
}
let indexPlus = function(slideshow){
    if (slideshow.index < slideshow.slides.length-1) {
        slideshow.index += 1;
    } else {
        slideshow.index = 0;
    }
    setSlideToIndex(slideshow)
}
let indexMinus = function(slideshow){
    if (slideshow.index > 0) {
        slideshow.index -= 1;
    } else {
        slideshow.index = slideshow.slides.length-1;
    }
    setSlideToIndex(slideshow)
}
//initialise slideshows
let slideshows = document.getElementsByClassName('slideshow')
for (let i = 0; i < slideshows.length; i++) {
    var slideshow = slideshows[i];
    //set slideshoe slides
    slideshow.slides = slideshow.getElementsByClassName('slide')
    slideshow.index = 0;
    //set slide index
    setSlideToIndex(slideshow)
    //get plus buttons
    var plusButtons = slideshow.getElementsByClassName('slide-plus')
    for (let i = 0; i < plusButtons.length; i++) {
        plusButtons[i].slideshow = slideshow;
        plusButtons[i].addEventListener('click', (event) => {
            indexPlus(event.srcElement.slideshow)
        })
    }
    //get plus buttons
    var minusButtons = slideshow.getElementsByClassName('slide-minus')
    for (let i = 0; i < minusButtons.length; i++) {
        minusButtons[i].slideshow = slideshow;
        minusButtons[i].addEventListener('click', (event) => {
            indexMinus(event.srcElement.slideshow)
        })
    }
}

