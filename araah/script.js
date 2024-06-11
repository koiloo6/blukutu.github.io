let selectedJapaneseWord = null;
let selectedEnglishWord = null;

const japaneseWords = Array.from(document.querySelectorAll('.japanese-words .word'));
const englishWords = Array.from(document.querySelectorAll('.english-words .word'));
const resetButton = document.getElementById('resetButton');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetGame() {
    japaneseWords.forEach(word => word.classList.remove('correct', 'incorrect', 'selected'));
    englishWords.forEach(word => word.classList.remove('correct', 'incorrect', 'selected'));
    shuffle(japaneseWords);
    shuffle(englishWords);
    const japaneseContainer = document.querySelector('.japanese-words');
    const englishContainer = document.querySelector('.english-words');
    japaneseContainer.innerHTML = '';
    englishContainer.innerHTML = '';
    japaneseWords.forEach(word => japaneseContainer.appendChild(word));
    englishWords.forEach(word => englishContainer.appendChild(word));
    resetButton.style.display = 'none';
}

function selectWord(word, language) {
    if (language === 'japanese') {
        if (selectedJapaneseWord) {
            selectedJapaneseWord.classList.remove('selected');
        }
        selectedJapaneseWord = word;
    } else {
        if (selectedEnglishWord) {
            selectedEnglishWord.classList.remove('selected');
        }
        selectedEnglishWord = word;
    }

    word.classList.add('selected');

    if (selectedJapaneseWord && selectedEnglishWord) {
        checkMatch();
    }
}

function checkMatch() {
    if (selectedJapaneseWord.dataset.match === selectedEnglishWord.dataset.match) {
        selectedJapaneseWord.classList.add('correct');
        selectedEnglishWord.classList.add('correct');
    } else {
        selectedJapaneseWord.classList.add('incorrect');
        selectedEnglishWord.classList.add('incorrect');
    }

    selectedJapaneseWord.classList.remove('selected');
    selectedEnglishWord.classList.remove('selected');

    selectedJapaneseWord = null;
    selectedEnglishWord = null;

    if (document.querySelectorAll('.correct').length === japaneseWords.length * 2) {
        resetButton.style.display = 'block';
    }
}

japaneseWords.forEach(word => word.addEventListener('click', () => selectWord(word, 'japanese')));
englishWords.forEach(word => word.addEventListener('click', () => selectWord(word, 'english')));
resetButton.addEventListener('click', resetGame);

// Initialize the game by shuffling the words
resetGame();
