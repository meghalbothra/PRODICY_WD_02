var ms = 0, s = 0, m = 0, h = 0;
var timer;
var display = document.querySelector(".timer-Display");
var laps = document.querySelector(".laps");
var lapTimes = [];
var processingAction = false; // Flag to track whether an action is being processed

// Check for page visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, handleVisibilityChange);

function handleVisibilityChange() {
  if (document[hidden]) {
    // Page is not visible, stop the timer
    reset();
  } else {
    // Page is visible, resume the timer
    if (!processingAction) {
      start();
    }
  }
}

function start() {
  if (!timer && !processingAction) {
    processingAction = true;
    timer = setInterval(function() {
      run();
      processingAction = false;
    }, 10);
  }
}

function run() {
  if (!document[hidden]) {
    // Only update display if the page is visible
    display.innerHTML = getTimer();
    ms++;
    if (ms == 100) {
      ms = 0;
      s++;
    }
    if (s == 60) {
      s = 0;
      m++;
    }
    if (m == 60) {
      m = 0;
      h++;
    }

    if (h == 13) {
      h = 1;
    }
  }
}

function pause() {
  if (!processingAction) {
    processingAction = true;
    stopTimer();
    processingAction = false;
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = false;
}

function reset() {
  if (!processingAction) {
    processingAction = true;
    stopTimer();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    lapTimes = [];
    display.innerHTML = getTimer();
    laps.innerHTML = "";
    processingAction = false;
  }
}

function restart() {
  reset();
  start();
}

// lap = taking screenshot of current time...
function lap() {
  if (timer && !processingAction) {
    processingAction = true;
    var Li = document.createElement("li");
    Li.innerHTML = getTimer();
    lapTimes.push(getTimer()); // Store lap time in the lapTimes array
    laps.appendChild(Li);
    processingAction = false;
  }
}

function resetLap() {
  if (!processingAction) {
    processingAction = true;
    laps.innerHTML = "";
    lapTimes = []; // Clear lap times
    processingAction = false;
  }
}

function getTimer() {
  return (
    (h < 10 ? "0" + h : h) +
    " : " +
    (m < 10 ? "0" + m : m) +
    " : " +
    (s < 10 ? "0" + s : s) +
    " : " +
    (ms < 10 ? "0" + ms : ms)
  );
}
