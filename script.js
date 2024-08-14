
document.addEventListener("DOMContentLoaded", function() {
    const initialText = "English or Chinese?";
    const interestTextEnglish = "Are you interested in our products?";
    const interestTextChinese = "你是否對我們的商品感興趣呢?";
    const noInterestText = "Have a good day! :)";

    const typingElement = document.getElementById("typing");
    const interestElement = document.getElementById("interest");
    const mainPageElement = document.getElementById("mainPage");
    const interestTextElement = document.getElementById("interestText");
    const questionTextElement = document.getElementById("questionText");
    const nameInput = document.getElementById("nameInput");
    const submitNameButton = document.getElementById("submitName");
    const englishButton = document.getElementById("englishButton");
    const chineseButton = document.getElementById("chineseButton");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    let index = 0;
    let username = '';
    let selectedLanguage = '';

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

    function showInterestQuestion() {
        typingElement.classList.add("hidden");
        interestElement.classList.remove("hidden");
        typeWriter(interestTextElement, selectedLanguage === 'english' ? interestTextEnglish : interestTextChinese, () => {
            yesButton.addEventListener("click", () => handleInterestResponse(true));
            noButton.addEventListener("click", () => handleInterestResponse(false));
        });
    }

    function handleInterestResponse(isInterested) {
        interestElement.classList.add("hidden");
        if (isInterested) {
            // 设置淡入效果
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "main.html";
            }, 1000); // 设置延迟以配合淡出效果的时长
        } else {
            typingElement.classList.remove("hidden");
            typeWriter(typingElement, noInterestText, null);
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        const yesButton = document.getElementById("yesButton");
        const noButton = document.getElementById("noButton");
    
        yesButton.addEventListener("click", function() {
            handleInterestResponse(true);
        });
    
        noButton.addEventListener("click", function() {
            handleInterestResponse(false);
        });
    });
    

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

    function showButtons() {
        const buttons = document.getElementById("buttons");
        buttons.classList.remove("hidden");
        buttons.style.display = "flex";
        setTimeout(() => {
            buttons.style.transition = "opacity 1s ease-in-out";
            buttons.style.opacity = 1;
        }, 10);

        englishButton.addEventListener("click", () => handleLanguageSelection('english'));
        chineseButton.addEventListener("click", () => handleLanguageSelection('chinese'));
    }

    function handleLanguageSelection(language) {
        selectedLanguage = language;
        const buttons = document.getElementById("buttons");
        buttons.style.display = "none";
        showInterestQuestion();
    }

    startQuestion();
});






