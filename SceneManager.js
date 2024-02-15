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

    return {
        transitionToScene,
    };
})();
