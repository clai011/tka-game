class Apple {

  constructor($el) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'src/assets/apple.jpg');
    $el.append(this.node);
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    this.node.css({ top: getRandomInt(14) * 50, left: getRandomInt(14) * 50 });
    console.log(this.node.position());
  }


}
let apple = new Apple($('#board'));