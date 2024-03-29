// Zesh: We use Konva.js to implement our mouse in-game controls
// MouseControls.js
// This is for setting mouse events and controls to objects and images

var spongeCollision;
var brushCollisions;
var sprayCollisions;

function createInteractiveImage(name, src, x, y, width, height, canDrag, canRotate, canScale, scene, onClick) {
    return new Promise((resolve, reject) => {
        var imageObj = new Image();
        imageObj.onload = function () {
            var konvaImage = new Konva.Image({
                x: x,
                y: y,
                image: imageObj,
                width: width,
                height: height,
                offsetX: width / 2,
                offsetY: height / 2,
                draggable: canDrag,
                name: name,
            });

            if (canDrag){
                konvaImage.on('dragmove', function(){
                    populateCollision(name, konvaImage);
                });
            }

            // right-click to rotate 45 degree
            if (canRotate) {
                konvaImage.on('contextmenu', function (event) {
                    event.evt.preventDefault();
                    rotateObject(konvaImage, 45); // Rotate by 45 degrees
                });
            }

            // mouse wheel to scale up & down
            if (canScale) {
                konvaImage.on('wheel', function (event) {
                    event.evt.preventDefault();
                    scaleObject(konvaImage, event); // Scale object
                });
            }

            if (onClick) {
                konvaImage.on('click', () => onClick(konvaImage, name));
            }

            // Store the image in ObjectTracker.js with a name and its belonged scene
            ObjectTracker.add(name, konvaImage, scene);

            resolve(konvaImage); // Resolve the promise with the Konva.Image object

            //imageLayer.add(konvaImage);  // Zesh: I keep it commented in case any bugs from the current code I can reuse it
            //imageLayer.draw();
        };
        imageObj.onerror = reject;
        imageObj.src = src;
    });
}

// Function for rotation
function rotateObject(konvaImage, rotationDegrees) {
    konvaImage.rotation(konvaImage.rotation() + rotationDegrees);
    imageLayer.batchDraw();
}

// Function for scaling
function scaleObject(konvaImage, event) {
    var scaleBy = 1.1;
    var oldScale = konvaImage.scaleX();
    var pointer = stage.getPointerPosition();
    var mousePointTo = {
        x: (pointer.x - konvaImage.x()) / oldScale,
        y: (pointer.y - konvaImage.y()) / oldScale,
    };
    var newScale = event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    konvaImage.scale({x: newScale, y: newScale});
    var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };
    konvaImage.position(newPos);
    imageLayer.draw();
}

// Function for adjusting hit area
function setHitArea(konvaImage, hitX, hitY, hitWidth, hitHeight) {
    konvaImage.hitFunc(function(context) {
        context.beginPath();
        context.rect(hitX, hitY, hitWidth, hitHeight);
        context.closePath();
        context.fillStrokeShape(this);
    });
}


function populateCollision(name, konvaImage){
    spongeCollisions = ['TC1', 'TC4', 'TC5', 'TC8', 'SL1'];
    brushCollisions = ['BL1', 'BL5', 'BL7'];
    sprayCollisions = ['TC2', 'TC5', 'SL6', 'SL5', 'SL4', 'SL2'];


    spongeCollisions.forEach(targetObjectName => {
        if(collisionChecker('sponge', targetObjectName)) {
            //console.log('Collision detected with', targetObjectName);
            if(ObjectTracker.getOpacity(targetObjectName) - 0.01 > 0.01) {
                ObjectTracker.setOpacity(targetObjectName,
                    ObjectTracker.getOpacity(targetObjectName) - 0.01);
            }
            else{
                console.log('Sponge flag raised');
                spongeCleanedFlag = true;
            }
        }
    })

    brushCollisions.forEach(targetObjectName => {
        if(collisionChecker('brush', targetObjectName)) {
            //console.log('Collision detected with', targetObjectName);
            if(ObjectTracker.getOpacity(targetObjectName) - 0.01 > 0.01)
                ObjectTracker.setOpacity(targetObjectName,
                    ObjectTracker.getOpacity(targetObjectName) - 0.01);
            else{
                console.log('Spray flag raised');
                sprayCleanedFlag = true;
            }
        }
    })

    sprayCollisions.forEach(targetObjectName => {
        if(collisionChecker('spray', targetObjectName)) {
            //console.log('Collision detected with', targetObjectName);
            if(ObjectTracker.getOpacity(targetObjectName) - 0.01 > 0.01)
                ObjectTracker.setOpacity(targetObjectName,
                    ObjectTracker.getOpacity(targetObjectName) - 0.01);
            else {
                console.log('Brush flag raised');
                brushCleanedFlag = true;
            }
        }
    })

}