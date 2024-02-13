// ObjectTracker.js
// This is for tracking every object that is used during the gameplay

var ObjectTracker = (function() {

    var objects = {};

    function add(name, konvaObject) {
        console.log("Adding image to ObjectTracker:", name);

        objects[name] = konvaObject;
    }

    function get(name) {
        return objects[name];
    }

    return {
        add: add,
        get: get
    };
})();