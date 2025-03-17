class Block {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.angle = 0
        this.color = 70
    }

    display() {
        push()
        translate(this.x, this.y)
        rotate(this.angle)

        strokeWeight(2)
        stroke(this.color);
        noFill()
        rect(0, 0, size - offset, size - offset)
        pop()
    }

    move() {
        let distance;
        //if mouse is moving check distance between mouse loc and center
        if (pmouseX - mouseX != 0 || pmouseY - mouseY != 0) {
            distance = dist(mouseX, mouseY, this.x, this.y)

            if (distance < distMouse) {
                this.angle += 1
                this.color = 255
            }
        }

        //if squares are already moving, keep rotationg until angle = 90
        if (this.angle > 0 && this.angle < 90) {
            this.angle += 1
            if (this.color > 70) {
                this.color -= 3
            }

        } else {
            this.angle = 0
            this.color = 70
        }


    }
}