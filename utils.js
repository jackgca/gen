const fs = require('fs');

function saveSVG(xml, cb) {
    let pre = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 558 432" x="0px" y="0px">';
    let post = '</svg>';
    fs.writeFile('test.svg', pre + xml + post, (err) => {
        if (err) throw err;
        cb();
    });
}

function createPoint(point, color) {
    new Path.Rectangle({
        from: [point.x, point.y],
        to: [point.x+0.5, point.y+0.5],
        strokeColor: color || 'black'
    });
}

function loadSketch(sketch) {
    const s = require('../sketches/' + sketch + '.js');
    s.run();
    return 'Ran sketch: ' + sketch;
}