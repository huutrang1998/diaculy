document.addEventListener('DOMContentLoaded', function () {
    let isRotating = true;
    const secondHand = document.getElementById('secondHand');
    const stopButton = document.getElementById('stopButton');
    const airplan = document.getElementById('airplan');
    const speedInput = document.getElementById('speed');
    const distanceInput = document.getElementById('distance');
    const roundInput = document.getElementById('round');
    
    function onRoundChange() {
        return roundInput.value;
    }

    console.log(secondHand, stopButton, airplan, speedInput, distanceInput); 

    if (!secondHand || !stopButton || !airplan || !speedInput || !distanceInput) {
        alert("Some elements are missing. Please check your HTML.");
        return; 
    }

    function calculateSpeed() {
        const speed = parseFloat(speedInput.value);
        const distance = parseFloat(distanceInput.value);

        if (speed > 0) {
            return distance / speed;
        }
        return 0; 
    }

    let currentSpeed = calculateSpeed();

    // Stop/Start button functionality
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

    

    function updateSpeed() {
        currentSpeed = calculateSpeed();

        if (currentSpeed > 0) {
            applyAnimations(currentSpeed);
        }
    }

    function applyAnimations(speed) {
        let currentState = secondHand.style.animationPlayState;
        let airplanState = airplan.style.animationPlayState;
        secondHand.style.animation = `rotateSeconds ${speed}s linear infinite`;
        airplan.style.animation = `moveAround ${speed}s linear infinite`;
        secondHand.style.animationPlayState = currentState;
        airplan.style.animationPlayState = airplanState;
    }

    speedInput.addEventListener('input', updateSpeed);
    distanceInput.addEventListener('input', updateSpeed);

    function getCurrentAngle(element) {
        const transform = window.getComputedStyle(element).getPropertyValue('transform');

        if (transform === 'none') {
            return 0;  // No rotation
        }

        const matrix = transform.match(/^matrix\((.+)\)$/)[1].split(', ');
        
        const angleInRadians = Math.atan2(parseFloat(matrix[1]), parseFloat(matrix[0]));
        
        let angleInDegrees = angleInRadians * (180 / Math.PI);
        
        // Ensure the angle is always positive
        if (angleInDegrees < 0) {
            angleInDegrees += 360;
        }
        
        return angleInDegrees;
    }
    var lastKey = {};

    setInterval(() => {
        const angle = getCurrentAngle(secondHand);
        var currentKey = null;
        switch (Number(roundInput.value))
        {
            case 1: {
                currentKey = getCloseKeyValue(angle, r1Values);
                break;
            }
            case 2: {
                currentKey = getCloseKeyValue(angle, r2Values);
                break;
            }
            case 3: {
                currentKey = getCloseKeyValue(angle, r3Values);
                break;
            }
            case 4: {
                currentKey = getCloseKeyValue(angle, r4Values);
                break;
            }
            default:
                {
                    currentKey = getCloseKeyValue(angle, r1Values);
                    break;
                }
        }
        console.log('test:', angle, roundInput.value);
        if(currentKey != null && JSON.stringify(currentKey) != JSON.stringify(lastKey))
        {
            console.log('Current angle of the second hand:', angle, currentKey.key, currentKey.value);
            lastKey = currentKey;

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(currentKey.value);
                utterance.lang = 'vi-VN';
                utterance.rate = 2;
                const voices = speechSynthesis.getVoices();
                const vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN');
                if (vietnameseVoice) {
                    utterance.voice = vietnameseVoice;
                }
    
                speechSynthesis.speak(utterance);
            } else {
                alert('Speech synthesis is not supported in this browser.');
            }
        }
        
    }, 100);
});

function getCloseKeyValue(number, array) {
    const tolerance = 2; // Define the tolerance range of ±5
    const match = array.find(item => Math.abs(item.key - number) <= tolerance);
    return match ? match : null;  // Return the matched object, or null if no match is found
}

var r4Values = [
    {
        key: 300,
        value: 60
    },
    {
        key: 316,
        value: 55
    },
    {
        key: 330,
        value: 50
    },
    {
        key: 347,
        value: 45
    },
    {
        key: 6,
        value: 40
    },
    {
        key: 12,
        value: 38
    },
    {
        key: 19,
        value: 36
    },
    {
        key: 27,
        value: 34
    },
    {
        key: 34,
        value: 32
    },
    {
        key: 40,
        value: 30
    },
    {
        key: 49,
        value: 28
    },
    {
        key: 55,
        value: 26
    },
    {
        key: 62,
        value: 24
    },
    {
        key: 70,
        value: 22
    },
]

var r3Values = [
    {
        key: 324,
        value: 60
    },
    {
        key: 338,
        value: 55
    },
    {
        key: 354,
        value: 50
    },
    {
        key: 10,
        value: 45
    },
    {
        key: 25,
        value: 40
    },
    {
        key: 30,
        value: 38
    },
    {
        key: 37,
        value: 36
    },
    {
        key: 42,
        value: 34
    },
    {
        key: 48,
        value: 32
    },
    {
        key: 55,
        value: 30
    },
    {
        key: 61,
        value: 28
    },
    {
        key: 67,
        value: 26
    },
    {
        key: 75,
        value: 24
    },
    {
        key: 82,
        value: 22
    },
    {
        key: 89,
        value: 20
    },
]

var r2Values = [
    {
        key: 348,
        value: 60
    },
    {
        key: 3,
        value: 55
    },
    {
        key: 18,
        value: 50
    },
    {
        key: 32,
        value: 45
    },
    {
        key: 48,
        value: 40
    },
    {
        key: 55,
        value: 38
    },
    {
        key: 62,
        value: 36
    },
    {
        key: 68,
        value: 34
    },
    {
        key: 74,
        value: 32
    },
    {
        key: 82,
        value: 30
    },
    {
        key: 90,
        value: 28
    },
    {
        key: 98,
        value: 26
    },
    {
        key: 108,
        value: 24
    },
]

var r1Values = [
    {
        key: 40,
        value: 40
    },
    {
        key: 72,
        value: 38
    },
    {
        key: 102,
        value: 36
    },
    {
        key: 132,
        value: 34
    },
    {
        key: 162,
        value: 32
    },
    {
        key: 192,
        value: 30
    },
    {
        key: 224,
        value: 28
    },
    {
        key: 254,
        value: 26
    },
    {
        key: 284,
        value: 24
    },
    {
        key: 314,
        value: 22
    }
]
