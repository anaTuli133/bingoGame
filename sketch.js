let dino;
let obstacles = [];
let birds = [];
let clouds = [];
let stars = [];
let scenery = []; 
let score = 0;
let highScore = 0;
let gameOver = false;
let newHighScoreAchieved = false;
let level = 1; 
const groundHeight = 40;
let obstacleSpacing = 110;
let lastClickTime = 0;
let gameSpeed = 7; 


let jumpSound, hitSound, highscoreSound, birdSound;

function preload() {
  soundFormats('wav', 'mp3');
  jumpSound = loadSound('image/jump.wav');
  hitSound = loadSound('image/hit.wav');
  highscoreSound = loadSound('image/highscore.wav');
  birdSound = loadSound('image/bird.wav');  
}

function setup() {
  createCanvas(800, 400);
  dino = new Dino();
  
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height / 1.5),
      size: random(1, 3),
      brightness: random(150, 255)
    });
  }

  for (let i = 0; i < 10; i++) {
    scenery.push(new BackgroundElement(random(width)));
  }
}

function draw() {
  drawLayeredBackground();
  
  for (let element of scenery) {
    element.update();
    element.show();
  }

  drawGround();

  if (!gameOver) {
    score++;
    gameSpeed = 7 + floor(score / 10000); 

    if (score > highScore) {
      if (!newHighScoreAchieved && highScore > 0) {
        highscoreSound.play();
      }
      highScore = score;
      newHighScoreAchieved = true; 
    }
    handleGameElements();
  }

  dino.update();
  dino.show();
  displayUI();

  if (gameOver) {
    showGameOverScreen();
    noLoop();
  }
}

function drawLayeredBackground() {
  if (level === 1) {
    for (let i = 0; i < height; i++) {
      let inter = map(i, 0, height, 0, 1);
      let c = lerpColor(color(173, 216, 230), color(255), inter);
      stroke(c);
      line(0, i, width, i);
    }
  } else {
    for (let i = 0; i < height; i++) {
      let inter = map(i, 0, height, 0, 1);
      let c = lerpColor(color(10, 20, 50), color(40, 60, 100), inter);
      stroke(c);
      line(0, i, width, i);
    }
    drawStarsAndMoon();
  }
}

function drawStarsAndMoon() {
  let moonX = width - 80;
  let moonY = 80;
  noStroke();
  fill(255, 255, 220, 230);
  ellipse(moonX, moonY, 70, 70); 
  fill(200, 200, 180, 100);
  ellipse(moonX - 15, moonY - 10, 12, 12);
  for (let s of stars) {
    fill(255, random(150, 255));
    ellipse(s.x, s.y, s.size);
  }
}

function drawGround() {
  noStroke();
  fill(101, 67, 33);
  rect(0, height - groundHeight, width, groundHeight);
  stroke(255, 30);
  line(0, height - groundHeight, width, height - groundHeight);
}

function handleGameElements() {
  let currentSpacing = max(60, obstacleSpacing - floor(score / 5000) * 5);
  
  if (frameCount % currentSpacing === 0) {
    if (level === 1) {
      if (random(1) < 0.6) obstacles.push(new Obstacle());
      else birds.push(new Bird()); 

    } else {
      obstacles.push(new Obstacle());
    }
  }
  if (level === 1 && frameCount % 100 === 0) clouds.push(new Cloud());

  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].update(); clouds[i].show();
    if (clouds[i].offscreen()) clouds.splice(i, 1);
  }


  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update(); obstacles[i].show();
    if (dino.hits(obstacles[i])) {
      gameOver = true;
      hitSound.play(); 
    }
    if (obstacles[i].offscreen()) obstacles.splice(i, 1);
  }

  for (let i = birds.length - 1; i >= 0; i--) {
    birds[i].update(); birds[i].show();
    if (dino.hits(birds[i])) {
      gameOver = true;
      birdSound.play(); 
    }
    if (birds[i].offscreen()) birds.splice(i, 1);
  }
}

class Dino {
  constructor() {
    this.w = 65; this.h = 65;
    this.x = 60; this.y = height - groundHeight - this.h;
    this.gravity = 1.2; this.lift = -18; this.velocity = 0;
    this.legAngle = 0;
  }
  jump() { 
    if (this.y === height - groundHeight - this.h) {
      this.velocity = this.lift;
      jumpSound.play(); 
    }
  }
  highJump() { 
    if (this.y === height - groundHeight - this.h) {
      this.velocity = this.lift - 7;
      jumpSound.play(); 
    }
  }
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height - groundHeight - this.h);
    if (this.y === height - groundHeight - this.h) this.legAngle += 0.25;
    else this.legAngle = 0;
  }
  show() {
    push();
    translate(this.x, this.y);
    noStroke(); 
    fill(50, 180, 80); 
    rect(5, 15, 50, 40, 10); 
    rect(35, 0, 35, 25, 8); 
    beginShape(); vertex(5, 25); vertex(-10, 50); vertex(10, 50); endShape(CLOSE);
    fill(255); rect(55, 5, 8, 8);
    fill(0); rect(59, 7, 4, 4);
    fill(40, 150, 70); rect(50, 25, 12, 6, 2);
    stroke(0); strokeWeight(4); 
    let lY = sin(this.legAngle) * 10;
    line(25, 55, 25, 62 + lY); line(25, 62 + lY, 32, 62 + lY); 
    let rY = sin(this.legAngle + PI) * 10;
    line(45, 55, 45, 62 + rY); line(45, 62 + rY, 52, 62 + rY); 
    pop();
  }
  hits(obs) {
    return (this.x + 15 < obs.x + obs.w && this.x + this.w - 15 > obs.x &&
            this.y + 10 < obs.y + obs.h && this.y + this.h > obs.y);
  }
}

class Bird {
  constructor() {
    this.x = width; this.y = random(120, 220);
    this.w = 55; this.h = 22;
    this.birdColor = color(random(100, 255), random(100, 255), random(100, 255));
    this.wingAngle = 0;
  }
  update() { this.x -= (gameSpeed + 1); this.wingAngle += 0.4; } 
  show() {
    push();
    translate(this.x, this.y);
    stroke(0); 
    strokeWeight(2);
    fill(this.birdColor);
    ellipse(0, 0, this.w, this.h);
    ellipse(-this.w / 2.5, -4, 20, 18);
    fill(255, 165, 0);
    triangle(-this.w / 2 - 2, -6, -this.w / 2 - 12, -2, -this.w / 2 - 2, 2);
    fill(this.birdColor);
    let wY = sin(this.wingAngle) * 18;
    triangle(-10, -5, 10, -5, 0, -25 + wY);
    fill(0); noStroke();
    ellipse(-this.w / 2.5 - 4, -6, 3, 3);
    pop();
  }
  offscreen() { return this.x < -100; }
}

class BackgroundElement {
  constructor(x) {
    this.x = x; this.type = random(['tree', 'hill']);
    this.h = random(40, 80); this.w = random(30, 60); this.speed = 2;
  }
  update() {
    this.x -= (gameSpeed * 0.3); 
    if (this.x < -100) this.x = width + 50;
  }
  show() {
    push();
    translate(this.x, height - groundHeight);
    noStroke();
    fill(level === 1 ? color(80, 120, 80, 120) : color(30, 50, 30, 150));
    if (this.type === 'tree') {
      rect(-5, -this.h, 10, this.h); ellipse(0, -this.h, this.w, this.w);
    } else {
      arc(0, 0, this.w * 2, this.h * 2, PI, TWO_PI);
    }
    pop();
  }
}

class Obstacle {
  constructor() {
    this.w = 25; this.h = random(45, 75);
    this.x = width; this.y = height - groundHeight - this.h;
    this.obsColor = color(random(50, 255), random(50, 255), random(50, 255));
  }
  update() { this.x -= gameSpeed; } 
  show() {
    stroke(0); strokeWeight(2);
    fill(this.obsColor); 
    rect(this.x, this.y, this.w, this.h, 4);
  }
  offscreen() { return this.x < -30; }
}

class Cloud {
  constructor() {
    this.x = width + 50; this.y = random(40, 140);
    this.w = random(60, 90); this.speed = random(0.8, 1.8);
  }
  update() { this.x -= this.speed; }
  show() {
    noStroke(); fill(255, 230);
    ellipse(this.x, this.y, this.w, 35);
    ellipse(this.x + 25, this.y + 5, this.w * 0.8, 30);
    ellipse(this.x - 20, this.y + 5, this.w * 0.7, 25);
    ellipse(this.x + 10, this.y - 12, this.w * 0.6, 25);
  }
  offscreen() { return this.x < -100; }
}

function displayUI() {
  push();
  textAlign(LEFT); 
  textSize(22); 
  textFont('Courier New'); 
  textStyle(BOLD);
  
  if (score >= highScore && score > 0) {
    fill(255, 215, 0); 
    stroke(0);          
    strokeWeight(2);   
  } else {
    noStroke();
    fill(level === 1 ? 40 : 255);
  }
  
  text('YOUR SCORE: ' + floor(score / 10), 30, 45);
  
  noStroke();
  fill(level === 1 ? 80 : 200);
  text('HIGH SCORE: ' + floor(highScore / 10), 30, 75);
  pop();
}

function showGameOverScreen() {
  fill(0, 180); 
  rect(0, 0, width, height);
  
  textAlign(CENTER); 
  textFont('Courier New'); 
  textStyle(BOLD);
  
  if (newHighScoreAchieved) {
    stroke(0);
    strokeWeight(3);
    fill(255, 215, 0); 
    textSize(35); 
    text('CONGRATULATIONS!', width / 2, height / 2 - 60);
    textSize(45);
    text('NEW HIGH SCORE!', width / 2, height / 2 - 10);
  } else {
    noStroke();
    fill(255);
    textSize(40);
    text('G A M E  O V E R', width / 2, height / 2 - 15);
  }
  
  noStroke();
  fill(255); 
  textSize(22);
  text('Final Score: ' + floor(score / 10), width / 2, height / 2 + 40);
  textSize(18); 
  text('Press R to Restart', width / 2, height / 2 + 80);
}

function keyPressed() {
  if (key === ' ' && !gameOver) dino.jump();
  if (key === 'r' || key === 'R') resetGame();
}

function mouseClicked() {
  if (gameOver) resetGame();
  else {
    let now = millis();
    if (now - lastClickTime < 250) dino.highJump();
    else dino.jump();
    lastClickTime = now;
  }
}

function resetGame() {
  score = 0; 
  obstacles = []; 
  birds = []; 
  clouds = [];
  gameOver = false;
  newHighScoreAchieved = false;
  level = (level === 1) ? 2 : 1;
  gameSpeed = 7; 
  dino = new Dino();
  loop();
}