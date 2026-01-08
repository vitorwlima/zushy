import { initialPosition } from "../position";
import type { Color, GameState, SquareKey } from "../types";
import { isValidMove } from "./valid-move";

type SquareAttackedByColorParams = {
  gameState: GameState;
  square: SquareKey;
  color: Color;
};

export const getIsSquareAttackedByColor = ({
  gameState,
  square,
  color,
}: SquareAttackedByColorParams) => {
  const attackingPieceSquares = Object.keys(gameState.position).filter(
    (square) => gameState.position[square as SquareKey]?.color === color
  ) as SquareKey[];

  return attackingPieceSquares.some(
    (attackingPieceSquare) =>
      isValidMove(
        gameState,
        {
          from: attackingPieceSquare,
          to: square,
        },
        { isCheckVerification: true }
      ) === "success"
  );
};

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
      isValidMove(
        gameState,
        {
          from: square,
          to: whiteKingSquare,
        },
        { isCheckVerification: true }
      ) === "success"
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
      isValidMove(
        gameState,
        {
          from: square,
          to: blackKingSquare,
        },
        { isCheckVerification: true }
      ) === "success"
  );
};
