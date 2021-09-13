/* eslint-disable */
import throttle from 'lodash.throttle';
const $ = require('jquery');

var keyMonitor = function () {
  var keyAction = function(event) {
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
  };
  $(document).keydown(throttle(function (event) {
    keyAction(event);
  }, 300));
};
var board = new Array(),
  len = 4,
  trigger = 0,
  score = 0,
  goal = 2048;

keyMonitor();

//-------------------init------------------------
var init = function () {
  for (var i = 0; i < len; i++) {
    board[i] = new Array();
    for (var j = 0; j < len; j++) {
      board[i][j] = 0;
    }
  };
  // board[1][0] = 2;
  // board[2][0] = 4;
  // board[3][0] = 2;
  score = 0;
  $("#score").text(score);
  $(".tile").remove();
  $(".show-result").remove();
  showMatirx();
  generateNewNumbers(2);
  var checkResult = setInterval(function () { //每500ms检测是否胜利或失败
    if (isWon()) {
      gameResult(0); //胜利
      clearInterval(checkResult);
    } else if (isDead()) {
      gameResult(1); //失败
      clearInterval(checkResult);
    }
  }, 500);

};

//--------------------showMatirx------------------
var showMatirx = function () {

  $("#main").html(board[0] + "<br>" + board[1] + "<br>" + board[2] + "<br>" + board[3] + "<br>");
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (board[i][j] != 0) {
        $(".tile-container").append("<div class='tile tile-position-" + i + "-" + j + "'><div class='inner-val val-" + board[i][j] + "'><span>" + board[i][j] + "</span></div></div>")
      }
    }
  }
}

//--------------------isTriggered-----------------
var isTriggered = function () {
  if (trigger) {
    setTimeout(function () {
      $(".tile-merged").removeClass("tile-merged")
    }, 1000);
    $(".tile-new").removeClass("tile-new");
    generateNewNumbers();
    trigger = 0;
  }
}

//--------------------GenerateNewNumbers----------
var generateNewNumbers = function (increasement) {
  var num = increasement || 1;
  var list = new Array();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        list.push({
          posX: i,
          posY: j
        });
      }
    }
  };
  if (list.length < num) {
    for (var i = 0; i < list.length; i++) {
      var x = list[i].posX;
      var y = list[i].posY;
      board[x][y] = 2;
      $(".tile-container").append("<div class='tile tile-new tile-position-" + x + "-" + y + "'><div class='inner-val val-2'><span>2</span></div></div>");
    }
  } else {
    for (var i = 0; i < num; i++) {
      var element = Math.floor(Math.random() * list.length);
      var x = list[element].posX;
      var y = list[element].posY;
      board[x][y] = 2;
      $(".tile-container").append("<div class='tile tile-new tile-position-" + x + "-" + y + "'><div class='inner-val val-2'><span>2</span></div></div>");
      list.splice(element, 1);
    }
  }
};

//--------------------ainmate--------------------
var animateMerge = function (val1, val2) {
  score = score + 5;
  $("#score").text(score);
  if (board[val1][val2] != 0) {
    $(".tile-container").append("<div class='tile tile-merged tile-position-" + val1 + "-" + val2 + "'><div class='inner-val val-" + board[val1][val2] + "'>" + board[val1][val2] + "</div></div>");
    $(".tile-position-" + val1 + "-" + val2).not(".tile-merged").remove();
  }
};

var animateMove = function (fromX, fromY, k, merge, ifVertical) { //k终点坐标
  var para = ifVertical || 0 //是否是垂直移动
  if (para) { //垂直移动
    $(".tile-position-" + fromX + "-" + fromY).removeClass("tile-position-" + fromX + "-" + fromY).addClass("tile-position-" + k + "-" + fromY);
    if (merge) {
      setTimeout(function () {
        animateMerge(k, fromY);
      }, 200);
      // setTimeout(function(){
      // $(".tile-position-" + k + "-" + fromY).not(".tile-merged").remove()
      // },300);
    }
  } else { //水平移动
    $(".tile-position-" + fromX + "-" + fromY).removeClass("tile-position-" + fromX + "-" + fromY).addClass("tile-position-" + fromX + "-" + k);
    if (merge) {
      setTimeout(function () {
        animateMerge(fromX, k);
      }, 200);
      // setTimeout(function(){
      // $(".tile-position-" + fromX + "-" + k).not(".tile-merged").remove()
      // },300);
    }
  }
};

// -------------------Move && Merge--------------
var moveUp = function () {
  for (var i = 1; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (board[i][j] != 0) {
        var k = 1;
        while (i - k >= 0 && board[i - k][j] === 0) { //从[i,j]向上找非零[i-k,j]
          k = k + 1;
        }
        if (i - k >= 0) { //[i-k,j]还在数组中
          if (board[i - k][j] === board[i][j]) {
            //merge
            board[i - k][j] = board[i - k][j] * 2; //相加(乘以2)
            board[i][j] = 0;
            trigger = 1;
            animateMove(i, j, i - k, 1, 1);
          } else if (k > 1) {
            //move
            var tmp = board[i][j]; //[i,j]移到[i-k+1,j]=0
            board[i][j] = 0; //不能直接把[i,j]设为0,因为有可能i-k+1=i <-这里修改了条件,不用担心i-k+1=i
            board[i - k + 1][j] = tmp;
            trigger = 1;
            animateMove(i, j, i - k + 1, 0, 1);
          }
        } else { //[i-k,j]不在数组中,说明[i,j]上方所有元素为0
          board[0][j] = board[i][j]; //[i,j]移到最上面
          board[i][j] = 0;
          trigger = 1;
          animateMove(i, j, 0, 0, 1);
        }
      }
    }
  }
};

var moveDown = function () {
  for (var i = len - 2; i >= 0; i--) {
    for (var j = 0; j < len; j++) {
      if (board[i][j] != 0) {
        var k = 1;
        while (i + k < len && board[i + k][j] === 0) {
          k = k + 1;
        }
        if (i + k < len) {
          if (board[i + k][j] === board[i][j]) {
            board[i + k][j] = board[i + k][j] * 2;
            board[i][j] = 0;
            trigger = 1;
            animateMove(i, j, i + k, 1, 1);
          } else if (k > 1) {
            var tmp = board[i][j];
            board[i][j] = 0;
            board[i + k - 1][j] = tmp;
            trigger = 1;
            animateMove(i, j, i + k - 1, 0, 1);
          }
        } else {
          board[len - 1][j] = board[i][j];
          board[i][j] = 0;
          trigger = 1;
          animateMove(i, j, len - 1, 0, 1);
        }
      }
    }
  }
};

var moveLeft = function () {
  for (var i = 0; i < len; i++) {
    for (var j = 1; j < len; j++) {
      if (board[i][j] != 0) {
        var k = 1;
        while (j - k >= 0 && board[i][j - k] === 0) {
          k = k + 1;
        }
        if (j - k >= 0) {
          if (board[i][j - k] === board[i][j]) {
            board[i][j - k] = board[i][j - k] * 2;
            board[i][j] = 0;
            trigger = 1;
            animateMove(i, j, j - k, 1, 0);
          } else if (k > 1) {
            var tmp = board[i][j];
            board[i][j] = 0;
            board[i][j - k + 1] = tmp;
            trigger = 1;
            animateMove(i, j, j - k + 1, 0, 0);
          }
        } else {
          board[i][0] = board[i][j];
          board[i][j] = 0;
          trigger = 1;
          animateMove(i, j, 0, 0, 0);
        }
      }
    }
  }
};

var moveRight = function () {
  for (var i = 0; i < len; i++) {
    for (var j = len - 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        var k = 1;
        while (j + k < len && board[i][j + k] === 0) {
          k = k + 1;
        }
        if (j + k < len) {
          if (board[i][j + k] === board[i][j]) {
            board[i][j + k] = board[i][j + k] * 2;
            board[i][j] = 0;
            trigger = 1;
            animateMove(i, j, j + k, 1, 0);
          } else if (k > 1) {
            var tmp = board[i][j];
            board[i][j] = 0;
            board[i][j + k - 1] = tmp;
            trigger = 1;
            animateMove(i, j, j + k - 1, 0, 0);
          }
        } else {
          board[i][len - 1] = board[i][j];
          board[i][j] = 0;
          trigger = 1;
          animateMove(i, j, len - 1, 0, 0);
        }
      }
    }
  }
};

//--------------------isDead----------------------
var isDead = function () {
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (i - 1 >= 0 && board[i][j] === board[i - 1][j]) {
        return false;
      } else if (i + 1 < len && board[i][j] === board[i + 1][j]) {
        return false;
      } else if (j - 1 >= 0 && board[i][j] === board[i][j - 1]) {
        return false;
      } else if (j + 1 < len && board[i][j] === board[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
};

//--------------------isWon-----------------------
var isWon = function () {
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (board[i][j] === goal) {
        return true;
      }
    }
  }
  return false;
}

//-------------------gameResult---------------------
var gameResult = function (result) { //显示游戏结果,胜利传入0,失败传入1
  if (result) {
    $(".game-container").append(
      `<div class="show-result">
<div class="game-over">
<p>Game Over!</p>
<button class="try-again">Try Again</button>
</div>
</div>`);
  } else {
    $(".game-container").append(
      `<div class="show-result">
<div class="you-win">
<p>You Win!</p>
<button class="try-again">Play Again</button>
</div>
</div>`);
  }
  $('.show-result .try-again').on('click', init);
}

// init();

export default init;