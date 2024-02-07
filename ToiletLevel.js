// Zesh: Ensures the startGame function is called once the document is fully loaded
// Zesh: This is an event listener. It's powerful and you can implement many things using it
document.addEventListener('DOMContentLoaded', startGame);
// Zesh: Ensures the canvas resizes when the window resizes
window.addEventListener('resize', resizeCanvas, false);


var img = new Image();
var imageToilet = "Toilet.png"; // Store image here so we can use it in multiple functions


// Main game function
function startGame() {
    myGameArea.start();
    resizeCanvas();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },

    fillBackground: function() {
        this.context.fillStyle = "#76B947"; // a light green color, just for testing canvas is showing
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Adjusts canvas size according to windows size
// Now by calling loadAndDrawImage(url) after fillBackground()
// we are able to redraw images after resizing and keep maintaining their sizes
function resizeCanvas() {
    myGameArea.canvas.width = window.innerWidth;
    myGameArea.canvas.height = window.innerHeight;

    myGameArea.fillBackground(); // refill background after resizing
    loadAndDrawImage(imageToilet); // redraw the image at its original size
}


// Loading and drawing images
function loadAndDrawImage(url) {
    img.onload = function() {
        drawScaledImage(img);
        img.onload = null; // clear onload to prevent redraw issues on resize
    };
    if (!img.src.endsWith(url)) {
        img.src = url; // load the image if different
    } else {
        // if already loaded, just draw it using the method
        drawScaledImage(img);
    }
}

// Refactoring for drawing scaled images
// to fit in the canvas
function drawScaledImage(img) {
    // calculate the scale factor to fit the image within the canvas while maintaining aspect ratio
    var scale = Math.min(myGameArea.canvas.width / img.width, myGameArea.canvas.height / img.height);
    var x = (myGameArea.canvas.width / 2) - (img.width / 2) * scale; // center the image on the canvas
    var y = (myGameArea.canvas.height / 2) - (img.height / 2) * scale;

    // clear the canvas and refill the background
    myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    myGameArea.fillBackground();

    // draw the image with scaling
    myGameArea.context.drawImage(img, x, y, img.width * scale, img.height * scale);
}