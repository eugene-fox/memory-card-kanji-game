const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function unflipCards() {
    console.log('переворачиваем! МИМО', firstCard, secondCard)
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('memory-card_flip');
        secondCard.classList.remove('memory-card_flip');
        resetBoard();
    }, 3000);
    
}

function disableCards() {
    console.log('Отключаем карточки!МОЛОДЕЦ)')
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
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

shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));