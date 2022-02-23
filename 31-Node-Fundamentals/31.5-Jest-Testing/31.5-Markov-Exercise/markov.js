/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const next = this.words[i + 1] || null;
      if (chains.has(word)) {
        chains.get(word).push(next);
      } else {
        chains.set(word, [next]);
      }
    }
    return chains;
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let words = 0;
    let text = "";
    const keys = Array.from(this.chains.keys());
    const randStart = MarkovMachine.choice(keys);
    let curWord = randStart;
    text += `${curWord}`;
    words++;

    while (words <= numWords) {
      const choices = this.chains.get(curWord);
      const next = MarkovMachine.choice(choices);
      if (next !== null) {
        text += ` ${next}`;
        words++;
        curWord = next;
      } else {
        text += ".";
        return text;
      }
    }
    text += ".";
    return text;
  }
}

module.exports = { MarkovMachine };
