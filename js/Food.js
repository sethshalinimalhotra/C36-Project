class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = null;
        this.image = loadImage("../images/Milk.png");
        

    }
    getFoodStock(){
        return this.foodStock();

    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
        writeStock(this.foodStock);
    }
    deductFood(){
        if(this.foodStock>0){
         this.foodStock=this.foodStock-1;
         writeStock(this.foodStock);
        }

    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
      }
      updateLastFed(){
          //update current hour in last fed db
          this.lastFed = hour();
          database.ref('/').update({
            lastFed:this.lastFed
          });
      }
      loadUp(){
        this.foodStock=this.foodStock + 1;
        writeStock(this.foodStock);
      }
   
    display(){
        var x=80,y=400;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        
        if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }

}
    }
 
}