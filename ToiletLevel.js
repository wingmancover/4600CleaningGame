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
        text: "Click to interact objects!!!\n\n" +
            "Let's start maintaining our Toilet Tank!" +
            "\nFirst, let's close the valve to turn off water", // Initial content of the text object
        fontSize: 25,
        fontFamily: 'Arial',
        fill: 'black'
    });

    // Add the text object to backgroundLayer and draw it,
    // so the text will not be affected by imageLayer
    backgroundLayer.add(dynamicText);
    backgroundLayer.draw();

    // Our future level design logic can go here
});


// Variables for order enforcement of Tank Scene game flow
var TankSceneGameState = {
    valveClicked: false,
    handleClicked: false,
    // Add other states as necessary
};


// Function for handle the clicked object,
// updating needed instruction text and transitions to a new scene
function objectClicked(konvaImage) {
    console.log(`Object clicked: ${konvaImage.name()}`);

    // Perform actions based on the clicked object's name
    if (konvaImage.name() === 'toiletValve') {
        rotateObject(konvaImage, -3);
        dynamicText.text("Great!\nNow let's use handle to drain the tank");
        backgroundLayer.draw();
    }

    if (konvaImage.name() === 'toiletHandle') {
        rotateObject(konvaImage, -3);
        dynamicText.text("Great!\nNow let's remove the Toilet Tank Lid\nto check the tank interior");
        backgroundLayer.draw();
    }

    if (konvaImage.name() === 'toiletTankLid') {
        dynamicText.text("Great!\nNow let's disconnect the Old Flapper\ninside the tank");
        backgroundLayer.draw();

        SceneManager.transitionToScene('Scene2');
    }

    if (konvaImage.name() === 'toiletOldFlapper2') {
        dynamicText.text("Awesome!\nNow let's install the New Flapper\nIt's at the inventory bar on your left area");
        backgroundLayer.draw();

        SceneManager.transitionToScene('Scene3');

    }

    if (konvaImage.name() === 'toiletNewFlapper') {

        dynamicText.text("Awesome! It's installed!\n" +
            "Now please click on the Tank Lid to\nclose the lid on the tank");
        backgroundLayer.draw();

        SceneManager.transitionToScene('Scene4');

    }

    if (konvaImage.name() === 'toiletTankLid2') {

        dynamicText.text("Great Job!\n" +
            "Let's do some final checks:\n" +
            "Open the Valve again");
        backgroundLayer.draw();

        SceneManager.transitionToScene('Scene5');

    }

    if (konvaImage.name() === 'toiletValve2') {
        rotateObject(konvaImage, -3);
        dynamicText.text("Flush the toilet\nto check it is working");
        backgroundLayer.draw();
    }

    if (konvaImage.name() === 'toiletHandle2') {
        rotateObject(konvaImage, -3);
        dynamicText.text("Congratulations!\nYou've successfully learning" +
            "\nthe toilet tank maintenance!");
        backgroundLayer.draw();

        SceneManager.transitionToScene('finalScene');
    }
    // Handle
    // other objects as needed
}
