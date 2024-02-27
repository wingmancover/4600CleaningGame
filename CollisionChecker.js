//CollisionChecker.js
// This is a collision checker class to manage object collisions and collision events.


//This is a simple collision checker that returns a boolean value. This can be used for simple binary switches.
//Example:
    // Objects: ToiletLid, ToiletTank
    //if(collisionChecker(ToiletLid, ToiletTank) -> load XrayToiletTank && unload(hide) ToiletTank
function collisionChecker(obj1, obj2) {
    if(
        // obj1.x < obj2.x + obj2.width &&
        // obj1.x + obj1.width > obj2.x &&
        // obj1.y < obj2.y + obj2.height &&
        // obj1.y + obj1.height > obj2.y

        ObjectTracker.getX(obj1) < ObjectTracker.getX(obj2) + ObjectTracker.getWidth(obj2) &&
        ObjectTracker.getX(obj1) + ObjectTracker.getWidth(obj1) > ObjectTracker.getX(obj2) &&
        ObjectTracker.getY(obj1) < ObjectTracker.getY(obj2) + ObjectTracker.getHeight(obj2) &&
        ObjectTracker.getY(obj1) + ObjectTracker.getHeight(obj1) > ObjectTracker.getY(obj2)
    )
        return true;
}

stage.on('mousemove touchmove', function() {
    if(collisionChecker(ObjectTracker.get('sponge'),
        ObjectTracker.get('toiletQA'))){
        alert("THEY HAVE COLLIDED");
    }
});

//This is a complex collision checker that requires a few changes to the main code. Objects need a new field called: status (This is a binary value that determines
//whether an object is drawn in the next draw(). This works by checking the object buffer and comparing every item against each other. This currently works
//with a 1-dimensional array, but maybe the implementation of a 2d array would be best for the SeatCleaning Level.


//THIS IS INCOMPLETE CODE THAT COULD PROVE USEFUL FOR SEAT CLEAN SCENE/ IF WE NEED TO CHECK FOR COLLISIONS CONSTANTLY FOR MULTIPLE ITEMS.
var theoreticalObjList = [];

function complexCollisionChecker(){
    for(var i = 0; i < theoreticalObjList.length; i++){
        var obj1 = theoreticalObjList[i];
        if(obj1.status == 1){
            for(var j = 0; j < theoreticalObjList.length; j++){
                var obj2 = theoreticalObjList[j];
                if(obj2.status == 1 && i !== j) {
                    if(collisionChecker(obj1, obj2)){
                        //whatever we need to happen
                    }
                }
            }
        }
    }
}