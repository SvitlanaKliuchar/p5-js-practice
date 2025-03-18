let w = 50; let h = 100

let cols; let rows

let grid = []

let colRange; let rowRange

function setup() {
  createCanvas(400, 400);

  cols = width / w
  rows = height / h

  colRange = randomLengthGenerator(cols)
  rowRange = randomLengthGenerator(rows)

  for (let i = colRange.x; i < colRange.y; i++) {
    grid[i] = []
    for (let j = rowRange.x; j < rowRange.y; j++) {
      grid[i][j] = new Cell(i * w, j * h, w, h, j)
    }
  }


}

function draw() {
  background(220);

  for (let i = colRange.x; i < colRange.y; i++) {
    for (let j = rowRange.x; j < rowRange.y; j++) {
      grid[i][j].display()
    }
  }
}

function randomLengthGenerator(length) {
  let a; let b;
  do {
    a = floor(random(0, length));
    b = floor(random(0, length));
  } while (a === b)


  let range = createVector(min(a, b), max(a, b))

  return range
}

