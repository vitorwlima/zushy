"use client";

import { initialPosition, SquareKey } from "game/position";
import { GameState, makeMove } from "game/state/moves";
import { ChessBoard } from "../components/chess-board";
import { useState } from "react";

const Home = () => {
  const [gameState, setGameState] = useState<GameState>({
    position: initialPosition,
    moveHistory: [],
  });
  const [highlightedSquares, setHighlightedSquares] = useState<SquareKey[]>([]);

  const onSquareClick = (code: SquareKey) => {
    if (highlightedSquares.length === 1 && highlightedSquares[0] !== code) {
      try {
        const newGameState = makeMove(gameState, {
          from: highlightedSquares[0],
          to: code,
        });

        setGameState(newGameState);
        setHighlightedSquares([]);
      } catch {
        const isWhiteTurn = gameState.moveHistory.length % 2 === 0;
        const piece = gameState.position[code];
        const isCorrectColor =
          piece?.color === (isWhiteTurn ? "white" : "black");

        if (isCorrectColor) {
          setHighlightedSquares([code]);
        } else {
          setHighlightedSquares([]);
        }
      }

      return;
    }

    if (highlightedSquares.length === 1 && highlightedSquares[0] === code) {
      setHighlightedSquares([]);
      return;
    }

    if (gameState.position[code] !== null) {
      setHighlightedSquares([code]);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ChessBoard
        gameState={gameState}
        highlightedSquares={highlightedSquares}
        onSquareClick={onSquareClick}
      />
    </div>
  );
};

export default Home;
