const kataKata = {
    "kaban": "tas",
    "doa": "pintu",
    "e": "gambar",
    "kutsu": "sepatu",
    "kutsushita": "kaos kaki",
    "houki": "sapu",
    "purojekutaa": "proyek",
    "gomibako": "tempat sampah",
    "kokuban": "papan tulis hitam",
    "hakuban": "papan tulis putih",
    "chizu": "peta",
    "tsukue": "meja",
    "tana": "lemari",
    "isu": "kursi",
    "mado": "jendela",
    "keitai denwa": "handphone",
    "hon": "buku",
    "eakon": "ac",
    "pasokon": "laptop",
    "tokei": "jam",
    "kabin": "vas bunga",
    "keshigomu": "penghapus"
};

const imagesContainer = document.querySelector('.images-container');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');
const resultContainer = document.getElementById('resultContainer');
const resultText = document.getElementById('resultText');

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create the game elements
function createGameElements() {
    const imageElements = [];

    Object.keys(kataKata).forEach(kata => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const image = document.createElement('img');
        image.src = `images/${kata}.png`;
        image.alt = kata;

        const input = document.createElement('input');
        input.type = 'text';
        input.dataset.match = kata;
        input.placeholder = "Masukkan kata Jepang";

        imageContainer.appendChild(image);
        imageContainer.appendChild(input);
        imageElements.push(imageContainer);
    });

    shuffle(imageElements);
    imageElements.forEach(element => imagesContainer.appendChild(element));
}

// Function to reset the game
function resetGame() {
    imagesContainer.innerHTML = '';
    createGameElements();
    resetButton.style.display = 'none';
    resultContainer.style.display = 'none';
}

// Function to check the answers
function checkAnswers() {
    let totalQuestions = 0;
    let correctAnswers = 0;

    document.querySelectorAll('.image-container input').forEach(input => {
        totalQuestions++;
        if (input.value.trim().toLowerCase() === input.dataset.match.toLowerCase()) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctAnswers++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });

    const incorrectAnswers = totalQuestions - correctAnswers;
    const correctPercentage = (correctAnswers / totalQuestions) * 100;

    resultText.innerText = `Jumlah soal yang salah: ${incorrectAnswers}\nPersentase yang benar: ${correctPercentage.toFixed(2)}%`;
    resultContainer.style.display = 'block';

    if (incorrectAnswers === 0) {
        resetButton.style.display = 'block';
    }
}

// Event listeners for the buttons
submitButton.addEventListener('click', checkAnswers);
resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();
