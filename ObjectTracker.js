// ObjectTracker.js
// This is for tracking every object that is used during the gameplay

var ObjectTracker = (function() {
    var objects = {};

    function add(name, konvaObject) {
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