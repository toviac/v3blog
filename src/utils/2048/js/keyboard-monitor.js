/* eslint-disable */
var keyMonitor = function () {
  $(document).keydown(function (event) {
    var e = event || window.event;
    var k = e.keyCode || e.which;
    switch (k) {
      case 38: //Up
        e.preventDefault();
        moveUp();
        isTriggered();
        break;
      case 40: //Down
        e.preventDefault();
        moveDown();
        isTriggered();
        break;
      case 37: //Left
        e.preventDefault();
        moveLeft();
        isTriggered();
        break;
      case 39: //Right
        e.preventDefault();
        moveRight();
        isTriggered();
        break;
    }
  });
};

export default keyMonitor;