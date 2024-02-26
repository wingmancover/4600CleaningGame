
// Create stage and layer
var stage = new Konva.Stage({
    container: 'container', // Specify your container ID here
    width: window.innerWidth,
    height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);

// Create Konva image
var imageObj = new Image();
imageObj.onload = function() {
    var konvaImage = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: imageObj.width,
        height: imageObj.height
    });
    layer.add(konvaImage);
    layer.draw();
};
imageObj.src = 'your_image_url.jpg'; // Replace 'your_image_url.jpg' with the URL of your image

// Set up eraser
var eraser = new Konva.Line({
    stroke: 'rgba(0,0,0,0)', // Transparent stroke to make it invisible
    strokeWidth: 20, // Adjust the size of the eraser
    globalCompositeOperation: 'destination-out', // Make drawing operations erase existing content
    lineCap: 'round', // Round line endings for smoother erasing
    lineJoin: 'round' // Round line joints for smoother erasing
});
backgroundLayer.add(eraser);

var isDrawing = false;

// Event listeners
stage.on('mousedown touchstart', function() {
    isDrawing = true;
    var pos = stage.getPointerPosition();
    eraser.points([pos.x, pos.y]);
    layer.draw();
});

stage.on('mousemove touchmove', function() {
    if (!isDrawing) {
        return;
    }
    var pos = stage.getPointerPosition();
    var newPoints = eraser.points().concat([pos.x, pos.y]);
    eraser.points(newPoints);
    layer.batchDraw();
});

stage.on('mouseup touchend', function() {
    isDrawing = false;
});

// Enable touch events
stage.setPointersPositionsTouch(true);
