import { useEffect, useState } from "react";

const Tile = ({ letterGuessed, tileState }) => {
  //Empty, correct, partiallyCorrect, incorrect
  const [tileLetter, setTileLetter] = useState("");

  useEffect(() => {
    setTileLetter(letterGuessed);
  }, [letterGuessed]);

  return (
    <div className={`${tileState} tile`}>
      <p>{tileLetter}</p>
    </div>
  );
};

export default Tile;
