import type {
  GameState,
  Move,
  Position,
  RecordedMove,
  SquareKey,
} from "../types";
import { isValidMove } from "./valid-move";

export const makeMove = (
  { position, moveHistory }: GameState,
  move: Move
): GameState => {
  const result = isValidMove({ position, moveHistory }, move);
  if (result !== "success") throw new Error(result);

  const newPosition = {
    ...position,
    [move.from]: null,
    [move.to]: { ...position[move.from]! },
  } satisfies Position;

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
