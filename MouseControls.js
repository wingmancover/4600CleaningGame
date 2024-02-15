// Zesh: We use Konva.js to implement our mouse in-game controls
// MouseControls.js
// This is for setting mouse events and controls to objects and images

function createInteractiveImage(name, src, x, y, width, height, canDrag, canRotate, canScale, scene) {
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
            });

            // right-click to rotate 45 degree
            if (canRotate) {
                konvaImage.on('contextmenu', function (event) {
                    event.evt.preventDefault();
                    konvaImage.rotation(konvaImage.rotation() + 45);
                    imageLayer.batchDraw();
                });
            }

            // mouse wheel to scale up & down
            if (canScale) {
                konvaImage.on('wheel', function (event) {
                    event.evt.preventDefault();
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
                });
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

//Temp dev controls to return pos for cursor to speed up scene building
//report the mouse position on click
document.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    alert(mousePos.x + ',' + mousePos.y);
}, false);

//Get Mouse Position
function getMousePos(stage, evt) {
    var rect = stage.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
