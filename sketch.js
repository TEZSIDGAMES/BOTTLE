var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bottle, bottleI;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var corona, coronaI;

var score = 0;

var gameOver, restart;

var jump;

var tr;

localStorage["Highest.Score"] = 0;

function preload() {

  groundImage = loadImage("ground.webp");
  bottleI = loadImage("groundnut__1__1_-removebg-preview.png");
  cloudImage = loadImage("cloud.png");
  coronaI = loadImage("covid-removebg-preview-removebg-preview.png");
  restartImg = loadImage("restart.png");
  jump = loadSound("jump.mp3");
}
  
function setup() {
  createCanvas(1100,1800);

  bottle = createSprite(95, 620, 20, 50);
  bottle.addImage(bottleI);
  bottle.scale = 0.8;
  
  ig = createSprite(200,1330,1000,15);
  ig.visible = false;
  
  tr = createSprite(30,480,900,5);
  tr.visible = false;

  ground = createSprite(1000, 2110, 400, 20);
  ground.scale = 3.3;
  ground.addImage("groundImage",groundImage);
  ground.x = ground.width / 2;

  restart = createSprite(400,630);
  restart.scale = 1.9;
  restart.addImage(restartImg);

  bottle.depth = ground.depth;
  bottle.depth = bottle.depth+1;

  restart.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {

  spawnObstacles();
  bottle.setCollider("rectangle",1,1,180,590);
  background("225");
  textSize(50);
  fill("red");
  stroke("black");
  text("Score: " + score,650,100);
  
  bottle.collide(tr);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") &&  bottle.y > 1082 ||touches.length > 0) {
      bottle.velocityY = -28;
      jump.play();
      touches = [];
    }

       
    score = score + Math.round(1/2);
    
    bottle.velocityY = bottle.velocityY + 1.6;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    bottle.collide(ig);
    
    if (obstaclesGroup.isTouching(bottle)) {
      gameState = END;
    }
  } else if (gameState === END) {

    restart.visible = true;
   
    ground.velocityX = 0;
    bottle.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);


    if (keyDown("space") || touches.length > 0 ) {
      reset();
      touches = [];
    }
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    corona = createSprite(760, 1250, 20, 50);
    corona.addImage(coronaI);
    corona.scale = 0.36;
    corona.velocityX = -7;
    corona.velocityX = corona.velocityX-(6 + 3 * score / 150);
    corona.setCollider("circle",1,1,140);
    
    obstaclesGroup.add(corona);
    bottle.width = cloudsGroup.width;
    bottle.width = bottle.width+3;
  }
}

function reset() {
  gameState = PLAY;

  restart.visible = false;
  score = 0;
  obstaclesGroup.destroyEach();

}