class Pointer {
  constructor(x = 0, y = 0, r = 20, minX = 0, minY = 0, maxX = 100, maxY = 100) {
    this.x = x
    this.y = y
    this.r = r
    
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }
  
  move(x, y) {
    if (x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY) {
      this.x = x
      this.y = y
    }
  }
  
  show() {
    circle(this.x, this.y, this.r)
  }
}
