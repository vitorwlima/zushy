import type { Color, GameState, SquareKey } from "../types";
import { getIsBlackInCheck, getIsWhiteInCheck } from "./check";
import { getIsWhiteTurn } from "./get-is-white-turn";
import { isValidMove } from "./valid-move";

type CheckmateResult = Color | null;

export const getIsCheckmate = (gameState: GameState): CheckmateResult => {
  const isWhiteTurn = getIsWhiteTurn(gameState);

  if (isWhiteTurn) {
    const isWhiteInCheck = getIsWhiteInCheck(gameState);
    if (!isWhiteInCheck) return null;

    const whiteKingSquare = Object.keys(gameState.position).find(
      (key) =>
        gameState.position[key as SquareKey]?.piece === "king" &&
        gameState.position[key as SquareKey]?.color === "white"
    ) as SquareKey;

    const hasValidKingMove = Object.keys(gameState.position).some(
      (squareKey) =>
        isValidMove(gameState, {
          from: whiteKingSquare,
          to: squareKey as SquareKey,
        }) === "success"
    );
    if (hasValidKingMove) return null;

    return "black";
  }

  if (!isWhiteTurn) {
    const isBlackInCheck = getIsBlackInCheck(gameState);
    if (!isBlackInCheck) return null;

    const blackKingSquare = Object.keys(gameState.position).find(
      (key) =>
        gameState.position[key as SquareKey]?.piece === "king" &&
        gameState.position[key as SquareKey]?.color === "black"
    ) as SquareKey;

    const hasValidKingMove = Object.keys(gameState.position).some(
      (squareKey) =>
        isValidMove(gameState, {
          from: blackKingSquare,
          to: squareKey as SquareKey,
        }) === "success"
    );
    if (hasValidKingMove) return null;

    return "white";
  }

  return null;
};
