// paper js and p5 functions available

/* - p5.js setup - */

new p5();
noCanvas();
randomSeed(100);

/* ----------------*/

var w = project.view.size.width;
var h = project.view.size.height;
console.log(w, h);

var p1 = new Point(100, 100);
var p2 = new Point(500, 400);
var mypath = new Path();
mypath.strokeColor = 'black';
mypath.add(p1);
mypath.add(p2);

for (var i = 0; i < 20; i++) {
    var newPath = new Path.Circle(new Point(random(0, w), random(0, h)), 10);
    newPath.strokeColor = 'black';
}

tool.onKeyUp = function(event) {
    if (event.key == "s") {
        saveSVG(project.activeLayer.exportSVG({"asString": true}), function() {
            console.log("svg saved");
        });
    }
}