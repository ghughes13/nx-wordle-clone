import { useEffect, useState } from "react";
import Row from "../components/Row.js";

export default function Game() {
  const [correctWord, setCorrectWord] = useState();
  const [numOfGameGuesses, setNumOfGameGuesses] = useState(0);
  const [rowWordGuesses, setRowWordGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!correctWord) {
      fetch("https://random-word-api.herokuapp.com/word?length=5")
        .then((res) => res.json())
        .then((word) => {
          setCorrectWord(word);
        });
    }
  }, []);

  const isActiveRow = (index) => {
    if (numOfGameGuesses === index) {
      return true;
    }
    return false;
  };

  const renderRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Row
        key={`row-${index}`}
        setNumOfGameGuesses={setNumOfGameGuesses}
        numOfGameGuesses={numOfGameGuesses}
        rowNumber={index}
        rowWordGuess={rowWordGuesses[index] ? rowWordGuesses[index] : []}
        setRowWordGuesses={setRowWordGuesses}
        isActiveRow={isActiveRow(index)}
        correctWord={correctWord}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
    ));
  };

  return (
    <main>
      <h1>Murdle (My Wordle)</h1>
      {gameOver ? <p>You Got The Correct Word! Game Over.</p> : renderRows()}
    </main>
  );
}
