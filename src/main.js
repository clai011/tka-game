let audio = document.getElementById("bgm");
function playBGM() {
  audio.play();
}

$(document).ready(function () {
  // Apple //

  playBGM();
  class Apple {
    constructor($el) {
      this.node = $('<img id="apple"></img>');
      this.node.attr("src", "src/assets/yx.png");
      $el.prepend(this.node);
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      this.node.css({
        top: getRandomInt(14) * 50,
        left: getRandomInt(14) * 50,
      });
      // console.log(this.node.position());
    }
  }
  let apple = new Apple($("#board"));

  let cry = document.getElementById("cry");
  let fail = document.getElementById("lost");

  function caterpieCry() {
    cry.play();
  }
  function pauseAudio() {
    audio.pause();
  }
  function playLostAudio() {
    fail.play();
  }
  function playMunch() {
    munch.play();
  }

  // End Apple //
  //---------------------------------------------------------------------//
  // Head //

  // Bodies array
  const snake = [];

  // Posistions array
  const trail = [];
  let counter = 0;
  // console.log('snake ', snake)

  // creates a constructor function - research ES6 classes

  class Head {
    // this is what's called when you use the "new" keyword
    constructor($el) {
      this.node = $('<div id="head"></div>');
      this.currentDirection = "right";
      this.SPEED = 300;
      $el.append(this.node);
      this.node.css({ top: 0, left: 0 });
      setTimeout(this.move.bind(this), this.SPEED);
    }

    // same as Head.prototype.move = function() {...}
    move() {
      let direction = this.currentDirection; // right
      let position = this.node.position();
      let appaPos = apple.node.position();
      trail.unshift({});
      trail[0].left = position.left;
      trail[0].top = position.top;

      // console.log(trail);

      if (direction === "right") {
        position.left += 50;
      }
      if (direction === "left") {
        position.left -= 50;
      }
      if (direction === "up") {
        position.top -= 50;
      }
      if (direction === "down") {
        position.top += 50;
      }

      // Body Hit
      for (let i = 0; i < trail.length; i++) {
        if (trail[i].left === position.left && trail[i].top === position.top) {
          pauseAudio();
          playMunch();
          caterpieCry();
          alert("R.I.P. 2020-2020");
          playLostAudio();
          // head.currentDirection = '';
          this.SPEED = 10000000;
        }
      }

      /*            =====               dEATh               ====== */
      if (
        position.top > 650 ||
        position.top < 0 ||
        position.left > 650 ||
        position.left < 0
      ) {
        // let board = document.getElementById('board');
        // let container = document.getElementById('container');
        // container.removeChild(board);
        pauseAudio();
        caterpieCry();
        alert(`Quest Failed. GG.`);
        playLostAudio();
        this.SPEED = 1000000000;
      }
      // Let head move around.
      // Add a new body at head's previous location.
      // Delete the tail.
      // Don't worry about the center.

      //console.log('Apple position', appaPos, ',', 'Head position: ', position, 'Snake: ', snake)

      /*            ===== EAT ====== */
      if (position.left === appaPos.left && position.top === appaPos.top) {
        let munch = document.getElementById("munch");

        let board = document.getElementById("board");
        let oldApple = document.getElementById("apple");
        playMunch();
        board.removeChild(oldApple); // remove old apple === eat

        // for (let i = 0; i < trail.length; i++) {
        //   if (trail[i].left === appaPos.left && trail[i].top === appaPos.top) {

        //   }
        // }

        //snake append
        snake.unshift(new Body($("#board")));
        counter++;

        // score inner text
        score.innerText = `${counter}`;

        //new apple
        apple = new Apple($("#board"));
        let headCollision = false;
        let bodyCollision = false;
        function appleCollision() {
          console.log("Inside Collision");
          headCollision = false;
          bodyCollision = false;
          console.log(
            "Head Collision :",
            headCollision,
            ",",
            "Body Collision: ",
            bodyCollision
          );
          if (appaPos.left === head.left && appaPos.top === head.top) {
            headCollision = true;
            board = document.getElementById("board");
            oldApple = document.getElementById("apple");
            board.removeChild(oldApple);
            apple = new Apple($("#board"));
          }
          for (let i = 0; i < trail.length; i++) {
            if (
              appaPos.left === trail[i].left &&
              appaPos.top === trail[i].top
            ) {
              bodyCollision = true;
              board = document.getElementById("board");
              oldApple = document.getElementById("apple");
              board.removeChild(oldApple);
              apple = new Apple($("#board"));
            }
          }
          if (headCollision === false && bodyCollision === false) {
            return;
          }
          if (headCollision === true || bodyCollision === true) {
            appleCollision();
          }
          return;
        }
        appleCollision();
      } else {
        // console.log(snake);
        snake.unshift(new Body($("#board")));
        // console.log(snake);
        snake.pop();
        board.removeChild(board.childNodes[2]);
        // console.log(board.childNodes[2])
      }

      // console.log(snake);

      if (!(trail.length - 1 < counter)) {
        trail.pop();
      }

      this.node.css(position);
      setTimeout(this.move.bind(this), this.SPEED);
    }
  }

  let head = new Head($("#board"));

  // End Head //
  //---------------------------------------------------------------------//
  // Main //

  // console.log(snake);
  //console.log(head);
  // const apple = new Apple($('#board'));
  let caterHead = document.getElementById("head");
  const score = document.getElementById("score");
  $("body").on("keydown", function (e) {
    if (e.keyCode === 37 && head.currentDirection !== "right") {
      //console.log('pressed left');
      caterHead.style.transform = "scaleX(-1)";
      head.currentDirection = "left";
    }
    if (e.keyCode === 38 && head.currentDirection !== "down") {
      // console.log('pressed up');

      head.currentDirection = "up";
    }
    if (e.keyCode === 39 && head.currentDirection !== "left") {
      // console.log('pressed right');
      caterHead.style.transform = "scaleX(1)";
      head.currentDirection = "right";
    }
    if (e.keyCode === 40 && head.currentDirection !== "up") {
      // console.log('pressed down');
      // caterHead.style.transform = "scaleY(-1)";
      head.currentDirection = "down";
    }
    if (e.keyCode === 65 && head.currentDirection !== "right") {
      //console.log('pressed left');
      caterHead.style.transform = "scaleX(-1)";
      head.currentDirection = "left";
    }
    if (e.keyCode === 87 && head.currentDirection !== "down") {
      // console.log('pressed up');

      head.currentDirection = "up";
    }
    if (e.keyCode === 68 && head.currentDirection !== "left") {
      // console.log('pressed right');
      caterHead.style.transform = "scaleX(1)";
      head.currentDirection = "right";
    }
    if (e.keyCode === 83 && head.currentDirection !== "up") {
      // console.log('pressed down');
      // caterHead.style.transform = "scaleY(-1)";
      head.currentDirection = "down";
    }
  });

  // End Main //
  //---------------------------------------------------------------------//
  // Body //
  // creates a constructor function - research ES6 classes
  class Body {
    // this is what's called when you use the "new" keyword
    constructor($el) {
      this.node = $('<div id="body"></div>');
      $el.append(this.node);
      this.node.css({ top: trail[0].top, left: trail[0].left });
    }

    // same as Head.prototype.move = function() {...}
  }
});

//Body
