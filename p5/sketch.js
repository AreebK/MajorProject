// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let startingPoints = [{x: 500, y: 100}, {x: 100, y: 800}, {x: 900, y: 800}];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  slerpinski(startingPoints);
  let testPoint = midPoint(startingPoints[0])
}

function  slerpinski(points){
  fill("black");
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
}

function midPoint(point1, point2) {
  let x = (point1.x + point2.y)/2;
  let y = (point1.y + point2.y)/2;
  return {x: x, y: y};
}
