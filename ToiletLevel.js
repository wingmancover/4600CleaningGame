// Zesh: Ensures the startGame function is called once the document is fully loaded
// Zesh: This is an event listener
document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.fillBackground();
    },

    fillBackground: function() {
        // Set a background color
        this.context.fillStyle = "#76B947"; // Example: a light green color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}