/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const targetDateInput = document.getElementById('targetDate');
    const startButton = document.getElementById('startButton');
    const daysDisplay = document.getElementById('days');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const eiffelTower = document.getElementById('eiffel');
    let countdownInterval;
    let targetTime = localStorage.getItem('targetTime');

    if (targetTime) {
        targetTime = parseInt(targetTime);
        startCountdown(targetTime);
    }

    startButton.addEventListener('click', () => {
        const targetDateValue = targetDateInput.value;
        if (!targetDateValue) {
            alert('Please select a date and time.');
            return;
        }

        const targetDate = new Date(targetDateValue).getTime();

        if (isNaN(targetDate)) {
            alert('Invalid date format.');
            return;
        }

        localStorage.setItem('targetTime', targetDate);
        targetTime = targetDate;
        startCountdown(targetTime);
    });

    function startCountdown(targetTime) {
        clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            console.log("Distance:", distance);

            if (distance < 0) {
                clearInterval(countdownInterval);
                daysDisplay.textContent = '00';
                hoursDisplay.textContent = '00';
                minutesDisplay.textContent = '00';
                secondsDisplay.textContent = '00';
                eiffelTower.classList.remove('light-up');
                localStorage.removeItem('targetTime');
                progressBar.style.width = '0%';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysDisplay.textContent = String(days).padStart(2, '0');
            hoursDisplay.textContent = String(hours).padStart(2, '0');
            minutesDisplay.textContent = String(minutes).padStart(2, '0');
            secondsDisplay.textContent = String(seconds).padStart(2, '0');

            if (distance < 10000) {
                eiffelTower.classList.add('light-up');
            } else {
                eiffelTower.classList.remove('light-up');
            }

            const storedTargetTime = localStorage.getItem('targetTime');
            console.log("Stored Target Time (String):", storedTargetTime);

            if (storedTargetTime) {
                const initialTargetTime = parseInt(storedTargetTime);
                const totalTime = initialTargetTime - new Date().getTime();
                console.log("Total Time:", totalTime);

                const progress = 100 - (distance / (initialTargetTime - new Date().getTime())) * 100;
                console.log("Progress:", progress);

                if (progress >= 0 && progress <= 100) {
                    progressBar.style.width = `${progress}%`;
                } else {
                    console.log("Progress out of range:", progress);
                }
            } else {
                console.log("Target Time not stored in local storage.");
            }
        }, 1000); // Closing brace for setInterval
    } // Closing brace for startCountdown
});