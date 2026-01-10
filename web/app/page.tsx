"use client";

import { initialPosition } from "game/position";
import type { GameState, RecordedMove, SquareKey } from "game/types";
import { makeMove } from "game/state/make-move";
import { ChessBoard } from "../components/chess-board";
import { useState } from "react";
import { getIsWhiteTurn } from "game/state/get-is-white-turn";
import { isValidMove } from "game/state/valid-move";

const getGroupedMoves = (moves: RecordedMove[]) => {
  return moves.reduce((acc, move) => {
    const shouldBeInExistingGroup =
      acc.length > 0 && acc[acc.length - 1].length < 2;
    if (shouldBeInExistingGroup) {
      acc[acc.length - 1].push(move);
    } else {
      acc.push([move]);
    }

    return acc;
  }, [] as RecordedMove[][]);
};

const Home = () => {
  const [gameState, setGameState] = useState<GameState>({
    position: initialPosition,
    moveHistory: [],
    positionAfterMoveHistory: [],
    threefoldRepetitionHistory: [],
  });
  const [highlightedSquares, setHighlightedSquares] = useState<SquareKey[]>([]);
  const [isPromotingOnSquare, setIsPromotingOnSquare] =
    useState<SquareKey | null>(null);

  const onSquareClick = (code: SquareKey) => {
    setIsPromotingOnSquare(null);

    if (highlightedSquares.length === 1 && highlightedSquares[0] !== code) {
      try {
        if (
          gameState.position[highlightedSquares[0]]?.piece === "pawn" &&
          isValidMove(gameState, {
            from: highlightedSquares[0],
            to: code,
            promotion: "queen",
          }) === "success" &&
          (code.endsWith("8") || code.endsWith("1"))
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
    <div className="flex items-center justify-center h-screen bg-neutral-800 gap-12 p-12">
      <ChessBoard
        gameState={gameState}
        highlightedSquares={highlightedSquares}
        onSquareClick={onSquareClick}
        isPromotingOnSquare={isPromotingOnSquare}
        onPromotion={onPromotion}
      />

      <div className="flex flex-col p-4 h-full border-l border-neutral-500 w-60">
        {getGroupedMoves(gameState.moveHistory).map(
          (moveGroup, moveGroupIndex) => (
            <div key={moveGroupIndex} className="flex items-center gap-2">
              <span className="text-neutral-100">{moveGroupIndex + 1}.</span>
              {moveGroup.map((move, moveIndex) => (
                <div
                  key={`${move.notation}-${moveIndex}-${moveGroupIndex}`}
                  className="text-neutral-100"
                >
                  {move.notation}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
