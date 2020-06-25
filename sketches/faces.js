noise.seed(1) // 1 - 65536

class Eye {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.left;
        this.right;
        return this.generateEye();
    }

    generateEye() {
        let radius = random(8, 12);
        let leftSide = new Point(this.x - radius, this.y);
        let rightSide = new Point(this.x + radius, this.y);
        let eyeOutline = new Path({
            segments: [
                new Segment(leftSide, null, [(rightSide.x - leftSide.x) / 2, -radius]),
                new Segment(rightSide, null, [-(rightSide.x - leftSide.x) / 2, radius]),
                new Segment(leftSide)
            ],
            strokeColor: 'black',
            fillColor: 'white',
            closed: true
        });

        let pupilSize = random(0.2, 0.35) * eyeOutline.strokeBounds.width;
        let pupil = new Path.Ellipse({
            center: [
                ((rightSide.x + leftSide.x) / 2) + random(-3, 3),
                ((rightSide.y + leftSide.y) / 2) + random(-3, 3)
            ],
            radius: [pupilSize / 2, (eyeOutline.strokeBounds.height / 2) + random(0, 2)]
        });

        pupil = eyeOutline.intersect(pupil);
        pupil.fillColor = 'black';

        let eye = new Group({
            children: [
                eyeOutline,
                pupil
            ]
        });

        // todo: keep track of eye corners after rotation
        //eye.rotate(random(-30, 30));

        this.left = leftSide;
        this.right = rightSide;

        return eye;
    }
}

class Nose {
    constructor(x, y, faceHeight, noseSide) {
        this.x = x;
        this.y = y;
        this.faceHeight = faceHeight;
        this.noseSide = noseSide
        return this.generateNose(floor(random(1, 4)));
    }

    generateNose(numLines) {
        let nose = new Group();
    
        let noseLine = function(n, sf, rv, nx) {
            let noseLength = n.faceHeight * sf * 4;
            let sideFactor = sf * (n.noseSide == 'left' ? -1 : 1);
            let noiseVal = noise.perlin2(nx, n.y) * 2;
            let line = new Path({
                segments: [
                    new Segment([n.x, n.y], null, [0 + noiseVal, (noseLength / 2) - noiseVal]), // first point and first handle
                    new Segment([n.x + (n.faceHeight * sideFactor), n.y + noseLength], [(n.faceHeight * sideFactor) - noiseVal, 0 + noiseVal]), // curved line and second handle
                    new Segment([n.x + (sideFactor * rv), n.y + noseLength - rv]) // bottom line
                ],
                strokeColor: 'black',
                fillColor: 'white'
            });
            nose.addChild(line)
        }

        let v = random(1, 4);
        let s = random(0.05, 0.2);
        for (var i = 0; i < numLines; i++) {
            noseLine(this, s, v, i);
        }

        return nose;
    }
}

class Head {
    constructor(x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        return this.generateHead();
    }

    generateHead() {
        let temp = new Path.Circle({
            center: [this.x, this.y],
            radius: this.height / 2
        });

        let points = [];
        let l = temp.length;
        let np = floor(random(4, 12));
        for (var i = 0; i < np; i++) {
            let lerp = l / np * (i + 1);
            let p = temp.getPointAt(lerp < l ? lerp : l);
            points.push(new Point(
                p.x + random(-2, 2),
                p.y + random(-2, 2)
            ));
        }
        
        let pointsPop = function(pts) {
            if (random() < 0.5 && pts.length > 5) {
                pts.pop(math.randomInt(0, pts.length))
                return pts;
            }
            return pts;
        }
        
        points = pointsPop(points);

        let head = new Path({
            segments: points,
            strokeColor: 'black',
            closed: true
        });
        head.smooth();

        return head;
    }
}

class Face {
    constructor(x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        return this.generateFace();
    }

    generateFace() {
        let face = new Group();

        // create head
        (function(t) {
            face.addChild(new Head(t.x, t.y, t.height));
        })(this);

        // create eyes
        (function(t) {
            let space = random(t.height/8, t.height/4);
            face.addChild(new Eye(t.x - space, t.y - (t.height / random(3, 5)))); // left eye
            face.addChild(new Eye(t.x + space, t.y - (t.height / random(3, 5)))); // right eye
        })(this);

        // create nose
        (function(t) {
            let noseSide = random() < 0.5 ? 'left' : 'right';
            face.addChild(new Nose(t.x, t.y - (t.height / 2), t.height, noseSide));
        })(this);

        return face;
    }
}

module.exports = {
    run: function() {
        let numCols = 6;
        let numRows = 3;
        for (var i = 0; i < numCols; i++) {
            for (var j = 0; j < numRows; j++) {
                new Face(
                    (i * (w/numCols) + (w/numCols/2)),
                    (j * (h/numRows) + (h/numRows/2)),
                    80
                );
            }
        }
    }
}