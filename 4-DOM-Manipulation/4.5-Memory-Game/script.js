/*
Notes/Observations:
  - Current codebase will not work if card divs have more than 1 class. Could refactor to include cards in HTML natively, vs. dynamically using JS.
  - Should refactor to size cards according to screensize
*/

const gameContainer = document.getElementById("game");
const highScoreSpan = document.querySelector('#high-score');
const currentScoreSpan = document.querySelector('#current-score');
const scoreboard = document.querySelector('#scoreboard');
let nextCardClass = null;
let userCanClick = true;
let score = 0;

const images = {
  'algo': 'images/algo.gif',
  'bob': 'images/bob.gif',
  'btc-tunnel': 'images/btc-tunnel.gif',
  'btc': 'images/btc.gif',
  'gibson': 'images/gibson.gif',
  'marley': 'images/marley.gif',
  'matrix': 'images/matrix.gif',
  'monkey': 'images/monkey.gif',
  'skull': 'images/skull.gif',
  'wario': 'images/wario.gif',
};

// Array of image names, each listed twice
const cardNames = Object.keys(images).concat(Object.keys(images));
let shuffledCards = shuffle(cardNames);

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createCards(arr) {
  for (let card of arr) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(card);
    newDiv.setAttribute("data-clicked", false);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  let cardClass = event.target.className;
  console.dir(event.target.className);
  let hasBeenClicked = event.target.dataset.clicked;

  if (hasBeenClicked === "false" && userCanClick) {
    updateScore();
    flipCard(event, cardClass);
    checkBoard(event, cardClass);
    checkGameStatus();
  }
}

function updateScore() {
  score++;
  currentScoreSpan.textContent = score;
}

function checkGameStatus() {
  let cards = gameContainer.children;
  let lengthOfDeck = cards.length;
  let clickedCardCount = 0;
  for (card of cards) {
    if (card.dataset.clicked === "true") {
      clickedCardCount++;
    }
  }
  if (clickedCardCount === lengthOfDeck) {
    gameOver();
  }
}

function gameOver() {
  updateLocalStorage();
  let playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = 'Play Again?';
  playAgainBtn.classList.add('btn');
  document.body.append(playAgainBtn);

  playAgainBtn.addEventListener('click', function () {
    resetGame(playAgainBtn);
    scrollToTop();
  })
}

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function updateLocalStorage() {
  if (!localStorage.score || score < parseInt(localStorage.score)) {
    localStorage.setItem('score', score);
    highScoreSpan.textContent = score;
  }
}

function resetGame(btn) {
  gameContainer.innerHTML = '';
  shuffledCards = shuffle(cardNames);
  createCards(shuffledCards);
  btn.remove();
  score = 0;
  currentScoreSpan.textContent = 0;
}

function flipCard(event, cardClass) {
  event.target.style.backgroundImage = `url(${images[cardClass]})`
  event.target.dataset.clicked = true;
}

function checkBoard(event, cardClass) {
  if (nextCardClass === cardClass) {
    nextCardClass = null;
  } else if (nextCardClass === null) {
    nextCardClass = cardClass;
  } else {
    resetFlippedCards(event, cardClass);
  }
}

function resetFlippedCards(event, cardClass) {
  userCanClick = !userCanClick;
  event.target.style.backgroundImage = `url(${images[cardClass]})`

  setTimeout(function () {
    const cardsOfNextType = document.getElementsByClassName(nextCardClass);
    event.target.dataset.clicked = false;
    event.target.style.backgroundImage = "";
    for (let card of cardsOfNextType) {
      card.style.backgroundImage = "";
      card.dataset.clicked = false;
    }
    nextCardClass = null;
    userCanClick = !userCanClick;
  }, 2000)
}

function displayHomeScreen() {
  gameContainer.style.display = "none";
  scoreboard.style.display = "none";

  let startSection = document.createElement('section');
  let startBtn = document.createElement('button');
  startSection.classList.add('start-screen');
  startBtn.textContent = "Play";
  startBtn.classList.add('btn');
  startSection.append(startBtn);
  document.body.append(startSection);

  startBtn.addEventListener("click", function () {
    startSection.style.display = "none";
    gameContainer.removeAttribute('style');
    scoreboard.removeAttribute('style');
  })
}

function getHighScore() {
  highScoreSpan.textContent = localStorage.score || "N/A";
}

function startProgram() {
  getHighScore();
  createCards(shuffledCards);
}

startProgram();
displayHomeScreen();