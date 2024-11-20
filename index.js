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

    document.getElementById('speakButton').addEventListener('click', function() {
    const speed = document.getElementById('speed').value;
    const distance = document.getElementById('distance').value;
    const message = `Tốc độ hiện tại là ${speed} mét trên giây và khoảng cách là ${distance} mét.`;
    
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        
        // Set the language to Vietnamese
        utterance.lang = 'vi-VN'; 

        // Optionally, set the voice to a Vietnamese voice if available
        const voices = speechSynthesis.getVoices();
        const vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN');
        if (vietnameseVoice) {
            utterance.voice = vietnameseVoice;
        }

        speechSynthesis.speak(utterance);
    } else {
        alert('Speech synthesis is not supported in this browser.');
    }
});
