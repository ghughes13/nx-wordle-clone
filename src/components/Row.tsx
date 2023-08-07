import { useState, useEffect } from "react";
import Tile from "./Tile";

type RowProps = {
  setNumOfGameGuesses: React.Dispatch<React.SetStateAction<number>>;
  numOfGameGuesses: number;
  rowNumber: number;
  isActiveRow: boolean;
  rowWordGuess: string;
  setRowWordGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  correctWord: string | undefined;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

const Row = ({
  setNumOfGameGuesses,
  numOfGameGuesses,
  rowNumber,
  isActiveRow,
  rowWordGuess,
  setRowWordGuesses,
  correctWord,
  gameOver,
  setGameOver,
} : RowProps)   => {
  const [lettersGuessed, setLettersGuessed] = useState<string[]>([]);
  const [tilesStates, setTilesStates] = useState<string[]>([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    const handleKeyPress = (e : KeyboardEvent) => {
      if (lettersGuessed.length < 5 && alphabet.includes(e.key)) {
        setLettersGuessed((lettersGuessed) => [...lettersGuessed, e.key]);
      }

      if (e.key === "Backspace") {
        setLettersGuessed((lettersGuessed) => lettersGuessed.slice(0, -1));
      }

      if (e.key === "Enter" && lettersGuessed.length === 5) {
        setRowWordGuesses((prev) => [...prev, lettersGuessed.join("")]);
        setNumOfGameGuesses((prev) => prev + 1);
      }
    };

    const validateWord = () => {
      let tempTileStatesArray : string[] = [];
      const correctWordAsArray = correctWord && correctWord[0].split("");
      let correctCount = 0;

      rowWordGuess.split("").forEach((letter, i) => {
        if (correctWordAsArray?.includes(letter)) {
          if (correctWordAsArray[i] === letter) {
            tempTileStatesArray.push("correct");
            correctCount++;
          } else {
            tempTileStatesArray.push("partially-correct");
          }
        } else {
          tempTileStatesArray.push("incorrect");
        }
      });

      correctCount === 5 ? setGameOver(true) : null;
      setTilesStates(tempTileStatesArray);
    };

    rowWordGuess.length && !tilesStates.length ? validateWord() : null;

    if (isActiveRow && !gameOver) {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    alphabet,
    setNumOfGameGuesses,
    lettersGuessed,
    setRowWordGuesses,
    isActiveRow,
    correctWord,
    rowWordGuess,
    tilesStates,
    setTilesStates,
    setGameOver,
    gameOver,
  ]);

  const setPreviousGuessLetter = (i : number) => {
    if (numOfGameGuesses > 0) {
      return rowWordGuess[i];
    } else {
      return "";
    }
  };

  return (
    <div className={`row`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <>
          <Tile
            key={`tile-${rowNumber}-${i}`}
            letterGuessed={
              isActiveRow ? lettersGuessed[i] : setPreviousGuessLetter(i)
            }
            tileState={tilesStates[i] ? tilesStates[i] : "empty"}
          />
        </>
      ))}
    </div>
  );
};

export default Row;
