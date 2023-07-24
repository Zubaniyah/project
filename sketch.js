let characterImages = [];
let boxX, boxY;
let boxSize = 50;
let boxSpeed = 5;
let character = 1;
let showMenu = true;
let yVel = 0;
let gravity = 0.5;
let coins = [];
let obstacles = [];
let score = 0;
let maxCoins = 5;

function preload() {
  characterImages[1] = loadImage('images/gojira.png');
  characterImages[2] = loadImage('images/nudewarrior.png');
  characterImages[3] = loadImage('images/mrkrabs.png');
}

function setup() {
  createCanvas(800, 400);
  boxX = 40;
  boxY = height - boxSize;

  // Create random coins
  for (let i = 0; i < maxCoins; i++) {
    coins.push(createVector(random(width), random(100, height - 100)));
  }

  // Create random red circle obstacles
  for (let i = 0; i < 8; i++) {
    obstacles.push(createVector(random(width), random(100, height - 100)));
  }
}

function draw() {
  if (showMenu) {
    drawMenu();
  } else {
    background(220);
    moveBox();
    updateBox();
    showBox();
    showCoins();
    showObstacles();
    checkCollisions();
    showScore();
  }
}

function drawMenu() {
  background(0);
  fill(255);
  textSize(20);
  text("Choose a Character:", 120, 100);
  image(characterImages[1], 150, 150, boxSize, boxSize);
  text("Press 1 - Red", 200, 175);
  image(characterImages[2], 150, 200, boxSize, boxSize);
  text("Press 2 - Green", 200, 225);
  image(characterImages[3], 150, 250, boxSize, boxSize);
  text("Press 3 - Blue", 200, 275);
  text("Press 1, 2, or 3 to select", 100, 350);
}

function moveBox() {
  if (keyIsDown(LEFT_ARROW)) {
    boxX -= boxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    boxX += boxSpeed;
  }

  if (keyIsDown(UP_ARROW) && boxY + boxSize >= height) {
    yVel = -10;
  }

  yVel += gravity;
  boxY += yVel;
}

function updateBox() {
  boxX = constrain(boxX, boxSize / 2, width - boxSize / 2);
  boxY = constrain(boxY, boxSize / 2, height - boxSize);
}

function showBox() {
  image(characterImages[character], boxX, boxY, boxSize, boxSize);
}

function showCoins() {
  fill(255, 255, 0); // Yellow
  for (let i = 0; i < coins.length; i++) {
    ellipse(coins[i].x, coins[i].y, 20, 20);
  }
}

function showObstacles() {
  fill(255, 0, 0); // Red
  for (let i = 0; i < obstacles.length; i++) {
    ellipse(obstacles[i].x, obstacles[i].y, 30, 30);
  }
}

function checkCollisions() {
  // Check for collisions with coins
  for (let i = coins.length - 1; i >= 0; i--) {
    if (dist(boxX, boxY, coins[i].x, coins[i].y) < boxSize / 2 + 10) {
      coins.splice(i, 1);
      score += 10;
    }
  }

  // Check for collisions with obstacles (red circles)
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (dist(boxX, boxY, obstacles[i].x, obstacles[i].y) < boxSize / 2 + 15) {
      textSize(32);
      fill(255);
      text("Game Over!", width / 2 - 80, height / 2);
      noLoop();
    }
  }

  if (score >= maxCoins * 10) {
    textSize(32);
    fill(255);
    text("You Win!", width / 2 - 60, height / 2);
    noLoop();
  }
}

function showScore() {
  textSize(20);
  fill(255);
  text("Score: " + score, 20, 30);
}

function keyPressed() {
  if (showMenu) {
    if (key === '1' || key === '2' || key === '3') {
      character = int(key);
      showMenu = false;
    }
  }
}