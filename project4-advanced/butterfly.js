class Butterfly {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.topWingColor = color(255, 100, 150);
        this.bottomWingColor = color(100, 150, 255);
        this.bodyColor = color(30, 30, 60);

        // for wing flapping
        this.flapAngle = 0;

        // give each butterfly a random velocity
        this.vx = random(-4, 4);
        this.vy = random(-4, 4);
    }

    move() {
        // update position based on velocity
        this.x += this.vx;
        this.y += this.vy;
    }

    displayButterfly() {
        push();
        translate(this.x, this.y);

        // slight rotation to simulate a side-on angle
        rotate(radians(15));

        // calculate flapping using a sine wave
        this.flapAngle = sin(frameCount * 0.2) * 12;

        // TOP WINGS
        stroke(0);
        strokeWeight(2);
        fill(this.topWingColor);

        // left 
        beginShape();
        vertex(0, 0);
        // control points pull the curve up/down; end point is below the start
        bezierVertex(
            -this.w * 0.7, -this.h * 0.4 + this.flapAngle,  // 1st control point
            -this.w * 0.7, this.h * 0.4,                   // 2nd control point
            0, this.h * 0.4                      // end point
        );
        endShape(CLOSE);

        // right
        beginShape();
        vertex(0, 0);
        bezierVertex(
            this.w * 0.7, -this.h * 0.4 - this.flapAngle,
            this.w * 0.7, this.h * 0.4,
            0, this.h * 0.4
        );
        endShape(CLOSE);

        // BOTTOM WINGS
        fill(this.bottomWingColor);

        // left
        beginShape();
        vertex(0, this.h * 0.2);
        bezierVertex(
            -this.w * 0.5, this.h * 0.6 + this.flapAngle,
            -this.w * 0.5, this.h * 0.9,
            0, this.h * 0.9
        );
        endShape(CLOSE);

        // right
        beginShape();
        vertex(0, this.h * 0.2);
        bezierVertex(
            this.w * 0.5, this.h * 0.6 - this.flapAngle,
            this.w * 0.5, this.h * 0.9,
            0, this.h * 0.9
        );
        endShape(CLOSE);

        // BODY
        noStroke();
        fill(this.bodyColor);

        // upper segment
        ellipse(0, this.h * 0.1, this.w * 0.15, this.h * 0.4);
        // middle segment
        ellipse(0, this.h * 0.4, this.w * 0.12, this.h * 0.3);
        // lower segment
        ellipse(0, this.h * 0.65, this.w * 0.1, this.h * 0.2);

        // ANTENNAE
        stroke(0);
        strokeWeight(2);
        noFill();
        // left
        bezier(
            0, -this.h * 0.1,         // start
            -this.w * 0.2, -this.h * 0.4, // control 1
            -this.w * 0.3, -this.h * 0.6, // control 2
            -this.w * 0.2, -this.h * 0.8  // end
        );
        // right
        bezier(
            0, -this.h * 0.1,
            this.w * 0.2, -this.h * 0.4,
            this.w * 0.3, -this.h * 0.6,
            this.w * 0.2, -this.h * 0.8
        );

        pop();
    }
}
