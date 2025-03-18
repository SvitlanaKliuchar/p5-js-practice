let w = 3; let h = 2*w

let cols; let rows

let blocks = []
let num = 5

function setup() {
  createCanvas(400, 400);

  cols = width / w
  rows = height / h
  
  for (let i = 0; i < num; i++) {
    blocks[i] = new Block()
  }

}

function draw() {
  background(220);
    
  for (let i = 0; i < num; i++) {
    blocks[i].display()
  }
}


