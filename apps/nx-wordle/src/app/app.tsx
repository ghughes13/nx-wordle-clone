import { useEffect, useState } from "react";
import Row from "../components/Row";
import './app.css';

export default function Game() {
  const [correctWord, setCorrectWord] = useState<string>();
  const [numOfGameGuesses, setNumOfGameGuesses] = useState(0);
  const [rowWordGuesses, setRowWordGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!correctWord) {
      fetch("http://localhost:3000/api/wordle-word")
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(jsonRes.word)
          setCorrectWord(jsonRes.word);
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
      <h1>NX Wordle</h1>
      {gameOver ? <p>You Got The Correct Word! Game Over.</p> : renderRows()}
    </main>
  );
}
