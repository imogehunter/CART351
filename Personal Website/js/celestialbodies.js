

var CelestialBody = function(_size, _pos, _color){
	this.size = _size;
	this.position = _pos.copy();
	this.color = _color;
};

CelestialBody.prototype.display = function(_imgs){
		if (_imgs != null){
			image(_imgs[0],(this.position.x - (this.size/2)), (this.position.y - (this.size/2)), this.size, this.size);
			console.log(_imgs[0].width);
		} else {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		}
};

var Planet = function( _center, _size, _major, _minor, _color, _orbitvelocity){
	CelestialBody.call(this, _size, createVector(_center.x + _major, _center.y + _minor), _color);

	this.center = _center;
	this.semiMajor = _major;
	this.semiMinor = _minor;
	this.orbitvelocity = _orbitvelocity;
	this.originalOrbitVelocity = _orbitvelocity;

	this.angle = 0.0;
};

Planet.prototype = Object.create(CelestialBody.prototype);

Planet.prototype.constructor = Planet;

Planet.prototype.orbit = function(){
	//this.angle += 0.01;
	this.angle +=this.orbitvelocity;
//	var density = Math.sqrt(this.size) * this.mass;

	(this.position.x = this.center.x  + this.semiMajor * Math.cos(this.angle));
	(this.position.y = this.center.y + this.semiMinor * Math.sin(this.angle));
}

Planet.prototype.display = function(_imgs, planetID){
	push();
	translate(this.position.x, this.position.y);

	if (_imgs != null){
		image(imgs[planetID], this.position.x, this.position.y, this.size, this.size);
	} else {
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.size, this.size);
	}
	pop();
}


var Satellite = function( _center, _size, _major, _minor, _color,_orbitvelocity){
	Planet.call(this, createVector(_center.x,_center.y), _size, _major, _minor, _color,_orbitvelocity);

};

Satellite.prototype = Object.create(Planet.prototype);

Satellite.prototype.constructor = Satellite;

Satellite.prototype.update = function(_center){
	this.center = _center.copy();
}

/////////////////////////////////////////////////////////////////////////////////////

var Template = function( _parameter1, _parameter2){
	CelestialBody.call(this, [size], [pos], [color]);

	this.variable1 = whatever;
	this.variable2 = otherWhatever;
};

Template.prototype = Object.create(CelestialBody.prototype);

Template.prototype.constructor = Template;

Template.prototype.functionA = function(){
	this.variable1 += someValue;
}

Template.prototype.display = function(){
	push();
	translate(this.position.x + number, this.position.y + number);
	pop();

	//If the display is the exact same, use the following expression.
	//CelestialBody.prototype.display.call(this);
	//Otherwise don't and this display will replace the CelestialBody display.

}
