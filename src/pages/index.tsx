import { useEffect, useState } from "react";
import Row from "../components/Row";

export default function Game() {
  const [correctWord, setCorrectWord] = useState<string>();
  const [numOfGameGuesses, setNumOfGameGuesses] = useState(0);
  const [rowWordGuesses, setRowWordGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!correctWord) {
      fetch("https://random-word-api.herokuapp.com/word?length=5")
        .then((res) => res.json())
        .then((word) => {
          setCorrectWord(word);
        });
    }
  }, [correctWord]);

  const isActiveRow = (i : number) => {
    if (numOfGameGuesses === i) {
      return true;
    }
    return false;
  };

  const renderRows = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Row
        key={`row-${i}`}
        setNumOfGameGuesses={setNumOfGameGuesses}
        numOfGameGuesses={numOfGameGuesses}
        rowNumber={i}
        rowWordGuess={rowWordGuesses[i] ? rowWordGuesses[i] : ''}
        setRowWordGuesses={setRowWordGuesses}
        isActiveRow={isActiveRow(i)}
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
