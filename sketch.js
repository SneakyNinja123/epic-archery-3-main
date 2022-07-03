const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var arrow


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y-112,
    120,
    120
  );

  
}

function draw() {
  background(backgroundImg);

  

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180, 150);
  image(playerimage,player.position.x, player.position.y,50,180);

  playerArcher.display();
  for(var i = 0; i < playerArrows.length-1; i++){
    showArrows(i, playerArrows)
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width/2, 100);
  text("shoot", 340, playerArcher.body.position.y);

}

function keyPressed(){
  if(keyCode === 32){
    arrow = new PlayerArrow(playerArcher.body.position.x, playerArcher.body.position.y, 100, 50, playerArcher.body.angle + PI/2);
    playerArrows.push(arrow);
    arrow.trajectory = []
    playerArrows[playerArrows.length-1].shoot(playerArcher.body.angle + PI/2);
    console.log(arrow.body.position.x);
    console.log(playerArcher.body.position.x);
  } 
}

function showArrows(index, arrows){
  arrows[index].display();
}

