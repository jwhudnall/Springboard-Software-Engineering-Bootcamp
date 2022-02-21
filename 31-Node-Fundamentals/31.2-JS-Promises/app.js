const addToPage = (data, appendElType, targetEl) => {
  const newFact = document.createElement(appendElType);
  newFact.textContent = data;
  targetEl.append(newFact);
};

// Part 1.1
let baseUrl = "http://numbersapi.com";
let favNum = 7;
$.getJSON(`${baseUrl}/${favNum}?json`).then((data) => {});

// Part 1.2
const multipleFacts = document.querySelector("#multipleFacts");
let baseUrl2 = "http://numbersapi.com";
let favNums = [3, 7, 14, 42];
$.getJSON(`${baseUrl2}/${favNums.join(",")}?json`).then((data) => {
  for (let [num, fact] of Object.entries(data)) {
    addToPage(fact, "li", multipleFacts);
  }
});

// Part 1.3
const factContainer = document.querySelector("#factContainer");
let baseUrl3 = "http://numbersapi.com";
let favNum3 = 4;
const favNumFacts = [];
for (let i = 0; i < 4; i++) {
  favNumFacts.push($.getJSON(`${baseUrl3}/${favNum3}?json`));
}

Promise.all(favNumFacts).then((facts) => {
  facts.forEach((fact) => {
    addToPage(fact.text, "li", factContainer);
  });
});
