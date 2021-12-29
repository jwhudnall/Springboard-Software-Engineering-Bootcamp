const gameContainer = document.getElementById("game");
let nextCardColor = null;

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
  // you can use event.target to see which element was clicked
  let color = event.target.className;
  if (event.target.dataset.clicked === "false") {
    event.target.style.backgroundColor = color;
    event.target.dataset.clicked = true;

    if (nextCardColor === color) {
      nextCardColor = null;
    } else if (nextCardColor === null) {
      nextCardColor = color;
    } else {
      resetCards(event, color);
    }
  }
}

function resetCards(event, color) {
  // Change background color to the class of the card clicked (event.target)
  event.target.style.backgroundColor = color;
  // Use setTimeout to "reset" current and last card
  setTimeout(function () {
    event.target.style.backgroundColor = "";
    event.target.dataset.clicked = false;
    const cardsOfGivenStyle = document.getElementsByClassName(nextCardColor);
    for (let card of cardsOfGivenStyle) {
      card.style.backgroundColor = "";
      card.dataset.clicked = false;
    }
    nextCardColor = null;
  }, 1000)
}

createDivsForColors(shuffledColors);

// Notes / TODO:
// Remove user ability to "spam click"
//Need to fix: If user correctly clicks a third card during setTimeout, it registers as a match.