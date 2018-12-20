// 2D Shooter
// Areeb Khan
// 14/12/2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// class Bullet {
//   constructor(x, y, dx, dy, theImage) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = 5;
//     this.offScreen = false;
//     this.imageToDisplay = theImage;
//   }
//
//   update() {
//     this.x += this.dx;
//     this.y += this.dy;
//     if (this.x >= width + this.radius || this.x <= 0 - this.radius || this.y >= height + this.radius || this.y <= 0 - this.radius) {
//       this.offScreen = true;
//     }
//   }
//
//   display() {
//     // fill(0);
//     // ellipse(this.x, this.y, this.radius, this.radius);
//     imageMode(CENTER);
//     image(this.imageToDisplay, this.x, this.y, 10, 22);
//   }
// }

class Player1 {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.imageToDisplay = theImage;
    this.dx = 5;
    this.dy = 5;
    this.w = 50;
    this.h = 70;
    this.bulletArray = [];
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingLeft = false;
  }

  rotatesPlayer() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let angle = atan2(dy, dx);
    rotate(angle);
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
  //   if (key === " ") {
  //     //fire photons!!!
  //     let someBullet = new Bullet(this.x, this.y, 0, -10, bulletImg);
  //     this.bulletArray.push(someBullet);
  //   }
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

    // // Lets you see the bullets
    // for (let i = this.bulletArray.length - 1; i >= 0; i--) {
    //   this.bulletArray[i].update();
    //   this.bulletArray[i].display();
    //   if (this.bulletArray[i].offScreen) {
    //     this.bulletArray.splice(i, 1);
    //   }
    // }
  }

  display() {
    imageMode(CENTER);
    push();
    translate(this.x, this.y);
    this.rotatesPlayer();
    image(this.imageToDisplay, 0, 0 + this.h / 2, this.w, this.h);
    pop();
  }

}

let grid = [];
let areeb, playerimg, bulletImg, backgroundImg;
let state;

function preload() {
  playerimg = loadImage("assets/playerIMG.png");
  bulletImg = loadImage("assets/Just_A_Bullet.png");
  backgroundImg = loadImage("assets/backgorund.jpg");

}

function setup() {
  createCanvas(1600, 790);
  state = "gameStart";
  areeb = new Player1(width/2, height/2, playerimg);

}

function draw() {

  if (state === "gameStart"){
    areeb.update();
    areeb.display();
  }
}

function keyPressed() {
  areeb.handleKeyPress();
}

function keyReleased() {
  areeb.handleKeyRelease();
}
