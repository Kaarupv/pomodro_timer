var pomodoroTime = 1500;
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
  pomodoroTime = 1500;
  document.getElementById("countdown").innerHTML = fmtMSS(pomodoroTime);
  document.getElementById("timer_start").value = "Start";
}

const apiUrl = "https://type.fit/api/quotes";
const outputElement = document.getElementById("output");

let currentIndex = 0;
let timer;

function fetchQuotes() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayQuote(data);
      timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % data.length;
        displayQuote(data);
      }, 30000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayQuote(data) {
  const quote = data[currentIndex];
  const author = quote.author.split(",")[0];
  outputElement.textContent = `"${quote.text}" - ${author}`;
}

fetchQuotes();
