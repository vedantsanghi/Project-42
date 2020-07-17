var player;
var balloonImg;
var bulletsGroup,balloonsGroup;
var balloonsDestroyed, lives;
var gameState;
var seconds, button;

function preload(){
balloonImg = loadImage("ballon.png")
}

function setup() {
  createCanvas(800,600);
  // createSprite(400, 200, 50, 50);  
  player = createSprite(400,550,50,50)
  player.shapeColor = "white"
  bulletsGroup = createGroup()
  balloonsGroup = createGroup()
  lives = 3;
  balloonsDestroyed = 0;
  gameState = "play"
  seconds= 0
}

function draw() {
  background(0); 
  if(gameState === "play"){
    textSize(20)
    fill("white")
    text("Lives:"+ lives,20,20)
    text("Seconds survived till now:"+ seconds,100,20)
    // mousePressed();
  if(player.x>=800){
    player.x = 0
  }
  if(frameCount%25 === 0){
   balloons()
  }
  if(frameCount%35 === 0){
  seconds++  
  }
  if(balloonsGroup.isTouching(player)){
    lives = lives-1
   balloonsGroup.destroyEach()

  
  }
  if(bulletsGroup.isTouching(balloonsGroup)){
    balloonsDestroyed+=1
    balloonsGroup.destroyEach()
    bulletsGroup.destroyEach()

  }
  if(balloonsDestroyed===3){
    lives++
    balloonsDestroyed = 0
  }
  if(lives===0){
    gameState="end" 
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.x+=10
  }
  if(keyIsDown(32)){
    bullets()
  } 
}
  if(gameState==="end"){
    balloonsGroup.destroyEach()
    bulletsGroup.destroyEach()
    player.visible = false
    textSize(100)
    fill("white")
    text("You Lose",200,350)
    textSize(20)
    text("Seconds survived:"+ seconds,200,400)
    
    // button = createButton("RESET")
    // button.position(250,450)
    // button.mousePressed(()=>{
    //   player.x = 400
    //   player.y = 550
    //   player.visible = true
    //   button.hide()
    //   lives = 3
    //   balloonsDestroyed = 0
    //   seconds = 0
    //   gameState = "play"
    // })
  }
   drawSprites();
}

// function mouseWentDown(){
//   if(keyCode === "rightButton"){
//   player.x+=10
//   }
//   if(keyCode === "leftButton"){
//     bullets()
//     }
// }

function balloons(){
  var rand = random(0,800)
  var balloon = createSprite(rand,0,50,50)
  balloon.addImage(balloonImg)
  balloon.velocityY = 5
  balloon.scale = 0.2
  // if(balloon.y>=425){
  //   balloon.destroy()
  // }
  balloon.lifetime = 122
  balloonsGroup.add(balloon)
}
function bullets(){
  var bullet = createSprite(player.x,player.y,5,10)
  bullet.shapeColor = "red"
  bullet.velocityY = -4
  // if(bullet.y<=10){
  //   bullet.destroy()
  // }
  bullet.lifetime = 150
  bulletsGroup.add(bullet)
}

function hide(){
  button.hide();
}