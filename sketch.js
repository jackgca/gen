const canvasSketch = require('canvas-sketch');
const { polylinesToSVG } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const p5 = require('p5');

new p5();

const settings = {
    p5: true,
    pixelsPerInch: 96,
    dimensions: 'letter',
    units: 'px',
    orientation: 'landscape'
};

window.preload = () => {
    // Preload sounds/images/etc...
};

function render() {
    background('white');
    line(0, 0, 50, 50);
}

canvasSketch(() => {
    window.mouseClicked = () => {
        console.log('Mouse clicked');
    };

    return ({ width, height }) => {
        render();
    };
}, settings);