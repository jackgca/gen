class Eye {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    generateEye() {
        let radius = random(8, 12);
        let leftSide = new Point(this.x - radius, this.y);
        let rightSide = new Point(this.x + radius, this.y);
        let mid = new Point((rightSide.x + leftSide.x) / 2, (rightSide.y + leftSide.y) / 2);
        let eyeOutline = new Path();
        eyeOutline.moveTo(leftSide);
        eyeOutline.cubicCurveTo([leftSide.x + (radius / 2), leftSide.y - (radius / 1.5)], [rightSide.x - (radius / 2), rightSide.y - (radius / 1.5)], rightSide);
        eyeOutline.cubicCurveTo([rightSide.x + (radius / 2), rightSide.y + (radius / 1.5)], [leftSide.x - (radius / 2), leftSide.y + (radius / 1.5)], leftSide);
        eyeOutline.strokeColor = 'black';
        eyeOutline.closed = true;

        let pupilSize = random(0.2, 0.35) * eyeOutline.bounds.width;
        let pupilRect = new Path.Rectangle({
            from: [eyeOutline.bounds.x + pupilSize, eyeOutline.bounds.y],
            to: [eyeOutline.bounds.x + eyeOutline.bounds.width - pupilSize, eyeOutline.bounds.y + eyeOutline.bounds.height]
        });

        let intersected = eyeOutline.intersect(pupilRect);
        intersected.fillColor = 'black';
        
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