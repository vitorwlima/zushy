import type { GameState, Move, RecordedMove } from "../types";
import { POSSIBLE_CASTLE_MOVES } from "./special-moves/castle";
import { getIsEnPassant } from "./special-moves/en-passant";
import { isValidMove } from "./valid-move";

export const makeMove = (
  { position, moveHistory }: GameState,
  move: Move
): GameState => {
  const result = isValidMove({ position, moveHistory }, move);
  if (result !== "success") throw new Error(result);

  const castleMove = POSSIBLE_CASTLE_MOVES.find(
    (castleMove) => castleMove.from === move.from && castleMove.to === move.to
  );
  const isEnPassant = getIsEnPassant({ position, moveHistory }, move);

  const newPosition = {
    ...position,
    [move.from]: null,
    [move.to]: { ...position[move.from]! },
  };

  if (castleMove) {
    newPosition[castleMove.rookFrom] = null;
    newPosition[castleMove.rookTo] = { ...position[castleMove.rookFrom]! };
  }

  if (isEnPassant) {
    const lastMove = moveHistory[moveHistory.length - 1];
    newPosition[lastMove!.to] = null;
  }

  if (move.promotion) {
    newPosition[move.to] = { ...newPosition[move.to]!, piece: move.promotion };
  }

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
