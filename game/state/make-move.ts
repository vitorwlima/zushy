import type { GameState, Move, RecordedMove } from "../types";
import { buildNewPosition } from "./build-new-position";
import { getMoveNotation } from "./get-move-notation";
import { getThreefoldStatus } from "./get-threefold-status";
import { isValidMove } from "./valid-move";

export const makeMove = (gameState: GameState, move: Move): GameState => {
  const result = isValidMove(gameState, move);
  if (result !== "success") throw new Error(result);

  const newPosition = buildNewPosition(gameState, move);

  const newMoveHistory = [
    ...gameState.moveHistory,
    {
      from: move.from,
      to: move.to,
      notation: getMoveNotation(gameState, move),
    },
  ] satisfies RecordedMove[];

  const newPositionAfterMoveHistory = [
    ...gameState.positionAfterMoveHistory,
    newPosition,
  ];

  const newThreefoldRepetitionHistory = [
    ...gameState.threefoldRepetitionHistory,
    getThreefoldStatus({
      position: newPosition,
      moveHistory: newMoveHistory,
      positionAfterMoveHistory: newPositionAfterMoveHistory,
      threefoldRepetitionHistory: [],
    }),
  ];

  return {
    position: newPosition,
    moveHistory: newMoveHistory,
    positionAfterMoveHistory: newPositionAfterMoveHistory,
    threefoldRepetitionHistory: newThreefoldRepetitionHistory,
  };
};
