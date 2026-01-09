import type { GameState, ThreefoldStatus } from "../types";
import { getIsWhiteTurn } from "./get-is-white-turn";
import { getPositionString } from "./get-position-string";
import { getCastlingRights } from "./special-moves/castle";
import { getEnPassantAvailabilitySquare } from "./special-moves/en-passant";

export const getThreefoldStatus = (gameState: GameState): ThreefoldStatus => {
  const turn = getIsWhiteTurn(gameState) ? "white" : "black";
  const castlingRights = getCastlingRights(gameState);
  const enPassantSquare = getEnPassantAvailabilitySquare(gameState);
  const positionString = getPositionString(gameState.position);
  return { turn, castlingRights, enPassantSquare, positionString };
};
