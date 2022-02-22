class CardGame {
  constructor(baseURL) {
    this.baseURL = "http://deckofcardsapi.com/api/deck";
    this.cards = [];
  }

  async init(id) {
    const res = await axios.get(`${this.baseURL}/new`);
    this.deckId = res.data.deck_id;
    await this.shuffle();
  }

  async shuffle() {
    const res = await axios.get(`${this.baseURL}/${this.deckId}/shuffle`);
  }

  async drawCard() {
    const res = await axios.get(`${this.baseURL}/${this.deckId}/draw`);
    this.currentCard = res.data.cards[0];
    this.cards.push(this.currentCard);
  }

  listCards() {
    this.cards.forEach((c) => {
      console.log(`${c.value} of ${c.suit}.`);
    });
  }

  makeAndAppendCard(data) {
    const cardImg = data.cards[0].image;
    const $div = $("<div>");
    $div.css({
      "background-image": `url(${cardImg})`,
      height: "314px",
      width: "226px",
      transform: `rotate(${
        Math.floor(Math.random() * 90) - 45
      }deg) translateY(${Math.floor(Math.random() * 6) - 3}%)`,
    });
    $div.addClass("card");
    $("#cards").append($div);
  }
}

let c = new CardGame();
c.init();

$("button").on("click", async function () {
  const res = await axios.get(`${c.baseURL}/${c.deckId}/draw`);
  if (res.data.remaining === 0) {
    $("button").remove();
    $("body").prepend("<h1>Deck Empty!</h1>");
  }
  c.makeAndAppendCard(res.data);
});
