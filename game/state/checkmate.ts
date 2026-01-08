import type { Color, GameState, SquareKey } from "../types";
import { getIsBlackInCheck, getIsWhiteInCheck } from "./check";
import { getIsWhiteTurn } from "./get-is-white-turn";
import {
  getBlackHasAnyValidMove,
  getWhiteHasAnyValidMove,
} from "./has-any-valid-move";

type CheckmateResult = Color | null;

export const getIsCheckmate = (gameState: GameState): CheckmateResult => {
  const isWhiteTurn = getIsWhiteTurn(gameState);

  if (isWhiteTurn) {
    const isWhiteInCheck = getIsWhiteInCheck(gameState);
    if (!isWhiteInCheck) return null;

    const whiteHasAnyValidMove = getWhiteHasAnyValidMove(gameState);
    if (whiteHasAnyValidMove) return null;

    return "black";
  }

  if (!isWhiteTurn) {
    const isBlackInCheck = getIsBlackInCheck(gameState);
    if (!isBlackInCheck) return null;

    const blackHasAnyValidMove = getBlackHasAnyValidMove(gameState);
    if (blackHasAnyValidMove) return null;

    return "white";
  }

  return null;
};
