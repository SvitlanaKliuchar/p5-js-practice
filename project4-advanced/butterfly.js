class Butterfly {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    displayButterfly() {
        push() //save current transformations
        translate(this.x, this.y) //start with the butterfly's position as 0

        fill(255, 240, 150);
        ellipse(0 - this.w / 2, 0, this.w, this.h);  // left top wing 

        fill(150, 150, 255);
        ellipse(0 + this.w / 2, 0, this.w, this.h);  // right top wing 

        fill(190, 1, 1);
        ellipse(0 - this.w / 2, 0, this.w / 2.5, this.h / 2.5);  //small circles inside

        fill(160, 10, 200);
        ellipse(0 + this.w / 2, 0, this.w / 2.5, this.h / 2.5); //small circles inside

        fill(100, 1, 1);
        ellipse(0 - this.w / 2.7, 0 + this.h / 1.5, this.w / 1.5, this.h / 1.5);  //left bottom wing

        fill(100, 10, 200);
        ellipse(0 + this.w / 2.7, 0 + this.h / 1.5, this.w / 1.5, this.h / 1.5);  //right botton wing

        stroke(0);
        strokeWeight(4);
        line(0, 0 - this.h / 2, 0, 0 + this.h / 1.15);  // vertical line for the body

        strokeWeight(2)
        //lthis.wft antenna
        line(0, 0 - this.h / 2, 0 - this.w / 2, 0 - this.h)

        //right antenna
        line(0, 0 - this.h / 2, 0 + this.w / 2, 0 - this.h)

        pop()
    }
}
