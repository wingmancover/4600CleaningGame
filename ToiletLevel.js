// Zesh: We use Konva.js to implement our mouse in-game controls
// ToiletLevel.js
// This is for level and scene(canvas) design


var stage, backgroundLayer, imageLayer;

document.addEventListener('DOMContentLoaded', function() {
    // initialize stage
    stage = new Konva.Stage({
        container: 'container', // link to the id 'container' in html
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // initialize background layer for canvas
    backgroundLayer = new Konva.Layer();
    var backgroundRect = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: '#76B947', // a light green color, just for testing canvas is showing
    });
    backgroundLayer.add(backgroundRect);
    stage.add(backgroundLayer);

    // initialize layer for the image
    imageLayer = new Konva.Layer();
    stage.add(imageLayer);

    // resize to update the background size and redraw
    window.addEventListener('resize', function() {
        // update stage size
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);

        // update background size
        backgroundRect.width(stage.width());
        backgroundRect.height(stage.height());

        // redraw the layers
        backgroundLayer.draw();
        imageLayer.draw();
    });

    // Our future level design logic can go here
});

