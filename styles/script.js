var bounce = new Audio("./assets/funny.mp3");
var dog = new Audio("./assets/doggy.mp3");
var horse = new Audio("./assets/horse.mp3");

function playSound(url) {
  url.play();
  url.volume = 0.4;
}

mdown = false;
msel = [
  [],
  []
];
var funcfalse = function () {
  console.log("selsta");
};
var getpos = function (o, i) {
  var o = $(o); // get position of current cell
  msel[0][i] = o.parent().index(); // set row
  msel[1][i] = o.index(); // set column
  return msel;
};
var modsel = function (o) {
  var numsrt = function (a, b) {
    return a - b;
  };
  var r = getpos(o, 1)[0].slice(0);
  r.sort(numsrt);
  var c = msel[1].slice(0);
  c.sort(numsrt);
  $trs = $("#table-1 tbody tr");
  $("td", $trs).removeClass("hi_td");
  $trs.slice(r[0], r[1] + 1).each(function () {
    $("td", this)
      .slice(c[0] - 1, c[1])
      .addClass("hi_td");
  });
  $("#table-1 thead tr th")
    .removeClass("hi_th")
    .slice(c[0], c[1] + 1)
    .addClass("hi_th");
  $("#table-1 tbody tr th")
    .removeClass("hi_th")
    .slice(r[0], r[1] + 1)
    .addClass("hi_th");
};
var hover = function (ev) {
  if (mdown) modsel(this);
};
var mo = function (ev) {
  mdown = ev.type == "mousedown" ? 1 : 0;
  getpos(this, 1 - mdown);
  if (mdown) modsel(this);
};
var $tbl = $("#table-1"),
  $tblHead = $("#table-1 thead tr");
$("tbody td", $tbl).on({
  mousedown: mo,
  mouseup: mo,
  mouseenter: hover,
  selectstart: funcfalse,
});

var number1;
var number2;
var answer3;
var answer2;

function problem() {
  number1 = Math.floor(1 + Math.random() * 9);
  number2 = Math.floor(1 + Math.random() * 9);
  document.getElementById("prompt").innerHTML =
    "<b>" + number1 + "</b>" + " razy " + "<b>" + number2 + "</b>" + " to?";
  answer2 = number1 * number2;
}

var counter = 0;

function Milestone() {
  $("#Winning").addClass("surprise");
  setTimeout(function () {
    $("#Winning").removeClass("surprise");
  }, 1000);
}

function Milestone2() {
  $("#Winning2").addClass("surprise");
  setTimeout(function () {
    $("#Winning2").removeClass("surprise");
  }, 1000);
}

function answer1() {
  var statusDiv = document.getElementById("status");
  answer3 = document.getElementById("answer").value;

  if (answer3 != answer2) {
    document.getElementById("result").innerHTML = "Wynik: ";
    statusDiv.innerHTML =
      "<b class='znaczek' style='color: red'>&#10006;</b> Pudło! Spróbuj jeszcze raz. :-)";
    document.getElementById("answer").value = "";
    counter = 0;
  } else if (answer3 == answer2) {
    statusDiv.innerHTML =
      "<b class='znaczek' style='color: green;'>&#10004;</b> Tak, super!";
    document.getElementById("answer").value = "";
    if (counter < 2) {
      document.getElementById("result").innerHTML += "&#128054;";
      counter++;
    } else if (counter == 2) {
      playSound(dog);
      document.getElementById("result").innerHTML += "&#128054;";
      Milestone();
      counter++;
    } else if (counter > 2 && counter < 6) {
      document.getElementById("result").innerHTML += "&#129412;";
      counter++;
    } else if (counter == 6) {
      playSound(horse);
      counter = 0;
      document.getElementById("result").innerHTML = "Wynik: ";
      Milestone2();
      confetti();
      modal.style.display = "none";
    }
    problem();
  }
}

function confetti() {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;

  var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";
  var particles = [];
  var pIndex = 0;
  var x, y, frameId;

  function Dot(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    particles[pIndex] = this;
    this.id = pIndex;
    pIndex++;
    this.life = 0;
    this.maxlife = 600;
    this.degree = getRandom(0, 360);
    this.size = Math.floor(getRandom(8, 10));
  }

  Dot.prototype.draw = function (x, y) {
    this.degree += 1;
    this.vx *= 0.99;
    this.vy *= 0.999;
    this.x += this.vx + Math.cos((this.degree * Math.PI) / 180);
    this.y += this.vy;
    this.width = this.size;
    this.height = Math.cos((this.degree * Math.PI) / 45) * this.size;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.x / 2, this.y + this.y / 2);
    ctx.lineTo(
      this.x + this.x / 2 + this.width / 2,
      this.y + this.y / 2 + this.height
    );
    ctx.lineTo(
      this.x + this.x / 2 + this.width + this.width / 2,
      this.y + this.y / 2 + this.height
    );
    ctx.lineTo(this.x + this.x / 2 + this.width, this.y + this.y / 2);
    ctx.closePath();
    ctx.fill();
    this.life++;

    if (this.life >= this.maxlife) {
      delete particles[this.id];
    }
  };

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height / 2;
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (frameId % 3 == 0) {
      new Dot(
        canvas.width * Math.random() -
        canvas.width +
        (canvas.width / 2) * Math.random(),
        -canvas.height / 2,
        getRandom(1, 3),
        getRandom(2, 4),
        "#ff5749"
      );
      new Dot(
        canvas.width * Math.random() +
        canvas.width -
        canvas.width * Math.random(),
        -canvas.height / 2,
        -1 * getRandom(1, 3),
        getRandom(2, 4),
        "#ffeceb"
      );
    }
    for (var i in particles) {
      particles[i].draw();
    }
    frameId = requestAnimationFrame(loop);
  }

  loop();

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}

$(".hth").click(function () {
  var daTable = $(this).closest("table");
  var index = $(this).index() - 1;
  $(".hth").removeClass("hi_th_r");
  $(this).addClass("hi_th_r");
  daTable.find("td").removeClass("selected");
  daTable.find("tr").each(function () {
    $(this).find("td").eq(index).addClass("selected");
  });
});

$("#table-1 tbody tr th").click(function () {
  $("#table-1 tr").removeClass("highlighted");
  $("#table-1 tbody tr th").removeClass("hi_th_r");
  $(this).addClass("hi_th_r");
  $(this).parent().addClass("highlighted");
});