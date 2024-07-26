document.addEventListener("DOMContentLoaded", function() {
    const initialText = "English or Chinese? ";
    const englishText = "Whoever moves first is gay.";
    const chineseText = "誰先動誰是gay。";
    const typingElement = document.getElementById("typing");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const scoreTextElement = document.getElementById("scoreText");
    const questionTextElement = document.getElementById("questionText");
    const nameInput = document.getElementById("nameInput");
    const submitNameButton = document.getElementById("submitName");
    const englishButton = document.getElementById("englishButton");
    const chineseButton = document.getElementById("chineseButton");

    let index = 0;
    let sensitivity = 15;
    let timer;
    let startTime;
    let username = '';

    function typeWriter(element, text, callback) {
        index = 0; // Reset index
        element.innerHTML = ''; // Clear previous content
        function typing() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(typing, 100); // typing speed
            } else if (callback) {
                callback();
            }
        }
        typing();
    }

    function showButtons() {
        const buttons = document.getElementById("buttons");
        buttons.classList.remove("hidden");
        buttons.style.display = "flex";
        setTimeout(() => {
            buttons.style.transition = "opacity 1s ease-in-out";
            buttons.style.opacity = 1;
        }, 10);

        englishButton.addEventListener("click", () => handleButtonClick(englishText));
        chineseButton.addEventListener("click", () => handleButtonClick(chineseText));
    }

    function handleButtonClick(content) {
        const buttons = document.getElementById("buttons");
        buttons.style.display = "none";
        typingElement.classList.remove("hidden");
        typeWriter(typingElement, content, startTimer);
    }

    function startTimer() {
        scoreElement.classList.remove("hidden");
        timerElement.innerText = '0';
        startTime = Date.now();

        window.addEventListener('devicemotion', handleMotion, false);

        function handleMotion(event) {
            const { acceleration } = event;
            if (acceleration) {
                if (Math.abs(acceleration.x) > sensitivity || Math.abs(acceleration.y) > sensitivity || Math.abs(acceleration.z) > sensitivity) {
                    clearInterval(timer);
                    window.removeEventListener('devicemotion', handleMotion);
                    const elapsedTime = Math.round((Date.now() - startTime) / 1000);
                    scoreTextElement.innerHTML = `${username}, your score is ${elapsedTime} seconds.`;
                }
            }
        }

        timer = setInterval(() => {
            timerElement.innerText = Math.round((Date.now() - startTime) / 1000);
            sensitivity += 1; // Increase sensitivity over time
        }, 1000); // Update every second
    }

    function startQuestion() {
        document.getElementById("question").classList.remove("hidden");
        typeWriter(questionTextElement, "What's your name?", () => {});
    }

    submitNameButton.addEventListener("click", function() {
        username = nameInput.value.trim();
        if (username) {
            document.getElementById("question").style.display = 'none';
            typingElement.classList.remove("hidden");
            typeWriter(typingElement, initialText, showButtons);
        }
    });

    startQuestion();
});
