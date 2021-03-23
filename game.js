class game{
    constructor(){
      
    }
     getState(){
         var gameStateRef = database.ref("gameState");
         gameStateRef.on("value", function(data){
             gameState = data.val();
         });
    }
    update(state){
        database.ref("/").update({
            gameState : state
        });
    }
    async start (){
        if(gameState === 0){
            Player = new player();
            Player.getCount();
            Form = new form();
            Form.display();
            car1 = createSprite(100, 200);
            car1.addImage("car1", carImage1);
            car2 = createSprite(300, 200);
            car2.addImage("car2", carImage2);
            car3 = createSprite(500, 200);
            car3.addImage("car3", carImage3);
            car4 = createSprite(700, 200);
            car4.addImage("car4", carImage4);
            cars = [car1, car2, car3, car4];
        }
    }
    play(){
        Form.hide();
        player.inform_allPlayers();
        if(allPlayers != undefined){
            image(trackImage,0,-displayHeight*4, displayWidth, displayHeight*5);
            var index = 0;
            var x = 175;
            var y;
            for(var clr in allPlayers){
                index = index+1;
                x = x+200;
                y = displayHeight-allPlayers[clr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === Player.index){
                    console.log(cars[index-1].y);
                    fill("red");
                    cars[index-1].shapeColor = "red"; 
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }         
        }
        if(keyIsDown(UP_ARROW) && Player.index!==null){
        Player.distance+=50;
        console.log(Player.distance);
        Player.update();
        }
        if(Player.distance>3800)
        gameState = 2;
        drawSprites();
    }   


    end(){
        console.log("GAME END");
        image(this.image, displayWidth/2, displayHeight/2, displayWidth, displayHeight);
    }
}