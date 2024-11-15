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
  segments: [], // Array to store vine segments
  angle: -Math.PI / 2, // Initial angle facing up

  growthRate: 1, // Growth rate of the vine
  segmentLength: 2 // Length of each vine segment
};

function preload() {
  brickWall = loadImage('brick.jpg'); // Load the brick image
  vineImage = loadImage('vines.png'); // Load your vine image

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
    // Display the entire building, ignoring scrollOffset
    image(buildingGraphics, 0, 0, width, height, 0, 0, width, storyHeight * totalStories);
  } else {
    // Update scrollOffset to follow the vine
    scrollOffset = constrain(vine.segments[vine.segments.length - 1].y - height / 2, 0, maxScrollOffset);

    // Display the current scrollable section
    image(buildingGraphics, 0, 0, width, height, 0, scrollOffset, width, height);
  }

  drawVine();
}

// function draw() {
//   background(220);

//   if (viewAll) {
//     // Display the entire building
//     image(buildingGraphics, 0, 0, width, height, 0, 0, width, storyHeight * totalStories);
//   } else {
//     // Display the current scrollable section
//     image(buildingGraphics, 0, 0, width, height, 0, scrollOffset, width, height);
//   }

//   drawVine();
// }

function keyPressed() {
  const scrollSpeed = 10;

  if (keyCode === UP_ARROW) {
    scrollOffset = constrain(scrollOffset - scrollSpeed, 0, maxScrollOffset);
  } else if (keyCode === DOWN_ARROW) {
    scrollOffset = constrain(scrollOffset + scrollSpeed, 0, maxScrollOffset);
  } else if (keyCode === LEFT_ARROW) {
    vine.angle -= PI / 10; // Turn the vine to the left
  } else if (keyCode === RIGHT_ARROW) {
    vine.angle += PI / 10; // Turn the vine to the right
  } else if (key === 'z' || key === 'Z') {
    viewAll = !viewAll; // Toggle the viewAll variable
  }
}

function initializeVine() {
  vine.length = 0;
  vine.segments = [{ x: vine.x, y: vine.y, angle: vine.angle }];
}


function drawVine() {

  // Draw each segment of the vine
  const vineWidth = 40;  // Set the desired width for the vine segment
  const vineHeight = 40; // Set the desired height for the vine segment

  for (let i = 0; i < vine.segments.length -1 ; i++) { // Loop through all segments
    let segment = vine.segments[i];

    push();
    translate(segment.x, segment.y - scrollOffset); // Adjust for scrolling
    rotate(segment.angle + Math.PI / 2); // Adjust rotation so vine image aligns with angle
    image(vineImage, -vineWidth / 2, -vineHeight / 2, vineWidth, vineHeight); // Center and resize the image
    pop();

  }

  // Grow the vine
  if (vine.segments[vine.segments.length - 1].y > 0) { // Stop when the vine reaches the top
    vine.length += vine.growthRate;
    
    let lastSegment = vine.segments[vine.segments.length - 1];
    let newX = lastSegment.x + vine.segmentLength * cos(vine.angle);
    let newY = lastSegment.y + vine.segmentLength * sin(vine.angle);

   // let newAngle = vine.angle + random(-PI / 10, PI / 10); Another look

    vine.segments.push({ x: newX, y: newY, angle: vine.angle });

    // Scroll the viewport up if needed
    if (newY < scrollOffset + height / 2) {
      scrollOffset = constrain(scrollOffset - vine.growthRate, 0, maxScrollOffset);
    }
  }
}