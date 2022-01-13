function xy2polar(x, y) {
  let r = sqrt(x*x + y*y)
  let phi = atan2(y, x)
  return [r, phi]
}

function rad2deg(rad) {
  return ((rad + PI) / (2 * PI)) * 360
}

class PolarGrid {
  constructor(x = 0, y = 0, radius = 100) {
    angleMode(DEGREES)
    
    this.x = x
    this.y = y
    this.width = radius * 2
    this.height = radius * 2
    this.radius = radius
    this.h = 0
    this.s = 0
    this.b = 0
    this.color = color(this.h, this.s, this.b)
    
    this.grid = null
    this.brightnessBar = null
    
    let width = this.width
    let height = this.height
    
    this.gridPointer = new Pointer(0, 0, 20, 0, 0, width, height)
    this.barPointer = new Pointer(width + 20, 0, 10, width + 20, 0, width + 50, height)
    
    this.createGrid()
    this.createBar()
    
    this.updateColor()
  }
  
  setGridPixels(image) {
    let width = image.width
    let height = image.height
    let radius = this.radius
    
    if (true) {
      for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {
          let distance = sqrt(x*x + y*y)
          let [r, phi] = xy2polar(x, y)
          let deg = rad2deg(phi)
          
          if (y >= 0) {
            deg = phi
          } else {
            deg = phi + 360
          }

          if (distance - radius >= 1) {
            continue
          }
          if (r / distance < 0.9 ) {
            continue
          }

          let adjustedX = x + radius
          let adjustedY = y + radius

          let currentColor = color(deg, r*100/radius, 100)
          image.set(adjustedX, adjustedY, currentColor)
        }
      }
    } else {
      for (let angle = 0; angle < 360; angle+=0.1) {
        for (let r = 0; r < radius; r++) {
          let x = r * cos(angle)
          let y = r * sin(angle)

          let adjustedX = x + radius
          let adjustedY = y + radius

          let currentColor = color(angle, r*100/radius, 100)
          image.set(adjustedX, adjustedY, currentColor)
        }
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
     
    let x = this.gridPointer.x - this.radius
    let y = this.gridPointer.y - this.radius
    
    let distance = sqrt(x*x + y*y)
    
    if (distance - this.radius >= 1) {
      this.h = 360
      this.s = 0
      this.b = (this.height - this.barPointer.y) * 100/this.height
      this.updateBar()
      this.color = color(this.h, this.s, this.b)
      return
    }
    
    let width = this.width
    let height = this.height
     
    let [r, phi] = xy2polar(x, y)
    
    if (y >= 0) {
      this.h = phi
    } else {
      this.h = phi + 360
    }
    
    this.s = r * 100/this.radius
    this.b = (this.height - this.barPointer.y) * 100/this.height

    this.updateBar()
    this.color = color(this.h, this.s, this.b)
  }
  
  show() {
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
