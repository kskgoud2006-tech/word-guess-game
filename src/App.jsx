
import { useState } from "react";
import "./App.css";

const words = [
  { word: "REACT", hint: "A JavaScript library for building user interfaces" },
  { word: "PYTHON", hint: "A popular programming language" },
  { word: "PLANET", hint: "Earth is one of these" },
  { word: "ROBOT", hint: "A machine that can perform tasks" },
  { word: "GUITAR", hint: "A musical instrument with strings" },
  { word: "OCEAN", hint: "A huge body of salt water" },
  { word: "SCHOOL", hint: "A place where students learn" },
];

function App() {
  const [word, setWord] = useState(words[0]);
  const [guesses, setGuesses] = useState([]);
  const [letter, setLetter] = useState("");

  const mistakes = guesses.filter(
    (guess) => !word.word.includes(guess)
  ).length;

  const won = [...word.word].every((char) =>
    guesses.includes(char)
  );

  const lost = mistakes >= 6;
  const finished = won || lost;

  function makeGuess(event) {
    event.preventDefault();

    const guess = letter.trim().toUpperCase();

    if (!/^[A-Z]$/.test(guess)) {
      alert("Please enter one letter from A to Z!");
      return;
    }

    if (guesses.includes(guess) || finished) {
      setLetter("");
      return;
    }

    setGuesses((previous) => [...previous, guess]);
    setLetter("");
  }

  function newGame() {
    const availableWords = words.filter(
      (item) => item.word !== word.word
    );

    const nextWord =
      availableWords[
        Math.floor(Math.random() * availableWords.length)
      ];

    setWord(nextWord);
    setGuesses([]);
    setLetter("");
  }

  return (
    <main className="game-container">
      <h1>🎯 Word Guess Game</h1>
      <p className="subtitle">
        Guess the hidden word, one letter at a time!
      </p>

      <div className="hint-box">
        <strong>💡 Hint:</strong> {word.hint}
      </div>

      <div className="word-display">
        {[...word.word].map((char, index) => (
          <span className="letter-box" key={index}>
            {guesses.includes(char) || lost ? char : "_"}
          </span>
        ))}
      </div>

      <p className="mistakes">
        ❤️ Mistakes remaining: {6 - mistakes}
      </p>

      <form className="guess-form" onSubmit={makeGuess}>
        <input
          type="text"
          value={letter}
          onChange={(event) =>
            setLetter(event.target.value.slice(-1))
          }
          placeholder="Enter a letter"
          maxLength={1}
          disabled={finished}
          aria-label="Enter a letter"
        />

        <button type="submit" disabled={finished}>
          Guess
        </button>
      </form>

      <p className="guessed-letters">
        Guessed letters: {guesses.join(", ") || "None yet"}
      </p>

      {won && (
        <h2 className="win-message">
          🎉 Congratulations! You won!
        </h2>
      )}

      {lost && (
        <h2 className="lose-message">
          😢 Game over! The word was {word.word}.
        </h2>
      )}

      {finished && (
        <button className="play-again" onClick={newGame}>
          🔄 Play Again
        </button>
      )}
    </main>
  );
}

export default App;
