const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let currentIndex = 0;
let startTime = null;
let intervalId = null;
let finalTime = null

updateHighestScoreElement()

const letterSpans = document.querySelectorAll('p.font-LilitaOne > span');
const textArea = document.querySelector('textarea');
const messageElement = document.querySelector('p.text-sm');
const timerElement = document.getElementById('timer');

function handleInput(event) {
    const inputLetter = event.target.value.trim().toUpperCase();
    if (inputLetter === alphabet[currentIndex]) {
        event.target.value = '';
        letterSpans[currentIndex].classList.remove('text-alphabet-pink');
        letterSpans[currentIndex].classList.add('text-alphabet-teal');
        currentIndex++;
        if (currentIndex === alphabet.length) {
            endGame();
        } else {
            letterSpans[currentIndex].classList.remove('text-gray-300');
            letterSpans[currentIndex].classList.add('text-alphabet-pink');
        }
    } else if (inputLetter) {
        event.target.value = '';
    }
    startTimer();
}

function startTimer() {
    if (!startTime) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateTimer, 10);
    }
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    finalTime = elapsedTime.toFixed(3);
    timerElement.textContent = `Time: ${finalTime} s`;
}

function endGame() {
    clearInterval(intervalId);
    messageElement.textContent = `Congratulations! You typed the alphabet in ${finalTime} seconds.`;

    // Create a reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('bg-alphabet-pink', 'text-white', 'py-2', 'px-4', 'rounded', 'mt-4', 'margin-around');
    messageElement.parentNode.insertBefore(resetButton, messageElement.nextSibling);
    updateHighestScore();
    // Add event listener to reset button
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    currentIndex = 0;
    startTime = null;
    clearInterval(intervalId);
    letterSpans.forEach(span => {
        span.classList.remove('text-alphabet-teal');
        span.classList.remove('text-alphabet-pink');
        span.classList.add('text-gray-300');
    });
    letterSpans[0].classList.remove('text-gray-300');
    letterSpans[0].classList.add('text-alphabet-pink');
    textArea.value = '';
    messageElement.textContent = '';
    timerElement.textContent = 'Time: 0.000 s';
    document.getElementById('textarea').focus();
    // Remove the reset button
    const resetButton = document.querySelector('button');
    if (resetButton) {
        resetButton.remove();
    }
}

const updateHighestScore = () => {
    // Highest score is 100 number in 30sec.
    let currentScoreSec = finalTime;
    if (finalTime){
        if(localStorage.getItem('AZhighScoreSec') !== null){
            currentScoreSec = (currentScoreSec < localStorage.getItem('AZhighScoreSec')) ? currentScoreSec : localStorage.getItem('AZhighScoreSec');
        }

        localStorage.setItem('AZhighScoreSec', currentScoreSec);
    }
    updateHighestScoreElement()
}
function updateHighestScoreElement() {
    if (localStorage.getItem('AZhighScoreSec') !== null){
        document.getElementById("highest-score-div").innerHTML = `Fastest Time: ${localStorage.getItem('AZhighScoreSec')}sec`
    }
}
textArea.addEventListener('input', handleInput);
resetGame();
