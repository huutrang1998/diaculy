let isRotating = true;
        const secondHand = document.getElementById('secondHand');
        const stopButton = document.getElementById('stopButton');
        const airplan = document.getElementById('airplane');
        const tempSpeed = document.getElementById('speed').value;
        const tempDistance = document.getElementById('distance').value;

        let currentSpeed = tempDistance / tempSpeed;

        stopButton.addEventListener('click', () => {
            if (isRotating) {
                secondHand.style.animationPlayState = 'paused';
                airplan.style.animationPlayState = 'paused';
                stopButton.textContent = 'Tiếp Tục';
                stopButton.style.backgroundColor = "darkcyan";
            } else {
                secondHand.style.animationPlayState = 'running';
                airplan.style.animationPlayState = 'running';
                stopButton.textContent = 'Dừng';
                stopButton.style.backgroundColor = "#c50000";
            }
            isRotating = !isRotating;
        });

        function calculateSpeed() {
            const tempSpeed = document.getElementById('speed').value;
            const tempDistance = document.getElementById('distance').value;

            if (tempSpeed != 0) {
                currentSpeed = tempDistance / tempSpeed;
            }
            SaveSpeed();
        }

        function SaveSpeed() {
            let currentState = secondHand.style.animationPlayState;
            secondHand.style.animation = 'rotateSeconds ' + currentSpeed + 's linear infinite';
            airplan.style.animation = 'moveAround ' + currentSpeed + 's linear infinite';
            secondHand.style.animationPlayState = currentState;
            airplan.style.animationPlayState = currentState;
        }

        // Automatically speaking numbers 1 to 1000 in Vietnamese
        function speakNumbers() {
            let number = 1;  // Start from 1
            const interval = 2000;  // 2 seconds interval for slow speech

            function speak() {
                if (number <= 1000) {
                    const utterance = new SpeechSynthesisUtterance(number.toString());
                    utterance.lang = 'vi-VN';  // Set language (Vietnamese)

                    // Slow down the speech rate (normal is 1)
                    utterance.pitch = 1;
                    utterance.rate = 0.8;  // Slower rate
                    utterance.volume = 1;  // Full volume

                    window.speechSynthesis.speak(utterance);

                    // Increment the number after the speech has finished
                    number++;
                } else {
                    console.log("Finished speaking up to 1000.");
                }
            }

            // Use setInterval to speak each number at regular intervals
            const intervalID = setInterval(() => {
                speak();
                if (number > 1000) {
                    clearInterval(intervalID);  // Stop when we reach 1000
                }
            }, interval);
        }

        // Automatically trigger speakNumbers when the page has finished loading
        window.onload = function() {
            speakNumbers();
        };
