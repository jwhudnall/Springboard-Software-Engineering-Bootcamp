import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokes: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.resetVotes = this.resetVotes.bind(this);
    this.toggleLock = this.toggleLock.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes") || "{}");
      let seenJokes = new Set(jokes.map((j) => j.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokeVotes[joke.id] = jokeVotes[joke.id] || 0;
          jokes.push({ ...joke, votes: jokeVotes[joke.id], locked: false });
        } else {
          console.log("duplicate found!");
        }
      }

      this.setState({ jokes });
      window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    } catch (e) {
      alert(`Error: ${e}`);
    }
  }

  generateNewJokes() {
    this.setState((st) => ({ jokes: st.jokes.filter((j) => j.locked) }));
  }

  resetVotes() {
    window.localStorage.setItem("jokeVotes", "{}");
    this.setState((st) => ({
      jokes: st.jokes.map((joke) => ({ ...joke, votes: 0 }))
    }));
  }

  vote(id, delta) {
    let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes"));
    jokeVotes[id] = (jokeVotes[id] || 0) + delta;
    window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    this.setState((st) => ({
      jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    }));
  }

  toggleLock(id) {
    this.setState((st) => ({
      jokes: st.jokes.map((j) => (j.id === id ? { ...j, locked: !j.locked } : j))
    }));
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    let allLocked = sortedJokes.filter((j) => j.locked).length === this.props.numJokesToGet;

    return (
      <div className='JokeList'>
        <button className='JokeList-getmore' onClick={this.generateNewJokes} disabled={allLocked}>
          Get New Jokes
        </button>
        <button className='JokeList-getmore' onClick={this.resetVotes}>
          Reset Vote Counts
        </button>

        {sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
            locked={j.locked}
            toggleLock={this.toggleLock}
          />
        ))}

        {sortedJokes.length < this.props.numJokesToGet ? (
          <div className='loading'>
            <i className='fas fa-4x fa-spinner fa-spin' />
          </div>
        ) : null}
      </div>
    );
  }
}

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(
//     function () {
//       async function getJokes() {
//         let j = [...jokes];
//         let seenJokes = new Set();
//         try {
//           while (j.length < numJokesToGet) {
//             let res = await axios.get("https://icanhazdadjoke.com", {
//               headers: { Accept: "application/json" }
//             });
//             let { status, ...jokeObj } = res.data;
//             // console.log(jokeObj);

//             if (!seenJokes.has(jokeObj.id)) {
//               seenJokes.add(jokeObj.id);
//               j.push({ ...jokeObj, votes: 0 });
//             } else {
//               console.error("duplicate found!");
//             }
//           }
//           setJokes(j);
//         } catch (e) {
//           console.log(e);
//         }
//       }

//       if (jokes.length === 0) getJokes();
//     },
//     [jokes, numJokesToGet]
//   );

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes((allJokes) =>
//       allJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

//     return (
//       <div className='JokeList'>
//         <button className='JokeList-getmore' onClick={generateNewJokes}>
//           Get New Jokes
//         </button>

//         {sortedJokes.map((j) => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;
// }

export default JokeList;
