/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = startX;
    this.y = startY;
    this.magic = 94.245
    this.speed = Math.floor((Math.random() * 2.5 + 1) * this.magic);
    this.sprite = 'images/narwall.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -60;
        this.speed = Math.floor((Math.random() * 2.5 + 1) * this.magic);
    }
      
    var enemyTop = this.y - 50;
    var enemyBottom = this.y + 50;
    var enemyLeft = this.x - 50;
    var enemyRight = this.x + 50;
    
    if (player.y > enemyTop && player.y < enemyBottom && player.x > enemyLeft && player.x < enemyRight) {
        player.playerLives = player.playerLives - 1;
        console.log('You Died, This Much: ' + player.playerLives);
        player.fmtdplayerLives = HTMLlives.replace('%LIVES%', player.playerLives);
        document.getElementById('lives').innerHTML = player.fmtdplayerLives;        
        player.x = player.xStart;
        player.y = player.yStart;
    }
    
    if (player.y <= 50) {
        this.magic = this.magic * 1.075;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.playerScore = 0;
    this.playerLives = 5;
    this.sprite = 'images/unir.png';
    this.xStart = 200;
    this.yStart = 400;
    this.x = this.xStart;
    this.y = this.yStart;
    
    HTMLscore = '<h3>SCORE</h3><p>%SCORE%</p>';
    this.fmtdplayerScore = HTMLscore.replace('%SCORE%', this.playerScore);
    document.getElementById('score').innerHTML = this.fmtdplayerScore;
    
    HTMLlives = '<h3>LIVES</h3><p>%LIVES%</p>';
    this.fmtdplayerLives = HTMLlives.replace('%LIVES%', this.playerLives);
    document.getElementById('lives').innerHTML = this.fmtdplayerLives;
}

Player.prototype.update = function() {
    if (this.y <=50) {
        this.playerScore = this.playerScore + 100;
        console.log("You Made It: " + this.playerScore);
        this.fmtdplayerScore = HTMLscore.replace('%SCORE%', this.playerScore);
        document.getElementById('score').innerHTML = this.fmtdplayerScore;
        this.x = this.xStart;
        this.y = this.yStart;
    } 
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPress) {
    var stepX = 100;
    var stepY = 82.5;
    
    if (keyPress === 'left') {
        if (this.x <= 50) {
            //this.boundsMessage();
            console.log("STOP, Can't Go LEFT Jim!");
            return null;
        }
        this.x -= stepX;
    } else if (keyPress === 'right') {
        if (this.x >= 400) {
            //this.boundsMessage();
            console.log("STOP, Can't Go RIGHT Jim!");
            return null;
        }
        this.x += stepX;
    } else if (keyPress === 'up') {
        if (this.y <= 50) {
            this.update();
            console.log("You Made It Jim!");
            return null;
        }
        this.y -= stepY;
    } else if (keyPress === 'down') {
        if (this.y >= 375) {
            //this.boundsMessage();
            console.log("STOP, Can't Go BACK Jim!");
            return null;
        }
        this.y += stepY;
    } else {
        console.log('That is not the right key!');
        return null;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i ++) {
    allEnemies.push(new Enemy(-60, 65 + 82.5 * i));
}

var player = new Player();

var audio = document.getElementById('bg-music');
audio.src = 'images/Dreaming.mp3';
audio.autoplay = true;
audio.volume = 0.15;
audio.loop = true;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        27: 'pause', //"ESCAPE"
        80: 'pause', //"P"
        37: 'left',
        65: 'left', //"A"
        38: 'up',
        87: 'up', //"W"
        39: 'right',
        68: 'right', // "D"
        40: 'down',
        83: 'down', // "S"
        13: 'powerUp', // "ENTER"
        32: 'powerUp' // "SPACE"    
    };
    player.handleInput(allowedKeys[e.keyCode]);
});