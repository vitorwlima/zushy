import type { GameState, Move, RecordedMove } from "../types";
import { buildNewPosition } from "./build-new-position";
import { isValidMove } from "./valid-move";

export const makeMove = (
  { position, moveHistory }: GameState,
  move: Move
): GameState => {
  const result = isValidMove({ position, moveHistory }, move);
  if (result !== "success") throw new Error(result);

  const newPosition = buildNewPosition({ position, moveHistory }, move);

  const newMoveHistory = [
    ...moveHistory,
    {
      from: move.from,
      to: move.to,
      notation: "tbd - prob just call a getNotationFromGameState",
    },
  ] satisfies RecordedMove[];

  return { position: newPosition, moveHistory: newMoveHistory };
};
