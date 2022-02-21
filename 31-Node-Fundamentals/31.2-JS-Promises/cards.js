console.log("ready!");
let deckID = null;
const baseUrl = "http://deckofcardsapi.com/api/deck";

$.getJSON(`${baseUrl}/new/shuffle`).then((data) => {
  deckID = data.deck_id;
});

$("button").on("click", function () {
  $.getJSON(`${baseUrl}/${deckID}/draw`).then((data) => {
    if (data.remaining === 0) {
      $("button").fadeOut(1000, 0);
      console.log("All cards drawn!");
    }
    makeAndAppendCard(data);
  });
});

const makeAndAppendCard = (data) => {
  const cardImg = data.cards[0].image;
  $div = $("<div>");
  $div.css({
    "background-image": `url(${cardImg})`,
    height: "314px",
    width: "226px",
    transform: `rotate(${Math.floor(Math.random() * 90) - 45}deg) translateY(${
      Math.floor(Math.random() * 6) - 3
    }%)`,
  });
  $div.addClass("card");
  $("#cards").append($div);
};
