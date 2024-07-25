document.addEventListener("DOMContentLoaded", function() {
    const text = "ARE YOU HERE FOR MY SIDE PROJECT PROGRESS ? ";
    let index = 0;
    const speed = 100; // typing speed in milliseconds

    function typeWriter() {
        if (index < text.length) {
            document.getElementById("typing").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            showButtons();
        }
    }

    function showButtons() {
        const buttons =document.getElementById("buttons");
        buttons.classList.remove("hidden");
        buttons.style.display = "flex"; // 顯示按鈕區域
        setTimeout(() => {
            buttons.style.transition = "opacity 1s ease-in-out"; // 設置過渡效果
            buttons.style.opacity = 1; // 淡入
        }, 10); // 確保在顯示後開始淡入
    }

    typeWriter();
});
