let brickWall;
let vineSegments = [];
let growthRate = 2;
let yOffset = 0;
let viewArtMode = false;

function preload() {
  brickWall = loadImage('brick.jpg'); // Ensure 'brick.jpg' is in your project files
}

function setup() {
  createCanvas(600, 600);
  vineSegments.push({ x: width / 2, y: height });
}

function draw() {
  background(220);

  if (!viewArtMode) {
    // Decrease yOffset to simulate upward movement
    yOffset -= growthRate;

    push();
    translate(0, yOffset);
    drawBrickWall();
    drawVine();
    pop();

    growVine();
  } else {
    // View Art Mode: Show the entire vine and background
    let minY = vineSegments[vineSegments.length - 1].y;
    let maxY = vineSegments[0].y;
    let vineHeight = maxY - minY;
    let scaleFactor = height / vineHeight;

    push();
    scale(1, scaleFactor);
    translate(0, -minY);
    drawBrickWallForViewArt(minY, maxY);
    drawVine();
    pop();
  }
}

function drawBrickWall() {
  // Draw the brick wall background for the normal view
  let y1 = -(yOffset % brickWall.height);
  image(brickWall, 0, y1, width, brickWall.height);
  image(brickWall, 0, y1 + brickWall.height, width, brickWall.height);
}

function drawBrickWallForViewArt(minY, maxY) {
  // Draw the brick wall background for the entire vine
  let brickHeight = brickWall.height;
  let startY = Math.floor(minY / brickHeight) * brickHeight;
  let endY = Math.ceil(maxY / brickHeight) * brickHeight;

  for (let y = startY; y <= endY; y += brickHeight) {
    image(brickWall, 0, y, width, brickHeight);
  }
}

function drawVine() {
  stroke(34, 139, 34);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let segment of vineSegments) {
    vertex(segment.x, segment.y);
  }
  endShape();
}

function growVine() {
  let lastSegment = vineSegments[vineSegments.length - 1];
  let newX = lastSegment.x;
  let newY = lastSegment.y - growthRate;

  if (mouseIsPressed) {
    // Adjust mouseY with yOffset to get the correct angle
    let adjustedMouseY = mouseY + yOffset;
    let angle = atan2(adjustedMouseY - lastSegment.y, mouseX - lastSegment.x);
    let maxAngleChange = PI / 6; // Limit the angle change
    angle = constrain(angle, -maxAngleChange, maxAngleChange);
    newX += sin(angle) * growthRate;
  }

  vineSegments.push({ x: newX, y: newY });
}

function keyPressed() {
  if (key === 'z' || key === 'Z') {
    viewArtMode = !viewArtMode;
  }
}

function windowResized() {
  // Keep the canvas size fixed at 600x600
  resizeCanvas(600, 600);
}
