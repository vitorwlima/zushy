import type { GameState } from "../types";

export const getIsWhiteTurn = ({ moveHistory }: GameState) => {
  return moveHistory.length % 2 === 0;
};
