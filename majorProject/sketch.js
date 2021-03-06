// 2D Shooter
// Areeb Khan
// 14/12/2018
//
// Source Code for Easy Ai https://gamedev.stackexchange.com/questions/50978/moving-a-sprite-towards-an-x-and-y-coordinate

// Class for the Bullet
class Bullet {
  constructor(x, y, dx, dy, theImage) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 7;
    this.offScreen = false;
    this.enemyDetect = false;
    this.imageToDisplay = theImage;
  }

  update() {
    // This Checks for Bullet detection used later in the code to splice and take away the slimes life
    this.x += this.dx;
    this.y += this.dy;
    bulletDetect = collideRectRect(this.x, this.y, this.radius, this.radius, enemySlime.x, enemySlime.y, enemySlime.w, enemySlime.h);
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
    if (keyCode === UP_ARROW) {
      someBullet = new Bullet(this.x, this.y, 0, -10, bulletImgUp);
      this.bulletArray.push(someBullet);
      this.shootUp = true;
      this.shootLeft = false;
      this.shootRight = false;
      this.shootDown = false;
      this.isIdle = false;
    }
    if (keyCode === LEFT_ARROW) {
      someBullet = new Bullet(this.x, this.y, -10, 0, bulletImgLeft);
      this.bulletArray.push(someBullet);
      this.shootUp = false;
      this.shootLeft = true;
      this.shootRight = false;
      this.shootDown = false;
      this.isIdle = false;
    }
    if (keyCode === DOWN_ARROW) {
      someBullet = new Bullet(this.x, this.y, 0, 10, bulletImgDown);
      this.bulletArray.push(someBullet);
      this.shootUp = false;
      this.shootLeft = false;
      this.shootRight = false;
      this.shootDown = true;
      this.isIdle = false;
    }
    if (keyCode === RIGHT_ARROW) {
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
    if (keyCode === RIGHT_ARROW) {
      this.shootRight = false;
      this.isIdle = true;
    }
    if (keyCode === UP_ARROW) {
      this.shootUp = false;
      this.isIdle = true;
    }
    if (keyCode === LEFT_ARROW) {
      this.shootLeft = false;
      this.isIdle = true;
    }
    if (keyCode === DOWN_ARROW) {
      this.shootDown = false;
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
    // Shows Bulelts and splices
    for (let i = this.bulletArray.length - 1; i >= 0; i--) {
      this.bulletArray[i].update();
      this.bulletArray[i].display();
      if (this.bulletArray[i].offScreen) {
        this.bulletArray.splice(i, 1);
      }
      else if (this.bulletArray[i].enemyDetect){
        this.bulletArray.splice(i, 1);
        slimeLifes --
        score ++
        console.log(score);
      }
    }
  }

  display() {
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, this.transparency);
    imageMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    if (this.shootUp){
      image(this.displayUpImg, this.x, this.y);
    }
    else if (this.shootDown){
      image(this.displayDownImg, this.x, this.y);
    }
    else if (this.shootLeft){
      image(this.displayLeftImg, this.x, this.y);
    }
    else if (this.shootRight){
      image(this.displayRightImg, this.x, this.y);
    }
    else if (this.isIdle) {
      image(this.idleImgDisplay, this.x, this.y);
    }
    else if (this.isLeft && this.isUp){
      image(this.displayLeftImg, this.x, this.y);
    }
    else if (this.isLeft && this.isDown){
      image(this.displayLeftImg, this.x, this.y);
    }
    else if (this.isDown && this.isLeft){
      image(this.displayLeftImg, this.x, this.y);
    }
    else if (this.isDown && this.isRight){
      image(this.displayRightImg, this.x, this.y);
    }
    else if (this.isRight) {
      image(this.displayRightImg, this.x, this.y);
    }
    else if (this.isLeft) {
      image(this.displayLeftImg, this.x, this.y);
    }
    else if (this.isUp) {
      image(this.displayUpImg, this.x, this.y);
    }
    else if (this.isDown) {
      image(this.displayDownImg, this.x, this.y);
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
    let choice = int(random(3));
    if (choice === 0) {
      this.x = random(600);
      this.y = 0;
    }
    if (choice === 1) {
      this.x = 0;
      this.y = random(600);
    }
    if (choice === 2) {
      this.x = 600;
      this.y = random(600);
    }
    if (choice === 3) {
      this.x = random(600);
      this.y = 600;
    }
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

let grid = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

// All the functions to run this code
let someBullet;
let bulletDetect;
let cellSize;
let rows = 25;
let cols = 25;
let bulletImgRight, bulletImgLeft, bulletImgUp, bulletImgDown;
let grassImg;
let playerOne;
let playerUp, playerDown, playerLeft, playerRight, deathScreenSetting, winScreen;
let enemySlime;
let slimeUp, slimeDown, slimeLeft, slimeRight, mainMenu, playImg, backImg, controlImg, controlSettings;
let lifes = 25;
let lifeHit = false;
let bulletHit = false;
let detectGameOver = false;
let slimeLifes = 30;
let state = "mainMenuScreen";
let score = 0;
let hoverPlay = false; // 2D Collide function that defaults the play button as false
let hoverControls = false; // 2D Collide function that defaults the Control button as false
let hoverBackControl = false; // 2D Collide function that defaults the BackControl button as false
// Couldn't add/ dont know how to add this would need help in the future
// let enemyAmount = 35;
// let slimeArray = [];


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

  //Images for Main Menu and Death Screen
  mainMenu = loadImage("assets/mainMenu.png");
  playImg = loadImage("assets/play.png");
  backImg = loadImage("assets/back.png");
  controlImg = loadImage("assets/controls.png");
  controlSettings = loadImage("assets/controlMenu.png");
  deathScreenSetting = loadImage("assets/blackscreen.png");
  winScreen = loadImage("assets/blackscreen.png");
}

function setup() {
  createCanvas(600, 600);
  //downImg, upImg, leftImg, rightImg, down_idle_img
  playerOne = new Player1(width / 2, height / 1.8, playerDown, playerUp, playerLeft, playerRight, playerDown);
  enemySlime = new Slime(width / 2, height / 1.8, slimeDown);
  enemySlime.spawn();
  cellSize = 24;
}

function drawMap() {
  if (state === "gameScreen"){
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
}

function draw() {
  imageMode(CORNER);
  drawMap();
  if (state === "mainMenuScreen"){
    image(mainMenu,0,0,600,600);
  }
  else if (state === "controlSettingScreen"){
    image(controlSettings,0,0,600,600);
  }
  else if (state === "deathScreen") {
    image(deathScreenSetting, 0, 0, 600, 600);
    if (key === "p" || key === "P") {
      window.location.reload(true);
    }
  }
  else if (state === "winnerScreen") {
    image(winScreen, 0, 0, 600, 600);
    if (key === "p" || key === "P") {
      window.location.reload(true);
    }
  }
  else if (state === "gameScreen"){
    // Updates and Displays Player One Sprite
    if (lifes >= 0) {
      playerOne.display();
      playerOne.update();
    }
    else {
      state = "deathScreen";
    }

    // Creates one Slime (this is a beta until the actual code for the random generation is created)
    if (slimeLifes >= 0){
      enemySlime.display();
      enemySlime.update();
    }
    else {
      state = "winnerScreen";
    }

    hitDetection();

    //  Basic Detection where you get 3 lives and once at 0 console displays Game Over
    if (lifeHit) {
      if (lifes === 0){
        detectGameOver = true;
        console.log("Game Over");
      }
      lifes -= 1;
    }
  }
  menuScreen();
  hoverPlay = collidePointRect(mouseX, mouseY,200, 200, 200, 75); // Sets region to click on the 2D collide Function
  hoverControls = collidePointRect(mouseX, mouseY, 200, 300, 200, 75); // Sets region to click on the 2D collide Function
  hoverBackControl = collidePointRect(mouseX, mouseY, 20, 500, 60,60); // Sets region to click on the 2D collide Function
}

function hitDetection(){
  lifeHit = collideRectRect(playerOne.x, playerOne.y, playerOne.w, playerOne.h, enemySlime.x, enemySlime.y, enemySlime.w, enemySlime.h);
}

function keyPressed() {
  playerOne.handleKeyPress();
}

function keyReleased() {
  playerOne.handleKeyRelease();
}

function menuScreen() {
  if (state === "mainMenuScreen") {
    push(); // Creating rectangles that are linked to 2d Collide functions
    let fillStart = controlStart();
    fill(fillStart);
    rect(200, 200, 200, 75);
    image(playImg, 200, 200, 200, 75); // Image Files that displays what button does
    pop();

    push(); // Creating rectangles that are linked to 2d Collide functions
    let fillControl = controlFill();
    fill(fillControl);
    rect(200, 300, 200, 75);
    image(controlImg, 200, 300, 200, 75); // Image Files that displays what button does
    pop();
  }

  else if (state === "controlSettingScreen") {
    push(); // Creating rectangles that are linked to 2d Collide functions
    let fillBack = backFill();
    fill(fillBack);
    rect(20, 500, 60, 60);
    image(backImg, 20, 500, 60,60); // Image Files that displays what button does
    pop();
  }
}

function controlStart() {
  if (state === "mainMenuScreen"){
    if(hoverPlay){ // This means if mouse x and y are in the certian cordinates then it will return triggering the if staement
      fillStart = color(255);
    }
    else{
      fillStart = color(194, 239, 255);
    }
    return fillStart;
  }
}

function backFill() {
  let fillBack;
  if (state === "controlSettingScreen"){
    if(hoverBackControl){ // This means if mouse x and y are in the certian cordinates then it will return triggering the if staement
      fillBack = color(255);
    }
    else{
      fillBack = color(194, 239, 255);
    }
    return fillBack;
  }
}

function controlFill() {
  // let fillControl;
  if (state === "mainMenuScreen"){
    if(hoverControls){ // This means if mouse x and y are in the certian cordinates then it will return triggering the if staement
      fillControl = color(255);
    }
    else{
      fillControl = color(194, 239, 255);
    }
    return fillControl;
  }
}

function mousePressed() {
  if (state === "mainMenuScreen"){
    if (hoverPlay) {
      state = "gameScreen";
    }
    else if (hoverControls) {
      state = "controlSettingScreen";
    }
  }
  else if (state === "controlSettingScreen") {
    if (hoverBackControl){
      state = "mainMenuScreen";
    }
  }
}
