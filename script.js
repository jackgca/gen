// paper js and p5 functions available

var p1 = new Point(100, 100);
var p2 = new Point(500, 400);
var mypath = new Path();
mypath.strokeColor = 'black';
mypath.add(p1);
mypath.add(p2);

tool.onKeyUp = function(event) {
    if (event.key == "s") {
        saveSVG(project.activeLayer.exportSVG({"asString": true}), function() {
            console.log("svg saved");
        });
    }
}