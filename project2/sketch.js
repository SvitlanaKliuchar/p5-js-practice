let size = 20
let rows
let cols 

let boxes = []
let font

let msg = 's'
let points = []
let fontX = -75; let fontY = 130; let fontSize = 400

function preload() {
  font = loadFont('fonts/BebasNeue-Regular.ttf')
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES)
  cols = width/size
  rows = height/size
  
  points = font.textToPoints(msg, fontX, fontY, fontSize)
  
  for (let i = 0; i < cols; i++) {
    boxes[i] = []
    for (let j = 0; j < rows; j++) {
      boxes[i][j] = new Box(size/2 + i*size - size*cols/2, size/2 + j*size - size*rows/2)
    }
  }
}

function draw() {
  background(255,100,200);
  let distance
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      for (let k = 0; k < points.length; k++) {
        distance = dist(points[k].x, points[k].y, boxes[i][j].x, boxes[i][j].y)
        if (distance < 10) {
          boxes[i][j].isLetter = true
        } 
      }
      boxes[i][j].display()
    }
  }
  

  
}