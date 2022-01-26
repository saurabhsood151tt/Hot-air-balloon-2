var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var restart, restartImg;

var score;
score=0;



function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

restartImg = loadImage("assets/restart.png");

}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
bg.x = bg.width /2;
bg.velocityX = -4;

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

obstacleTopGroup = new Group();
obstacleBottomGroup = new Group();

restart = createSprite(200,200,20,50);
restart.addImage("restartImg",restartImg);
restart.scale = 0.7;
restart.visible=false;

}

function draw() {
  
  background(bgImg);
        
 
  
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

           if (bg.x < 0) {
            bg.x = bg.width / 2;
          }

         if(obstacleTopGroup.isTouching(balloon) || obstacleBottomGroup.isTouching(balloon) || balloon.y>400){
           gameState=END;
          }
          if(gameState==END){
            bg.velocityX=0;
            balloon.velocityX=0;
            obstacleTopGroup.destroyEach();
            obstacleBottomGroup.destroyEach();
            score=0;
            restart.visible=true;
            balloon.visible=false;
          }

           if(mousePressedOver(restart)){
              reset();
            }

           
          Bar();
   
        drawSprites();
       
        //spawning top obstacles
      spawnObstaclesTop();
      spawnObstaclesBottom();

      text("score: "+score,330,30);
      
      score=score+Math.round(frameCount/60);
      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    //var rand = Math.round(random(0,1));
    //var rand = random(1,2);
    var rand = Math.round(random(1,2));
//var rand=roundoff(random(1,2))

    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
   //obstacleTop.depth=obstacleTop.depth+1;
    balloon.depth = balloon.depth + 1;
 //  balloon.depth = balloon.depth - 1;
      //obstacleTop.depth=obstacleTop.depth-1;
obstacleTopGroup.add(obstacleTop);
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}

function spawnObstaclesBottom(){
  if(frameCount % 80 === 0){
    obstacleBottom = createSprite(405,370,30,30);
obstacleBottom.velocityX=-4;
obstacleBottom.scale = 0.09;
obstacleBottom.lifetime = 134;
obstacleBottomGroup.add(obstacleBottom);
var rand= Math.round(random(1,6));
switch(rand){
  case 1: obstacleBottom.addImage(obsBottom1);
  break;
  case 2: obstacleBottom.addImage(obsBottom2);
  break;
  case 3: obstacleBottom.addImage(obsBottom3);
  break;
  default:break;
}
  }
  
}
  
function reset(){
balloon.visible=true;
bg.x = bg.width /2;
bg.velocityX = -4;
restart.visible=false;
balloon.x=100;
balloon.y=200;
gameState==PLAY;
 if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
}
