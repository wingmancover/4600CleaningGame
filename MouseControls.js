// Zesh: We use Konva.js to implement our mouse in-game controls
// MouseControls.js
// This is for setting mouse events and controls
// REMINDER: This needs refactor in order to handle multiple images or objects in the future

document.addEventListener('DOMContentLoaded', function() {
    // Assuming the stage and imageLayer are set up in ToiletLevel.js and accessible globally
    var imageObj = new Image();
    imageObj.onload = function() {
        var konvaImage = new Konva.Image({
            // Center the image based on the actual dimensions of the stage and image
            x: stage.width() / 2,
            y: stage.height() / 2,
            image: imageObj,
            width: 1024, // The width of the image
            height: 1024, // The height of the image
            offsetX: 512, // Half of the width
            offsetY: 512, // Half of the height
            draggable: true, // able to drag
        });

        // Right-click to rotate (contextmenu event to prevent browser menu)
        konvaImage.on('contextmenu', function(event) {
            event.evt.preventDefault(); // Prevent default right-click menu
            // Rotate around the center
            var angle = konvaImage.rotation() + 45;
            konvaImage.rotation(angle);
            imageLayer.batchDraw(); // Use batchDraw for better performance on transformations
        });

        // Mouse wheel to scale
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

        imageLayer.add(konvaImage);
        imageLayer.draw();
    };
    imageObj.src = 'Toilet.png'; // Ensure the path to your image is correct
});
