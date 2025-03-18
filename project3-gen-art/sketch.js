let w = 3; let h = 2*w

let cols; let rows

let blocks = []
let num
let colors 

function setup() {
  createCanvas(400, 400);

  cols = width / w
  rows = height / h
  
  num = floor(random(3,8))
  print(num)
  
  colors = [color(255,240,1), color(255,1,1), color(1,1,253), color(249)]
  
  
  for (let i = 0; i < num; i++) {
    blocks[i] = new Block(colors[i % colors.length])
  }

}

function draw() {
  background(220);
    
  for (let i = 0; i < num; i++) {
    blocks[i].display()
  }
}


