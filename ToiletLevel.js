// Zesh: We use Konva.js to implement our mouse in-game controls
// ToiletLevel.js
// This is for level and scene(canvas) design


var stage, backgroundLayer, imageLayer, dynamicText;

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

    // Check mouse position on every click
    stage.on('click', function(evt) {
        var mousePos = stage.getPointerPosition();
        console.log('Mouse position: x=' + mousePos.x + ', y=' + mousePos.y);
        //alert('Mouse position: x=' + mousePos.x + ', y=' + mousePos.y);
    });

    // A dynamicText for game instructions
    dynamicText = new Konva.Text({
        x: stage.width()/1.4,
        y: stage.height()/10,
        text: "Click to interact objects!\n\n" +
            "Let's start maintaining our Toilet Tank!" +
            "\nFirst, let's close the valve to turn off water", // Initial content of the text object
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'black'
    });

    // Add the text object to backgroundLayer and draw it,
    // so the text will not be affected by imageLayer
    backgroundLayer.add(dynamicText);
    backgroundLayer.draw();

    // Our future level design logic can go here
});


// Function for handle the clicked object,
// updating needed instruction text and transitions to a new scene
function objectClicked(konvaImage) {
    console.log(`Object clicked: ${konvaImage.name()}`);

    // Perform actions based on the clicked object's name
    if (konvaImage.name() === 'toiletImage') {
        console.log('The toilet image was clicked.');
        // Transition to a new scene or perform other actions
        SceneManager.transitionToScene('Scene2');

        dynamicText.text('Click detected on object!');
        backgroundLayer.draw();
    }

    // Handle other objects as needed
}
