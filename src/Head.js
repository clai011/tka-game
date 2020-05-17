const snake = new Array(196);




// creates a constructor function - research ES6 classes

class Head {

  // this is what's called when you use the "new" keyword
  constructor($el) {
    this.node = $('<div id="head"></div>');
    this.currentDirection = 'right';
    this.SPEED = 600;
    $el.append(this.node);
    this.node.css({ top: 0, left: 0 });
    setTimeout(this.move.bind(this), this.SPEED);
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let direction = this.currentDirection; // right
    let position = this.node.position();
    let previousPos = position;
    let appaPos = apple.node.position();

    if (direction === 'right') {
      position.left += 50;
    }
    if (direction === 'left') {
      position.left -= 50;
    }
    if (direction === 'up') {
      position.top -= 50;
    }
    if (direction === 'down') {
      position.top += 50;
    }
    if (position.top > 650 || position.top < 0 || position.left > 650 || position.left < 0) {
      // alert(`YOU'RE DEAD`)
      console.log('R.I.P.')

      this.SPEED = 1000000000;
    }
    console.log('Apple position', appaPos, ',', 'Head position: ', position, 'Snake: ', snake)

    if (position.left === appaPos.left && position.top === appaPos.top) {
      let board = document.getElementById('board');
      let oldApple = document.getElementById("apple");
      board.removeChild(oldApple); // remove old apple === eat

      //snake append
      for (let i = 0; i < snake.length; i++) {
        if (snake[i] === undefined) {
          snake[i] = new Body($('#board'));
          console.log(snake[i]);
          snake[i].currentDirection = snake[i - 1].currentDirection;
          snake[i].position = previousPos;
          break;
        }
      }
      apple = new Apple($('#board'));
    }


    this.node.css(position);
    setTimeout(this.move.bind(this), this.SPEED);
  }

}

snake[0] = new Head($('#board'));