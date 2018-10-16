let sun;
let p1, p2, p3;

let cloud;
let cloudsx= [300, 300];
let cloudsy= [300, 300];
let t=0.1;

let astSize= Math.random(10,50);

let imgs = [];
let asteroids =[];

var stars = [];
// var shootingStar = [];

// //SPRITE
// var asteroid, circle;
// var direction = 90;

function preload(){
	imgs.push(loadImage('img/sun.png'));
	imgs.push(loadImage('img/p1.png'));
	imgs.push(loadImage('img/p2.png'));
	imgs.push(loadImage('img/p3.png'));
	imgs.push(loadImage('img/dustcloud1.png'));
	imgs.push(loadImage('img/asteroid1.png'));
	imgs.push(loadImage('img/asteroid2.png'));
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	colorMode(RGB, 255);
	noCursor();
	noStroke();

	cloud=imgs[4];
	rock=imgs[5];
	shootingStar = new ShootingStar();
	frameRate = (1);

	for (var i = 0; i < 100; i++) {
    stars.push(new Star());
}

// 	for (var i = 0; i < 100; i++) {
// 	   shootingStar.push(new shootingStar());
// }


	sun = new CelestialBody(110, createVector(width/2, height/2), color(255, 255, 0));
	p1 = new Planet(createVector(sun.position.x/2, sun.position.y/2), 30, sun.size/2 + 5, sun.size/2 + 2, color(0, 140, 200),0.004);
	p2 = new Planet(createVector(sun.position.x/2, sun.position.y/2), 40, sun.size/2 + 45, sun.size/2 + 35, color(255, 60, 0),0.007);
	p3 = new Planet(createVector(sun.position.x/2, sun.position.y/2), 20, sun.size/2 + 125, sun.size/2 + 110, color(110, 75, 170),0.02);
	s1 = new Satellite(createVector(p1.position.x/2, p1.position.y/2), 5, 20, 10, color(104, 255, 112),0.09);
	s2 = new Satellite(createVector(p3.position.x/2, p3.position.y/2), 5, 20, 10, color(104, 255, 112),0.06);
	s3 = new Satellite(createVector(p3.position.x/2, p3.position.y/2), 5, 30, 25, color(255, 104, 242),0.08);

	mouse = new Mouse(10);
}

function mousePressed(){
	asteroids.push(new Asteroid(-50,Math.random(30,100),30));
}



function draw() {
	background(0);


	//DUST CLOUD
		push();
	  image(cloud, cloudsx[0], cloudsy[0], 150, 100);
		translate(width - width/3, height/3);
		image(cloud, cloudsx[1], cloudsy[1], 150, 100);
	  pop();
	  cloudsx[0]=noise(t)*width/4;
		cloudsy[0]=noise(t)*height/4;
		cloudsx[1]=noise(t)*width/4;
		cloudsy[1]=noise(t)*height/4;
	  t+=0.005;


//STARS
		// for (var i = 0; i < 50; i++) {
		// 	var x = random(windowWidth);
		// 	var y = random(windowHeight);
		// 	stroke(255, 255, 255);
		// 	fill(255, 255, 0);
		// 	ellipse(x, y, 2, 2);
		// }

		for (var i = 0; i < 100; i++) {
    stars[i].draw();
}

// 	for (var i = 0; i < 100; i++) {
// 		shootingStar[i].draw();
// }

	shootingStar.draw();


	sun.display(imgs);

	p1.display(imgs, 1);
	p2.display(imgs, 2);
	p3.display(imgs, 3);
	p1.orbit();
	p2.orbit();
	p3.orbit();


	s1.display();
	s2.display();
	s3.display();
	s1.update(createVector(p1.position.x, p1.position.y));
	s2.update(createVector(p3.position.x, p3.position.y));
	s3.update(createVector(p3.position.x, p3.position.y));
	s1.orbit();
	s2.orbit();
	s3.orbit();


	mouse.collision(p1);
	mouse.collision(p2);
	mouse.collision(p2);
	mouse.update();
	mouse.display();



//only when mouse is pressed
	for(let i=0; i< asteroids.length;i++){
		asteroids[i].drawAsteroid();
			asteroids[i].updateAsteroid();

	}




}

var Mouse = function(_size){
	this.x = 2;
	this.y = 2;
	this.easing = 0.05;
	this.size = _size;


};

Mouse.prototype.update = function(){
	if (abs(mouseX - this.x) > 0.1) {
     this.x = this.x + (mouseX - this.x) *this.easing;
  }
  if (abs(mouseY - this.y) > 0.1) {
    this.y = this.y + (mouseY- this.y) * this.easing;
  }
}

Mouse.prototype.display = function(){
	push();
	fill(255);
	ellipse(this.x, this.y, this.size, this.size);
	pop();
}

Mouse.prototype.collision = function(planet){

	let distance = dist(mouseX,mouseY,(planet.position.x+planet.position.x), (planet.position.y+planet.position.y));
	//console.log(distance);
	if(distance < planet.size){
		if(	planet.orbitvelocity + 0.001<.5){
		//console.log("collison");
			planet.orbitvelocity+=0.001;
			// planet.semiMajor+=1;
		}
	}
	else{
		if(	planet.orbitvelocity-0.0001 > planet.originalOrbitVelocity){
				planet.orbitvelocity-=0.0001;
	}
	}


}


// ASTEROID


function Asteroid(posX,posY,_size){
	this.asteroidX = random(windowHeight);
	this.asteroidY= random(windowWidth);
	this.size = _size;

this.drawAsteroid = function(){
	push();
	image(rock, this.asteroidX, this.asteroidY, this.size, this.size);
	pop();



}

	this.updateAsteroid = function(){
		this.asteroidX = this.asteroidX+10;
		this.asteroidY = this.asteroidY+5;
	}
}

// STARS

function Star() {
	this.x = random(windowWidth);
	this.y = random(windowHeight);
	this.w = 2;
	this.h = 2;
}
Star.prototype.draw = function() {
	noStroke();
	fill(102, 102, 102);
	ellipse(this.x, this.y, this.w, this.h);
	this.x += (random(3) - 1.5);
	this.y += (random(3) - 1.5);
	if (this.w == 2) {
    this.w = 3;
    this.h = 3;
} else {
    this.w = 2;
    this.h = 2;
}
}

function ShootingStar() {
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.w = 6;
  this.h = 4;
}

ShootingStar.prototype.draw = function() {
  noStroke();
  fill(255, 255, 0);
  ellipse(this.x, this.y, this.w, this.h);
  if (this.h > 0) {
    this.h -= 0.5;
  }
  this.w += 7;
  this.x += 5;
}




// CODE USED AS REFERENCE:
// https://codeburst.io/sunsets-and-shooting-stars-in-p5-js-92244d238e2b
