var pomodoroTime = 1500;
var isTimerRunning = false;
var downloadTimer;

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

document.getElementById("timer_start").addEventListener("click", function () {
  if (!isTimerRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

function startTimer() {
  isTimerRunning = true;
  document.getElementById("timer_start").value = "Pause";
  downloadTimer = setInterval(function () {
    document.getElementById("countdown").innerHTML = fmtMSS(pomodoroTime);
    pomodoroTime -= 1;
    if (pomodoroTime <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Take a break";
      isTimerRunning = false;
      document.getElementById("timer_start").value = "Start";
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(downloadTimer);
  isTimerRunning = false;
  document.getElementById("timer_start").value = "Start";
}
