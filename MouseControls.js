document.addEventListener('click', function(event) {
    handleClick(event);
});

function handleClick(event) {
    var rect = myGameArea.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // check if the click is within the bounds of the image
    if (x >= imageBounds.x && x <= imageBounds.x + imageBounds.width &&
        y >= imageBounds.y && y <= imageBounds.y + imageBounds.height) {
        console.log("Image clicked!");
        // perform actions like rotating or scaling
    }
}

// Placeholder for the image bounds
var imageBounds = {
    x: 100, // initial x position
    y: 100, // initial y position
    width: 1024, // width of the image
    height: 1024 // height of the image
};

// Placeholder functions for rotation and scaling
function rotateImage() {
    // rotate the image
}

function scaleImage() {
    // scale the image
}
