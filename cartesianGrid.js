const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

class CartesianGrid {
  constructor(x = 0, y = 0, width = 100, height = 100) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.h = 0
    this.s = 0
    this.b = 0
    this.color = color(this.h, this.s, this.b)
    
    this.grid = null
    this.brightnessBar = null
    
    this.gridPointer = new Pointer(0, 0, 20, 0, 0, width, height)
    this.barPointer = new Pointer(width + 20, 0, 10, width + 20, 0, width + 50, height)
    
    this.createGrid()
    this.createBar()
    
    this.updateColor()
  }
  
  setGridPixels(image) {
    let width = image.width
    let height = image.height

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let hue = lerp(0, 360, i/width)
        let currentColor = color(hue, j * 100/height, 100)
        image.set(width - i, height - j, currentColor)
      }
    }
  }

  setBarPixels(image, h = this.h, s = this.s) {
    let width = image.width
    let height = image.height

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let currentColor = color(this.h, this.s, j * 100/height)
        image.set(i, height - j, currentColor)
      }
    }
  }
  
  createGrid() {
    let grid = createImage(this.width, this.height)
    grid.loadPixels()
    this.setGridPixels(grid)
    grid.updatePixels()
    
    this.grid = grid
  }
  
  createBar() {
    let brightnessBar = createImage(30, this.height)
    brightnessBar.loadPixels()
    this.setBarPixels(brightnessBar)
    brightnessBar.updatePixels()
    
    this.brightnessBar = brightnessBar
  }
  
  updateBar() {
    this.brightnessBar.loadPixels()
    this.setBarPixels(this.brightnessBar)
    this.brightnessBar.updatePixels()
  }
  
  updateColor() {
    this.gridPointer.move(mouseX, mouseY)
    this.barPointer.move(mouseX , mouseY)

    let x = this.width - this.gridPointer.x
    
    this.h = lerp(0, 360, x/this.width)
    this.s = (this.height - this.gridPointer.y) * 100/this.height
    this.b = (this.height - this.barPointer.y) * 100/this.height

    this.updateBar()
    this.color = color(this.h, this.s, this.b)
  }
  
  show(t) {
    image(this.grid, 0, 0)
    image(this.brightnessBar, this.width + 20, 0)
    
    if (mouseIsPressed) {
      this.updateColor()
    }
    
    fill(color(this.h, this.s, 100))
    this.gridPointer.show()
    fill(color(this.h, this.s, this.b))
    this.barPointer.show()
  }
}