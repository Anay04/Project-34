//Create variables here
var dog, happyDog, database, foodS, foodStock, dog1, dog2;

function preload() {
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dog1);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog.scale = 0.15;
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  if (keyDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(dog2);
  }
  //add styles here
  text("Food remaining : " + foodS, 170, 200);
  text("Press Up Arrow Key To Feed The Dog", 130, 10, 300, 20);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  } else {
    x = x-1
  }
  database.ref('/').update(
    {
      Food:x
    }
  )


}