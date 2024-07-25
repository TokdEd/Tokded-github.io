document.addEventListener("DOMContentLoaded", function() {
    const text = "ARE YOU HERE FOR MY SIDE PROJECT PROGRESS? ";
    const typingElement = document.getElementById("typing");
    let index = 0;
    const speed = 100; // typing speed in milliseconds

    function typeWriter() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            showButtons();
        }
    }

    function showButtons() {
        const buttons = document.getElementById("buttons");
        buttons.classList.remove("hidden");
        buttons.style.display = "flex";
        setTimeout(() => {
            buttons.style.transition = "opacity 1s ease-in-out";
            buttons.style.opacity = 1;
        }, 10);

        document.getElementById("yesButton").addEventListener("click", () => handleButtonClick('i havent made any progress yet ¯\_(ツ)_/¯'));
        document.getElementById("noButton").addEventListener("click", () => handleButtonClick('nc to meet u ;) have a good day '));
    }

    function handleButtonClick(content) {
        const buttons = document.getElementById("buttons");
        buttons.style.display = "none";
        typingElement.innerHTML = ''; // 清空原來的內容
        typeWriterEffect(typingElement, content, 0, 100);
    }

    function typeWriterEffect(element, text, index, speed) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeWriterEffect(element, text, index + 1, speed), speed);
        }
    }

    typeWriter();
});