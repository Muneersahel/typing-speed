const originText = document.querySelector(".text p").innerHTML;
const inputArea = document.querySelector(".text-input-area textarea");
const timer = document.querySelector(".timer");
const resetBtn = document.querySelector(".start-over-btn");

var theTimer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to timer
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a startt clock timer 
function runTimer() {
    let currentTime = leadingZero(theTimer[0]) + ":" + leadingZero(theTimer[1]) + ":" + leadingZero(theTimer[2]);
    timer.innerHTML = currentTime;
    theTimer[3]++;
    
    theTimer[0] = Math.floor((theTimer[3]/100)/60);
    theTimer[1] = Math.floor((theTimer[3]/100) - theTimer[0] * 60);
    theTimer[2] = Math.floor(theTimer[3] - (theTimer[1] * 100) - (theTimer[0] * 6000));

}

// Match the text entered with the provided text on the page
function spellCheck() {
    let textEntered = inputArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    if (textEntered.length == 0) {
        inputArea.style.borderColor = "#c2c5cc";
    } else if (textEntered == originText) {
        clearInterval(interval);
        inputArea.style.borderColor = "#429890";
    } else if (textEntered == originTextMatch) {
        inputArea.style.borderColor = "#65ccf3"
    } else {
        inputArea.style.borderColor = "#e95d0f"
    }
}

// Start the timer
function start() {
    let textEnteredLength = inputArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything
function reset() {
    clearInterval(interval);
    interval = null;
    theTimer = [0,0,0,0];
    timerRunning = false;

    inputArea.value = "";
    timer.innerHTML = "00:00:00";
    inputArea.style.borderColor = "#c2c5cc";
}

// Event lister for keyboard input and reset
inputArea.addEventListener("keypress", start, false);
inputArea.addEventListener("keyup", spellCheck, false);
resetBtn.addEventListener("click", reset, false);

