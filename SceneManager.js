// SceneManager.js
// This is for scene transition

// SceneManager.js
var SceneManager = (function() {
    function transitionToScene(sceneName) {
        console.log("Transitioning to scene:", sceneName);

        // Clear the current layer or use different layers for different scenes
       // imageLayer.removeChildren();

        // Based on the scene, add the required images
        if (sceneName === 'Scene1') {
            var image1 = ObjectTracker.get('toiletImage');
            if (image1) {
                imageLayer.add(image1);
            }
        } else if (sceneName === 'Scene2') {
            var image2 = ObjectTracker.get('cleanerImage');
            if (image2) {
                imageLayer.add(image2);
            }
            // ... etc.
        }

        // Draw the layer after adding images
        imageLayer.draw();
    }

    return {
        transitionToScene: transitionToScene
    };
})();



