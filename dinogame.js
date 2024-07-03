let dino;
let obstacles = [];
let gameSpeed = 6;
let score = 0;
let noiseOffset = 0; // Noise offset for generating random distances

function setup() {
  createCanvas(800, 200);
  dino = new Dino();
  obstacles.push(new Obstacle());
}

function draw() {
  background(220);

  // Display and update score
  textSize(32);
  fill(0);
  text('Score: ' + score, 10, 30);
  score++;

  dino.update();
  dino.show();

  // Use noise to determine when to add a new obstacle
  noiseOffset += 0.01;
  let noiseValue = noise(noiseOffset);
  if (frameCount % floor(map(noiseValue, 0, 1, 50, 100)) == 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (obstacles[i].hits(dino)) {
      console.log("GAME OVER");
      noLoop();
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    dino.jump();
  }
}

class Dino {
  constructor() {
    this.r = 50;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 2;
  }

  jump() {
    if (this.y == height - this.r) {
      this.vy = -25;
    }
  }

  hits(obstacle) {
    return (this.x < obstacle.x + obstacle.r &&
      this.x + this.r > obstacle.x &&
      this.y < obstacle.y + obstacle.r &&
      this.y + this.r > obstacle.y);
  }

  update() {
    this.y += this.vy;
    this.vy += this.gravity;

    if (this.y > height - this.r) {
      this.y = height - this.r;
      this.vy = 0;
    }
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.r, this.r);
  }
}

class Obstacle {
  constructor() {
    this.r = 20;
    this.x = width;
    this.y = height - this.r;
  }

  update() {
    this.x -= gameSpeed;
  }

  offscreen() {
    return this.x < -this.r;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.r, this.r);
  }

  hits(dino) {
    return (dino.x < this.x + this.r &&
      dino.x + dino.r > this.x &&
      dino.y < this.y + this.r &&
      dino.y + dino.r > this.y);
  }
}
