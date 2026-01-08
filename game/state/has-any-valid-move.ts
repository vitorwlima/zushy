import type { GameState, SquareKey } from "../types";
import { isValidMove } from "./valid-move";

export const getWhiteHasAnyValidMove = (gameState: GameState) => {
  const allSquares = Object.keys(gameState.position) as SquareKey[];
  const whitePieceSquares = Object.keys(gameState.position).filter(
    (square) => gameState.position[square as SquareKey]?.color === "white"
  );

  return whitePieceSquares.some((whiteSquare) => {
    return allSquares.some((anySquare) => {
      return (
        isValidMove(gameState, {
          from: whiteSquare as SquareKey,
          to: anySquare as SquareKey,
        }) === "success"
      );
    });
  });
};

export const getBlackHasAnyValidMove = (gameState: GameState) => {
  const allSquares = Object.keys(gameState.position) as SquareKey[];
  const blackPieceSquares = Object.keys(gameState.position).filter(
    (square) => gameState.position[square as SquareKey]?.color === "black"
  );

  return blackPieceSquares.some((blackSquare) => {
    return allSquares.some((anySquare) => {
      return (
        isValidMove(gameState, {
          from: blackSquare as SquareKey,
          to: anySquare as SquareKey,
        }) === "success"
      );
    });
  });
};
