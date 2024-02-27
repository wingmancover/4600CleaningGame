// Zesh: We use Konva.js to implement our mouse in-game controls
// ToiletLevel.js
// This is for level and scene(canvas) design


var stage, deepLayer, backgroundLayer, imageLayer, dynamicText;

document.addEventListener('DOMContentLoaded', function() {
    // initialize stage
    stage = new Konva.Stage({
        container: 'container', // link to the id 'container' in html
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // initialize deep layer first for canvas, it's for putting background image
    deepLayer = new Konva.Layer();
    stage.add(deepLayer);

    // Load the GIF
    var imgObj = new Image();
    imgObj.src = 'Background_Anim/Background_Anim.gif';
    imgObj.onload = function() {
        var backgroundImage = new Konva.Image({
            x: 0,
            y: 0,
            image: imgObj,
            width: stage.width(),
            height: stage.height(),
        });
        deepLayer.add(backgroundImage);
        deepLayer.draw();
    }

    // initialize image layer for the image
    imageLayer = new Konva.Layer();
    stage.add(imageLayer);

    // initialize background layer for canvas
    backgroundLayer = new Konva.Layer();
    stage.add(backgroundLayer);



    // resize to update the background size and redraw
    window.addEventListener('resize', function() {
        // update stage size
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);

        // update background size
        deepLayer.width(stage.width());
        deepLayer.height(stage.height());
        backgroundLayer.width(stage.width());
        backgroundLayer.height(stage.height());

        // redraw the layers
        deepLayer.draw();
        backgroundLayer.draw();
        imageLayer.draw();
        eraser.draw();
    });

    // Check mouse position on every click
    stage.on('click', function(evt) {
        var mousePos = stage.getPointerPosition();
        console.log('Mouse position: x=' + mousePos.x + ', y=' + mousePos.y);
        //alert('Mouse position: x=' + mousePos.x + ', y=' + mousePos.y);
    });

    // A dynamicText for game instructions
    dynamicText = new Konva.Text({
        x: stage.width()/1.6,
        y: stage.height()/10,
        text: "", // Initial content of the text object
        fontSize: 25,
        fontFamily: 'Arial',
        fill: 'white'
    });
    // Add the text object to backgroundLayer and draw it,
    // so the text will not be affected by imageLayer
    backgroundLayer.add(dynamicText);
    backgroundLayer.draw();

    //Eraser
    // Set up eraser
    eraser = new Konva.Line({
        stroke: 'rgba(1,0,0,1)', // Transparent stroke to make it invisible
        strokeWidth: 20, // Adjust the size of the eraser
        globalCompositeOperation: 'destination-out', // Make drawing operations erase existing content
        lineCap: 'round', // Round line endings for smoother erasing
        lineJoin: 'round' // Round line joints for smoother erasing
    });
    backgroundLayer.add(eraser);
    backgroundLayer.draw();
    eraser.draw();

    var isDrawing = false;

    // Event listeners
    stage.on('mousedown touchstart', function() {
        isDrawing = true;
        var pos = stage.getPointerPosition();
        eraser.points([pos.x, pos.y]);
        eraser.draw();
    });

    stage.on('mousemove touchmove', function() {
        if (!isDrawing) {
            return;
        }
        var pos = stage.getPointerPosition();
        var newPoints = eraser.points().concat([pos.x, pos.y]);
        eraser.points(newPoints);
        eraser.batchDraw();
    });

    stage.on('mouseup touchend', function() {
        isDrawing = false;
    });

    // Enable touch events
    stage.setPointersPositionsTouch(true);


    // Our future level design logic can go here
});


// Variables for order enforcement of Tank Scene game flow
var TankSceneGameState = {
    valveClicked: false,
    handleClicked: false,

    // Rotation control
    canRotateValve: true,
    canRotateHandle: true,
};


// Function for handle the clicked object,
// updating needed instruction text and transitions to a new scene
function objectClicked(konvaImage) {
    console.log(`Object clicked: ${konvaImage.name()}`);

    // Perform actions based on the clicked object's name
    if (konvaImage.name() === 'toTankSceneButton') {
        playSoundEffect(bgMusic);

        dynamicText.text("Click to interact objects!!!\n\n" +
            "Let's start maintaining our Toilet Tank!" +
            "\nFirst, let's close the valve to turn off water");
        backgroundLayer.draw();
    }

    if (konvaImage.name() === 'toSeatSceneButton') {
        playSoundEffect(bgMusic);

        dynamicText.text("Text Sample: Here is the Seat Cleaning Scene");
        backgroundLayer.draw();
    }

    if (konvaImage.name() === 'toiletValve' && TankSceneGameState.canRotateValve) {
        rotateObject(konvaImage, -3);
        playSoundEffect(valveTurning);

        dynamicText.text("Great!\nNow let's use handle to drain the tank");
        backgroundLayer.draw();

        TankSceneGameState.valveClicked = true; // Update state, same for other conditions
        TankSceneGameState.canRotateValve = false; // Disable further rotation after the first click,
                                                   // same for other conditions
    }

    if (konvaImage.name() === 'toiletHandle' && TankSceneGameState.valveClicked && TankSceneGameState.canRotateHandle) {
        rotateObject(konvaImage, -3);
        playSoundEffect(toiletFlush);

        dynamicText.text("Great!\nNow let's remove the Toilet Tank Lid\nto check the tank interior");
        backgroundLayer.draw();

        TankSceneGameState.handleClicked = true;
        TankSceneGameState.canRotateHandle = false;
    }

    if (konvaImage.name() === 'toiletTankLid' && TankSceneGameState.handleClicked) {
        playSoundEffect(tankLidScrape);

        dynamicText.text("Great!\nNow let's disconnect the Old Flapper\ninside the tank");
        backgroundLayer.draw();

        SceneManager.transitionToScene('TankScene2'); // Transit to desired scene
    }

    if (konvaImage.name() === 'toiletOldFlapper2') {
        dynamicText.text("Awesome!\nNow let's install the New Flapper\nIt's at the inventory bar on your left area");
        backgroundLayer.draw();

        SceneManager.transitionToScene('TankScene3');

    }

    if (konvaImage.name() === 'toiletNewFlapper') {
        playSoundEffect(flapperInstall);

        dynamicText.text("Awesome! It's installed!\n" +
            "Now please click on the Tank Lid to\nclose the lid on the tank");
        backgroundLayer.draw();

        SceneManager.transitionToScene('TankScene4');

    }

    if (konvaImage.name() === 'toiletTankLid2') {
        playSoundEffect(tankLidScrape);

        dynamicText.text("Great Job!\n" +
            "Let's do some final checks:\n" +
            "Open the Valve again");
        backgroundLayer.draw();

        // Update state again to prepare the last Tank scene
        TankSceneGameState.valveClicked = false;
        TankSceneGameState.handleClicked = false;
        TankSceneGameState.canRotateValve = true;
        TankSceneGameState.canRotateHandle = true;

        SceneManager.transitionToScene('TankScene5');

    }

    if (konvaImage.name() === 'toiletValve5' && TankSceneGameState.canRotateValve) {
        rotateObject(konvaImage, 3);
        playSoundEffect(valveTurning);

        dynamicText.text("Flush the toilet\nto check it is working");
        backgroundLayer.draw();

        TankSceneGameState.valveClicked = true;
        TankSceneGameState.canRotateValve = false;
    }

    if (konvaImage.name() === 'toiletHandle5' && TankSceneGameState.valveClicked && TankSceneGameState.canRotateHandle) {
        rotateObject(konvaImage, 3);
        playSoundEffect(toiletFlush);
        playSoundEffect(victoryMusic);

        dynamicText.text("Congratulations!\nYou've successfully learning" +
            "\nthe toilet tank maintenance!");
        backgroundLayer.draw();

        // Reset state for future play
        TankSceneGameState.valveClicked = false;
        TankSceneGameState.handleClicked = false;
        TankSceneGameState.canRotateValve = true;
        TankSceneGameState.canRotateHandle = true;

        SceneManager.transitionToScene('FinalTankScene');
    }

    if (konvaImage.name() === 'toSeatSceneButton'){
        //Load other Quadrants of image

        console.log(ObjectTracker.getWidth('inventoryBar'));
        // alert(ObjectTracker.getWidth('inventoryBar'));
        SceneManager.transitionToScene('SeatScene1');
        document.addEventListener('DOMContentLoaded', async function() {
            try {
                await ObjectTracker.createAndTrackImage('toiletQB', 'ToiletQuadrants/Sprite-0002.png',
                    (stage.width()/ 2 )+ (ObjectTracker.get('toiletQA').width()), stage.height() / 2,
                    125, 125, false, false, false, 'SeatScene1');

                await ObjectTracker.createAndTrackImage('toiletQC', 'ToiletQuadrants/Sprite-0004.png',
                    stage.width() / 2, stage.height()/2, 512, 512, false, false, false, 'SeatScene1');

                // await ObjectTracker.createAndTrackImage('toiletQD', 'ToiletQuadrants/Sprite-0005.png',
                //     toiletQA.width, toiletQA.height, 512, 512, false, false, false, 'SeatScene1');

            } catch (error) {
                console.error("Error loading images sequentially in the seat cleaning scene: ", error);
            }
        });


    }

    if (konvaImage.name() === 'toTankSceneButton'){
        SceneManager.transitionToScene('TankScene1');
    }
    // Handle other objects as needed
}
