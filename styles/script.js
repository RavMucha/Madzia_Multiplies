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
  setTimeout(function () {
    $("#Winning").addClass("surprise");
  }, 10);
  setTimeout(function () {
    $("#Winning").removeClass("surprise");
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
      document.getElementById("Pet").src = "./assets/dog.png";
      playSound(dog);
      document.getElementById("result").innerHTML += "&#128054;";
      Milestone();
      counter++;
    } else if (counter > 2 && counter < 6) {
      document.getElementById("result").innerHTML += "&#129412;";
      counter++;
    } else if (counter == 6) {
      document.getElementById("Pet").src = "./assets/unicorn.png";
      playSound(horse);
      counter = 0;
      document.getElementById("result").innerHTML = "Wynik: ";
      Milestone();
      modal.style.display = "none";
    }
    problem();
  }
}