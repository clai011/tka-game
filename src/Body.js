

























// creates a constructor function - research ES6 classes
class Body {

    // this is what's called when you use the "new" keyword
    constructor($el) {
        this.node = $('<div id="body"></div>');
        this.currentDirection = 'right'; // follow previous body seg
        this.SPEED = 600;
        $el.append(this.node);
        this.node.css({ top: previousPos.top, left: previousPos.left });
        setTimeout(this.move.bind(this), this.SPEED);

    }

    // same as Head.prototype.move = function() {...}
    move() {
        let direction = this.currentDirection; // right
        let position = this.node.position();


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



        this.node.css(position);
        setTimeout(this.move.bind(this), this.SPEED);
    }

}

