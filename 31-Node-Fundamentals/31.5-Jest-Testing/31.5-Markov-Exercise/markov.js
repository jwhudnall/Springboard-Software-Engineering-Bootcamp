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
    // TODO
    const unique = [...new Set(this.words)];
    const chain = unique.reduce((acc, next) => {
      if (!(next in acc)) {
        acc[next] = [];
      }
      return acc;
    }, {});
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const next = this.words[i + 1];
      if (next !== undefined) {
        chain[word].push(next);
      } else {
        chain[word].push(null);
      }
    }
    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let words = 0;
    let text = "";
    // Pick a random start word
    const randStart = this.words[Math.floor(Math.random() * this.words.length)];
    let curWord = randStart;
    text += `${curWord}`;
    words++;

    while (words <= numWords) {
      const choices = this.chains[curWord];
      const next = choices[Math.floor(Math.random() * choices.length)];
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
