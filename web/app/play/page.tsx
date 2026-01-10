"use client";

import { initialPosition } from "game/position";
import type { GameState, RecordedMove, SquareKey } from "game/types";
import { makeMove } from "game/state/make-move";
import { ChessBoard } from "../../components/chess-board";
import { useEffect, useState } from "react";
import { getIsWhiteTurn } from "game/state/get-is-white-turn";
import { isValidMove } from "game/state/valid-move";
import { getZushyMove } from "bot/index";

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

const Play = () => {
  const userColor = "white";
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
    const isUserTurn = getIsWhiteTurn(gameState) === (userColor === "white");
    if (!isUserTurn) return;

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

  useEffect(() => {
    const turnColor = getIsWhiteTurn(gameState) ? "white" : "black";
    const isBotToPlay = turnColor !== userColor;
    if (!isBotToPlay) return;

    const zushyMove = getZushyMove(gameState);
    if (zushyMove) {
      setTimeout(() => {
        const newGameState = makeMove(gameState, zushyMove);
        setGameState(newGameState);
      }, 1000);
    }
  }, [gameState]);

  return (
    <main className="flex items-center justify-center h-screen gap-12 p-12">
      <ChessBoard
        gameState={gameState}
        highlightedSquares={highlightedSquares}
        onSquareClick={onSquareClick}
        isPromotingOnSquare={isPromotingOnSquare}
        onPromotion={onPromotion}
      />

      <div className="flex flex-col gap-1 py-4 px-8 overflow-y-auto rounded-md h-[640px] bg-neutral-900 w-full max-w-2xs">
        {getGroupedMoves(gameState.moveHistory).map(
          (moveGroup, moveGroupIndex) => (
            <div key={moveGroupIndex} className="grid grid-cols-5">
              <span className="col-span-1">{moveGroupIndex + 1}.</span>
              {moveGroup.map((move, moveIndex) => (
                <div
                  className="col-span-2 font-medium"
                  key={`${move.notation}-${moveIndex}-${moveGroupIndex}`}
                >
                  {move.notation}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Play;
