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

        //Toilet Assets
        ObjectTracker.createAndTrackImage('toiletImage', 'Toilet_Assets/Toilet.png',
            stage.width() / 1.5, stage.height() / 1.5, 512, 512, true, false,false, 'global'),

        ObjectTracker.createAndTrackImage('toiletBase', 'Toilet_Assets/Toilet_Base.png',
            1, 1, 512, 512, false, false, false, 'Scene1'),

        ObjectTracker.createAndTrackImage('toiletHandle', 'Toilet_Assets/Toilet_Handle.png',
            1, 1, 512, 512, false, false, false),

        ObjectTracker.createAndTrackImage('hydrogen_PeroxideImage', 'Chemicals_Sprites/Chemical_Hydrogen_Peroxide_Sprite.png',
            stage.width() / 2, stage.height() / 2, 256, 256, true, true,true, 'Scene1'),

        ObjectTracker.createAndTrackImage('dranoImage', 'Chemicals_Sprites/Chemical_Drano_Sprite.png',
            stage.width() / 3, stage.height() / 3, 256, 256, true, true,true, 'Scene2'),

        //UI Objects
        //Inventory
        ObjectTracker.createAndTrackImage('inventoryBar', 'Misc_Sprites/Inventory_bar.png',
            stage.width()/25, stage.height() / 1.7, 600, 600, false, false, false, 'global'),

        //ObjectTracker.createAndTrackImage('inventoryBox', 'Misc_Sprites/Inventory_box.png',
        //    1, 1, 256, 256, true, false, true, 'global'),

        ObjectTracker.createAndTrackImage('taskboard', 'Misc_Sprites/Taskboard.png',
            stage.width()/1.15, stage.height()/7, 256, 256, false, false, false, 'global'),

        //ToolSprites
        ObjectTracker.createAndTrackImage('toolScrubBrush', 'Tools_Sprites/Tool_ScrubBrush.png',
            stage.width()/11.5, stage.height()/1.3, 96, 96, true, true, false, 'global'),

        ObjectTracker.createAndTrackImage('toolSponge', 'Tools_Sprites/Tool_Sponge.png',
            stage.width()/11.5, stage.height()/1.7, 96, 96, true, true, false, 'global'),

        ObjectTracker.createAndTrackImage('toolSpray', 'Tools_Sprites/Tool_Spray.png',
            stage.width()/11.5, stage.height()/2.3, 96, 96, true, true, false, 'global'),

        ObjectTracker.createAndTrackImage('toolToiletCleaner', 'Tools_Sprites/Tool_ToiletCleaner.png',
            stage.width()/11.5,stage.height()/1.1,96, 96, true, true, false, 'global'),

    ]).then(() => {
        SceneManager.transitionToScene('global');

    }).catch(error => console.error("Error loading images:", error));
});