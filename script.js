const Spline = require('../node_modules/cubic-spline');

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

let w = 594;
let h = 420;

var r = new Rune({
    container: 'body',
    width: w,
    height: h
});

let noise = new Rune.Noise();
noise.noiseSeed(1);

// noise.get(x), noise.get(x, y)

let count = 30; // num of extrema
let numLines = 200;

// create top wave
let topxs = [0];
let topys = [220]

for (var i = 1; i < count; i++) {
    let y = 100 + (noise.get(i / count * w) * 100);
    topxs.push(i / count * w);
    let yadj = (count / 2) - Math.abs(i % count - (count / 2));
    topys.push(y - (yadj * yadj / 2));
}
topxs.push(w);
topys.push(220);

let topspline = new Spline(topxs, topys);
let toplastx = topxs[topxs.length - 1];

let toppath = r.path().moveTo(0, topspline.at(0)).fill('none');

// for (var i = 0; i < numLines; i++) {
//     let x = map(
//         i,
//         0,
//         numLines,
//         topxs[0],
//         toplastx
//     );
//     let y = topspline.at(x);
//     toppath.lineTo(x, y);
//     toppath.moveTo(x, y);
// }

// draw bottom wave
let botxs = [0];
let botys = [220]

for (var i = 1; i < count; i++) {
    let y = 220 + (noise.get(w + i / count * w) * 100);
    botxs.push(i / count * w);
    let yadj = (count / 2) - Math.abs(i % count - (count / 2));
    botys.push(y + (yadj * yadj / 4));
}
botxs.push(w);
botys.push(220);

let botspline = new Spline(botxs, botys);
let botlastx = botxs[botxs.length - 1];

let botpath = r.path().moveTo(0, botspline.at(0)).fill('none');

// for (var i = 0; i < numLines; i++) {
//     let x = map(
//         i,
//         0,
//         numLines,
//         botxs[0],
//         botlastx
//     );
//     let y = botspline.at(x);
//     botpath.lineTo(x, y);
//     botpath.moveTo(x, y);
// }

function lerpLines(offset) {
    let numLerps = 60;
    for (var l = 0; l < numLerps; l++) {
        let lerpXs = [0];
        let lerpYs = [220];
        
        for (var i = 1; i < count; i++) {
            let fac = 0;
            fac = (noise.get(i + l) - 0.5) * 0;

            lerpXs.push(i / count * w + fac);
            let y = map(l, 0, numLerps, topys[i], botys[i]);
            lerpYs.push(y);
        }
        lerpXs.push(w);
        lerpYs.push(220);

        let minY = 100000;
        let maxY = 0;
        for (var i = 0; i < lerpYs.length; i++) {
            if (lerpYs[i] < minY) {minY = lerpYs[i];}
            if (lerpYs[i] > maxY) {maxY = lerpYs[i];}
        }

        let adj = (numLerps / 2) - Math.abs(l % numLerps - (numLerps / 2)) / 40;
        let dist = (maxY - minY) + (adj / 2);
        let newMin = minY + dist;
        let newMax = maxY - dist;

        for (var i = 0; i < lerpYs.length; i++) {
            //console.log(lerpYs[i], minY, maxY, newMin, newMin);
            lerpYs[i] = map(lerpYs[i], minY, maxY, newMin, newMax)
        }

        let lerpspline = new Spline(lerpXs, lerpYs);
        let lerppath = r.path().moveTo(0, lerpspline.at(0)).fill('none');

        for (var i = 0; i < numLines; i++) {
            let x = map(
                i,
                0,
                numLines,
                lerpXs[0],
                botlastx
            );
            let y = lerpspline.at(x);
            lerppath.lineTo(x, y);
            lerppath.moveTo(x, y);
        }
    }
}

lerpLines();

reloadDrawing = function() {
    r.draw();
}

reloadDrawing();