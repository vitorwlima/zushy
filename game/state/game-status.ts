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
  | "stalemate"
  | "threefold-repetition";

export const getGameStatus = (gameState: GameState): GameStatusResult => {
  const isWhiteTurn = getIsWhiteTurn(gameState);
  const threefoldStatus =
    gameState.threefoldRepetitionHistory[
      gameState.threefoldRepetitionHistory.length - 1
    ];

  if (threefoldStatus) {
    const repeatedPositions = (
      gameState.threefoldRepetitionHistory ?? []
    ).filter((status) => {
      const positionMatches =
        status.positionString === threefoldStatus.positionString;
      if (!positionMatches) return false;

      const colorMatches = status.turn === threefoldStatus.turn;
      if (!colorMatches) return false;

      const castlingAmountMatches =
        status.castlingRights.length === threefoldStatus.castlingRights.length;
      if (!castlingAmountMatches) return false;

      const castlingRightsMatch = status.castlingRights.every((right) =>
        threefoldStatus.castlingRights.includes(right)
      );
      if (!castlingRightsMatch) return false;

      const enPassantSquareMatches =
        status.enPassantSquare === threefoldStatus.enPassantSquare;
      if (!enPassantSquareMatches) return false;

      return true;
    });

    if (repeatedPositions.length === 3) return "threefold-repetition";
  }

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
