// ObjectTracker.js
// This is for tracking every object that is used during the gameplay
// Also for adding the objects to our game

var ObjectTracker = (function() {
    var objects = {};
    var globalObjects = []; // Array to keep track of objects visible in all scenes

    function createAndTrackImage(name, src, x, y, width, height, canDrag, canRotate, canScale, scene, onClick, onClickAgain) {
        return createInteractiveImage(name, src, x, y, width, height, canDrag, canRotate, canScale, scene, onClick, onClickAgain).then(konvaObject => {
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

    function getGlobal(name) {
        var found = globalObjects.find(function(obj) {
            return obj.name() === name;
        });
        return found || undefined;
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

    function removeGlobalObject(name) {
        var objectToRemove = ObjectTracker.getGlobal(name);
        if (objectToRemove) {
            objectToRemove.remove(); // Remove the object from its layer
            var index = globalObjects.findIndex(obj => obj.name() === name);
            if (index !== -1) {
                globalObjects.splice(index, 1); // Remove from globalObjects array
                console.log(name + ' successfully removed from global objects.');
            }
            imageLayer.draw(); // Ensure to redraw the correct layer where the object was added
        } else {
            console.log('Global object not found:', name);
        }
    }

    return {
        add,
        get,
        getGlobal,
        getByScene,
        createAndTrackImage,
        removeGlobalObject
    };
})();


document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load each image sequentially
        // Objects for setting up in different scenes

        // Scene 1 and Global objects
        //UI Objects
        //Inventory
        await ObjectTracker.createAndTrackImage('inventoryBar', 'Misc_Sprites/Inventory_bar.png',
            stage.width() / 25, stage.height() / 1.7, 600, 600, false, false, false, 'Scene1');

        //Toilet Assets
        await ObjectTracker.createAndTrackImage('toiletBase', 'Toilet_Assets/Toilet_Base.png',
            stage.width() / 2, stage.height() / 2, 512, 512, false, false, false, 'Scene1');

        await ObjectTracker.createAndTrackImage('toiletValve', 'Toilet_Assets/Toilet_Valve.png',
            stage.width() / 2.05, stage.height() / 1.98, 512, 512, false, false, false, 'global', objectClicked);
        setHitArea(ObjectTracker.getGlobal('toiletValve'), 100, 250, 100, 100);

        await ObjectTracker.createAndTrackImage('toiletOldFlapper', 'Toilet_Assets/Toilet_OldFlapper.png',
            stage.width() / 2.02, stage.height() / 1.98, 512, 512, false, false, false, 'Scene1');
        setHitArea(ObjectTracker.get('toiletOldFlapper'), 200, 200, 50, 50);

        await ObjectTracker.createAndTrackImage('toiletTankExterior', 'Toilet_Assets/Toilet_TankExterior.png',
            stage.width() / 2.0, stage.height() / 1.96, 512, 512, false, false, false, 'Scene1');
        setHitArea(ObjectTracker.get('toiletTankExterior'), 170, 140, 150, 150);

        await ObjectTracker.createAndTrackImage('toiletTankLid', 'Toilet_Assets/Toilet_TankLid.png',
            stage.width() / 2.0, stage.height() / 1.96, 512, 512, false, false, false, 'Scene1', objectClicked);
        setHitArea(ObjectTracker.get('toiletTankLid'), 100, 90, 150, 110);

        await ObjectTracker.createAndTrackImage('toiletHandle', 'Toilet_Assets/Toilet_Handle.png',
            stage.width() / 2.00, stage.height() / 1.93, 512, 512, false, false, false, 'global', objectClicked);
        setHitArea(ObjectTracker.getGlobal('toiletHandle'), 130, 130, 40, 80);


        // Scene 2
        await ObjectTracker.createAndTrackImage('toiletBase2', 'Toilet_Assets/Toilet_Base.png',
            stage.width() / 2, stage.height() / 2, 512, 512, false, false, false, 'Scene2');

        await ObjectTracker.createAndTrackImage('toiletOldFlapper2', 'Toilet_Assets/Toilet_OldFlapper.png',
            stage.width() / 2.02, stage.height() / 1.98, 512, 512, false, false, false, 'Scene2', objectClicked);
        setHitArea(ObjectTracker.get('toiletOldFlapper2'), 200, 200, 50, 50);

        await ObjectTracker.createAndTrackImage('inventoryBar2', 'Misc_Sprites/Inventory_bar.png',
            stage.width() / 25, stage.height() / 1.7, 600, 600, false, false, false, 'Scene2');


        // Scene 3
        await ObjectTracker.createAndTrackImage('toiletBase3', 'Toilet_Assets/Toilet_Base.png',
            stage.width() / 2, stage.height() / 2, 512, 512, false, false, false, 'Scene3');

        await ObjectTracker.createAndTrackImage('inventoryBar3', 'Misc_Sprites/Inventory_bar.png',
            stage.width() / 25, stage.height() / 1.7, 600, 600, false, false, false, 'Scene3');

        await ObjectTracker.createAndTrackImage('toiletNewFlapper', 'Toilet_Assets/Toilet_NewFlapper.png',
            stage.width() / 12.5, stage.height() / 2.75, 512, 512, false, false, false, 'Scene3', objectClicked);
        setHitArea(ObjectTracker.get('toiletNewFlapper'), 200, 200, 50, 50);


        // Scene 4
        await ObjectTracker.createAndTrackImage('toiletBase4', 'Toilet_Assets/Toilet_Base.png',
            stage.width() / 2, stage.height() / 2, 512, 512, false, false, false, 'Scene4');

        await ObjectTracker.createAndTrackImage('inventoryBar4', 'Misc_Sprites/Inventory_bar.png',
            stage.width() / 25, stage.height() / 1.7, 600, 600, false, false, false, 'Scene4');

        await ObjectTracker.createAndTrackImage('toiletNewFlapper2', 'Toilet_Assets/Toilet_NewFlapper.png',
            stage.width() / 2.02, stage.height() / 1.98, 512, 512, false, false, false, 'Scene4');
        setHitArea(ObjectTracker.get('toiletNewFlapper'), 200, 200, 50, 50);

        await ObjectTracker.createAndTrackImage('toiletTankLid2', 'Toilet_Assets/Toilet_TankLid.png',
            stage.width() / 10.5, stage.height() / 2.25, 512, 512, false, false, false, 'Scene4', objectClicked);
        setHitArea(ObjectTracker.get('toiletTankLid2'), 100, 90, 150, 110);


        // Scene 5
        await ObjectTracker.createAndTrackImage('toiletBase5', 'Toilet_Assets/Toilet_Base.png',
            stage.width() / 2, stage.height() / 2, 512, 512, false, false, false, 'Scene5');

        await ObjectTracker.createAndTrackImage('toiletValve2', 'Toilet_Assets/Toilet_Valve.png',
            stage.width() / 2.05, stage.height() / 1.98, 512, 512, false, false, false, 'Scene5', objectClicked);
        setHitArea(ObjectTracker.get('toiletValve2'), 100, 250, 100, 100);

        await ObjectTracker.createAndTrackImage('toiletTankExterior2', 'Toilet_Assets/Toilet_TankExterior.png',
            stage.width() / 2.0, stage.height() / 1.96, 512, 512, false, false, false, 'Scene5');
        setHitArea(ObjectTracker.get('toiletTankExterior2'), 170, 140, 150, 150);

        await ObjectTracker.createAndTrackImage('toiletTankLid3', 'Toilet_Assets/Toilet_TankLid.png',
            stage.width() / 2.0, stage.height() / 1.96, 512, 512, false, false, false, 'Scene5');
        setHitArea(ObjectTracker.get('toiletTankLid3'), 100, 90, 150, 110);

        await ObjectTracker.createAndTrackImage('toiletHandle2', 'Toilet_Assets/Toilet_Handle.png',
            stage.width() / 2.00, stage.height() / 1.93, 512, 512, false, false, false, 'Scene5', objectClicked);
        setHitArea(ObjectTracker.get('toiletHandle2'), 130, 130, 40, 80);


        // Final Scene
        await ObjectTracker.createAndTrackImage('toiletNew', 'Toilet_Assets/Toilet.png',
            stage.width() / 2, stage.height() / 2, 512, 512, false, false, false, 'finalScene');

        //MainMenu
        await ObjectTracker.createAndTrackImage('toSeatSceneButton', 'Misc_Sprites/tempToSeatButton.jpg',
        stage.width() / 3.00, stage.height() / 2.6, 216, 50, false, false, false, 'MainMenu', objectClicked);

        await ObjectTracker.createAndTrackImage('toTankSceneButton', 'Misc_Sprites/tempToTankButton.jpg',
            stage.width() / 3.00, stage.height() / 2, 216, 50, false, false, false, 'MainMenu', objectClicked);

        SceneManager.transitionToScene('MainMenu'); // Moving to the scene
    } catch (error) {
        console.error("Error loading images sequentially:", error);
    }
});