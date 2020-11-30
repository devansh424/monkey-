var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var ground;

//Preload
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  //Canvas
  createCanvas(400,400);
  
  //Groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  survialTime = 0;
}

function draw() {
  
  //Background
  background (180);
  
   //displaying survialtime
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time:"+  survivalTime, 100, 50);
  
  monkey.collide(ground);
  survivalTime =Math.ceil(frameCount/frameRate());
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  //jump when the space key is pressed
  if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;
  }    
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
  
  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 100 === 0) {
    banana = createSprite(400,200,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 200;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 200 === 0){
    obstacle = createSprite(250,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    obstacleGroup.add(obstacle);
  }
}