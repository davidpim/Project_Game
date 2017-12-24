window.onload = init;
var gf;
var positionJ=200;
var fond =document.createElement("img");
var boss1 =document.createElement("img");
var boss2 =document.createElement("img");
var boss3 =document.createElement("img");
var boss4 =document.createElement("img");
fond.src="img/fond.png";
boss1.src="img/boss1.png";
boss2.src="img/boss2.png";
boss3.src="img/boss3.png";
boss4.src="img/boss4.png";



function init() {
	gf = new GameFramework();
	gf.init();
	choixNiveau();
}

function GameFramework(){


  let canvas, ctx, w, h;
  //let tirs = [];
  let Bosses = [];
	let TirsBoss = [];
	//choix d'un tableau car certain niveaux possèdent 2 boss
	let objetsVisibles = [];
	//let joueur;
  let Joueurs = [];
	let Munitions = [];
	let EtatPartie=null;



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
setInterval(console.log("ok"), 1000);
    requestAnimationFrame(anime);


  }

  function anime(timeElapsed){
		//tout le temps appelé
    ctx.clearRect(0,0,w,h);
		ctx.drawImage(fond,0,0,w,h);
		Joueurs.forEach(function(r){
			r.draw(ctx);
			r.deplacement();
			r.vieR(ctx);
	    r.posx=positionJ;
			if(r.vie<=0){
				defaite();
				//reset()
			}

		});
		Bosses.forEach(function(r){
			r.draw(ctx);
			r.deplacement();
			r.tir(ctx,Joueurs[0],w,h);
			r.vieR(ctx);
			r.perteVie();
			if(r.vie<=0){
				//Joueurs=[];
				victoire();

			}
		});

		//victoire();
		//defaite();


		requestAnimationFrame(anime);

  }
  function reset() {
		Bosses = [];
		Joueurs = []; // on vire tous les objets


	}
  return{
        init:init,
				reset:reset,
        creationObjs: creationObjs,
				victoire:victoire,
				defaite:defaite

  }

	function victoire(){
		if(EtatPartie==null || EtatPartie==true){
			ctx.fillStyle = "chartreuse";
			ctx.font = "80px OCR A Std";
			ctx.fillText("VICTOIRE",170,350);
			EtatPartie=true;
		}
	}

	function defaite(){
		if(EtatPartie==null || EtatPartie==false){
			ctx.fillStyle = "red";
			ctx.font = "80px OCR A Std";
			ctx.fillText("DEFAITE",190,350);
			EtatPartie=false;
		}
	}

  function creationObjs(val){

    //nom, type, vie, posx, posy, vx, vy, size,vitesseTir,valeurPerteVieJ
		EtatPartie=null;
		if(val==1){
			let b1 = new Boss("Boss", boss1, 100,100,200,2,1,80,5,2);
			Bosses.push(b1);
		}else if(val==2){
			let b2 = new Boss("Boss", boss2, 100,100,200,3,1,80,8,4);
			Bosses.push(b2);
		}else if(val==3){
			let b3 = new Boss("Boss", boss3, 100,100,200,4,2,80,10,6);
			Bosses.push(b3);
		}else if(val==4){
			let b4 = new Boss("Boss", boss4, 100,100,200,6,3,80,14,8);
			Bosses.push(b4);
		}
    let j = new Joueur("Joueur", -1, 100,300,520,100,0,100,10);
    Joueurs.push(j);

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

	}

  deplacement(){

  }


}

class Joueur extends Personnage{

    constructor(nom, type, vie, posx, posy, vx, vy, size) {
		super(nom, type, vie, posx, posy, vx, vy, size);


	}

  draw(ctx){
		ctx.save();
		ctx.translate(this.posx,this.posy);
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

	vieR(ctx){
		ctx.save();
  	ctx.fillStyle = "chartreuse"; // valeur = une couleur CSS3
		ctx.fillRect(11, 62, this.vie*3.05, 20); //0 à 305
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

	constructor(nom, type, vie, posx, posy, vx, vy, size,vitesseTir,valeurPerteVieJ) {
	super(nom, type, vie, posx, posy, vx, vy, size);
	this.vitesseTir=vitesseTir;
	this.valeurPerteVieJ=valeurPerteVieJ;
	this.munition = new Munition("m1","boss",this.posx+40,this.posy+80,this.vitesseTir,Math.random()*(2-(-2))+(-2),this.valeurPerteVieJ);
	//nom,type,posx,posy,vitesse,angle,valPerte
	}

	draw(ctx){
		ctx.save();
		ctx.translate(this.posx,this.posy)
  	ctx.drawImage(this.type,0,0,this.size,this.size);

		ctx.strokeStyle = "RED";
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(0,0);
		ctx.lineTo(80,0);
		ctx.lineTo(80,80);
		ctx.lineTo(0,80);
		ctx.lineTo(0,0);
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

	tir(ctx,joueur,w,h){
		this.munition.draw(ctx);
		this.munition.deplacement();
		this.munition.collision(joueur);
		if(this.munition.estSortie(w,h)==true){
			this.munition.posx=this.posx+40;
			this.munition.posy=this.posy+80;
			this.munition.angleR=Math.random() * (2 - (-2)) + (-2);
		}
	}
	vieR(ctx){
		ctx.save();
		ctx.fillStyle = "red"; // valeur = une couleur CSS3
		ctx.fillRect(485-((this.vie-100)*3.05), 62, (this.vie*3.05), 20); //0 à 305
		ctx.restore();
	}

	perteVie(){
		if(this.vie>0)
			this.vie-=0.1;
	}


}

class Munition{
	constructor(nom,type,posx,posy,vitesse,angle,valPerte){
		this.nom=nom;
		this.type=type;
		this.posx=posx;
		this.posy=posy;
		this.vitesse=vitesse;
		this.angleR=Math.random() * (2 - (-2)) + (-2);
		this.valPerte=valPerte;

	}

	draw(ctx){
		ctx.save();
		ctx.translate(this.posx,this.posy)
  	ctx.fillStyle = "blue"; // valeur = une couleur CSS3
		ctx.fillRect(0, 0, 10, 10);
		ctx.restore();
	}

	estSortie(w,h){
		if(this.posx>w || this.posx<0 || this.posy>h || this.posy<90){
			return true;
		}else{
			return false;
		}
	}

	deplacement(){
		if(this.type=="joueur"){
			this.posx -= this.angleR;
	  	this.posy -= this.vitesse;
		}else{
			this.posx += this.angleR;
	  	this.posy += this.vitesse;
		}
	}
	collision(joueur,valPerte){

		if(this.posx>=joueur.posx && this.posx<=joueur.posx+80
			 && this.posy>=joueur.posy && this.posy<=joueur.posy+80){
				 if(joueur.vie>0)
					joueur.vie-=this.valPerte;
					if(joueur.vie<0){
						joueur.vie=0;
					}
			 }

	}

}

function choixNiveau(val){
	gf.reset();
	gf.creationObjs(val);
}

/*
class navette{}
class bombe{}
class
*/
