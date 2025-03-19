// global variables
let butterflyManager;
let particleSystem;
let bgGradient;
let showHelp = true;
let helpTimer = 0;
let fpsCounter = 0;
let lastFpsUpdate = 0;
let fps = 0;
let showFps = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  
  // initialize systems
  butterflyManager = new ButterflyManager();
  particleSystem = new ParticleSystem();
  
  // create initial butterflies
  for (let i = 0; i < 5; i++) {
    butterflyManager.addButterflies(random(width), random(height));
  }
  
  // create background gradient once
  bgGradient = createGraphics(width, height);
  setGradient(bgGradient, 0, 0, width, height, 
              color(210, 10, 95), 
              color(250, 15, 98));
}

function draw() {
  // use pre-rendered background
  image(bgGradient, 0, 0);
  
  // update FPS counter
  fpsCounter++;
  if (millis() - lastFpsUpdate > 500) {
    fps = fpsCounter * 2; // multiply by 2 because we're updating every 500ms
    fpsCounter = 0;
    lastFpsUpdate = millis();
  }
  
  // add and update background particles
  particleSystem.addParticle();
  particleSystem.update();
  
  // update and draw butterflies
  butterflyManager.update();
  
  // check for mouse press
  if (mouseIsPressed) {
    butterflyManager.addButterflies(mouseX, mouseY);
  }
  
  // show instructions
  if (showHelp) {
    helpTimer++;
    if (helpTimer > 300) {
      showHelp = false;
    }
    
    fill(0, 0, 0, 180);
    noStroke();
    rectMode(CENTER);
    rect(width/2, height/2, 300, 100, 10);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Click and drag to create butterflies", width/2, height/2 - 15);
    textSize(12);
    text("Each butterfly has unique patterns and colors", width/2, height/2 + 15);
  }
  
  // show FPS counter
  if (showFps) {
    fill(0, 0, 0, 180);
    noStroke();
    rectMode(CORNER);
    rect(10, 10, 120, 40, 5);
    
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    text("FPS: " + fps, 20, 25);
    text("Butterflies: " + butterflyManager.getCount(), 20, 40);
  }
}

function setGradient(g, x, y, w, h, c1, c2) {
  g.noFill();
  // top to bottom gradient
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    g.stroke(c);
    g.line(x, i, x + w, i);
  }
}

function keyPressed() {
  if (key === 'f' || key === 'F') {
    showFps = !showFps;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // recreate background gradient
  bgGradient = createGraphics(width, height);
  setGradient(bgGradient, 0, 0, width, height, 
              color(210, 10, 95), 
              color(250, 15, 98));
}
