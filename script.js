
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


document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    document.getElementById('product').appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const pointLights = [
        new THREE.PointLight(0xffffff, 3),
        new THREE.PointLight(0xffffff, 3),
        new THREE.PointLight(0xffffff, 3),
        new THREE.PointLight(0xffffff, 3),
        new THREE.PointLight(0xffffff, 3),
        new THREE.PointLight(0xffffff, 3)
    ];

    pointLights[0].position.set(10, 0, 0);
    pointLights[1].position.set(-10, 0, 0);
    pointLights[2].position.set(0, 10, 0);
    pointLights[3].position.set(0, -10, 0);
    pointLights[4].position.set(0, 0, 10);
    pointLights[5].position.set(0, 0, -10);

    pointLights.forEach(light => scene.add(light));

    const textureLoader = new THREE.TextureLoader();
    const textureJpg = textureLoader.load('/models/texture.jpg');
    const texturePng = textureLoader.load('/models/texture.png');

    textureJpg.repeat.set(1, 1);
    texturePng.repeat.set(1, 1);

    const loader = new GLTFLoader();
    loader.load('/models/model.gltf', (gltf) => {
        const model = gltf.scene;
        let index = 0;
        model.traverse((child) => {
            if (child.isMesh) {
                if (index % 2 === 0) {
                    child.material = new THREE.MeshStandardMaterial({ map: textureJpg });
                    child.material.map.repeat.set(1, 1);
                } else {
                    child.material = new THREE.MeshStandardMaterial({ map: texturePng });
                    child.material.map.repeat.set(1, 1);
                }
                index++;
            }
        });
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);
    }, undefined, (error) => {
        console.error(error);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(300, 300);
        camera.aspect = 300 / 300;
        camera.updateProjectionMatrix();
    });
});
