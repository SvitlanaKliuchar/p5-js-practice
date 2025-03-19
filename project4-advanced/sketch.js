let w = 50; let h = w

let cols; let rows

let blocks = []
let num
let colors
let grid = []

let trails = []
let butterfly;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = width / w
  rows = height / h

  colors = [color(255, 240, 1), color(255, 1, 1), color(1, 1, 253), color(249)]
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    let trailButterfly = new Butterfly(mouseX, mouseY, w, h);
    trails.push(trailButterfly);
  }

  if (trails.length > 100) trails.shift();

  for(let b of trails) {
    b.move();             
    b.displayButterfly();
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  cols = floor(width / w);
  rows = floor(height / h);

  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i * w, j * h, w, h, j);
    }
  }
}