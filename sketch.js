// ball
let xPos, xDir; // 공의 x축 위치와 진행 방향
let yPos, yDir; // 공의 y축 위치와 진행 방향
let diam;
let speed; // 공의 속도
let score = 0;
let level = 1;

// pad
let padX;
let padWidth; 
// bricks
let bricks1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let bricks2 = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
];
let bricks3 = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
];
let gameState = "PLAY";
let bgm;
let hitSound;

function setup() {
  createCanvas(600, 600);
  variableInitialization();
  bgm.setLoop(true);
  bgm.setVolume(0.3);
  bgm.play();
}


function draw() {
  if (gameState === "PLAY") {
  background(30,30,50);
  if (level%3 === 1) bricksDrawing1();
  else if (level%3 === 2) bricksDrawing2();
  else if (level%3 === 0) bricksDrawing3();
  drawScore();
  ballDrawingMovement();
  padDrawingMovement();
  ballBouncing();
  bricksBallCollision();
  }
  else if (gameState === "GAMEOVER") {
    drawGameOver();
  }
}

function mousePressed() {
    if (gameState === "GAMEOVER") {
        resetGame();
        loop();
    }
}
function resetGame() {
  score = 0;
  level = 1;
  gameState = "PLAY";
  bgm.play();
  bricks1 = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
  ];
  bricks2 = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
];
  bricks3 = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
];

  variableInitialization();
}


function drawScore() {
    fill(255);
    textSize(20);
    text("Score : " + score, 20, 25);
    text("Level : " + level, width - 120, 25);
}

function bricksDrawing1(){
 
  stroke(0);
  let is_empty = 0; 
  for(let r = 0; r < 2; r++){
    for(let c = 0; c < bricks1[r].length; c++){
      if ( bricks1[r][c] === 1) {
        fill(100 + r*50, 150 + c*5, 180);
        rect(c*50, r*50, 50, 50);
        is_empty++; 
      }
    }
  }
  if (is_empty == 0) {
    level++;
    variableInitialization();
  }
}

function bricksDrawing2() {  
  stroke(0);
  let is_empty = 0; 
  for(let r = 0; r < 3; r++){
    for(let c = 0; c < bricks2[r].length; c += 2){
      if ( bricks2[r][c] === 1) {
        fill(50 + r*50, 100 + c*5, 130);
        rect(c*50, r*50, 50, 50);
        is_empty++; 
      }
    }
  }
  if (is_empty == 0) {
    level++;
    variableInitialization();
  }
}

function bricksDrawing3(){
  stroke(0);
  let is_empty = 0; 
    for(let c = 0; c < bricks3[0].length; c += 2){
      if ( bricks3[0][c] === 1) {
        fill(150 + 0*50, 200 + c*5, 230);
        rect(c*50, 0*50, 50, 50);
        is_empty++; 
      }
    }
    for(let c = 1; c < bricks3[1].length; c += 2){
      if ( bricks3[1][c] === 1) {
        fill(150 + 1*50, 200 + c*5, 230);
        rect(c*50, 1*50, 50, 50);
        is_empty++; 
      }
    }
    for(let c = 0; c < bricks3[2].length; c += 2){
      if ( bricks3[2][c] === 1) {
        fill(150 + 2*50, 200 + c*5, 230);
        rect(c*50, 2*50, 50, 50);
        is_empty++; 
      }
    }
  if (is_empty == 0) {
    level++;
    variableInitialization();
  }
}



function bricksBallCollision(){
  // when the ball hits the bricks
  let row = int(yPos/50);
  let col = int(xPos/50);
  if (level%3 === 1) {
  if ( yPos < 50 * bricks1.length && bricks1[row][col] === 1) {
    yDir *= -1;
    bricks1[row][col] = 0;
    hitSound.play();
    score++;
  }
}
  else if (level%3 === 2) {
  if ( yPos < 50 * 3 && bricks2[row][col] === 1) {
    yDir *= -1;
    bricks2[row][col] = 0;
    hitSound.play();
    score++;
  }
}
  else if (level%3 === 0) {
  if ( yPos < 50 * bricks3.length && bricks3[row][col] === 1) {
    yDir *= -1;
    bricks3[row][col] = 0;
    hitSound.play();
    score++;
  }
}
}


function variableInitialization(){
  speed = level*0.5 + 9;
  xPos = width / 2; // 공을 화면의 중심에서 출발
  xDir = speed;
  yPos = height / 2;
  yDir = speed;
  diam = 50;
  padWidth = 200;
}

function ballDrawingMovement(){
  fill(255, 255, 0);
  ellipse(xPos, yPos, diam, diam);
  xPos = xPos + xDir;
  yPos = yPos + yDir;
}

function padDrawingMovement(){
  padX = mouseX - padWidth/2;
  fill(0, 210, 180);
  rect(padX, height-30, padWidth, 30);
}

function ballBouncing(){
  if ( xPos - diam/2 < 0) xDir = xDir * -1; 
  if ( xPos + diam/2 > width) xDir *=  -1;

  if ( yPos - diam/2 < 0) yDir *= -1; 
  if ( yPos + diam/2 > height) {
    gameState = "GAMEOVER";
    bgm.stop();
  }


  // ball bouncing with pad
  if ( xPos > padX && xPos < padX + padWidth && yPos > height - 30 - diam/2){
    yDir *= -1;
  }
}

function drawGameOver() {
    background(0,150);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text("GAME OVER", width/2, height/2 - 30);
    textSize(20);
    text("Score : " + score, width / 2, height / 2 + 20);
    text("Click to Restart", width / 2, height /2 + 60);
}

function preload() {
  bgm = loadSound("sounds/bgm.mp3");
  hitSound = loadSound("sounds/hit.mp3");
}




