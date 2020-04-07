function Blob(x,y,r){   
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0); 

  this.area = function(){
    return PI*this.r*this.r  
  }
  
  this.update = function(){
    var newvel = createVector(mouseX-width/2,mouseY-height/2);
    // var vel = posmouse.sub(this.pos);
    newvel.setMag(1)
    this.vel.lerp(newvel,0.2);
    this.pos.add(this.vel);
  }

  this.eats = function(other){
    var area_sum = PI*this.r*this.r + PI*other.r*other.r;
    this.r = sqrt(area_sum/PI);
  }
  // this.eats = function(other){
  //   var d = p5.Vector.dist(this.pos,other.pos)
  //   if(d < this.r+other.r){
  //     var area_sum = PI*this.r*this.r + PI*other.r*other.r;
  //     this.r = sqrt(area_sum/PI);

  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  this.distance = function(other){
    return sqrt((Math.pow(other.x-this.pos.x,2)) + (Math.pow(other.y-this.pos.y,2)))
    //return this.x+ other.y
  }

  this.show = function(){
    fill(66,133,244);
    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
  }

  this.constrain = function(){
    blob.pos.x = constrain(blob.pos.x , -width ,width)
    blob.pos.y = constrain(blob.pos.y , -height ,height)

  }
}
