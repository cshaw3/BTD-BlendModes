        const SideCol = ( sketch ) => {
        let scroll_offset = 0;
        let Time = sketch.millis();
        let ArrayOfShapes  = []
        let Colors = [];
        

        class BlendShape {
            constructor(){
                // this.r = sketch.random(40,255);
                // this.g = sketch.random(40,255);
                // this.b = sketch.random(40,255);
                
                // red 0
                Colors.push( sketch.color(255, 0, 0) );
                // blue 1
                Colors.push( sketch.color(0, 255, 0) );
                // green 2
                Colors.push( sketch.color(0, 0, 255) );

                // black 3
                Colors.push( sketch.color(0, 0, 0) );
                // white 4
                Colors.push( sketch.color(255, 255, 255) );
                
                // pos
                this.x = sketch.random(-40,40); 
                this.y = sketch.random(-1000,1000);
                
                // size
                this.s = sketch.random(30,70);
                this.size2speed = sketch.map(this.s,30,70,4,1)
                this.randomDir = (sketch.random([-1,1]));
                this.xSpeed = this.randomDir*sketch.random(this.size2speed,this.size2speed-1);
                this.ySpeed = this.randomDir*sketch.random(this.size2speed,this.size2speed-1);
                
                //color
                // RGB
                // this.c = sketch.floor(sketch.random(0,3));
                
                // B&W
                this.c = sketch.floor(sketch.random(3,5));
            }

            createShape(){
                sketch.fill(Colors[this.c]);
                sketch.circle(this.x, this.y, this.s);
            }
            moveShape() {
                if(this.x < -sketch.width/2 || this.x > sketch.width-sketch.width/2)
                  this.xSpeed*=-1;
                if(this.y < -sketch.height/2 || this.y > sketch.height/2)
                  this.ySpeed*=-1;
                this.x+=this.xSpeed;
                this.y+=this.ySpeed;

              }


            avoidMouse(){
              if (this.x == sketch.mouseX){
                // console.log("fffff");
              }
            }
        }

        sketch.setup = () => {
          // console.log("Its on");
            var width = document.getElementById('LeftCol').offsetWidth+1;
            var height = document.getElementById('CenterCol').offsetHeight
            sketch.createCanvas(width, height, sketch.WEBGL);
            // sketch.createCanvas(width, height);

            //instantiate shapes
            for(let i = 0;i<50;i++){
                ArrayOfShapes.push(new BlendShape());
              }
        };
      
        sketch.draw = () => {
            
            sketch.background(255,255,255);
            // sketch.circle(0,0,200);
            sketch.blendMode(sketch.DIVIDE);  
            for(let i = 0;i<ArrayOfShapes.length;i++) {
              ArrayOfShapes[i].createShape();
              ArrayOfShapes[i].moveShape();
            }
        };


        sketch.mouseWheel = (event) => {
            scroll_offset += event.delta;
            // console.log(scroll_offset)
        }

        //Resizes canvas when window resizes
        sketch.windowResized = function(){
            var width = document.getElementById('LeftCol').offsetWidth+1;
            var height = document.getElementById('CenterCol').offsetHeight
            sketch.resizeCanvas(width,height);
        };


      };
      let myp5leftCol = new p5(SideCol, "LeftCol");
      let myp5RightCol = new p5(SideCol, "RightCol");






    
      // BLEND DEMO 1 BEGIN
      const BlendDemo1 = ( sketch1 ) => {
        let input, button, greeting;
        let C1 = "#FF0004"
        let C2 = "#009CFF"
        sketch1.setup = () => {



          var width = document.getElementById('BlendDemo1').offsetWidth+1;
          var height = document.getElementById('BlendDemo1').offsetHeight
          sketch1.createCanvas(width, height, sketch1.P52D);
          
          let Color1 = sketch1.createInput("#FF0004",'color');
          Color1.size(100);
          
          Color1.input(sketch1.SetColor1);
          

          let Color2 = sketch1.createInput("#009CFF",'color');
          Color2.size(100);
          // Color2.position(50,sketch1.height+10);
          Color2.input(sketch1.SetColor2);
        
        }
      
        sketch1.draw = () => {
            sketch1.clear();
            
            // sketch.background(255);
          
            sketch1.noStroke();
            sketch1.blendMode(sketch1.ADD);
            sketch1.fill(C2);
            sketch1.square(sketch1.width/2+40,sketch1.height/2+40,200);
            // sketch.square(-40,-40,200);
            sketch1.fill(C1);
            sketch1.square(sketch1.width/2-40,sketch1.height/2-40,200);
            // sketch.square(40,40,200);
            
        
            sketch1.rectMode(sketch1.CENTER);

        }
        sketch1.SetColor1 = function(){
          C1 = this.value();
          

        }
        sketch1.SetColor2 = function(){
          C2 = this.value();

        }
      
        sketch1.windowResized = function(){
          var width = document.getElementById('BlendDemo1').offsetWidth+1;
          var height = document.getElementById('BlendDemo1').offsetHeight
          sketch1.resizeCanvas(width,height);
      };
      
    //BLEND DEMO 1 END
    }
    let myp5BlendDemo1 = new p5(BlendDemo1, "BlendDemo1");

    // BLEND DEMO 2 BEGIN
    const BlendDemo2 = ( sketch ) => {
      let CurrBlendMode = sketch.BLEND
      sketch.setup = () => {
        var width = document.getElementById('BlendDemo2').offsetWidth+1;
        var height = document.getElementById('BlendDemo2').offsetHeight;

        BostonIMG = sketch.loadImage("Assets/Boston50s.png")
        GrainIMG = sketch.loadImage("Assets/GrainNoise.png")

        select1 = sketch.createSelect();
        //.option([contentValue],[value])
        //If 1 param, it's both content AND
        //value. Values treated as strings.
        select1.option("None");
        select1.option("Overlay");
        select1.option("Screen");
        select1.changed(sketch.select1Changed);

        sketch.createCanvas(width, height, sketch.P2D);
        }
          
        sketch.draw = () => {
          sketch.clear();
          // sketch.background(200);
          sketch.blendMode(CurrBlendMode)
          sketch.image(BostonIMG, 0, 0);
          sketch.image(GrainIMG, 0, 0);
        }
          
        sketch.select1Changed = function(){

          switch (select1.value()) {
            case "None":
              CurrBlendMode = sketch.BLEND
              break;
            case "Overlay":
              CurrBlendMode = sketch.OVERLAY
              break;
            case "Screen":
              CurrBlendMode = sketch.SCREEN
              break;
          }
        }

        sketch.windowResized = function(){
          var width = document.getElementById('BlendDemo2').offsetWidth+1;
          var height = document.getElementById('BlendDemo2').offsetHeight
          sketch.resizeCanvas(width,height);
        };
          
        //BLEND DEMO 2 END
        }
        let myp5BlendDemo2 = new p5(BlendDemo2, "BlendDemo2");