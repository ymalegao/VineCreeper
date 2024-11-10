let brickWall;
const totalStories = 20;
const storyHeight = 100; // Height of each story
let scrollOffset = 0;  
let maxScrollOffset;
let buildingGraphics;
let viewAll = false; // Variable to track if we want to view the entire building

let vine = {
  x: 300, // Starting x position
  y: storyHeight * totalStories, // Starting y position (bottom of the building)
  length: 0, // Initial length of the vine
  segments: [] // Array to store vine segments
};

function preload() {
  brickWall = loadImage('brick.jpg'); // Load the brick image
}

function setup() {
  createCanvas(600, 600); // Viewport size

  // Calculate maximum scroll offset
  maxScrollOffset = (storyHeight * totalStories) - height;
  scrollOffset = maxScrollOffset; // Start at the bottom of the building

  // Prepare off-screen rendering
  buildingGraphics = createGraphics(width, storyHeight * totalStories);

  for (let i = 0; i < totalStories; i++) {
    // Draw the brick wall for each story
    buildingGraphics.image(brickWall, 0, i * storyHeight, width, height);
  }

  initializeVine();
}

function draw() {
  background(220);

  if (viewAll) {
    // Display the entire building
    image(buildingGraphics, 0, 0, width, height, 0, 0, width, storyHeight * totalStories);
  } else {
    // Display the current scrollable section
    image(buildingGraphics, 0, 0, width, height, 0, scrollOffset, width, height);
  }

  drawVine();
}

function keyPressed() {
  const scrollSpeed = 10;

  if (keyCode === UP_ARROW) {
    scrollOffset = constrain(scrollOffset - scrollSpeed, 0, maxScrollOffset);
  } else if (keyCode === DOWN_ARROW) {
    scrollOffset = constrain(scrollOffset + scrollSpeed, 0, maxScrollOffset);
  } else if (key === 'z' || key === 'Z') {
    viewAll = !viewAll; // Toggle the viewAll variable
  }
}

function initializeVine() {
  vine.length = 0;
  vine.segments = [{ x: vine.x, y: vine.y }];
}

function drawVine() {
  buildingGraphics.stroke(0, 255, 0); // Green color for the vine
  buildingGraphics.strokeWeight(4);

  // Draw each segment of the vine
  for (let i = 0; i < vine.segments.length - 1; i++) {
    let segment = vine.segments[i];
    let nextSegment = vine.segments[i + 1];
    buildingGraphics.line(segment.x, segment.y, nextSegment.x, nextSegment.y);
  }

  // Grow the vine
  if (vine.length < storyHeight * totalStories) {
    vine.length += 1; // Slow down the growth of the vine
    let lastSegment = vine.segments[vine.segments.length - 1];
    vine.segments.push({ x: lastSegment.x, y: lastSegment.y - 1 });

    // Scroll up or move with the vine
    if (lastSegment.y - 1 < scrollOffset + height / 2) {
      scrollOffset = constrain(scrollOffset - 1, 0, maxScrollOffset);
    }
  }
}