const FULL = 1;
const EMPTY = 0 ;
var dog ,dogImg, happyDog, database, foodS,foodStock;
var milkBottle;
var feed, loadup;
var foodObj;
var lastFedRef ;
var lastFed;
var stock = FULL;
function preload()
{
  dogImg = loadImage("./images/dogImg.png");
  happyDog = loadImage("./images/dogImg1.png");
  milkBottle = loadImage("./images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250);
  dog.addImage("mydog",dogImg);
  dog.scale = 0.5;
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("Feed");
  loadup = createButton("Load Up");
  lastFedRef = database.ref('lastFed');
  lastFedRef.on("value",readLastFed);
}


function draw() {  
background(46,139,87);
feed.position(400,100)
loadup.position(450,100);
//display last Fed time
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
foodObj.display();
  drawSprites();
  textSize(10);
  feed.mousePressed(function(){
    if(foodS!== undefined){
      if(foodS>=1){
        //add happy dog image
        dog.addImage("hp",happyDog);
        dog.changeImage("hp",happyDog);
        //update last fed 
        foodObj.updateLastFed();
        //deduct food
        foodObj.deductFood();
      }else
      {
        dog.changeImage("mydog",dogImg);
        stroke(255);
        fill("red");
        text("Alert: Milk is over",10,100);
      }
    }
  });
loadup.mousePressed(function(){
  foodObj.loadUp();
  });

  
  /*if(stock == FULL){
    stroke(255);
  fill("black");
  text("Note : Press UP ARROW key to feed DRAGO milk",10,450);
  }
  else{
    stroke(255);
  fill("red");
  text("Alert: Milk is over",10,450);
  }*/

}
function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
if(foodS<=0){
  stock = EMPTY;
}
}
function writeStock(x){
  database.ref('/').update({
    Food: x
  });
}


function readLastFed(data){
  lastFed = data.val();
  foodObj.lastFed = lastFed;

}