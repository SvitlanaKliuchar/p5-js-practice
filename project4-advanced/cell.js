class Cell {
  constructor(x, y, w, h, row) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.row = row
  }
  displayCell() {
    if (this.row % 2 == 0) {
      line(this.x, this.y, this.w + this.x, this.h + this.y)
    } else {
      line(this.x + this.w, this.y, this.x, this.h + this.y)
    }
  }
}