'use strict';

const startGame = function () {
  // --- Variables
  const inputNumber = document.querySelector('.input-number');
  const inputNumberLimit = document.querySelector('.input-number-limit');
  const btnCheck = document.querySelector('.btn-check');
  const btnReset = document.querySelector('.btn-reset');
  const btnConfirm = document.querySelector('.btn-confirm');
  const subtitle = document.querySelector('.subtitle');
  const scoreEl = document.querySelector('.score');
  const highscoreEl = document.querySelector('.highscore');
  const textProcess = document.querySelector('.text-process');
  const popup = document.querySelector('.popup');
  const page = document.querySelector('.page');

  // --- Confirm and Start
  btnConfirm.addEventListener('click', function () {
    popup.style.display = 'none';
    page.classList.toggle('layer');
    const limitNumber = Number(inputNumberLimit.value) || 20;

    let score;
    let highscore = 0;
    let randomNumber = Math.trunc(Math.random() * 20) + 1;
    highscoreEl.textContent = highscore;

    // --- Functions
    const message = function (message, element) {
      element.textContent = message;
    };

    const resetGame = function () {
      randomNumber = Math.trunc(Math.random() * limitNumber) + 1;
      console.log(randomNumber); // for checking

      score = limitNumber;
      scoreEl.textContent = score;

      inputNumber.value = '';
      inputNumberLimit.value = '';
      message('Start...', textProcess);
      message(`(Between 1 and ${limitNumber})`, subtitle);
      page.style.backgroundColor = 'var(--sub-color-2)';
    };
    resetGame();

    const checkNumber = function () {
      const currentNumber = Number(inputNumber.value);

      if (!currentNumber) {
        message('No number!', textProcess);
        return;
      }

      if (currentNumber !== randomNumber) {
        score--;
        scoreEl.textContent = score;
        message(
          currentNumber > randomNumber ? 'Too high!' : 'Too low!',
          textProcess
        );
      }

      if (currentNumber === randomNumber) {
        if (score > highscore) highscore = score;
        highscoreEl.textContent = score > highscore ? score : highscore;
        page.style.backgroundColor = 'var(--win-color)';
        message('Correct number!', textProcess);
      }

      if (score === 0) {
        popup.innerHTML = '';
        popup.style.display = 'grid';
        page.classList.toggle('layer');
        page.style.backgroundColor = 'var(--over-color)';
        popup.insertAdjacentHTML(
          'afterbegin',
          '<p class="game-over">Game over!</p>'
        );
      }
    };

    // --- Event Check
    btnCheck.addEventListener('click', checkNumber);

    // --- Event Reset
    btnReset.addEventListener('click', resetGame);
  });
};

startGame();
