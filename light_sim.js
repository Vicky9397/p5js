/* let img;
let maskGraphics;

function preload() {
  img = loadImage('image.jpg'); // Load your image
}

function setup() {
  createCanvas(800, 600);
  maskGraphics = createGraphics(width, height);
}

function draw() {
  background(0);

  // Clear the mask graphics
maskGraphics.clear();

// Draw a transparent black rectangle over the entire canvas
maskGraphics.fill(0, 250);
maskGraphics.rect(0, 0, width, height);

maskGraphics.erase();
let a= 255;
let r = 10;
for(let i= 0; i<10; i++)
{
	maskGraphics.fill(0, 0, 0, a);
	maskGraphics.ellipse(mouseX, mouseY, r, r);
	maskGraphics.filter(BLUR, 1);
	a= a-20;
	r= r+10;
}
maskGraphics.noErase();
// Draw the image
image(img, 0, 0, width, height);

// Apply the mask
image(maskGraphics, 0, 0);
}

function mouseMoved() {
  redraw();
}
 */
 
 let playerX = 400;
let playerY = 300;
let lightRadius = 200;
let backgroundImage;

function preload() {
  backgroundImage = loadImage('image.jpg'); // Load your background image
}

function setup() {
  createCanvas(800, 600);
  backgroundImage.loadPixels(); // Load the pixels of the background image for manipulation
}

function draw() {
  background(0);

  // Draw background elements (terrain, background objects, etc.)
  image(backgroundImage, 0, 0, width, height);

  // Apply lighting effect
  applyLighting();
}

function applyLighting() {
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let distance = dist(x, y, playerX, playerY);
      let alpha = map(distance, 0, lightRadius, 255, 0);
      alpha = constrain(alpha, 0, 255);

      pixels[index] = backgroundImage.pixels[index];
      pixels[index + 1] = backgroundImage.pixels[index + 1];
      pixels[index + 2] = backgroundImage.pixels[index + 2];
      pixels[index + 3] = alpha;
    }
  }

  updatePixels();
}

function mouseMoved() {
  playerX = mouseX;
  playerY = mouseY;
  redraw();
}

