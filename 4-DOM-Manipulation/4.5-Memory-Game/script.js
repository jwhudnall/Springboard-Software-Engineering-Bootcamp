/*
Further Study TODO:
- Add a button that when clicked will restart the game once it has ended
- For every guess made, increment a score variable and display the score while the game is played
- Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
- Allow for any number of cards to appear
- Instead of hard-coding colors, try something different like random colors or even images!
*/

const gameContainer = document.getElementById("game");
let nextCardColor = null;
let userCanClick = true;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let shuffledColors = shuffle(COLORS);

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


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.setAttribute("data-clicked", false);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  let color = event.target.className;
  let hasBeenClicked = event.target.dataset.clicked;

  if (hasBeenClicked === "false" && userCanClick) {
    flipCard(event, color);
    checkBoard(event, color);
  }
}

function flipCard(event, color) {
  event.target.style.backgroundColor = color;
  event.target.dataset.clicked = true;
}

function checkBoard(event, color) {
  if (nextCardColor === color) {
    nextCardColor = null;
  } else if (nextCardColor === null) {
    nextCardColor = color;
  } else {
    resetCards(event, color);
  }
}

function resetCards(event, color) {
  userCanClick = !userCanClick;
  event.target.style.backgroundColor = color;

  setTimeout(function () {
    const cardsOfNextType = document.getElementsByClassName(nextCardColor);
    event.target.dataset.clicked = false;
    event.target.style.backgroundColor = "";
    for (let card of cardsOfNextType) {
      card.style.backgroundColor = "";
      card.dataset.clicked = false;
    }
    nextCardColor = null;
    userCanClick = !userCanClick;
  }, 1000)
}

function displayHomeScreen() {
  gameContainer.style.display = "none";
  let startSection = document.createElement('section');
  let startBtn = document.createElement('button');

  startSection.classList.add('start-screen');
  startBtn.textContent = "Play";

  startSection.append(startBtn);
  document.body.append(startSection);

  // Event Listeners
  startBtn.addEventListener("click", function () {
    startSection.style.display = "none";
    gameContainer.removeAttribute('style');
  })
}

function startProgram() {
  createDivsForColors(shuffledColors);
  displayHomeScreen();
}

startProgram();