// 2D Shooter
// Areeb Khan
// 14/12/2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Player1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.imageToDisplay;
    this.dx = 5;
    this.dy = 5;
    this.w = this.width;
    this.h = this.height;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
  }
  handleKeyPress() {
    if (key === "a" || key === "A") {
      this.isMovingLeft = true;
    }
    if (key === "d" || key === "D") {
      this.isMovingRight = true;
    }
    if (key === "s" || key === "S") {
      this.isMovingDown = true;
    }
    if (key === "w" || key === "W") {
      this.isMovingUp = true;
    }
  }

  handleKeyRelease() {
    if (key === "a" || key === "A") {
      this.isMovingLeft = false;
    }
    if (key === "d" || key === "D") {
      this.isMovingRight = false;
    }
    if (key === "s" || key === "S") {
      this.isMovingDown = false;
    }
    if (key === "w" || key === "W") {
      this.isMovingUp = false;
    }

  }

  update() {
  //This actually moves the player on the field
    if (this.isMovingRight) {
      this.x += this.dx;
    }
    if (this.isMovingLeft) {
      this.x -= this.dx;
    }
    if (this.isMovingUp) {
      this.y -= this.dy;
    }
    if (this.isMovingDown) {
      this.y += this.dy;
    }
  }
}

let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {


}
