function playBounce(url) {
  var sound = new Audio(url);
  sound.play();
  sound.volume = 0.3;
}

mdown = false;
msel = [[], []];
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
