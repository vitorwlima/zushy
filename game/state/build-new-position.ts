import type { GameState, Move } from "../types";
import { POSSIBLE_CASTLE_MOVES } from "./special-moves/castle";
import { getIsEnPassant } from "./special-moves/en-passant";

export const buildNewPosition = (gameState: GameState, move: Move) => {
  const castleMove = POSSIBLE_CASTLE_MOVES.find(
    (castleMove) => castleMove.from === move.from && castleMove.to === move.to
  );
  const isEnPassant = getIsEnPassant(gameState, move);

  const { position, moveHistory } = gameState;

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

  return newPosition;
};
