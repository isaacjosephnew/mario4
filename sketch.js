var mario, marioRunning
var marioBackground
var ground
var bombImage
var score
var bombgrp
var gameState = "start"
var speed = -5
function preload(){
marioRunning = loadAnimation("mario1-removebg-preview.png","mario2-removebg-preview.png","mario3-removebg-preview.png")
marioBackground = loadImage("background.jpg")
bombImage = loadImage("bomb.png")
}
function setup(){
createCanvas(1000,500)
backgroundSprite = createSprite(500,250,3000,200)
backgroundSprite.addImage(marioBackground)
backgroundSprite.scale = 4
ground = createSprite(500,495,1000,10)
mario = createSprite(50,420)
mario.scale = 0.5
mario.addAnimation("running",marioRunning)
mario.debug = true
bombgrp = new Group()
score = 0 

}
function draw(){
if (gameState === "start"){
    background("blue")
    backgroundSprite.velocityX = speed
    if (backgroundSprite.x < 0){backgroundSprite.x = 500}
    if (keyDown("space")&&mario.y > 400){
    mario.velocityY = -50         
    }
    mario.velocityY = mario.velocityY +1
    mario.collide(ground)
    spawnBombs();
    score = score +1
    fill("black")
    if (bombgrp.isTouching(mario)){
        gameState = "end"
    }
    drawSprites() 
    textSize(50)
    text("SCORE  "+score,700,100)
    if (score > 2000){
        speed = -10
    }
}
if (gameState === "end"){
    fill("blue")
    textSize(100)
    text("gameover",250,250)
}
}
function spawnBombs(){
if(frameCount%150 === 0){
var bomb = createSprite(1050,440,50,50)
var rand = random(-2,0)
bomb.rotationSpeed = rand
var rand3 = random(0.5,1)
bomb.scale = rand3
bomb.addImage(bombImage)
var rand1 = random(speed,speed-20)
bomb.velocityX = rand1
bomb.lifetime = 100
bomb.debug = true
bomb.setCollider("circle",0,0,10)
bombgrp.add(bomb)
}
}