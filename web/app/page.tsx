"use client";

import { initialPosition } from "game/position";
import type { GameState, SquareKey } from "game/types";
import { makeMove } from "game/state/make-move";
import { ChessBoard } from "../components/chess-board";
import { useState } from "react";
import { getIsWhiteTurn } from "game/state/get-is-white-turn";
import { isValidMove } from "game/state/valid-move";

const Home = () => {
  const [gameState, setGameState] = useState<GameState>({
    position: initialPosition,
    moveHistory: [],
  });
  const [highlightedSquares, setHighlightedSquares] = useState<SquareKey[]>([]);
  const [isPromotingOnSquare, setIsPromotingOnSquare] =
    useState<SquareKey | null>(null);

  const onSquareClick = (code: SquareKey) => {
    setIsPromotingOnSquare(null);

    if (highlightedSquares.length === 1 && highlightedSquares[0] !== code) {
      try {
        if (
          (isValidMove(gameState, {
            from: highlightedSquares[0],
            to: code,
            promotion: "queen",
          }) === "success" &&
            gameState.position[highlightedSquares[0]]?.piece === "pawn" &&
            code.endsWith("8")) ||
          code.endsWith("1")
        ) {
          setIsPromotingOnSquare(code);
          return;
        }

        const newGameState = makeMove(gameState, {
          from: highlightedSquares[0],
          to: code,
        });

        setGameState(newGameState);
        setHighlightedSquares([]);
      } catch {
        const isWhiteTurn = getIsWhiteTurn(gameState);
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

  const onPromotion = (promotion: "queen" | "rook" | "bishop" | "knight") => {
    if (!isPromotingOnSquare) return;

    try {
      const newGameState = makeMove(gameState, {
        from: highlightedSquares[0],
        to: isPromotingOnSquare,
        promotion,
      });

      setGameState(newGameState);
    } catch {}

    setIsPromotingOnSquare(null);
    setHighlightedSquares([]);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <ChessBoard
        gameState={gameState}
        highlightedSquares={highlightedSquares}
        onSquareClick={onSquareClick}
        isPromotingOnSquare={isPromotingOnSquare}
        onPromotion={onPromotion}
      />
    </div>
  );
};

export default Home;
