// paper js and p5 functions available

/* - p5.js setup - */

new p5();
noCanvas();
randomSeed(100);

/* - main function - */

function render() {
    var w = project.view.size.width;
    var h = project.view.size.height;
    console.log(w, h);

    // create an anonymous path
    new Path({
        segments: [[20, 20], [40, 400]],
        strokeColor: 'black'
    });

    for (var i = 0; i < 20; i++) {
        // make a circle with radius 10 at random points in the canvas
        //var newPath = new Path.Circle(new Point(random(0, w), random(0, h)), 10);
        //newPath.strokeColor = 'black';
    }

    var theCurve = new Curve(
        new Point(random(w), random(h)),
        new Point(random(w), random(h)),
        new Point(random(w), random(h)),
        new Point(random(w), random(h))
    );

    var curvy = new Path(theCurve.segment1, theCurve.segment2);

    curvy.strokeColor = 'black';
}

/* - drawing utilities - */

function createPoint(x, y, color) {
    new Path.Rectangle({
        from: [x, y],
        to: [x+0.1, y+0.1],
        strokeColor: color || 'black'
    });
}

/* - extra utilities - */

tool.onKeyUp = function(event) {
    if (event.key == "s") {
        saveSVG(project.activeLayer.exportSVG({"asString": true}), function() {
            console.log("svg saved");
        });
    }
}

/* - call main - */

render();