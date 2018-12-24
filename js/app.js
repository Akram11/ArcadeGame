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
  if (this.x > 500) {
    this.x = -100;
  } else {
    this.x += 150 * dt * this.speed;
  }
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Player {
  //Set the inital location to the center bottom
  constructor() {
    this.x = 202;
    this.y = 387;
    this.sprite = 'images/char-boy.png';
    this.xMovement = 101;
    this.yMovement = 83;
  }

  // Draw the Player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //check for collision:
  // if the player Y locaion equals to a Y locaion of any of the enimies and
  // if the x locaion of player is in the range of an enemy's width X location
  // the width was calculated to suit the gameplay the best (+60 from the front and -50 from the rare)
  // the second if statments check if the player has reached the water (won).
  // in both cases -collision or winning- the game resets itself, setting the player back to the initial location.
  update() {
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && enemy.x - 50 < this.x && enemy.x + 60 > this.x) {
        this.reset();
      }
    }
    if (this.y === -28) {
      this.reset();
    }
  }

  //handle arrow keys presses
  //in order to move the player a block vertically on each press, x valuve needs to be changed by the value 101
  //in order to move the player a block horizontally on each press, y valuve needs to be changed by the value 83
  //an if statment on each key to prevents the player to go off the canvas.
  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > 0) {
          this.x -=   this.xMovement;
        }
        break;
      case 'right':
        if (this.x < 404) {
          this.x +=   this.xMovement;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.yMovement;
        }
        break;
      case 'down':
        if (this.y < 350) {
          this.y += this.yMovement;
        }
        break;
    }
  }

  //set the location to the initial axis
  reset() {
    this.x = 202;
    this.y = 387;
  }
}

//adding enemies to allEnemies array, setting the Y to one of the three columns, and the speed to a different value.
let allEnemies = [new Enemy(55, 2.5), new Enemy(55, 2), new Enemy(55 + 83, 2.7), new Enemy(55 + 83 * 2, 0.2), new Enemy(55 + 83 * 2, 1.2)];
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
