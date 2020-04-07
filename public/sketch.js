const socket = io()
var blob;
var blobs = [];
var zoom = 1;
var d;
var foods = [];
var food;

function setup() {
  createCanvas(600, 600);
  


  blob = new Blob(random(width), random(height), 20); 
  var data = {
    x : blob.pos.x,
    y : blob.pos.y,
    r: blob.r
  }
  

  for(var i = 0; i<=400 ; i++){
    food = new Food(random(-width,width),random(-height,height))  //i guess change this to -width to +width
    foods.push(food)
  }
  console.log(foods[1])
  socket.emit('start',data)

  socket.on('clock1',(data)=>{
    blobs = data
    //console.log(data)
  })

}

function draw() {
  background(255);
  
  //console.log(blob.pos.x,blob.pos.y)
  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  for(var i= -600;i < 600 ; i = i+20 ){
    fill(0)
    stroke(200);
    line(-600, i, 600, i);
    line(i, -600, i, 600)
  }

  for(var i = 0; i<=300 ; i++){    // display food
    foods[i].show();
    if (blob.distance(foods[i]) < (blob.r+ foods[i].r)){
      blob.eats(foods[i])
      foods.splice(i, 1);
      food = new Food(random(-width,width),random(-height,height))
      foods.push(food)
      
    }
  }

  blob.show();                    // to show clients own blob

  for (var i = blobs.length - 1; i >= 0; i--) {

    if(blobs[i].id !== socket.id){
      circle(blobs[i].x, blobs[i].y, blobs[i].r*2)    //to show all other blobs except clients own
      textAlign(CENTER)
      text(blobs[i].id , blobs[i].x , blobs[i].y + blobs[i].r *2)

      if (blob.distance(blobs[i]) < (blob.r+ blobs[i].r)*0.5 && blob.area() > PI*blobs[i].r*blobs[i].r){
        console.log('eats')
        //blobs.splice(i,1)
        //console.log(blobs[i].id)
        blob.eats(blobs[i])
        socket.emit('delete_blob',blobs[i].id)
      }
    }
    // blobs[i].show();
    // if (blob.eats(blobs[i])){
    // blobs.splice(i, 1);
    // }
    // 
      
    // 
  }

  
  
  
  if(mouseIsPressed){
    blob.update();
  }
  
  blob.constrain()

  var data = {
    x : blob.pos.x,
    y : blob.pos.y,
    r: blob.r
  }
  socket.emit('update',data)

}

socket.on('got_eaten',()=>{
  noLoop()
  console.log('you got eaten broooo')
})

socket.on('message',(message)=>{
  console.log(message)
  //console.log('abey sale')
})
