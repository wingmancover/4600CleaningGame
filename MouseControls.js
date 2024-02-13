// Zesh: We use Konva.js to implement our mouse in-game controls
// MouseControls.js
// This is for setting mouse events and controls to objects and images

function createInteractiveImage(src, x, y, width, height, canDrag, canRotate, canScale) {
    var imageObj = new Image();
    imageObj.onload = function() {
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
            konvaImage.on('contextmenu', function(event) {
                event.evt.preventDefault();
                konvaImage.rotation(konvaImage.rotation() + 45);
                imageLayer.batchDraw();
            });
        }

        // mouse wheel to scale up & down
        if (canScale) {
            konvaImage.on('wheel', function(event) {
                event.evt.preventDefault();
                var scaleBy = 1.1;
                var oldScale = konvaImage.scaleX();
                var pointer = stage.getPointerPosition();
                var mousePointTo = {
                    x: (pointer.x - konvaImage.x()) / oldScale,
                    y: (pointer.y - konvaImage.y()) / oldScale,
                };
                var newScale = event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
                konvaImage.scale({ x: newScale, y: newScale });
                var newPos = {
                    x: pointer.x - mousePointTo.x * newScale,
                    y: pointer.y - mousePointTo.y * newScale,
                };
                konvaImage.position(newPos);
                imageLayer.draw();
            });
        }

        imageLayer.add(konvaImage);
        imageLayer.draw();
    };
    imageObj.src = src;
}

document.addEventListener('DOMContentLoaded', function() {
    // testing images
    createInteractiveImage('Tools_Sprites/ToiletUpscaled.png', stage.width() / 1.5, stage.height() / 1.5, 512, 512, true, false,false);
    createInteractiveImage('Chemicals_Sprites/Chemical_Hydrogen_Peroxide_Sprite.png', stage.width() / 2, stage.height() / 2, 256, 256, true, true,true);
    createInteractiveImage('Chemicals_Sprites/Chemical_Drano_Sprite.png', stage.width() / 3, stage.height() / 3, 256, 256, true, true,true);

    // add more images as needed
});

