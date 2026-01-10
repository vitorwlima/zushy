import { getGameStatus } from "../game/state/game-status";
import { makeMove } from "../game/state/make-move";
import { isValidMove } from "../game/state/valid-move";
import type { Color, GameState, Move, SquareKey } from "../game/types";
import { getCurrentPositionEvaluation } from "./get-current-position-evaluation";

export const getZushyMove = (gameState: GameState): Move => {
  const gameStatus = getGameStatus(gameState);
  const isWhite = gameStatus === "white-to-play";
  const isGameOver = !["white-to-play", "black-to-play"].includes(gameStatus);
  if (isGameOver) throw new Error("Game is over");

  return getBestMoveByColor(gameState, isWhite ? "white" : "black");
};

const getBestMoveByColor = (gameState: GameState, color: Color) => {
  const whitePieceSquares = Object.keys(gameState.position).filter(
    (square) => gameState.position[square as SquareKey]?.color === "white"
  );
  const blackPieceSquares = Object.keys(gameState.position).filter(
    (square) => gameState.position[square as SquareKey]?.color === "black"
  );
  const allSquares = Object.keys(gameState.position) as SquareKey[];
  const colorPieceSquares =
    color === "white" ? whitePieceSquares : blackPieceSquares;

  const allMoves = colorPieceSquares
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

  const bestMove = validMoves.reduce(
    (bestMoveResult, move) => {
      const moveEvaluation = getCurrentPositionEvaluation(
        makeMove(gameState, move)
      );

      if (moveEvaluation === bestMoveResult.evaluation) {
        const pickCurrentMove = Math.random() < 0.5;
        if (pickCurrentMove) {
          return { move, evaluation: moveEvaluation };
        }

        return bestMoveResult;
      }

      const isCurrentMoveBetter =
        color === "white"
          ? moveEvaluation > bestMoveResult.evaluation
          : moveEvaluation < bestMoveResult.evaluation;

      return isCurrentMoveBetter
        ? { move, evaluation: moveEvaluation }
        : bestMoveResult;
    },
    {
      move: validMoves[0],
      evaluation: getCurrentPositionEvaluation(
        makeMove(gameState, validMoves[0]!)
      ),
    }
  );

  return bestMove.move!;
};
