import type { GameState, SquareKey } from "../types";
import { isValidMove } from "./valid-move";

export const getIsWhiteInCheck = (gameState: GameState) => {
  const whiteKingSquare = Object.keys(gameState.position).find(
    (key) =>
      gameState.position[key as SquareKey]?.piece === "king" &&
      gameState.position[key as SquareKey]?.color === "white"
  ) as SquareKey;

  const blackPieceSquares = Object.keys(gameState.position).filter(
    (key) => gameState.position[key as SquareKey]?.color === "black"
  ) as SquareKey[];

  return blackPieceSquares.some(
    (square) =>
      isValidMove(gameState, {
        from: square,
        to: whiteKingSquare,
      }) === "success"
  );
};

export const getIsBlackInCheck = (gameState: GameState) => {
  const blackKingSquare = Object.keys(gameState.position).find(
    (key) =>
      gameState.position[key as SquareKey]?.piece === "king" &&
      gameState.position[key as SquareKey]?.color === "black"
  ) as SquareKey;

  const whitePieceSquares = Object.keys(gameState.position).filter(
    (key) => gameState.position[key as SquareKey]?.color === "white"
  ) as SquareKey[];

  return whitePieceSquares.some(
    (square) =>
      isValidMove(gameState, {
        from: square,
        to: blackKingSquare,
      }) === "success"
  );
};
