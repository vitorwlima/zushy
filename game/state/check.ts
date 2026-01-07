import { initialPosition } from "../position";
import type { GameState, SquareKey } from "../types";
import { isValidMove } from "./valid-move";

export const getIsWhiteInCheck = (gameState: GameState) => {
  const squares = Object.keys(initialPosition) as SquareKey[];
  const whiteKingSquare = squares.find(
    (square) =>
      gameState.position[square]?.piece === "king" &&
      gameState.position[square]?.color === "white"
  ) as SquareKey;

  const blackPieceSquares = squares.filter(
    (square) => gameState.position[square]?.color === "black"
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
  const squares = Object.keys(initialPosition) as SquareKey[];
  const blackKingSquare = squares.find(
    (square) =>
      gameState.position[square]?.piece === "king" &&
      gameState.position[square]?.color === "black"
  ) as SquareKey;

  const whitePieceSquares = squares.filter(
    (square) => gameState.position[square]?.color === "white"
  ) as SquareKey[];

  return whitePieceSquares.some(
    (square) =>
      isValidMove(gameState, {
        from: square,
        to: blackKingSquare,
      }) === "success"
  );
};
