var pomodoroTime = 5;
var isTimerRunning = false;
var downloadTimer;

function fmtMSS(s) {
  var minutes = Math.floor(s / 60);
  var seconds = s % 60;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  return formattedMinutes + ":" + formattedSeconds;
}

document.getElementById("timer_start").addEventListener("click", function () {
  if (!isTimerRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

document.getElementById("timer_reset").addEventListener("click", function () {
  resetTimer();
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

function resetTimer() {
  clearInterval(downloadTimer);
  isTimerRunning = false;
  pomodoroTime = 5;
  document.getElementById("countdown").innerHTML = fmtMSS(pomodoroTime);
  document.getElementById("timer_start").value = "Start";
}

const apiUrl = "https://type.fit/api/quotes";
const outputElement = document.getElementById("output");

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("not ok");
    }
    return response.json();
  })
  .then((data) => {
    outputElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
