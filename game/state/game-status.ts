import type { GameState } from "../types";
import { getIsBlackInCheck, getIsWhiteInCheck } from "./check";
import { getIsWhiteTurn } from "./get-is-white-turn";
import {
  getBlackHasAnyValidMove,
  getWhiteHasAnyValidMove,
} from "./has-any-valid-move";

export type GameStatusResult =
  | "white-to-play"
  | "black-to-play"
  | "white-wins-by-checkmate"
  | "black-wins-by-checkmate"
  | "stalemate";

export const getGameStatus = (gameState: GameState): GameStatusResult => {
  const isWhiteTurn = getIsWhiteTurn(gameState);

  if (isWhiteTurn) {
    const whiteHasAnyValidMove = getWhiteHasAnyValidMove(gameState);
    if (whiteHasAnyValidMove) return "white-to-play";

    const isWhiteInCheck = getIsWhiteInCheck(gameState);
    if (isWhiteInCheck) return "black-wins-by-checkmate";

    return "stalemate";
  }

  const blackHasAnyValidMove = getBlackHasAnyValidMove(gameState);
  if (blackHasAnyValidMove) return "black-to-play";

  const isBlackInCheck = getIsBlackInCheck(gameState);
  if (isBlackInCheck) return "white-wins-by-checkmate";

  return "stalemate";
};
