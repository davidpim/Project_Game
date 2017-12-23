window.onload = init;
var gf;
var positionJ=200;
var fond =document.createElement("img");
var boss =document.createElement("img");
fond.src="img/fond.jpg";
boss.src="img/Buffa_Dangerous.png";
//boss.src="img/Tounsi.png";
//boss.src="img/Miranda.png";


function init() {
	gf = new GameFramework();
	gf.init();
}

function GameFramework(){


  let canvas, ctx, w, h;
  //let tirs = [];
  let Bosses = [];
	//choix d'un tableau car certain niveaux possèdent 2 boss
	let objetsVisibles = [];
	//let joueur;
  let Joueurs = [];
	let Munitions = [];



  function init(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
		w = canvas.width;
		h = canvas.height;
		//nom,posx,posy,vitesse


		//nom, type, vie, posx, posy, vx, vy, l, h

		/*let boss1 = new Boss("Boss Mme Ribouchon", 1, 100,0,600,1,0,100,100);
		bosses.push(boss1);
		let boss2 = new Boss("Boss M Tounsi", 2, 100,0,600,1,0,100,100);
		let boss3 = new Boss("Boss M Anigo", 2, 100,0,600,1,0,100,100);
		bosses.push(boss2);
		bosses.push(boss3);
		let boss4 = new Boss("Boss M Buffa", 3, 100,0,600,1,0,100,100);
		let boss5 = new Boss("Boss M Miranda", 3, 100,0,600,1,0,100,100);
		bosses.push(boss4);
		bosses.push(boss5);*/
        creationObjs();
				//let k = new Boss("Joueur", -1, 400,300,520,100,0,100);

    requestAnimationFrame(anime);

  }

  function anime(timeElapsed){
		//tout le temps appelé
    ctx.clearRect(0,0,w,h);
		ctx.drawImage(fond,0,0,w,h);
		Joueurs.forEach(function(r){
			r.draw(ctx);
			r.deplacement();
	    r.posx=positionJ;
		});
		Bosses.forEach(function(r){
			r.draw(ctx);
			r.deplacement();
		});
		Munitions.forEach(function(r){
			r.draw(ctx);
			r.deplacement();
		});


		requestAnimationFrame(anime);

  }
  function reset() {
		objetsVisibles = []; // on vire tous les objets

	}
  return{
        init:init,
		//reset:reset,
        creationObjs: creationObjs
  }

  function creationObjs(){
    //nom, type, vie, posx, posy, vx, vy, l, h
    let j = new Joueur("Joueur", -1, 400,300,520,100,0,100);
		let k = new Boss("Boss", -1, 400,100,200,3,1,100);
		let m = new Munition("ok",100,300,2);
		Munitions.push(m);
    Joueurs.push(j);
		Bosses.push(k);
  }
}



class Personnage{

  constructor(nom, type, vie, posx, posy, vx, vy, size) {
		this.nom = nom;
		this.type = type;
		this.vie = vie; //0 à 100
		this.posx = posx;
    this.posy = posy;
		this.vx = vx;
    this.vy = vy;
		this.size = size;
    //positionJ=this.posx;
	}
/*
	function persoTouche(x,y){
		if(x>this.posX && x<this.posX+100 && y>this.posY && y<this.posY+100){
			return true;
		}
		return false;
	}
*/
  deplacement(){

  }
/*
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

  draw(ctx){
		ctx.save();
		ctx.translate(this.posx,this.posy)
  	ctx.fillStyle = "grey"; // valeur = une couleur CSS3
		ctx.fillRect(0, 0, 80, 80);
		ctx.fillStyle = "chartreuse";
		ctx.fillRect(10,10,30,10);

		ctx.strokeStyle = "chartreuse";
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(50,0);
		ctx.lineTo(50,0);
		ctx.lineTo(50,30);
		ctx.lineTo(79,30);
		ctx.lineTo(79,70);
		ctx.lineTo(30,70);
		ctx.lineTo(30,20);
		ctx.lineTo(30,70);
		ctx.lineTo(0,70);
		ctx.stroke();
		ctx.restore();
	}



  deplacement(){

	    window.onkeydown = function(e) {
	    var key = e.keyCode || e.which;
	    switch (key) {
	        case 37:
					if(positionJ>0)

						positionJ -= 10;
				  	if((this.posx+80 >= 800) || (this.posx <= 0)){
				    	this.vx = -this.vx;
				  	}
	      	//-Move left
	        break;
	    case 39:
			if(positionJ<720)
	         positionJ+=10;
	        //-Move right
	        break;
	    }
		};
	}



}







class Boss extends Personnage{

	constructor(nom, type, vie, posx, posy, vx, vy, size) {
	super(nom, type, vie, posx, posy, vx, vy, size);
	}

	draw(ctx){
		ctx.save();
		ctx.translate(this.posx,this.posy)
  	ctx.drawImage(boss,0,0,80,80);
		ctx.fillStyle = "red	";
		ctx.fillRect(10,10,30,10);

		ctx.strokeStyle = "red";
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(50,0);
		ctx.lineTo(50,0);
		ctx.lineTo(50,30);
		ctx.lineTo(79,30);
		ctx.lineTo(79,70);
		ctx.lineTo(30,70);
		ctx.lineTo(30,20);
		ctx.lineTo(30,70);
		ctx.lineTo(0,70);
		ctx.stroke();
		ctx.restore();

	}

	deplacement(){
		this.posx += this.vx;
  	if((this.posx+80 >= 800) || (this.posx <= 0)){
    	this.vx = -this.vx;
  	}
   	this.posy += this.vy;
  	if((this.posy+80 >= 300) || (this.posy <= 90)){
    	this.vy = -this.vy;
  	}
	}

	tirs(){

	}
}

class Munition{
	constructor(nom,posx,posy,vitesse){
		this.nom=nom;
		this.posx=posx;
		this.posy=posy;
		this.vitesse=vitesse;
		this.angleR=Math.random() * (2 - (-2)) + (-2);

	}

	draw(ctx){
		ctx.save();
		ctx.translate(this.posx,this.posy)
  	ctx.fillStyle = "blue"; // valeur = une couleur CSS3
		ctx.fillRect(0, 0, 10, 10);
		ctx.restore();
	}

	estSortie(){
		return false;
	}

	deplacement(){
		this.posx += this.angleR;
  	this.posy += this.vitesse;

	}

	collision(joueur){


	}
}


/*
class navette{}
class bombe{}
class
*/
