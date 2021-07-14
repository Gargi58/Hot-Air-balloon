var balloon,balloonImage1,balloonImage2 , balloonPosition;
// create database and position variable here
var database;
var height;
function preload(){
   bg =loadImage("sky1.jpg");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
   music= loadSound("song.mp3")
  }

//Function to set initial environment
function setup() {
  
  createCanvas(1200,700);
  database=firebase.database();
  music.loop();

  
  bgrnd = createSprite(450,450,10,10);
  bgrnd.addImage("bgrnd",bg);
  bgrnd.scale = 3.15;
bgrnd.velocityX = -3;

  balloon=createSprite(250,450,200,290);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value",readPosition,showError)


  textSize(20); 
}

// function to display UI
function draw() {
  background(0);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight (-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(5,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-5);
    balloon.scale = balloon.scale - 0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+5);
    balloon.scale = balloon.scale + 0.005;
  }

  if(bgrnd.x < 220)
  {
    bgrnd.x = 440 ;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  text("**To hear the music reload the site and click on the screen before the canvas appears",40,60);
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
    x : balloon.x+x,
    y :balloon.y+y
})
}
function readPosition(data)
{
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError(){
  console.log("Error in reading the data from the database")
}