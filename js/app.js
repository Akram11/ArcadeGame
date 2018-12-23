// Enemies our player must avoid
var Enemy = function(y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = y;
  this.move = 101;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x > 500){
    this.x = -100;
  }else {
    this.x += 200 * dt * this.speed;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  //constructor
  constructor() {
    this.x = 202;
    this.y = 387;
    this.sprite = 'images/char-boy.png';
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update(){
    for(let enemy of allEnemies){
      if (this.y === enemy.y && enemy.x - 50 < this.x && enemy.x + 60 > this.x) {
         this.reset();
      }
    }
    if (this.y === -28){
      this.reset();
    }
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > 0) {
          this.x -= 101;
        }
        break;
      case 'right':
        if (this.x < 404) {
          this.x += 101;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= 83;
        }
        break;
      case 'down':
        if (this.y < 350) {
          this.y += 83;
        }
        break;
    }
  }
  //properties

  //methods
  //update
  // update(){
  //   console.log('update');
  // }
  //checkCollisions
  //checkWin
  //render

  //handle input
  reset(){
    this.x = 202;
    this.y = 387;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(55, 2.5), new Enemy(55 + 83, 2.7), new Enemy(55 + 83 * 2, 0.2)];
const player = new Player();

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
