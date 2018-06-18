//max x y for player
let maxP = 400;
let minP = 0;

//modal 
let modal = document.querySelector(".modal");
let playAgain = document.querySelector("#playAgain");
let closeX = document.querySelector(".close"); 


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x =x;
	this.y = y;
	this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/heart.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	//random speed
	if (this.x >= 505) {
		this.x = -50;
		this.speed = 120 + Math.floor((Math.random()* this.speed) +1); //spr czy 120 i czy może byc this speeed
	}

	//meeting with love colllision detection from developer.mozilla.org
	if (this.x > player.x && this.x < player.x + 60 && this.y < player.y + 40 && this.y > player.y) {
		console.log("uderzenie");
		player.reset();
	}
};

// Reset the player and monster positions when player catches a monster
var reset = function () {
  // Reset player's position to centre of canvas
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  // Place the monster somewhere on the canvas randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function(dt) {
	if (this.x > maxP) {
		this.x = maxP;
	}
	if (this.x < minP) {
		this.x = minP;
	}
	if (this.y > maxP) {
		this.y = maxP;
	}
	if (this.y <= -20) {
		this.y = -20;
		modal.style.display = "block";
	}	
}

Player.prototype.handleInput = function(keyPress) {
	if (keyPress == 'right') {
		this.x +=101;
	}	
	if (keyPress == 'left') {
		this.x -=101;
	}	
	if (keyPress == 'up') {
		this.y -=84;
	}	
	if (keyPress == 'down') {
		this.y +=84;
	}
};	


Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 70, 50), new Enemy(0, 150, 90), new Enemy(0, 235, 70)];

// Place the player object in a variable called player
let player = new Player (200, 400);

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//close modal function
closeX.addEventListener("click", function() {
		 modal.style.display = "none";
		 player.reset();
 });

// restart Game
playAgain.addEventListener("click", function() {
		modal.style.display = "none";
		player.reset();
 });
