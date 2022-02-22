const addToPage = (data, appendElType, targetEl) => {
  const newFact = document.createElement(appendElType);
  newFact.textContent = data;
  targetEl.append(newFact);
};
// Part 1: Number Facts
// 1.1
const getNumFacts1 = async function () {
  let baseURL = "http://numbersapi.com";
  let favNum = 7;
  const { data } = await axios.get(`${baseURL}/${favNum}`);
  console.log(data);
};
// getNumFacts1();

// 1.2
const getNumFacts2 = async function () {
  const multipleFacts = document.querySelector("#multipleFacts");
  const baseURL = "http://numbersapi.com";
  const favNums = [3, 7, 14, 42];
  const { data } = await axios.get(`${baseURL}/${favNums.join(",")}?json`);
  for (let [num, fact] of Object.entries(data)) {
    addToPage(fact, "li", multipleFacts);
  }
};
getNumFacts2();

const getNumFacts3 = async function () {
  const factContainer = document.querySelector("#factContainer");
  const baseURL = "http://numbersapi.com";
  let favNum3 = 4;
  const favNumberFacts = await Promise.all([
    axios.get(`${baseURL}/${favNum3}?json`),
    axios.get(`${baseURL}/${favNum3}?json`),
    axios.get(`${baseURL}/${favNum3}?json`),
    axios.get(`${baseURL}/${favNum3}?json`),
  ]);
  favNumberFacts.forEach((data) => {
    addToPage(data.data.text, "li", factContainer);
  });
};
getNumFacts3();
