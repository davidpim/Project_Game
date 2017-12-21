window.onload = init;
var gf;


function init() {
	gf = new GameFramework();
	gf.init();
}



function GameFramework(){

  let canvas, ctx, w, h;
  let tirs = [];
  let bosses = [];
	//choix d'un tableau car certain niveaux possèdent 2 boss
	let objetsVisibles = [];
	let joueur;
  //let Joueurs = [];


  function init(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
		w = canvas.width;
		h = canvas.height;
		//nom, type, vie, posx, posy, vx, vy, l, h
		joueur = new Joueur("Joueur", -1, 100,0,600,1,0,100,100);
		let boss1 = new Boss("Boss Mme Ribouchon", 1, 100,0,600,1,0,100,100);
		bosses.push(boss1);
		let boss2 = new Boss("Boss M Tounsi", 2, 100,0,600,1,0,100,100);
		let boss3 = new Boss("Boss M Anigo", 2, 100,0,600,1,0,100,100);
		bosses.push(boss2);
		bosses.push(boss3);
		let boss4 = new Boss("Boss M Buffa", 3, 100,0,600,1,0,100,100);
		let boss5 = new Boss("Boss M Miranda", 3, 100,0,600,1,0,100,100);
		bosses.push(boss4);
		bosses.push(boss5);

    requestAnimationFrame(anime);

  }

  function anime(timeElapsed){
		//tout le temps appelé
    ctx.clearRect(0,0,size,size);

		objetsVisibles.forEach(function(r)){
			r.draw(ctx);
			r.deplacement();
			r.collision();

		}


  }
}





class Personnage{

  constructor(nom, type, vie, posx, posy, vx, vy, size) {
		this.nom = nom;
		this.type = type;
		this.vie = vie; //0 à 100
		this.positionX = posx;
    this.positionY = posy;
		this.vitesseX = vx;
    this.vitesseY = vy;
		this.size = size;
	}

	function persoTouche(x,y){
		if(x>this.posX && x<this.posX+100 && y>this.posY && y<this.posY+100){
			return true;
		}
		return false;
	}

  function deplacement(){

  }

	function setNom(nom){
		this.nom=nom;
	}

  function perteVie(val){
    this.vie-=val;
  }

  function vie(){
    return this.vie;
  }
/*
   touchesWall(){
    if (
        this.center.x - 0.5 * this.size < 0 ||
        this.center.y + 0.5 * this.size > canvas.height ||
        this.center.y - 0.5 * this.size < 0
    ) {
        return true;
    }
    else {
        return false;
    }
  }
  touchesFace(){
    if (
        this.center.x - 0.5 * this.size < face.center.x + 0.5 * face.size &&
        this.center.x + 0.5 * this.size > face.center.x - 0.5 * face.size &&
        this.center.y + 0.5 * this.size > face.center.y - 0.5 * face.size &&
        this.center.y - 0.5 * this.size < face.center.y + 0.5 * face.size
    ) {
        return true;
    }
    else {
        return false;
    }
  }*/


}

class Joueur extends Personnage{

    constructor(nom, type, vie, posx, posy, vx, vy, size) {
		super(nom, type, vie, posx, posy, vx, vy, size);

	}



  function deplacement(canvasXMin,canvasXMax){
      var key_pressed;
     if(event == null){
          key_pressed = window.event.keyCode;
     }
     else {
          key_pressed = event.keyCode;
     }
     switch(key_pressed){
          case 37: //left
							if(this.posX>canvasXMin){
								x-=1;
							}
							break;

          case 39: //right
						if(this.posX<canvasXMax){
					 		x+=1;
				 		}
          	break;
		}
  }

	function draw(ctx){
		ctx.save();
  	ctx.translate(-50, -10);
  	ctx.fillStyle = "grey"; // valeur = une couleur CSS3
  	ctx.fillRect(0, 0, 100, 100);
  	ctx.fillStyle = "chartreuse";
  	ctx.fillRect(10,10,30,10);
	  ctx.fillRect(70,80,30,10);
	  ctx.strokeStyle = "chartreuse";
	  ctx.moveTo(50,0);
	  ctx.lineTo(50,0);
	  ctx.lineTo(50,30);
	  ctx.lineTo(95,30);
	  ctx.lineTo(95,70);
	  ctx.lineTo(80,70);
	  ctx.lineTo(80,80);
	  ctx.lineTo(80,70);
	  ctx.lineTo(30,70);
	  ctx.lineTo(30,20);
	  ctx.lineTo(30,70);
	  ctx.lineTo(0,70);
	  ctx.stroke();
		ctx.restore();
	}




}



class Boss extends Personnage{

	constructor(nom, type, vie, posx, posy, vx, vy, size) {
		super(nom, type, vie, posx, posy, vx, vy, size);
	}

	function draw(ctx){
		ctx.save();
		ctx.translate(-50, -10);
		ctx.fillStyle = "grey"; // valeur = une couleur CSS3
		ctx.fillRect(0, 0, 100, 100);
		ctx.fillStyle = "red";
		ctx.fillRect(10,10,30,10);
		ctx.fillRect(70,80,30,10);
		ctx.strokeStyle = "red";
		ctx.moveTo(50,0);
		ctx.lineTo(50,0);
		ctx.lineTo(50,30);
		ctx.lineTo(95,30);
		ctx.lineTo(95,70);
		ctx.lineTo(80,70);
		ctx.lineTo(80,80);
		ctx.lineTo(80,70);
		ctx.lineTo(30,70);
		ctx.lineTo(30,20);
		ctx.lineTo(30,70);
		ctx.lineTo(0,70);
		ctx.stroke();
		ctx.restore();

	}
}



}
/*
class navette{}
class bombe{}
class
*/
