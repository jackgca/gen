class Eye {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    generateEye() {
        let radius = random(8, 12);
        let tilt = random(-6, 6);
        let leftSide = new Point(this.x - radius, this.y - tilt);
        let rightSide = new Point(this.x + radius, this.y + tilt);
        let mid = new Point((rightSide.x + leftSide.x) / 2, (rightSide.y + leftSide.y) / 2);
        let slope = (rightSide.y - leftSide.y) / (rightSide.x - leftSide.x);
        let oppSlope = Math.PI - slope;
        let topSize = random(4, 10);
        let p1 = new Point(mid.x + (topSize * math.cos(oppSlope)), mid.y + (topSize * math.sin(oppSlope)));
        let botSize = -random(4, 10);
        let p2 = new Point(mid.x + (botSize * math.cos(oppSlope)), mid.y + (botSize * math.sin(oppSlope)));
        
        // draw outlines
        let eyeTop = new Path.Arc({
            from: leftSide,
            through: p1,
            to: rightSide,
            strokeColor: 'black'
        });
        let eyeBot = new Path.Arc({
            from: leftSide,
            through: p2,
            to: rightSide,
            strokeColor: 'black'
        });

        // draw pupils
        let pupilSize = random(0.15, 0.35) * eyeTop.length;

        let corners = [
            eyeTop.getPointAt(pupilSize),
            eyeTop.getPointAt(eyeTop.length - pupilSize),
            eyeBot.getPointAt(eyeBot.length - pupilSize),
            eyeBot.getPointAt(pupilSize)
        ];

        let paths = [
            new Path([corners[0], corners[1]]),
            new Path.Arc(corners[1], p1, corners[2]),
            new Path([corners[2], corners[3]]),
            new Path.Arc(corners[3], p2, corners[0])
        ];

        
        new CompoundPath({
            children: paths, fillColor: 'black'
        });
        
    }
}

module.exports = {
    Eye,
    run: function() {
        for (var i = 0; i < 10; i++) {
            new Eye((i * (w/10) + (w/10/2)), 100).generateEye();
        }
    }
}