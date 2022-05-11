const cards = document.querySelectorAll('.memory-card');
const WIN_SCORE = 14;
const gamefield = document.querySelector('.gamefield__card-container');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('memory-card_flip');
        secondCard.classList.remove('memory-card_flip');
        resetBoard();
    }, 3000);
    
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score += 1;
    resetBoard();
    if (score == WIN_SCORE) {
        gamefield.classList.add('gamefield__card-container_disable');
        document.querySelector('.gamefield__victory-header').classList.add('gamefield__victory-header_visible');
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.kanji === secondCard.dataset.kanji;
    isMatch ? disableCards() : unflipCards();
}

function flipCard() {
    if (lockBoard) {
        console.log('Доска заблокирована!');
        return;
    }
    if (this === firstCard)
    {
        console.log('Жмал на ту же карту!')
        return;
    } 
    this.classList.add('memory-card_flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 28);
      card.style.order = ramdomPos;
    });
  }

// shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));