class Block {
    constructor() {
      this.colRange = this.randomLengthGenerator(cols + 1)
      this.rowRange = this.randomLengthGenerator(rows + 1)
      this.block = []
      
    for (let i = this.colRange.x; i < this.colRange.y; i++) {
      this.block[i] = []
      for (let j = this.rowRange.x; j < this.rowRange.y; j++) {
        this.block[i][j] = new Cell(i * w, j * h, w, h, j)
      }
    }
  
    }
    
    display() {
        for (let i = this.colRange.x; i < this.colRange.y; i++) {
      for (let j = this.rowRange.x; j < this.rowRange.y; j++) {
        this.block[i][j].displayCell()
      }
    }
    }
    
    randomLengthGenerator(length) {
    let a; let b;
    do {
      a = floor(random(0, length));
      b = floor(random(0, length));
    } while (a === b)
  
  
    let range = createVector(min(a, b), max(a, b))
  
    return range
  }
  
  }