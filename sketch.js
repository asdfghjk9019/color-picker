let grid
let paragraph
let gridIndex = 2

function setup() {
  createCanvas(450, 460)
  colorMode(HSB)
  strokeWeight(1)
  
  grid = new PolarGrid(0, 0, 200)
  
  paragraph = document.createElement('textarea')
  paragraph.style.position = 'absolute'
  paragraph.style.width = '0px'
  paragraph.style.height = '0px'
  paragraph.style.left = '-50px'
  document.body.appendChild(paragraph)
}

function draw() {
  background(0, 0, 11)
  stroke(0)
  grid.show()
  fill(grid.color)
  noStroke()
  rect(0, 410, 50, 50)
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < 50 && mouseY > 410 && mouseY < 460)
    copyColor()
}

function copyColor() {
  let array = grid.color.levels
  array.pop()
  let string = array.map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  paragraph.innerText = '0x' + string
  paragraph.select()
  document.execCommand('copy')
}

function changeGrid() {
  if (gridIndex == 1) {
    gridIndex += 1
    grid = new PolarGrid(0, 0, 200)
  } else if (gridIndex == 2) {
    gridIndex -= 1
    grid = new CartesianGrid(0, 0, 400, 400)
  }
}