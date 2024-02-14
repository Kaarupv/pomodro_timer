var pomodroTime = 25 * 60;

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

document.getElementById("timer_start").addEventListener("click", function () {
  var downloadTimer = setInterval(function function1() {
    document.getElementById("countdown").innerHTML =
      fmtMSS(pomodroTime) + " seconds remaining";

    pomodroTime -= 1;
    if (pomodroTime <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Time is up!";
    }
  }, 1000);
});
