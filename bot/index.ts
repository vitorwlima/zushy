import { getGameStatus } from "../game/state/game-status";
import { isValidMove } from "../game/state/valid-move";
import type { GameState, SquareKey } from "../game/types";

const pickRandomValue = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]!;
};

export const getZushyMove = (gameState: GameState) => {
  const gameStatus = getGameStatus(gameState);
  const isGameOver = !["white-to-play", "black-to-play"].includes(gameStatus);
  if (isGameOver) return null;

  const isWhite = gameStatus === "white-to-play";

  if (isWhite) {
    const whitePieceSquares = Object.keys(gameState.position).filter(
      (square) => gameState.position[square as SquareKey]?.color === "white"
    );
    const allSquares = Object.keys(gameState.position) as SquareKey[];

    const allMoves = whitePieceSquares
      .map((fromSquare) => {
        const moves = allSquares.map((toSquare) => {
          return {
            from: fromSquare as SquareKey,
            to: toSquare as SquareKey,
          };
        });

        return moves;
      })
      .flat();

    const validMoves = allMoves.filter(
      (move) => isValidMove(gameState, move) === "success"
    );

    return pickRandomValue(validMoves);
  }

  const blackPieceSquares = Object.keys(gameState.position).filter(
    (square) => gameState.position[square as SquareKey]?.color === "black"
  );
  const allSquares = Object.keys(gameState.position) as SquareKey[];

  const allMoves = blackPieceSquares
    .map((fromSquare) => {
      const moves = allSquares.map((toSquare) => {
        return {
          from: fromSquare as SquareKey,
          to: toSquare as SquareKey,
        };
      });

      return moves;
    })
    .flat();

  const validMoves = allMoves.filter(
    (move) => isValidMove(gameState, move) === "success"
  );

  return pickRandomValue(validMoves);
};
