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
            var height = document.getElementById('CenterCol').offsetHeight;
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
        let CurrBlendMode = sketch1.BLEND;
        let input, button, greeting;
        let C1 = "#FF0004"
        let C2 = "#009CFF"
        sketch1.setup = () => {



          var width = document.getElementById('BlendDemo1').offsetWidth+1;
          var height = document.getElementById('BlendDemo1').offsetHeight
          
          blendSelect = sketch1.createSelect();
          blendSelect.option("None");
          blendSelect.option("Add");
          blendSelect.option("Darkest");
          blendSelect.option("Lightest");
          blendSelect.option("Difference");
          blendSelect.option("Exclusion");
          blendSelect.option("Multiply");
          blendSelect.option("Overlay");
          blendSelect.option("Screen");
          blendSelect.option("Dodge");
          blendSelect.option("Burn");
          blendSelect.value("Add");
          blendSelect.changed(sketch1.blendSelectChanged); 
          
          let Color1 = sketch1.createInput("#FF0004",'color');
          Color1.size(100);
          Color1.input(sketch1.SetColor1);
          let Color2 = sketch1.createInput("#009CFF",'color');
          Color2.size(100);
          // Color2.position(50,sketch1.height+10);
          Color2.input(sketch1.SetColor2);






          Color1.style('width:33%;')
          Color1.style('height:30px;')
          Color1.style('background-color:transparent;')
          Color1.style('border:none;')
          
          Color2.style('width:33%;')
          Color2.style('height:30px;')
          Color2.style('background-color:transparent;')
          Color2.style('border:none;')

          blendSelect.style('font-size: 20;')
          blendSelect.style('color: black;')
          blendSelect.style('background-color: transparent;')
          blendSelect.style('border-radius: 3px;')
          blendSelect.style('border: none;')
          blendSelect.style('width:33%;')
          blendSelect.style('height:5%;')
          blendSelect.style('text-align:center;')
          sketch1.createCanvas(width, height, sketch1.P52D);
        
        }
      
        sketch1.draw = () => {
            sketch1.clear();
            
            
            sketch1.blendMode(CurrBlendMode)
            // console.log(CurrBlendMode);
            sketch1.noStroke();
            sketch1.fill(C2);
            sketch1.square(sketch1.width/2+40,sketch1.height/2+40,200);
            sketch1.fill(C1);
            sketch1.square(sketch1.width/2-40,sketch1.height/2-40,200);
            
            
        
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
        }

        sketch1.blendSelectChanged = function(){
          switch (blendSelect.value()) {
            case "None":
              CurrBlendMode = sketch1.BLEND;
              break;
            case "Add":
              CurrBlendMode = sketch1.ADD;
              break;
            case "Darkest":
              CurrBlendMode = sketch1.DARKEST;
              break;
            case "Lightest":
              CurrBlendMode = sketch1.LIGHTEST;
              break;
            case "Diffrence":
              CurrBlendMode = sketch1.DIFFERENCE;
              break;
            case "Exclusion":
              CurrBlendMode = sketch1.EXCLUSION;
              break;
            case "Multiply":
              CurrBlendMode = sketch1.MULTIPLY;
              break;
            case "Overly":
              CurrBlendMode = sketch1.OVERLAY;
              break;
            case "Screen":
              CurrBlendMode = sketch1.SCREEN;
              break;
            case "Replace":
              CurrBlendMode = sketch1.REPLACE;
              break;
            case "Dodge":
              CurrBlendMode = sketch1.DODGE;
              break;
            case "Burn":
              CurrBlendMode = sketch1.BURN;
              break;
          }
        }
      
    //BLEND DEMO 1 END
    }
    let myp5BlendDemo1 = new p5(BlendDemo1, "BlendDemo1");

    // BLEND DEMO 2 BEGIN
    const BlendDemo2 = ( sketch ) => {
      let CurrBlendMode = sketch.ADD;
      let Image1;
      let Image2;
      sketch.setup = () => {
        var width = document.getElementById('BlendDemo2').offsetWidth+1;
        var height = document.getElementById('BlendDemo2').offsetHeight;

        BostonIMG = sketch.loadImage("Images/Boston50s.png")
        GrainIMG = sketch.loadImage("Images/GrainNoise.png")
        ArchIMG = sketch.loadImage("Images/Arch.png")
        CheckersIMG = sketch.loadImage("Images/Checkers.png")
        CircleGradientIMG = sketch.loadImage("Images/CircleGradient.png")
        DogIMG = sketch.loadImage("Images/Dog.png")
        GrungeIMG = sketch.loadImage("Images/Grunge.png")
        GuyIMG = sketch.loadImage("Images/Guy.png")
        LadyIMG = sketch.loadImage("Images/Lady.png")
        LinearGradientIMG = sketch.loadImage("Images/LinearGradient.png")
        MetalIMG = sketch.loadImage("Images/MetalTexture.png")
        MountainIMG = sketch.loadImage("Images/Mountain.png")
        PaperIMG = sketch.loadImage("Images/Paper.png")
        PartyIMG = sketch.loadImage("Images/Party.png")
        NeonIMG = sketch.loadImage("Images/Neon.png")
        
        //.option([contentValue],[value])
        //If 1 param, it's both content AND
        //value. Values treated as strings.
        
        BlendSelect = sketch.createSelect();
        BlendSelect.option("None");
        BlendSelect.option("Add");
        BlendSelect.option("Darkest");
        BlendSelect.option("Lightest");
        BlendSelect.option("Difference");
        BlendSelect.option("Exclusion");
        BlendSelect.option("Multiply");
        BlendSelect.option("Overlay");
        BlendSelect.option("Screen");
        BlendSelect.option("Dodge");
        BlendSelect.option("Burn");
        BlendSelect.value("Add");
        BlendSelect.changed(sketch.BlendSelectChanged);
       



        Image1Select = sketch.createSelect();
        Image1Select.option("Arch");
        Image1Select.option("Boston");
        Image1Select.option("Checkers");
        Image1Select.option("Circular Gradient");
        Image1Select.option("Dog");
        Image1Select.option("Grain");
        Image1Select.option("Grunge");
        Image1Select.option("Guy");
        Image1Select.option("Lady");
        Image1Select.option("Linear Gradient");
        Image1Select.option("Metal");
        Image1Select.option("Mountain");
        Image1Select.option("Paper");
        Image1Select.option("Party");
        Image1Select.option("Neon");
        Image1Select.value("Grain");
        Image1Select.changed(sketch.Image1SelectChanged);

        Image2Select = sketch.createSelect();
        Image2Select.option("Arch");
        Image2Select.option("Boston");
        Image2Select.option("Checkers");
        Image2Select.option("Circular Gradient");
        Image2Select.option("Dog");
        Image2Select.option("Grain");
        Image2Select.option("Grunge");
        Image2Select.option("Guy");
        Image2Select.option("Lady");
        Image2Select.option("Linear Gradient");
        Image2Select.option("Metal");
        Image2Select.option("Mountain");
        Image2Select.option("Paper");
        Image2Select.option("Party");
        Image2Select.option("Neon");
        Image2Select.value("Boston");
        Image2Select.changed(sketch.Image2SelectChanged);
        
        Image1 = GrainIMG;
        Image2 = BostonIMG;
        
        sketch.createCanvas(width, height, sketch.P2D);
        
        BlendSelect.style('font-size: 20;')
        BlendSelect.style('color: black;')
        BlendSelect.style('background-color: transparent;')
        BlendSelect.style('border-radius: 3px;')
        BlendSelect.style('border: none;')
        BlendSelect.style('margin-bottom: 12;')
        BlendSelect.style('width:33%;')
        BlendSelect.style('height:5%;')
        BlendSelect.style('text-align:center;')

        Image1Select.style('font-size: 20;')
        Image1Select.style('color: black;')
        Image1Select.style('border-radius: 3px;')
        Image1Select.style('background-color: transparent;')
        Image1Select.style('border: none;')
        Image1Select.style('margin-bottom: 12;')
        Image1Select.style('width:33%;')
        Image1Select.style('height:5%;')
        Image1Select.style('text-align:center;')

        Image2Select.style('font-size: 20;')
        Image2Select.style('color: black;')
        Image2Select.style('border-radius: 3px;')
        Image2Select.style('background-color: transparent;')
        Image2Select.style('border: none;')
        Image2Select.style('margin-bottom: 12;')
        Image2Select.style('width:33%;')
        Image2Select.style('height:5%;')
        Image2Select.style('text-align:center;')
      }
          
        sketch.draw = () => {
          sketch.clear();
          // sketch.background(200);
          sketch.blendMode(CurrBlendMode)
          sketch.image(Image2, 0, 0);
          sketch.image(Image1, 0, 0);
        }

        sketch.Image1SelectChanged = function(){
          switch (Image1Select.value()) {
            case "Arch":
              Image1 = ArchIMG;
              break;
            case "Boston":
              Image1 = BostonIMG;
              break;
            case "Checkers":
              Image1 = CheckersIMG;
              break;
            case "Circular Gradient":
              Image1 = CircleGradientIMG;
              break;
            case "Dog":
              Image1 = DogIMG;
              break;
            case "Grain":
              Image1 = GrainIMG;
              break;
            case "Grunge":
              Image1 = GrungeIMG;
              break;
            case "Guy":
              Image1 = GuyIMG;
              break;
            case "Lady":
              Image1 = LadyIMG;
              break;
            case "Linear Gradient":
              Image1 = LinearGradientIMG;
              break;
            case "Metal":
              Image1 = MetalIMG;
              break;
            case "Mountain":
              Image1 = MountainIMG;
              break;
            case "Paper":
              Image1 = PaperIMG;
              break;
            case "Neon":
              Image1 = NeonIMG;
              break;
            case "Boston":
              Image1 = BostonIMG;
              break;
              case "Party":
                Image1 = PartyIMG;
                break;
          }
        }
        sketch.Image2SelectChanged = function(){
          switch (Image2Select.value()) {
            case "Arch":
              Image2 = ArchIMG;
              break;
            case "Boston":
              Image2 = BostonIMG;
              break;
            case "Checkers":
              Image2 = CheckersIMG;
              break;
            case "Circular Gradient":
              Image2 = CircleGradientIMG;
              break;
            case "Dog":
              Image2 = DogIMG;
              break;
            case "Grain":
              Image2 = GrainIMG;
              break;
            case "Grunge":
              Image2 = GrungeIMG;
              break;
            case "Guy":
              Image2 = GuyIMG;
              break;
            case "Lady":
              Image2 = LadyIMG;
              break;
            case "Linear Gradient":
              Image2 = LinearGradientIMG;
              break;
            case "Metal":
              Image2 = MetalIMG;
              break;
            case "Mountain":
              Image2 = MountainIMG;
              break;
            case "Paper":
              Image2 = PaperIMG;
              break;
            case "Neon":
              Image2 = NeonIMG;
              break;
            case "Boston":
              Image2 = BostonIMG;
              break;
            case "Party":
              Image2 = PartyIMG;
              break;
          }
        }
          
        sketch.BlendSelectChanged = function(){
          switch (BlendSelect.value()) {
            case "None":
              CurrBlendMode = sketch.BLEND;
              break;
            case "Add":
              CurrBlendMode = sketch.ADD;
              break;
            case "Darkest":
              CurrBlendMode = sketch.DARKEST;
              break;
            case "Lightest":
              CurrBlendMode = sketch.LIGHTEST;
              break;
            case "Diffrence":
              CurrBlendMode = sketch.DIFFERENCE;
              break;
            case "Exclusion":
              CurrBlendMode = sketch.EXCLUSION;
              break;
            case "Multiply":
              CurrBlendMode = sketch.MULTIPLY;
              break;
            case "Overly":
              CurrBlendMode = sketch.OVERLAY;
              break;
            case "Screen":
              CurrBlendMode = sketch.SCREEN;
              break;
            case "Replace":
              CurrBlendMode = sketch.REPLACE;
              break;
            case "Dodge":
              CurrBlendMode = sketch.DODGE;
              break;
            case "Burn":
              CurrBlendMode = sketch.BURN;
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
