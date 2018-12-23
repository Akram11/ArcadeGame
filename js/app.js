// Enemies our player must avoid
var Enemy = function(y, speed) {
  this.sprite = 'images/enemy-bug.png';
  //set the initial X location to a random number so the game starts differently each time
  this.x = Math.random() * (-100 - -200) + -200;
  this.y = y;
  this.move = 101;
  this.speed = speed;
};
// Update the enemy's position
// Parameter: dt, a time delta between ticks
// when the enemey reaches the end of the canvas, set the X to -100 (beggning)
Enemy.prototype.update = function(dt) {
  if (this.x > 500){
    this.x = -100;
  }else {
    this.x += 150 * dt * this.speed;
  }
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Player {
  //Set the inital location to the center buttom
  constructor() {
    this.x = 202;
    this.y = 387;
    this.sprite = 'images/char-boy.png';
  }

// Draw the Player on the screen
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

  reset(){
    this.x = 202;
    this.y = 387;
  }
}


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
