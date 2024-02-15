// SceneManager.js
// This is for scene transition

var SceneManager = (function() {
    function transitionToScene(sceneName) {
        console.log("Transitioning to scene:", sceneName);

        // Clear the layer for a fresh start
        imageLayer.removeChildren();

        // Get all images for the current scene from ObjectTracker
        // This also includes global objects
        var sceneObjects = ObjectTracker.getByScene(sceneName);
        sceneObjects.forEach(obj => imageLayer.add(obj)); // Add each object to the layer

        // Redraw the layer to display the current scene's objects
        imageLayer.draw();
    }

    // Function for handle the clicked object and transitions to a new scene
    function objectClicked(konvaImage) {
        console.log(`Object clicked: ${name}`);

        // Perform actions based on the clicked object's name
        if (konvaImage.name() === 'toiletImage') {
            console.log('The toilet image was clicked.');
            // Transition to a new scene or perform other actions
            SceneManager.transitionToScene('Scene2');
        }

        // Handle other objects as needed
    }

    return {
        transitionToScene,
        objectClicked
    };
})();


