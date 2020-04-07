function Food(x,y){
    this.x = x;
    this.y = y
    this.r = 3

    this.show = function(){
        noStroke();
        fill(15,157,88);
        circle(this.x,this.y,this.r*2);
    }

    this.distance = function(other){
        return sqrt((Math.pow(other.x-this.pos.x,2)) + (Math.pow(other.y-this.pos.y,2)))

    }

    this.eats = function(other){
        var area_sum = PI*this.r*this.r + PI*other.r*other.r;
        this.r = sqrt(area_sum/PI);
        console.log("food eaten")
      }
}