// 2D Shooter
// Areeb Khan
// 14/12/2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
    this.offScreen = false;
    this.imageToDisplay = theImage;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x >= width + this.radius || this.x <= 0 - this.radius || this.y >= height + this.radius || this.y <= 0 - this.radius) {
      this.offScreen = true;
    }
  }

  display() {
    // fill(0);
    // ellipse(this.x, this.y, this.radius, this.radius);
    imageMode(CENTER);
    image(this.imageToDisplay, this.x, this.y);
  }
}

class Player1 {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.imageToDisplay = theImage;
    this.dx = 5;
    this.dy = 5;
    this.w = this.imageToDisplay.width;
    this.h = this.imageToDisplay.height;
    this.bulletArray = [];
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingLeft = false;
  }

  handleKeyPress() {
    if (key === "w" || key === "W") {
      this.isMovingUp = true;
    }
    if (key === "s" || key === "S") {
      this.isMovingDown = true;
    }
    if (key === "a" || key === "A") {
      this.isMovingLeft = true;
    }
    if (key === "d" || key === "D") {
      this.isMovingRight = true;
    }
    if (key === " ") {
      //fire photons!!!
      let someBullet = new Bullet(this.x, this.y, 0, -10, bulletImage);
      this.bulletArray.push(someBullet);
    }
  }

  handleKeyRelease() {
    if (key === "w" || key === "W") {
      this.isMovingUp = false;
    }
    if (key === "s" || key === "S") {
      this.isMovingDown = false;
    }
    if (key === "a" || key === "A") {
      this.isMovingLeft = false;
    }
    if (key === "d" || key === "D") {
      this.isMovingRight = false;
    }
  }

  update() {
    // Updates / Moves the player up and down
    if (this.isMovingDown) {
      this.y += this.dy;
    }
    if (this.isMovingUp) {
      this.y -= this.dy;
    }
    if (this.isMovingRight) {
      this.x += this.dx;
    }
    if (this.isMovingLeft) {
      this.x -= this.dx;
    }

    // Lets you see the bullets 
    for (let i = this.bulletArray.length - 1; i >= 0; i--) {
      this.bulletArray[i].update();
      this.bulletArray[i].display();
      if (this.bulletArray[i].offScreen) {
        this.bulletArray.splice(i, 1);
      }
    }
  }

  display() {
    imageMode(CENTER);
    image(this.imageToDisplay, this.x, this.y + this.h / 2);
  }

}

let grid = [];
let areeb;

function setup() {
  createCanvas(windowWidth, windowHeight);
  areeb = new Player1(width/2, height/2);
}

function draw() {
  background(255);
  areeb.display();
  areeb.update();
}

function keyPressed() {
  areeb.handleKeyPress();
}

function keyReleased() {
  areeb.handleKeyRelease();
}
