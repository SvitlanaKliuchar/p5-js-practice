class Butterfly {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      
      // create unique colors for each butterfly
      this.createColorScheme();
      
      // wing patterns - simplified for performance
      this.patterns = {
        spots: random() > 0.6 ? floor(random(1, 4)) : 0,
        stripes: random() > 0.7,
        iridescence: random() > 0.7 ? random(0.3, 0.6) : 0
      };
      
      // for wing flapping
      this.flapAngle = 0;
      this.flapSpeed = random(0.15, 0.25);
      this.flapOffset = random(0, TWO_PI); // offset to prevent synchronized flapping
      
      // movement physics
      this.vx = random(-2, 2);
      this.vy = random(-1.5, 1.5);
      this.maxSpeed = random(3, 5);
      this.wanderStrength = random(0.01, 0.03);
      
      // rotation and size variation
      this.rotation = random(-20, 20);
      this.sizeMultiplier = random(0.8, 1.2);
      
      // life and appearance
      this.lifespan = 255;
      this.fadeRate = random(0.2, 0.5);
      this.glowIntensity = random(8, 20);
      
      // performance optimization: pre-calculate some values
      this.spotPositions = [];
      if (this.patterns.spots > 0) {
        for (let i = 0; i < this.patterns.spots; i++) {
          this.spotPositions.push({
            x: random(-this.w * 0.6, this.w * 0.6),
            y: random(this.h * 0.2, this.h * 0.6),
            size: random(this.w * 0.05, this.w * 0.15)
          });
        }
      }
    }
    
    createColorScheme() {
      // create a harmonious color scheme - simplified for performance
      let baseHue = random(360);
      let scheme = random(['analogous', 'complementary', 'monochromatic']);
      
      // base wing opacity
      this.wingOpacity = random(180, 230);
      
      switch(scheme) {
        case 'analogous':
          this.topWingColor = color(baseHue, random(70, 90), random(70, 90), this.wingOpacity);
          this.bottomWingColor = color((baseHue + 30) % 360, random(70, 90), random(70, 90), this.wingOpacity);
          this.secondaryColor = color((baseHue + 60) % 360, random(70, 90), random(60, 80), this.wingOpacity);
          break;
        case 'complementary':
          this.topWingColor = color(baseHue, random(70, 90), random(70, 90), this.wingOpacity);
          this.bottomWingColor = color((baseHue + 180) % 360, random(70, 90), random(70, 90), this.wingOpacity);
          this.secondaryColor = color((baseHue + 30) % 360, random(70, 90), random(60, 80), this.wingOpacity);
          break;
        case 'monochromatic':
          this.topWingColor = color(baseHue, random(70, 90), random(70, 90), this.wingOpacity);
          this.bottomWingColor = color(baseHue, random(70, 90), random(40, 60), this.wingOpacity);
          this.secondaryColor = color(baseHue, random(70, 90), random(80, 100), this.wingOpacity);
          break;
      }
      
      this.bodyColor = color(random(20, 40), random(20, 40), random(20, 60));
      this.accentColor = color((baseHue + 180) % 360, random(80, 100), random(70, 90));
    }
    
    move() {
      // add natural-looking movement with wander behavior - simplified for performance
      this.vx += random(-this.wanderStrength, this.wanderStrength);
      this.vy += random(-this.wanderStrength, this.wanderStrength);
      
      // constrain velocity - faster calculation
      let speed = abs(this.vx) + abs(this.vy);  // manhattan distance is faster than euclidean
      if (speed > this.maxSpeed * 1.5) {
        this.vx = (this.vx / speed) * this.maxSpeed;
        this.vy = (this.vy / speed) * this.maxSpeed;
      }
      
      // update position
      this.x += this.vx;
      this.y += this.vy;
      
      // screen wrapping
      if (this.x < -this.w) this.x = width + this.w;
      if (this.x > width + this.w) this.x = -this.w;
      if (this.y < -this.h) this.y = height + this.h;
      if (this.y > height + this.h) this.y = -this.h;
      
      // slowly decrease lifespan
      this.lifespan -= this.fadeRate;
    }
    
    isDead() {
      return this.lifespan <= 0;
    }
    
    displayButterfly() {
      if (this.lifespan <= 0) return;
      
      push();
      translate(this.x, this.y);
      
      // apply size multiplier
      scale(this.sizeMultiplier);
      
      // apply rotation
      rotate(radians(this.rotation));
      
      // calculate flapping using a sine wave with individual offset
      this.flapAngle = sin(frameCount * this.flapSpeed + this.flapOffset) * 30;
      
      // draw glow effect for iridescence only when needed
      if (this.patterns.iridescence > 0) {
        drawingContext.shadowBlur = this.glowIntensity;
        drawingContext.shadowColor = color(hue(this.topWingColor), 100, 80, 50);
      }
      
      // top wings
      this.drawTopWings();
      
      // bottom wings
      this.drawBottomWings();
      
      // wing patterns - simplified for performance
      this.drawWingPatterns();
      
      // body
      this.drawBody();
      
      // antennae
      this.drawAntennae();
      
      // reset shadow
      if (this.patterns.iridescence > 0) {
        drawingContext.shadowBlur = 0;
      }
      
      pop();
    }
    
    drawTopWings() {
      // top wings with simplified rendering
      fill(this.topWingColor);
      stroke(0, this.lifespan * 0.7);
      strokeWeight(1);
      
      // left top wing
      beginShape();
      vertex(0, 0);
      bezierVertex(
        -this.w * 0.7, -this.h * 0.5 + this.flapAngle,
        -this.w * 0.8, -this.h * 0.2 + this.flapAngle,
        -this.w * 0.6, this.h * 0.4
      );
      bezierVertex(
        -this.w * 0.3, this.h * 0.3,
        -this.w * 0.1, this.h * 0.2,
        0, this.h * 0.2
      );
      endShape(CLOSE);
      
      // right top wing
      beginShape();
      vertex(0, 0);
      bezierVertex(
        this.w * 0.7, -this.h * 0.5 + this.flapAngle,
        this.w * 0.8, -this.h * 0.2 + this.flapAngle,
        this.w * 0.6, this.h * 0.4
      );
      bezierVertex(
        this.w * 0.3, this.h * 0.3,
        this.w * 0.1, this.h * 0.2,
        0, this.h * 0.2
      );
      endShape(CLOSE);
    }
    
    drawBottomWings() {
      // bottom wings with simplified rendering
      fill(this.bottomWingColor);
      stroke(0, this.lifespan * 0.7);
      strokeWeight(1);
      
      // left bottom wing
      beginShape();
      vertex(0, this.h * 0.2);
      bezierVertex(
        -this.w * 0.5, this.h * 0.6 + this.flapAngle * 0.5,
        -this.w * 0.6, this.h * 0.8 + this.flapAngle * 0.5,
        -this.w * 0.4, this.h * 0.9
      );
      bezierVertex(
        -this.w * 0.2, this.h * 0.85,
        -this.w * 0.1, this.h * 0.7,
        0, this.h * 0.65
      );
      endShape(CLOSE);
      
      // right bottom wing
      beginShape();
      vertex(0, this.h * 0.2);
      bezierVertex(
        this.w * 0.5, this.h * 0.6 + this.flapAngle * 0.5,
        this.w * 0.6, this.h * 0.8 + this.flapAngle * 0.5,
        this.w * 0.4, this.h * 0.9
      );
      bezierVertex(
        this.w * 0.2, this.h * 0.85,
        this.w * 0.1, this.h * 0.7,
        0, this.h * 0.65
      );
      endShape(CLOSE);
    }
    
    drawWingPatterns() {
      // only draw patterns if butterfly is close to the view
      if (this.lifespan < 200) return;
      
      // eye spots - using precalculated positions
      if (this.patterns.spots > 0) {
        noStroke();
        for (let spot of this.spotPositions) {
          // outer ring
          fill(0, 0, 0, this.lifespan * 0.7);
          ellipse(spot.x, spot.y, spot.size, spot.size);
          
          // inner highlight
          fill(255, 255, 255, this.lifespan * 0.8);
          ellipse(spot.x, spot.y, spot.size * 0.4, spot.size * 0.4);
        }
      }
      
      // wing veins - simplified
      stroke(0, this.lifespan * 0.3);
      strokeWeight(0.5);
      
      // fewer veins for performance
      for (let i = 0; i < 3; i++) {
        let xOffset = (i / 3) * this.w * 0.7;
        
        // left wing
        line(0, 0, -xOffset, this.h * 0.4);
        
        // right wing
        line(0, 0, xOffset, this.h * 0.4);
      }
      
      // stripes pattern - simplified
      if (this.patterns.stripes) {
        stroke(0, this.lifespan * 0.3);
        strokeWeight(1.5);
        
        // just one stripe for performance
        let y = this.h * 0.2;
        noFill();
        
        // left wing stripe
        line(-this.w * 0.2, y, -this.w * 0.6, y);
        
        // right wing stripe
        line(this.w * 0.2, y, this.w * 0.6, y);
      }
    }
    
    drawBody() {
      noStroke();
      fill(this.bodyColor);
      
      // simplified body with fewer segments
      // head
      ellipse(0, -this.h * 0.05, this.w * 0.15, this.h * 0.15);
      
      // thorax
      ellipse(0, this.h * 0.15, this.w * 0.18, this.h * 0.25);
      
      // abdomen
      ellipse(0, this.h * 0.4, this.w * 0.14, this.h * 0.3);
      
      // eyes
      fill(0);
      ellipse(-this.w * 0.05, -this.h * 0.08, this.w * 0.05, this.h * 0.07);
      ellipse(this.w * 0.05, -this.h * 0.08, this.w * 0.05, this.h * 0.07);
    }
    
    drawAntennae() {
      stroke(0, this.lifespan);
      strokeWeight(1.5);
      noFill();
      
      // left antenna - simplified
      beginShape();
      vertex(-this.w * 0.07, -this.h * 0.1);
      vertex(-this.w * 0.2, -this.h * 0.7);
      endShape();
      
      // right antenna - simplified
      beginShape();
      vertex(this.w * 0.07, -this.h * 0.1);
      vertex(this.w * 0.2, -this.h * 0.7);
      endShape();
      
      // antenna tips
      fill(this.accentColor);
      noStroke();
      ellipse(-this.w * 0.2, -this.h * 0.7, this.w * 0.08, this.h * 0.08);
      ellipse(this.w * 0.2, -this.h * 0.7, this.w * 0.08, this.h * 0.08);
    }
  }
  
  // butterfly manager for better performance
  class ButterflyManager {
    constructor() {
      this.butterflies = [];
      this.maxButterflies = 60;
      this.batchSize = 3;  // how many butterflies to create at once
      this.lastCreationTime = 0;
      this.minCreationInterval = 50;  // minimum time between batches in milliseconds
    }
    
    addButterflies(x, y) {
      const currentTime = millis();
      if (currentTime - this.lastCreationTime < this.minCreationInterval) {
        return;
      }
      
      this.lastCreationTime = currentTime;
      
      for (let i = 0; i < this.batchSize; i++) {
        if (this.butterflies.length >= this.maxButterflies) {
          // remove oldest butterflies when we reach the limit
          this.butterflies.shift();
        }
        
        let offsetX = random(-15, 15);
        let offsetY = random(-15, 15);
        let w = random(40, 60);
        let h = w * 1.2;
        
        this.butterflies.push(new Butterfly(x + offsetX, y + offsetY, w, h));
      }
    }
    
    update() {
      // update and draw all butterflies
      for (let i = this.butterflies.length - 1; i >= 0; i--) {
        let b = this.butterflies[i];
        b.move();
        b.displayButterfly();
        
        // remove dead butterflies
        if (b.isDead()) {
          this.butterflies.splice(i, 1);
        }
      }
    }
    
    getCount() {
      return this.butterflies.length;
    }
  }
  
  // particle system for background
  class ParticleSystem {
    constructor() {
      this.particles = [];
      this.maxParticles = 50;
    }
    
    addParticle() {
      if (this.particles.length < this.maxParticles && random() > 0.9) {
        this.particles.push({
          x: random(width),
          y: random(height),
          size: random(1, 3),
          alpha: random(50, 150),
          speed: random(0.2, 0.8)
        });
      }
    }
    
    update() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        fill(0, 0, 100, p.alpha);
        noStroke();
        ellipse(p.x, p.y, p.size, p.size);
        
        // move particles upward slowly
        p.y -= p.speed;
        p.alpha -= 0.5;
        
        // remove faded particles
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
  }