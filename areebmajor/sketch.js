// 2D Shooter
// Areeb Khan
// 14/12/2018
//
// Source Code for Easy Ai https://gamedev.stackexchange.com/questions/50978/moving-a-sprite-towards-an-x-and-y-coordinate
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
    this.enemyDetect = false;
    this.imageToDisplay = theImage;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    bulletDetect = collideRectRect(this.x, this.y, this.radius, this.radius, enemySlime.x, enemySlime.y, enemySlime.w, enemySlime.h);
    console.log(bulletDetect);
    if (this.x >= width + this.radius || this.x <= 0 - this.radius || this.y >= height + this.radius || this.y <= 0 - this.radius) {
      this.offScreen = true;
    }
    if(bulletDetect){
      this.enemyDetect = true;
    }
  }
  display() {
    fill(0);
    rect(this.x, this.y, this.radius, this.radius);
    imageMode(CENTER);
    image(this.imageToDisplay, this.x, this.y);
  }
}

class Player1 {
  constructor(x, y, downImg, upImg, leftImg, rightImg, down_idle_img) {
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = 5;
    this.bulletArray = [];
    this.transparency = 0;
    this.displayDownImg = downImg;
    this.displayUpImg = upImg;
    this.displayLeftImg = leftImg;
    this.displayRightImg = rightImg;
    this.idleImgDisplay = down_idle_img;
    this.w = this.idleImgDisplay.width;
    this.h = this.idleImgDisplay.height;
    this.isRight = false;
    this.isLeft = false;
    this.isUp = false;
    this.isDown = false;
    this.isIdle = true;
    this.shootDown = false;
    this.shootUp = false;
    this.shootLeft = false;
    this.shootRight = false;
  }

  handleKeyPress() {
    if (key === "w" || key === "W") {
      this.isUp = true;
      this.isIdle = false;
    }
    if (key === "a" || key === "A") {
      this.isLeft = true;
      this.isIdle = false;
    }
    if (key === "s" || key === "S") {
      this.isDown = true;
      this.isIdle = false;
    }
    if (key === "d" || key === "D") {
      this.isRight = true;
      this.isIdle = false;
    }
    if (key === "i" || key === "I") {
      someBullet = new Bullet(this.x, this.y, 0, -10, bulletImgUp);
      this.bulletArray.push(someBullet);
      this.shootUp = true;
      this.shootLeft = false;
      this.shootRight = false;
      this.shootDown = false;
      this.isIdle = false;
    }
    if (key === "j" || key === "J") {
      someBullet = new Bullet(this.x, this.y, -10, 0, bulletImgLeft);
      this.bulletArray.push(someBullet);
      this.shootUp = false;
      this.shootLeft = true;
      this.shootRight = false;
      this.shootDown = false;
      this.isIdle = false;
    }
    if (key === "k" || key === "K") {
      someBullet = new Bullet(this.x, this.y, 0, 10, bulletImgDown);
      this.bulletArray.push(someBullet);
      this.shootUp = false;
      this.shootLeft = false;
      this.shootRight = false;
      this.shootDown = true;
      this.isIdle = false;
    }
    if (key === "l" || key === "L") {
      someBullet = new Bullet(this.x, this.y, 10, 0, bulletImgRight);
      this.bulletArray.push(someBullet);
      this.shootUp = false;
      this.shootLeft = false;
      this.shootRight = true;
      this.shootDown = false;
      this.isIdle = false;
    }
  }

  handleKeyRelease() {
    if (key === "w" || key === "W") {
      this.isUp = false;
      this.isIdle = true;
    }
    if (key === "a" || key === "A") {
      this.isLeft = false;
      this.isIdle = true;
    }
    if (key === "s" || key === "S") {
      this.isDown = false;
      this.isIdle = true;
    }
    if (key === "d" || key === "D") {
      this.isRight = false;
      this.isIdle = true;
    }
  }
  update() {
    if (this.isRight) {
      this.x += this.dx;
    }
    if (this.isLeft) {
      this.x -= this.dx;
    }
    if (this.isUp) {
      this.y -= this.dy;
    }
    if (this.isDown) {
      this.y += this.dy;
    }
    if (this.x >= 592){
      this.x -= this.dx;
    }
    if (this.x <= 8){
      this.x += this.dx;
    }
    if (this.y >= 592){
      this.y -= this.dy;
    }
    if (this.y <= 8){
      this.y += this.dy;
    }
    //show bullets
    for (let i = this.bulletArray.length - 1; i >= 0; i--) {
      this.bulletArray[i].update();
      this.bulletArray[i].display();
      if (this.bulletArray[i].offScreen || this.bulletArray[i].enemyDetect) {
        this.bulletArray.splice(i, 1);
      }
    }

  }

  display() {
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, this.transparency);
    imageMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    if (this.isIdle) {
      image(this.idleImgDisplay, this.x, this.y);
    }
    if (this.isRight) {
      image(this.displayRightImg, this.x, this.y);
    }
    if (this.isLeft) {
      image(this.displayLeftImg, this.x, this.y);
    }
    if (this.isUp) {
      image(this.displayUpImg, this.x, this.y);
    }
    if (this.isDown) {
      image(this.displayDownImg, this.x, this.y);
    }
    if (this.shootUp){
      image(this.displayUpImg, this.x, this.y);
      this.shootUp = false;
      this.isIdle = true;
    }
    if (this.shootDown){
      image(this.displayDownImg, this.x, this.y);
      this.shootDown = false;
      this.isIdle = true;
    }
    if (this.shootLeft){
      image(this.displayLeftImg, this.x, this.y);
      this.shootLeft = false;
      this.isIdle = true;
    }
    if (this.shootRight){
      image(this.displayRightImg, this.x, this.y);
      this.shootRight = false;
      this.isIdle = true;
    }
  }
}
class Slime {
  constructor(x, y, slimeImage){
    this.x = x;
    this.y = y;
    this.transparency = 0;
    this.displayIdle = slimeImage;
    // this.displaySlimeUp = slimeImgUp;
    // this.displaySlimeLeft = slimeImgLeft;
    // this.displaySlimeRight = slimeImgRight;

    //Easy Ai
    this.glide = 0.01;
    this.w = this.displayIdle.width;
    this.h = this.displayIdle.height;
  }
  spawn(){
    this.x = 0;
    this.y = 300;
  }


  update(){
    let targetX = playerOne.x;
    let dx = targetX - this.x;
    this.x += dx * this.glide;


    let targetY = playerOne.y;
    let dy = targetY - this.y;
    this.y += dy * this.glide;



  }
  display(){
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, this.transparency);
    rect(this.x, this.y, this.w, this.h);
    imageMode(CENTER);
    image(this.displayIdle, this.x, this.y);
  }
}

let someBullet;
let bulletDetect;

let grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let cellSize;
let rows = 25;
let cols = 25;
let bulletImgRight, bulletImgLeft, bulletImgUp, bulletImgDown;
let grassImg;
let playerOne;
let playerUp, playerDown, playerLeft, playerRight;
let enemySlime;
let slimeUp, slimeDown, slimeLeft, slimeRight;
let lifes = 25;
let lifeHit = false;
let bulletHit = false;


function preload() {
  //Preloads Images for the game
  //Images for the grid
  grassImg = loadImage("assets/grass.png");
  //Images for Character and Enemy
  playerUp = loadImage("assets/charup.png");
  playerDown = loadImage("assets/charidle.png");
  playerLeft = loadImage("assets/charleft.png");
  playerRight = loadImage("assets/charright.png");

  slimeUp = loadImage("assets/enemyback.png");
  slimeDown = loadImage("assets/enemyidle_front.png");
  slimeLeft = loadImage("assets/enemyleft.png");
  slimeRight = loadImage("assets/enemyright.png");

  //Images for the Bullets
  bulletImgRight = loadImage("assets/bulletRight.png");
  bulletImgLeft = loadImage("assets/bulletLeft.png");
  bulletImgUp = loadImage("assets/bulletUp.png");
  bulletImgDown = loadImage("assets/bulletDown.png");


}

function setup() {
  createCanvas(600, 600);
  //downImg, upImg, leftImg, rightImg, down_idle_img
  enemySlime = new Slime(width / 2, height / 1.8, slimeDown);
  enemySlime.spawn();
  playerOne = new Player1(width / 2, height / 1.8, playerDown, playerUp, playerLeft, playerRight, playerDown);
  cellSize = 24;
}

function drawMap() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      if (grid[j][i] === 1) {
        image(grassImg, i * cellSize, j * cellSize, cellSize, cellSize);
      }
      else if (grid[j][i] === 2) {
        image(grassImg, i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
}

function draw() {
  imageMode(CORNER);
  drawMap();

  // Updates and Displays Player One Sprite
  if (lifes > 0) {
    playerOne.display();
    playerOne.update();
  }

  // Creates one Slime (this is a beta until the actual code for the random generation is created)
  enemySlime.display();
  enemySlime.update();

  // bulletHitDetection();
  hitDetection();
  //  Basic Detection where you get 3 lives and once at 0 console displays Game Over
  if (lifeHit) {
    if (lifes === 0){
      console.log("Game Over");

      lifes -= 1;
    }
  }
}

function hitDetection(){
  lifeHit = collideRectRect(playerOne.x, playerOne.y, playerOne.w, playerOne.h, enemySlime.x, enemySlime.y, enemySlime.w, enemySlime.h);
  // console.log(lifeHit);
  if (lifeHit) {
    lifes --;
  }
}

// function bulletHitDetection(){
//   bulletHit = collideRectRect(enemySlime.x, enemySlime.y, enemySlime.w, enemySlime.h, someBullet.x, someBullet.y, someBullet.radius, someBullet.radius);
//   console.log(bulletHit);
// }

function keyPressed() {
  playerOne.handleKeyPress();
}

function keyReleased() {
  playerOne.handleKeyRelease();
}
