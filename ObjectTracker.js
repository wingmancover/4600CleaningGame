// ObjectTracker.js
// This is for tracking every object that is used during the gameplay
// Also for adding the objects to our game

var ObjectTracker = (function() {
    var objects = {};
    var globalObjects = []; // Array to keep track of objects visible in all scenes

    function createAndTrackImage(name, src, x, y, width, height, canDrag, canRotate, canScale, scene) {
        return createInteractiveImage(name, src, x, y, width, height, canDrag, canRotate, canScale, scene).then(konvaObject => {
            add(name, konvaObject, scene); // Track the newly created object
        });
    }

    function add(name, konvaObject, scene) {
        if (scene === 'global') {
            globalObjects.push(konvaObject);
        } else {
            objects[name] = { object: konvaObject, scene: scene };
        }
    }

    function get(name) {
        return objects[name] ? objects[name].object : undefined;
    }

    function getByScene(sceneName) {
        // Return objects for the specific scene plus all global objects
        var sceneObjects = Object.keys(objects)
            .filter(key => objects[key].scene === sceneName)
            .map(key => objects[key].object);
        return sceneObjects.concat(globalObjects);
    }

    return {
        add,
        get,
        getByScene,
        createAndTrackImage
    };
})();


// Places for loading objects
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        // Objects for setting up in different scenes
        ObjectTracker.createAndTrackImage('toiletImage', 'Toilet_Assets/Toilet.png',
            stage.width() / 1.5, stage.height() / 1.5, 512, 512, false, false,false, 'global'),

        ObjectTracker.createAndTrackImage('hydrogen_PeroxideImage', 'Chemicals_Sprites/Chemical_Hydrogen_Peroxide_Sprite.png',
            stage.width() / 2, stage.height() / 2, 256, 256, true, true,true, 'Scene1'),

        ObjectTracker.createAndTrackImage('dranoImage', 'Chemicals_Sprites/Chemical_Drano_Sprite.png',
            stage.width() / 3, stage.height() / 3, 256, 256, true, true,true, 'Scene2'),

    ]).then(() => {
        SceneManager.transitionToScene('Scene1');

    }).catch(error => console.error("Error loading images:", error));
});