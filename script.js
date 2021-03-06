/* - setup math.js - */

const mjsFuncs = ["sqrt", "random", "square", "floor", "ceil", "abs"];
const {create, all} = require('mathjs');
const mathConfig = {randomSeed: 4};
const math = create(all, mathConfig);

mjsFuncs.forEach(f => {window[f] = math[f]});

/* - setup perlin.js - */

noise.seed(1) // 1 - 65536


/* - setup paper.js */

paper.install(window);

window.onload = function() {
    paper.setup('canvas');

    window.w = project.view.size.width;
    window.h = project.view.size.height;
    
    /* - extra utilities - */

    var tool = new Tool();

    tool.onKeyUp = function(event) {
        if (event.key == "s") {
            saveSVG(project.activeLayer.exportSVG({"asString": true}), function() {
                console.log("svg saved");
            });
       }
       if (event.key == "r") {
           window.location.reload(false);
       }
    }

    require('../sketches/faces.js').run();
}