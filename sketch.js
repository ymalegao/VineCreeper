let brickWall;
const totalStories = 10;
const storyHeight = 100; // Height of each story
let scrollOffset = 0;  
let maxScrollOffset;
let buildingGraphics;

function preload() {
  brickWall = loadImage('brick.jpg'); // Load the brick image
}

function setup() {
  createCanvas(600, 600); // Viewport size

  // Calculate maximum scroll offset
  maxScrollOffset = (storyHeight * totalStories) - height;

  // Prepare off-screen rendering
  buildingGraphics = createGraphics(width, storyHeight * totalStories);

  for (let i = 0; i < totalStories; i++) {
    // Draw the brick wall for each story
    buildingGraphics.image(brickWall, 0, i * storyHeight, width, height);
  }
}

function draw() {
  background(220);

  // Display the current scrollable section
  image(buildingGraphics, 0, 0, width, height, 0, scrollOffset, width, height);
}

function keyPressed() {
  const scrollSpeed = 130;

  if (keyCode === UP_ARROW) {
    scrollOffset = constrain(scrollOffset - scrollSpeed, 0, maxScrollOffset);
  } else if (keyCode === DOWN_ARROW) {
    scrollOffset = constrain(scrollOffset + scrollSpeed, 0, maxScrollOffset);
  }
}
