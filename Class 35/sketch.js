var hypnoticBall;
var database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    /* .ref(); means ref function
       .ref(); is used to refer to the location of the database
    */
    var hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value",readPosition,showError);
    /*
      .on(); creates a listener which keeps listening to the changes in the database
      every time a change occurs in the position node inside database, 
      the readPosition function and showError function are called
    */
}

function draw(){
    background("white");
    //position variable takes some time for the application to read values from the database and assaign it
    //hypnoticBall should move only when the position is defined
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
}

//using the funcion below, we can read the position of the value inside database
function readPosition(data){
  position = data.val();
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function writePosition(x,y){
  database.ref('ball/position').set({ 
      'x': position.x+x, 'y': position.y+y
      
  });
  //.set() is used to set the value in database
}

function showError(){
  console.log("ERROR in writing to the database");
}