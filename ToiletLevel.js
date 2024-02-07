// Zesh: Ensures the startGame function is called once the document is fully loaded
// Zesh: This is an event listener. It's powerful and you can implement many things using it
document.addEventListener('DOMContentLoaded', startGame);
// Zesh: Ensures the canvas resizes when the window resizes
window.addEventListener('resize', resizeCanvas, false);

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
// REMINDER: changing the canvas size can affect the
// positioning and scaling of our drawn elements,
// so this function needs to be adjusted in the future
function resizeCanvas() {
    myGameArea.canvas.width = window.innerWidth;
    myGameArea.canvas.height = window.innerHeight;

    myGameArea.fillBackground(); // refill background after resizing
}

