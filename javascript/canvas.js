window.onload = init;
var gf;
let canvas, ctx;

function init() {
	gf = new GameFramework();
	gf.init();
}



function GameFramework(){

  let canvas, ctx, size;
  let tirs = [];
  let bosses = [];

  function init(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    requestAnimationFrame(anime)
  }

}





class Personnage{

  constructor(nom, vie, posx, posy, vx, vy, size) {
		this.nom = nom;
		this.vie = vie; //0 à 100
		this.positionX = posx;
    this.positionY = posy;
		this.vitesseX = vx;
    this.vitesseY = vy;
		this.size = size;
	}
  function deplacement(){

     }

  function perteVie(val){
    this.vie-=val;
  }

  function vie(){
    return this.vie;
  }

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
  }


}

class Joueur extends Personnage{

    constructor(posx, posy, coul, vx, vy, l, h) {
		super(posx, posy, coul, vx, vy, l, h);

	}

  function deplacement(){
      var key_pressed;
     if(event == null){
          key_pressed = window.event.keyCode;
     }
     else {
          key_pressed = event.keyCode;
     }
     switch(key_pressed){
          case 37:
               left=true;
               break;

          case 39:
               right=true;
               break;

  }
  }

}

class Boss extends Personnage{

  constructor(nom, vie, posx, posy, vx, vy, l, h) {
		this.nom = nom;
		this.vie = vie; //0 à 100
		this.positionX = posx;
        this.positionY = posy;
		this.vitesseX = vx;
        this.vitesseY = vy;
		this.width = l;
		this.height = h;
	}
}



}
/*
class navette{}
class bombe{}
class
*/
