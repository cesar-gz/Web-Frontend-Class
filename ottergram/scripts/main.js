// selector variables to help change the thumbnail pictures
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

// class variable and numeric code to hide the detail image container
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;

// selector variable and class variable for CSS transition effects
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny';

// slector variables for navigational arrow buttons
var LEFT_BUTTON_SELECTOR = '[data-image-role="leftButton"]'; 
var RIGHT_BUTTON_SELECTOR = '[data-image-role="rightButton"]';
var DISABLED_BUTTON_CLASS = 'navi-button-disabled';


// functions to help change thumbnail's src and title
function setDetails(imageUrl, titleText){
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb){
    'use strict';
    thumb.addEventListener('click', function(event){
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails(); // if the user previously pressed escape key, this will make the image reappear
    });
}

function getThumbnailsArray(){
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

// functions to hide detail-image-container
function hideDetails(){
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
  }

function addKeyPressHandler(){
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY){
            hideDetails();
        }
    });
}

function addLeftButtonClickHandler() {
    'use strict';
    var leftButton = document.querySelector(LEFT_BUTTON_SELECTOR);
    leftButton.addEventListener('click', function(event) {
      event.preventDefault();
      changeImage('left');
    });
}
  
function addRightButtonClickHandler() {
    'use strict';
    var rightButton = document.querySelector(RIGHT_BUTTON_SELECTOR);
    rightButton.addEventListener('click', function(event) {
      event.preventDefault();
      changeImage('right');
    });
}

// changes image on < or > button press, not thumbnail press
function changeImage(direction) {
    'use strict';
    var thumbnails = getThumbnailsArray();
    var currentImage = document.querySelector(DETAIL_IMAGE_SELECTOR).getAttribute('src');
    var currentIndex = -1;
  
    // get the current index of image we are viewing
    for (var i = 0; i < thumbnails.length; i++) {
      if (thumbnails[i].getAttribute('data-image-url') === currentImage) {
        currentIndex = i;
        break;
      }
    }

    // change the image on the button press to appropriate image, and add a disabled state to the button if necessary
    if (currentIndex !== -1) {
        var newIndex = direction === 'left' ? (currentIndex - 1 + thumbnails.length) % thumbnails.length
          : (currentIndex + 1) % thumbnails.length;
    
        setDetailsFromThumb(thumbnails[newIndex]);
        updateButtonState(newIndex, thumbnails.length);
      }
}

// add or remove a disabled class and property to both ends of the thumbnail list
function updateButtonState(currentIndex, thumbnails) {
    'use strict';
    var leftButton = document.querySelector(LEFT_BUTTON_SELECTOR);
    var rightButton = document.querySelector(RIGHT_BUTTON_SELECTOR);
    
    if (currentIndex === 0) {
        leftButton.setAttribute('disabled', 'disabled');
        leftButton.classList.add(DISABLED_BUTTON_CLASS);
    } 
    else {
        leftButton.removeAttribute('disabled');
        leftButton.classList.remove(DISABLED_BUTTON_CLASS);
    }
    
    if (currentIndex === thumbnails - 1) {
        rightButton.setAttribute('disabled', 'disabled');
        rightButton.classList.add(DISABLED_BUTTON_CLASS);
    } 
    else {
        rightButton.removeAttribute('disabled');
        rightButton.classList.remove(DISABLED_BUTTON_CLASS);
    }
}

// wrap it all together
function initializeEvents(){
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addLeftButtonClickHandler();
    addRightButtonClickHandler();
}

initializeEvents();