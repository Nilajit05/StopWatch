const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
//1
let startTime;
let intervalId;
let elapsedTime = 0;
let isRunning = false;
let pauseTime = 0;
//2 update display
function updateDisplay() {
  const currentTime = Date.now();
  const deltaTime = currentTime - startTime + elapsedTime;
  const formattedTime = formatTime(deltaTime);
  timeDisplay.textContent = formattedTime;
}
//3 formating time
function formatTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
//4 checking start timer
function startTimer() {
  if (!isRunning) {
    if (pauseTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - pauseTime;
    }
    intervalId = setInterval(updateDisplay, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    isRunning = true;
  }
}
//5 checking stop timer
function stopTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    pauseTime = Date.now() - startTime;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    isRunning = false;
  }
}
//6 checking reset timer
function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  pauseTime = 0;
  timeDisplay.textContent = '00:00:00:00';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  isRunning = false;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
