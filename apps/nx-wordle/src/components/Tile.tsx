import { useEffect, useState } from "react";

type TileProps = {
  letterGuessed: string;
  tileState: string;
};

const Tile = ({ letterGuessed, tileState } : TileProps) => {
  const [tileLetter, setTileLetter] = useState<string>("");

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
