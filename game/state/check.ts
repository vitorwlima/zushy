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
  const squares = Object.keys(gameState.position) as SquareKey[];
  const whiteKingSquare = squares.find(
    (square) =>
      gameState.position[square]?.piece === "king" &&
      gameState.position[square]?.color === "white"
  ) as SquareKey;

  return getIsSquareAttackedByColor({
    gameState,
    square: whiteKingSquare,
    color: "black",
  });
};

export const getIsBlackInCheck = (gameState: GameState) => {
  const squares = Object.keys(gameState.position) as SquareKey[];
  const blackKingSquare = squares.find(
    (square) =>
      gameState.position[square]?.piece === "king" &&
      gameState.position[square]?.color === "black"
  ) as SquareKey;

  return getIsSquareAttackedByColor({
    gameState,
    square: blackKingSquare,
    color: "white",
  });
};
