"use client";

import { initialPosition, SquareKey } from "game/position";
import { makeMove } from "game/state/moves";
import { ChessBoard } from "../components/chess-board";
import { useState } from "react";

const Home = () => {
  const [position, setPosition] = useState(initialPosition);
  const [highlightedSquares, setHighlightedSquares] = useState<SquareKey[]>([]);

  const onSquareClick = (code: SquareKey) => {
    if (highlightedSquares.length === 1 && highlightedSquares[0] !== code) {
      const newPosition = makeMove(position, {
        from: highlightedSquares[0],
        to: code,
      });

      setPosition(newPosition);
      setHighlightedSquares([]);
      return;
    }

    if (highlightedSquares.length === 1 && highlightedSquares[0] === code) {
      setHighlightedSquares([]);
      return;
    }

    setHighlightedSquares([code]);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ChessBoard
        position={position}
        highlightedSquares={highlightedSquares}
        onSquareClick={onSquareClick}
      />
    </div>
  );
};

export default Home;
